import { env } from '../config/env.js'

const LONG_BAN_DURATION = '876000h'
const ACTIVE_STATUS = 'active'
const BANNED_STATUS = 'banned'

function isProfilesTableMissing(error) {
  return (
    error?.statusCode === 404 ||
    error?.payload?.code === 'PGRST205' ||
    error?.payload?.code === '42P01' ||
    error?.message?.includes("Could not find the table 'public.profiles'") ||
    error?.message?.includes('relation "public.profiles" does not exist')
  )
}

function getApiKey(useServiceRole = false) {
  return useServiceRole ? env.supabaseServiceRoleKey : env.supabaseAnonKey
}

async function supabaseFetch(
  path,
  { method = 'GET', body, accessToken, headers = {}, useServiceRole = false } = {},
) {
  const apiKey = getApiKey(useServiceRole)

  if (!env.supabaseUrl || !apiKey) {
    throw new Error('Lipseste configurarea Supabase pe server.')
  }

  const response = await fetch(`${env.supabaseUrl}${path}`, {
    method,
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${accessToken || apiKey}`,
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await response.text()
  const data = text ? JSON.parse(text) : null

  if (!response.ok) {
    const message = data?.msg || data?.message || data?.error_description || data?.error || 'Supabase request failed.'
    const error = new Error(message)
    error.statusCode = response.status
    error.payload = data
    throw error
  }

  return data
}

export async function getAuthenticatedAdminUser(accessToken) {
  const user = await getAuthenticatedUser(accessToken)
  const profile = user?.id ? await getProfileById(user.id) : null
  const normalizedAdminEmail = env.adminEmail.trim().toLowerCase()
  const isBootstrapAdmin =
    Boolean(normalizedAdminEmail) && user?.email?.trim().toLowerCase() === normalizedAdminEmail
  const isAdmin =
    isBootstrapAdmin || (profile?.role === 'admin' && profile?.status !== BANNED_STATUS)

  if (!isAdmin) {
    const error = new Error('forbidden')
    error.statusCode = 403
    throw error
  }

  return user
}

export async function getAuthenticatedUser(accessToken) {
  const data = await supabaseFetch('/auth/v1/user', {
    accessToken,
    useServiceRole: false,
  })

  return data?.user || data
}

async function getProfileById(userId) {
  try {
    const encodedUserId = encodeURIComponent(`eq.${userId}`)
    const data = await supabaseFetch(
      `/rest/v1/profiles?select=id,email,full_name,avatar_url,role,status,created_at,updated_at&id=${encodedUserId}&limit=1`,
      { useServiceRole: true },
    )

    return Array.isArray(data) ? data[0] ?? null : data
  } catch (error) {
    if (isProfilesTableMissing(error)) {
      return null
    }

    throw error
  }
}

function getDisplayName(user) {
  return (
    user?.user_metadata?.username?.trim() ||
    user?.user_metadata?.full_name?.trim() ||
    user?.user_metadata?.name?.trim() ||
    user?.email?.split('@')[0] ||
    'Profil'
  )
}

function getRoleFromAuthUser(user) {
  if (user?.email?.trim().toLowerCase() === env.adminEmail.trim().toLowerCase()) {
    return 'admin'
  }

  return user?.app_metadata?.role || 'user'
}

function getStatusFromAuthUser(user) {
  if (!user?.banned_until) {
    return ACTIVE_STATUS
  }

  return new Date(user.banned_until).getTime() > Date.now() ? BANNED_STATUS : ACTIVE_STATUS
}

function normalizeProfile(profile) {
  return {
    id: profile.id,
    email: profile.email || '',
    full_name: profile.full_name || null,
    avatar_url: profile.avatar_url || null,
    role: profile.role || 'user',
    status: profile.status || ACTIVE_STATUS,
    created_at: profile.created_at || null,
    updated_at: profile.updated_at || null,
  }
}

function normalizeAuthAdminUser(user) {
  return {
    id: user.id,
    email: user.email || '',
    full_name: getDisplayName(user),
    avatar_url: user?.user_metadata?.avatar_url || null,
    role: getRoleFromAuthUser(user),
    status: getStatusFromAuthUser(user),
    created_at: user.created_at || null,
    updated_at: user.updated_at || null,
  }
}

async function listAuthAdminUsers() {
  const data = await supabaseFetch('/auth/v1/admin/users?page=1&per_page=1000', {
    useServiceRole: true,
  })

  return (data?.users || []).map(normalizeAuthAdminUser)
}

export async function listAdminUsers() {
  try {
    const data = await supabaseFetch(
      '/rest/v1/profiles?select=id,email,full_name,avatar_url,role,status,created_at,updated_at&order=created_at.desc',
      { useServiceRole: true },
    )

    const profiles = (Array.isArray(data) ? data : []).map(normalizeProfile)

    if (profiles.length > 0) {
      return profiles
    }

    return listAuthAdminUsers()
  } catch (error) {
    if (!isProfilesTableMissing(error)) {
      throw error
    }

    return listAuthAdminUsers()
  }
}

export async function getAdminUserById(userId) {
  const profile = await getProfileById(userId)

  if (profile) {
    return normalizeProfile(profile)
  }

  const data = await supabaseFetch(`/auth/v1/admin/users/${userId}`, {
    useServiceRole: true,
  })
  const user = data?.user || data
  return user ? normalizeAuthAdminUser(user) : null
}

export async function updateAdminUser(userId, updates) {
  const currentData = await supabaseFetch(`/auth/v1/admin/users/${userId}`, {
    useServiceRole: true,
  })
  const currentUser = currentData?.user || currentData

  if (!currentUser) {
    const error = new Error('Utilizatorul nu a fost gasit.')
    error.statusCode = 404
    throw error
  }

  const currentProfile = await getProfileById(userId)
  const nextDisplayName = updates.full_name?.trim() || getDisplayName(currentUser)
  const nextRole =
    currentUser.email?.trim().toLowerCase() === env.adminEmail.trim().toLowerCase()
      ? 'admin'
      : updates.role || currentProfile?.role || 'user'
  const requestedStatus =
    updates.status ||
    (typeof updates.is_banned === 'boolean'
      ? updates.is_banned
        ? BANNED_STATUS
        : ACTIVE_STATUS
      : null)
  const nextStatus =
    requestedStatus ||
    currentProfile?.status ||
    (currentUser?.banned_until ? BANNED_STATUS : ACTIVE_STATUS)

  const profilePayload = {
    id: userId,
    email: currentUser.email || currentProfile?.email || '',
    full_name: nextDisplayName,
    avatar_url: currentUser.user_metadata?.avatar_url || currentProfile?.avatar_url || null,
    role: nextRole,
    status: nextStatus,
  }

  try {
    await supabaseFetch('/rest/v1/profiles', {
      method: 'POST',
      useServiceRole: true,
      headers: {
        Prefer: 'return=representation,resolution=merge-duplicates',
      },
      body: profilePayload,
    })
  } catch (error) {
    if (!isProfilesTableMissing(error)) {
      throw error
    }
  }

  const payload = {
    user_metadata: {
      ...currentUser.user_metadata,
      username: nextDisplayName,
      full_name: nextDisplayName,
    },
    app_metadata: {
      ...currentUser.app_metadata,
      role: nextRole,
    },
  }

  if (nextStatus === BANNED_STATUS) {
    payload.ban_duration = LONG_BAN_DURATION
  } else if (requestedStatus === ACTIVE_STATUS || updates.is_banned === false) {
    payload.ban_duration = 'none'
  }

  await supabaseFetch(`/auth/v1/admin/users/${userId}`, {
    method: 'PUT',
    useServiceRole: true,
    body: payload,
  })

  return getAdminUserById(userId)
}

export async function deleteAdminUser(userId) {
  await supabaseFetch(`/auth/v1/admin/users/${userId}`, {
    method: 'DELETE',
    useServiceRole: true,
  })
}

export async function listTickets() {
  try {
    const data = await supabaseFetch(
      '/rest/v1/tickets?select=id,user_id,event_name,buyer_email,buyer_name,quantity,total_price,status,created_at&order=created_at.desc',
      { useServiceRole: true },
    )

    return Array.isArray(data) ? data : []
  } catch (error) {
    if (error.statusCode === 404 || error.payload?.code === '42P01') {
      return []
    }

    throw error
  }
}

export async function syncAdminUserProfile({ id, full_name, role, status, is_banned }) {
  return updateAdminUser(id, {
    full_name,
    role,
    status: status || (is_banned ? BANNED_STATUS : undefined),
    is_banned,
  })
}

export async function makeAdmin(userId) {
  return updateAdminUser(userId, { role: 'admin' })
}

export async function removeAdmin(userId) {
  return updateAdminUser(userId, { role: 'user' })
}

export async function banAdminUser(userId) {
  return updateAdminUser(userId, { status: BANNED_STATUS })
}

export async function createTicketPurchase(ticket) {
  const data = await supabaseFetch('/rest/v1/tickets', {
    method: 'POST',
    useServiceRole: true,
    headers: {
      Prefer: 'return=representation',
    },
    body: ticket,
  })

  return Array.isArray(data) ? data[0] : data
}

export async function listUserTickets(userId) {
  try {
    const encodedUserId = encodeURIComponent(`eq.${userId}`)
    const data = await supabaseFetch(
      `/rest/v1/tickets?select=id,user_id,event_name,buyer_email,buyer_name,quantity,total_price,status,created_at&user_id=${encodedUserId}&order=created_at.desc`,
      { useServiceRole: true },
    )

    return Array.isArray(data) ? data : []
  } catch (error) {
    if (error.statusCode === 404 || error.payload?.code === '42P01') {
      return []
    }

    throw error
  }
}
