import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { hasSupabaseConfig, supabase } from '../lib/supabase'

const AuthContext = createContext(null)
const ADMIN_EMAIL = 'eduard.ghitun@yahoo.com'
const BANNED_STATUS = 'banned'
const ACTIVE_STATUS = 'active'

function normalizeBaseUrl(value) {
  return value?.trim().replace(/\/+$/, '') || ''
}

function getSiteBaseUrl() {
  const configuredUrl = normalizeBaseUrl(import.meta.env.VITE_SITE_URL)

  if (configuredUrl) {
    return configuredUrl
  }

  if (typeof window !== 'undefined') {
    return normalizeBaseUrl(window.location.origin)
  }

  return ''
}

function getAuthEmailRedirectUrl() {
  const siteBaseUrl = getSiteBaseUrl()

  return siteBaseUrl ? `${siteBaseUrl}/login` : undefined
}

function isAdminEmail(email) {
  return email?.trim().toLowerCase() === ADMIN_EMAIL
}

function getAuthErrorMessage(error) {
  const message = error?.message?.trim()

  if (!message) {
    return 'A aparut o eroare la autentificare. Incearca din nou.'
  }

  if (message.includes('Email signups are disabled')) {
    return 'Inregistrarea cu email este dezactivata in Supabase. Activeaza Email provider in Authentication > Providers.'
  }

  if (
    message.includes('redirect_to is not allowed') ||
    message.includes('email link is invalid') ||
    message.includes('Email link is invalid')
  ) {
    const redirectUrl = getAuthEmailRedirectUrl()
    return redirectUrl
      ? `Redirectul de confirmare nu este permis de Supabase. Adauga ${redirectUrl} in Authentication > URL Configuration.`
      : 'Redirectul de confirmare nu este permis de Supabase. Configureaza VITE_SITE_URL si URL-urile de redirect in Supabase.'
  }

  return message
}

function isProfilesTableMissing(error) {
  return (
    error?.code === 'PGRST205' ||
    error?.code === '42P01' ||
    error?.message?.includes("Could not find the table 'public.profiles'") ||
    error?.message?.includes('relation "public.profiles" does not exist')
  )
}

function buildFallbackProfile(user) {
  if (!user) {
    return null
  }

  const profilePayload = buildProfilePayload(user)

  return {
    ...profilePayload,
    role: profilePayload.role || 'user',
    status:
      user?.banned_until && new Date(user.banned_until).getTime() > Date.now()
        ? BANNED_STATUS
        : ACTIVE_STATUS,
    created_at: user.created_at || null,
    updated_at: user.updated_at || null,
  }
}

function buildProfilePayload(user) {
  if (!user) {
    return null
  }

  const username =
    user.user_metadata?.username?.trim() ||
    user.user_metadata?.preferred_username?.trim() ||
    user.user_metadata?.full_name?.trim() ||
    user.user_metadata?.name?.trim() ||
    user.email?.split('@')[0] ||
    'Profil'

  const fullName =
    user.user_metadata?.full_name?.trim() ||
    user.user_metadata?.username?.trim() ||
    user.user_metadata?.name?.trim() ||
    username

  return {
    id: user.id,
    email: user.email ?? '',
    full_name: fullName,
    avatar_url: user.user_metadata?.avatar_url ?? null,
    ...(isAdminEmail(user.email) ? { role: 'admin' } : {}),
  }
}

function resolveAuthenticatedPath({ redirectPath = '/dashboard', currentUser, currentProfile }) {
  const normalizedPath = redirectPath || '/dashboard'
  const hasAdminAccess = currentProfile?.role === 'admin' || isAdminEmail(currentUser?.email)

  if (normalizedPath === '/dashboard' && hasAdminAccess) {
    return '/admin'
  }

  return normalizedPath
}

async function ensureProfile(user) {
  if (!supabase || !user) {
    return null
  }

  const profilePayload = buildProfilePayload(user)
  const { error: upsertError } = await supabase.from('profiles').upsert(profilePayload, {
    onConflict: 'id',
  })

  if (upsertError) {
    if (isProfilesTableMissing(upsertError)) {
      return buildFallbackProfile(user)
    }

    throw upsertError
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, full_name, avatar_url, role, status, created_at, updated_at')
    .eq('id', user.id)
    .maybeSingle()

  if (error) {
    if (isProfilesTableMissing(error)) {
      return buildFallbackProfile(user)
    }

    throw error
  }

  return data
}

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  async function signOutAndReset(redirectTo = '/', query = '') {
    if (supabase) {
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error('Logout error:', error)
      }
    }

    setSession(null)
    setUser(null)
    setProfile(null)
    navigate(`${redirectTo}${query}`, { replace: true })
  }

  async function refreshProfile(currentUser = user) {
    if (!supabase || !currentUser) {
      setProfile(null)
      return null
    }

    try {
      const nextProfile = await ensureProfile(currentUser)
      setProfile(nextProfile)

      if (nextProfile?.status === BANNED_STATUS) {
        await signOutAndReset('/login', '?banned=1')
        return nextProfile
      }

      return nextProfile
    } catch (error) {
      console.error('Failed to load profile:', error)
      setProfile(null)
      return null
    }
  }

  useEffect(() => {
    let mounted = true

    function applyResolvedProfile(nextProfile) {
      if (!mounted) {
        return
      }

      setProfile(nextProfile)

      if (nextProfile?.status === BANNED_STATUS) {
        void signOutAndReset('/login', '?banned=1')
      }
    }

    async function initSession() {
      if (!supabase) {
        if (mounted) {
          setSession(null)
          setUser(null)
          setProfile(null)
          setLoading(false)
        }
        return
      }

      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Session error:', error)
        }

        if (!mounted) {
          return
        }

        const nextSession = data?.session ?? null
        const nextUser = nextSession?.user ?? null

        setSession(nextSession)
        setUser(nextUser)

        if (nextUser) {
          const nextProfile = await ensureProfile(nextUser)
          applyResolvedProfile(nextProfile)
        } else {
          setProfile(null)
        }
      } catch (error) {
        console.error('Auth init error:', error)
        if (mounted) {
          setSession(null)
          setUser(null)
          setProfile(null)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    void initSession()

    if (!supabase) {
      return () => {
        mounted = false
      }
    }

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) {
        return
      }

      const nextUser = nextSession?.user ?? null

      setSession(nextSession)
      setUser(nextUser)

      if (mounted) {
        setLoading(false)
      }

      if (nextUser) {
        queueMicrotask(async () => {
          try {
            const nextProfile = await ensureProfile(nextUser)
            applyResolvedProfile(nextProfile)
          } catch (error) {
            console.error('Failed to load profile after auth state change:', error)
            if (mounted) {
              setProfile(null)
            }
          }
        })
      } else {
        setProfile(null)
      }
    })

    return () => {
      mounted = false
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!supabase || !user?.id) {
      return undefined
    }

    if (!profile) {
      return undefined
    }

    const channel = supabase
      .channel(`profile-status-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
          filter: `id=eq.${user.id}`,
        },
        (payload) => {
          const nextProfile =
            payload.new && typeof payload.new === 'object'
              ? payload.new
              : null

          if (nextProfile) {
            setProfile(nextProfile)

            if (nextProfile.status === BANNED_STATUS) {
              void signOutAndReset('/login', '?banned=1')
            }

            return
          }

          queueMicrotask(() => {
            void refreshProfile(user)
          })
        },
      )
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [user?.id])

  async function register({ username, email, password }) {
    if (!supabase) {
      return {
        success: false,
        message:
          'Autentificarea nu este configurata inca. Adauga VITE_SUPABASE_URL si VITE_SUPABASE_ANON_KEY.',
      }
    }

    const normalizedEmail = email.trim().toLowerCase()
    const normalizedUsername = username.trim()

    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        emailRedirectTo: getAuthEmailRedirectUrl(),
        data: {
          username: normalizedUsername,
          full_name: normalizedUsername,
        },
      },
    })

    if (error) {
      return {
        success: false,
        message: getAuthErrorMessage(error),
      }
    }

    if (data.user && data.session) {
      await refreshProfile(data.user)
    }

    return {
      success: true,
      message: data.session
        ? 'Contul a fost creat cu succes.'
        : 'Contul a fost creat. Verifica emailul pentru confirmare inainte de logare.',
    }
  }

  async function login({ email, password, redirectPath = '/dashboard' }) {
    if (!supabase) {
      return {
        success: false,
        message:
          'Autentificarea nu este configurata inca. Adauga VITE_SUPABASE_URL si VITE_SUPABASE_ANON_KEY.',
      }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        success: false,
        message: error.message,
      }
    }

    const nextProfile = data.user ? await refreshProfile(data.user) : null

    if (nextProfile?.status === BANNED_STATUS) {
      return {
        success: false,
        message: 'Contul tau a fost suspendat.',
      }
    }

    navigate(
      resolveAuthenticatedPath({
        redirectPath,
        currentUser: data.user,
        currentProfile: nextProfile,
      }),
      { replace: true },
    )

    return {
      success: true,
      message: 'Autentificarea a fost efectuata cu succes.',
    }
  }

  async function loginWithGoogle() {
    if (!supabase) {
      return {
        success: false,
        message:
          'Autentificarea nu este configurata inca. Adauga VITE_SUPABASE_URL si VITE_SUPABASE_ANON_KEY.',
      }
    }

    const redirectTo = `${window.location.origin}/dashboard`
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    })

    if (error) {
      return {
        success: false,
        message: error.message,
      }
    }

    return {
      success: true,
      message: 'Redirectionam catre Google pentru autentificare.',
    }
  }

  async function logout() {
    await signOutAndReset('/')
  }

  const isAdmin = profile?.role === 'admin' || isAdminEmail(user?.email)
  const isBanned = profile?.status === BANNED_STATUS

  const value = useMemo(
    () => ({
      user,
      session,
      profile,
      isAdmin,
      isBanned,
      loading,
      defaultDashboardPath: resolveAuthenticatedPath({
        currentUser: user,
        currentProfile: profile,
      }),
      hasSupabaseConfig,
      login,
      loginWithGoogle,
      register,
      logout,
      refreshProfile,
    }),
    [hasSupabaseConfig, isAdmin, isBanned, loading, profile, session, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
