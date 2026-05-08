import { ChevronDown, LayoutDashboard, LogOut, Menu, ShieldCheck, UserCircle2, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { useAuth } from '../providers/AuthProvider'
import useAdaptiveMotion from '../hooks/useAdaptiveMotion'
import { navigation } from '../data/navigation'
import TransitionLink from './TransitionLink'
import TransitionNavLink from './TransitionNavLink'
import ConditionsDropdown from './legal/ConditionsDropdown'

function getProfileIdentity(profile, user) {
  const displayName =
    profile?.full_name?.trim() ||
    user?.user_metadata?.username?.trim() ||
    user?.user_metadata?.preferred_username?.trim() ||
    user?.user_metadata?.full_name?.trim() ||
    user?.email?.split('@')[0]?.trim() ||
    'Profil'
  const avatarUrl = user?.user_metadata?.avatar_url?.trim() || null

  return { avatarUrl, displayName }
}

function ProfileAvatar({ avatarUrl, displayName }) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={displayName}
        className="h-8 w-8 rounded-full border border-gold/30 object-cover shadow-[0_0_20px_rgba(245,196,0,0.08)]"
        referrerPolicy="no-referrer"
      />
    )
  }

  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold">
      <UserCircle2 size={16} />
    </span>
  )
}

function ProfileDropdown({ isAdmin, onNavigateDashboard, onNavigateAdmin, onLogout }) {
  return (
    <div className="absolute right-0 top-[calc(100%+0.7rem)] w-[15rem] overflow-hidden rounded-[24px] border border-white/10 bg-black/[0.88] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
      <div className="rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-1">
        <TransitionLink
          to="/dashboard"
          onClick={onNavigateDashboard}
          className="flex w-full items-center gap-3 rounded-[16px] px-4 py-3 text-left text-sm font-medium text-white/[0.82] transition duration-300 hover:bg-gold/10 hover:text-gold"
        >
          <LayoutDashboard size={16} />
          Dashboard
        </TransitionLink>
        {isAdmin ? (
          <TransitionLink
            to="/admin"
            onClick={onNavigateAdmin}
            className="mt-1 flex w-full items-center gap-3 rounded-[16px] px-4 py-3 text-left text-sm font-medium text-white/[0.82] transition duration-300 hover:bg-gold/10 hover:text-gold"
          >
            <ShieldCheck size={16} />
            Admin Dashboard
          </TransitionLink>
        ) : null}
        <button
          type="button"
          onClick={onLogout}
          className="mt-1 flex w-full items-center gap-3 rounded-[16px] px-4 py-3 text-left text-sm font-medium text-white/[0.82] transition duration-300 hover:bg-gold/10 hover:text-gold"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </div>
  )
}

function DesktopNavigation({ currentPath, location }) {
  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Navigatie principala">
      {navigation.map((item) => {
        const isActive =
          currentPath === item.path || (item.path === '/' && location.pathname === '/' && !location.hash)

        return (
          <TransitionNavLink
            key={item.path}
            to={item.path}
            className={() =>
              clsx(
                'group relative inline-flex h-11 items-center justify-center rounded-full px-4 text-[0.76rem] font-medium uppercase tracking-[0.24em] transition duration-300',
                isActive
                  ? 'text-white'
                  : 'text-white/[0.58] hover:bg-white/[0.03] hover:text-white',
              )
            }
          >
            <span className="relative">
              {item.label}
              <span
                className={clsx(
                  'absolute -bottom-1 left-1/2 h-px -translate-x-1/2 bg-gold transition-all duration-300',
                  isActive ? 'w-[calc(100%-0.15rem)] opacity-100' : 'w-0 opacity-0 group-hover:w-[calc(100%-0.15rem)] group-hover:opacity-100',
                )}
              />
            </span>
          </TransitionNavLink>
        )
      })}
      <ConditionsDropdown integrated />
    </nav>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const location = useLocation()
  const { useLiteMotion } = useAdaptiveMotion()
  const { user, profile, isAdmin, logout } = useAuth()
  const currentPath = `${location.pathname}${location.hash}`
  const desktopProfileMenuRef = useRef(null)
  const mobileProfileMenuRef = useRef(null)
  const { avatarUrl, displayName } = useMemo(
    () => getProfileIdentity(profile, user),
    [profile, user],
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setProfileMenuOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = previousOverflow
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    function handlePointerDown(event) {
      const clickedDesktopProfile = desktopProfileMenuRef.current?.contains(event.target)
      const clickedMobileProfile = mobileProfileMenuRef.current?.contains(event.target)

      if (!clickedDesktopProfile && !clickedMobileProfile) {
        setProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [])

  async function handleLogout() {
    setProfileMenuOpen(false)
    setOpen(false)

    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const shellClass = clsx(
    'relative overflow-visible rounded-[24px] border px-3 py-2.5 transition duration-300 sm:rounded-full sm:px-4 sm:py-2.5 lg:px-5',
    scrolled
      ? 'border-white/[0.12] bg-black/[0.68] shadow-[0_20px_70px_rgba(0,0,0,0.34)] backdrop-blur-2xl'
      : 'border-white/10 bg-black/[0.58] shadow-[0_12px_50px_rgba(0,0,0,0.2)] backdrop-blur-xl',
  )

  const profileButtonClass = clsx(
    'inline-flex h-11 items-center gap-2.5 rounded-full border px-2.5 pr-3 text-sm font-medium text-white transition duration-300',
    scrolled
      ? 'border-white/[0.12] bg-white/[0.04] hover:border-gold/25 hover:bg-gold/10 hover:text-gold'
      : 'border-white/10 bg-white/[0.03] hover:border-gold/25 hover:bg-gold/10 hover:text-gold',
    profileMenuOpen && 'border-gold/30 bg-gold/10 text-gold shadow-[0_0_28px_rgba(245,196,0,0.1)]',
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-shell pt-2.5 sm:pt-4">
        <div className="flex items-start gap-3">
          <div className={clsx('min-w-0 flex-1', shellClass)}>
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))]" />

            <div className="relative flex min-h-[3.25rem] items-center justify-between gap-3 lg:grid lg:grid-cols-[minmax(0,0.95fr)_auto_minmax(0,0.95fr)] lg:gap-5">
              <div className="min-w-0">
                <TransitionLink
                  to="/"
                  className="inline-flex items-center rounded-full px-2 py-1 font-display text-[0.78rem] uppercase tracking-[0.22em] text-white transition duration-300 hover:text-gold sm:text-[0.9rem] sm:tracking-[0.28em]"
                >
                  NorthSideCrew
                </TransitionLink>
              </div>

              <div className="hidden justify-center lg:flex">
                <DesktopNavigation currentPath={currentPath} location={location} />
              </div>

              <div className="hidden items-center justify-end lg:flex">
                <div className="relative" ref={desktopProfileMenuRef}>
                  {user ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setProfileMenuOpen((value) => !value)}
                        className={profileButtonClass}
                        aria-haspopup="menu"
                        aria-expanded={profileMenuOpen}
                      >
                        <ProfileAvatar avatarUrl={avatarUrl} displayName={displayName} />
                        <span className="min-w-0 text-left">
                          <span className="block text-[0.6rem] uppercase tracking-[0.18em] text-white/[0.42]">
                            {isAdmin ? 'Admin' : 'Profil'}
                          </span>
                          <span className="block max-w-[8rem] truncate text-sm font-semibold text-current">
                            {displayName}
                          </span>
                        </span>
                        <ChevronDown
                          size={15}
                          className={clsx('shrink-0 transition duration-300', profileMenuOpen && 'rotate-180')}
                        />
                      </button>

                      <AnimatePresence>
                        {profileMenuOpen ? (
                          <motion.div
                            initial={useLiteMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
                            animate={useLiteMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                            exit={useLiteMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
                            transition={{ duration: useLiteMotion ? 0.12 : 0.18, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <ProfileDropdown
                              isAdmin={isAdmin}
                              onNavigateDashboard={() => {
                                setProfileMenuOpen(false)
                                setOpen(false)
                              }}
                              onNavigateAdmin={() => {
                                setProfileMenuOpen(false)
                                setOpen(false)
                              }}
                              onLogout={handleLogout}
                            />
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </>
                  ) : (
                    <TransitionLink
                      to="/login"
                      className={clsx(
                        'inline-flex h-11 items-center justify-center rounded-full border px-5 text-[0.76rem] font-medium uppercase tracking-[0.2em] text-white transition duration-300 hover:border-gold/30 hover:bg-gold/10 hover:text-gold',
                        scrolled ? 'border-white/[0.12] bg-white/[0.04]' : 'border-white/10 bg-white/[0.03]',
                      )}
                    >
                      Conecteaza-te
                    </TransitionLink>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] text-white transition duration-300 hover:border-gold/30 hover:bg-gold/10 hover:text-gold lg:hidden"
                aria-label="Toggle menu"
              >
                {open ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>

            <AnimatePresence>
              {open ? (
                <motion.nav
                  initial={useLiteMotion ? { opacity: 0, height: 0 } : { opacity: 0, height: 0, y: -8 }}
                  animate={useLiteMotion ? { opacity: 1, height: 'auto' } : { opacity: 1, height: 'auto', y: 0 }}
                  exit={useLiteMotion ? { opacity: 0, height: 0 } : { opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: useLiteMotion ? 0.16 : 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden lg:hidden"
                >
                  <div className="mt-4 max-h-[calc(100svh-6.5rem)] space-y-3 overflow-y-auto border-t border-white/10 pt-4 pb-1">
                    <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-2">
                      {navigation.map((item) => {
                        const isActive =
                          currentPath === item.path ||
                          (item.path === '/' && location.pathname === '/' && !location.hash)

                        return (
                          <TransitionNavLink
                            key={item.path}
                            to={item.path}
                            className={() =>
                              clsx(
                                'block rounded-[18px] px-4 py-3.5 text-sm font-medium uppercase tracking-[0.18em] transition duration-300',
                                isActive
                                  ? 'bg-gold/[0.12] text-gold'
                                  : 'text-white/[0.72] hover:bg-white/[0.04] hover:text-white',
                              )
                            }
                          >
                            {item.label}
                          </TransitionNavLink>
                        )
                      })}
                    </div>

                    <ConditionsDropdown mobile />

                    <div
                      className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-2"
                      ref={mobileProfileMenuRef}
                    >
                      {user ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setProfileMenuOpen((value) => !value)}
                            className={clsx(
                              'flex w-full items-center justify-between gap-3 rounded-[18px] px-3 py-3 text-left transition duration-300',
                              profileMenuOpen
                                ? 'bg-gold/10 text-gold'
                                : 'text-white hover:bg-white/[0.04] hover:text-gold',
                            )}
                            aria-haspopup="menu"
                            aria-expanded={profileMenuOpen}
                          >
                            <span className="flex min-w-0 items-center gap-3">
                              <ProfileAvatar avatarUrl={avatarUrl} displayName={displayName} />
                              <span className="min-w-0">
                                <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-white/[0.42]">
                                  {isAdmin ? 'Admin' : 'Profil'}
                                </span>
                                <span className="block truncate text-sm font-semibold">
                                  {displayName}
                                </span>
                              </span>
                            </span>
                            <ChevronDown
                              size={15}
                              className={clsx('shrink-0 transition duration-300', profileMenuOpen && 'rotate-180')}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {profileMenuOpen ? (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: useLiteMotion ? 0.12 : 0.18, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-1 px-1 pt-1">
                                  <TransitionLink
                                    to="/dashboard"
                                    onClick={() => {
                                      setProfileMenuOpen(false)
                                      setOpen(false)
                                    }}
                                    className="flex w-full items-center gap-3 rounded-[16px] px-3 py-3 text-sm font-medium text-white/[0.82] transition duration-300 hover:bg-gold/10 hover:text-gold"
                                  >
                                    <LayoutDashboard size={16} />
                                    Dashboard
                                  </TransitionLink>
                                  {isAdmin ? (
                                    <TransitionLink
                                      to="/admin"
                                      onClick={() => {
                                        setProfileMenuOpen(false)
                                        setOpen(false)
                                      }}
                                      className="flex w-full items-center gap-3 rounded-[16px] px-3 py-3 text-sm font-medium text-white/[0.82] transition duration-300 hover:bg-gold/10 hover:text-gold"
                                    >
                                      <ShieldCheck size={16} />
                                      Admin Dashboard
                                    </TransitionLink>
                                  ) : null}
                                  <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-[16px] px-3 py-3 text-left text-sm font-medium text-white/[0.82] transition duration-300 hover:bg-gold/10 hover:text-gold"
                                  >
                                    <LogOut size={16} />
                                    Log Out
                                  </button>
                                </div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </>
                      ) : (
                        <TransitionLink to="/login" className="button-secondary w-full">
                          Conecteaza-te
                        </TransitionLink>
                      )}
                    </div>
                  </div>
                </motion.nav>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
