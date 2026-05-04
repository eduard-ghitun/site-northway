import { ChevronDown, LogOut, Menu, LayoutDashboard, ShieldCheck, UserCircle2, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { useAuth } from '../providers/AuthProvider'
import TransitionLink from './TransitionLink'
import TransitionNavLink from './TransitionNavLink'
import { navigation } from '../data/navigation'

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
        className="h-9 w-9 rounded-full border border-gold/35 object-cover"
        referrerPolicy="no-referrer"
      />
    )
  }

  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
      <UserCircle2 size={18} />
    </span>
  )
}

function ProfileDropdown({ isAdmin, onNavigateDashboard, onNavigateAdmin, onLogout }) {
  return (
    <div className="absolute right-0 top-[calc(100%+0.75rem)] w-[15.5rem] overflow-hidden rounded-[24px] border border-white/10 bg-black/[0.92] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.48)] backdrop-blur-xl">
      <TransitionLink
        to="/dashboard"
        onClick={onNavigateDashboard}
        className="flex w-full items-center gap-3 rounded-[18px] px-4 py-3 text-left text-sm font-semibold text-white/[0.82] transition hover:bg-gold/10 hover:text-gold"
      >
        <LayoutDashboard size={17} />
        Dashboard
      </TransitionLink>
      {isAdmin ? (
        <TransitionLink
          to="/admin"
          onClick={onNavigateAdmin}
          className="mt-1 flex w-full items-center gap-3 rounded-[18px] px-4 py-3 text-left text-sm font-semibold text-white/[0.82] transition hover:bg-gold/10 hover:text-gold"
        >
          <ShieldCheck size={17} />
          Admin Dashboard
        </TransitionLink>
      ) : null}
      <button
        type="button"
        onClick={onLogout}
        className="mt-1 flex w-full items-center gap-3 rounded-[18px] px-4 py-3 text-left text-sm font-semibold text-white/[0.82] transition hover:bg-gold/10 hover:text-gold"
      >
        <LogOut size={17} />
        Log Out
      </button>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const location = useLocation()
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
    window.addEventListener('scroll', onScroll)

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

  const authButtonClass =
    'inline-flex min-h-[46px] items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-2 text-sm font-semibold text-white transition hover:border-gold/[0.45] hover:bg-gold/10 hover:text-gold'

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-shell pt-2.5 sm:pt-4">
        <div
          className="flex items-start gap-3 sm:gap-4"
        >
          <div
            className={clsx(
              'min-w-0 flex-1 rounded-[22px] border px-3 py-2.5 transition duration-300 sm:rounded-full sm:px-6 sm:py-3',
              scrolled
                ? 'border-white/[0.12] bg-black/[0.65] shadow-panel backdrop-blur-xl'
                : 'border-white/10 bg-black/30 backdrop-blur-md',
            )}
          >
            <div className="flex items-center justify-between gap-3 sm:gap-6">
              <TransitionLink
                to="/"
                className="max-w-[10.5rem] font-display text-[0.82rem] uppercase tracking-[0.16em] text-white sm:max-w-none sm:text-lg sm:tracking-[0.24em]"
              >
                NorthSideCrew
              </TransitionLink>

              <div className="hidden min-w-0 flex-1 items-center justify-end gap-4 lg:flex">
                <nav className="flex min-w-0 items-center gap-7">
                  {navigation.map((item) => (
                    <TransitionNavLink
                      key={item.path}
                      to={item.path}
                      className={() =>
                        clsx(
                          'relative text-sm font-semibold uppercase tracking-[0.24em] transition',
                          currentPath === item.path ||
                            (item.path === '/' && location.pathname === '/' && !location.hash)
                            ? 'text-gold'
                            : 'text-white/[0.72] hover:text-gold',
                        )
                      }
                    >
                      {() => (
                        <span className="relative">
                          {item.label}
                          {currentPath === item.path ||
                          (item.path === '/' && location.pathname === '/' && !location.hash) ? (
                            <span className="absolute -bottom-2 left-0 h-px w-full bg-gold" />
                          ) : null}
                        </span>
                      )}
                    </TransitionNavLink>
                  ))}
                </nav>
              </div>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border border-white/[0.12] bg-white/5 p-3 text-white transition active:scale-[0.98] hover:border-gold/[0.45] hover:text-gold lg:hidden"
                aria-label="Toggle menu"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            <AnimatePresence>
              {open ? (
                <motion.nav
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden lg:hidden"
                >
                  <div className="mt-4 max-h-[calc(100svh-6.5rem)] space-y-2.5 overflow-y-auto border-t border-white/10 pt-4 pb-1">
                    {navigation.map((item) => (
                      <TransitionNavLink
                        key={item.path}
                        to={item.path}
                        className={() =>
                          clsx(
                            'block min-h-12 rounded-2xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] transition active:scale-[0.98] sm:tracking-[0.24em]',
                            currentPath === item.path ||
                              (item.path === '/' && location.pathname === '/' && !location.hash)
                              ? 'bg-gold/[0.12] text-gold'
                              : 'bg-white/[0.03] text-white/[0.72] hover:bg-gold/10 hover:text-gold',
                          )
                        }
                      >
                        {item.label}
                      </TransitionNavLink>
                    ))}

                    <div
                      className="rounded-[24px] border border-white/10 bg-white/[0.03] p-2"
                      ref={mobileProfileMenuRef}
                    >
                      {user ? (
                        <>
                          <button
                            type="button"
                            onClick={() => setProfileMenuOpen((value) => !value)}
                            className={clsx(
                              'flex w-full items-center justify-between gap-3 rounded-[18px] px-3 py-3 text-left transition',
                              profileMenuOpen
                                ? 'bg-gold/10 text-gold'
                                : 'text-white hover:bg-gold/10 hover:text-gold',
                            )}
                            aria-haspopup="menu"
                            aria-expanded={profileMenuOpen}
                          >
                            <span className="flex min-w-0 items-center gap-3">
                              <ProfileAvatar avatarUrl={avatarUrl} displayName={displayName} />
                              <span className="min-w-0">
                                <span className="block text-[0.68rem] uppercase tracking-[0.22em] text-white/[0.45]">
                                  Profil
                                </span>
                                <span className="block truncate text-sm font-semibold">
                                  {displayName}
                                </span>
                              </span>
                            </span>
                            <ChevronDown
                              size={16}
                              className={clsx('shrink-0 transition', profileMenuOpen && 'rotate-180')}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {profileMenuOpen ? (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-1 px-1 pt-1">
                                  <TransitionLink
                                    to="/dashboard"
                                    onClick={() => {
                                      setProfileMenuOpen(false)
                                      setOpen(false)
                                    }}
                                    className="flex w-full items-center gap-3 rounded-[18px] px-3 py-3 text-sm font-semibold text-white/[0.82] transition hover:bg-gold/10 hover:text-gold"
                                  >
                                    <LayoutDashboard size={17} />
                                    Dashboard
                                  </TransitionLink>
                                  {isAdmin ? (
                                    <TransitionLink
                                      to="/admin"
                                      onClick={() => {
                                        setProfileMenuOpen(false)
                                        setOpen(false)
                                      }}
                                      className="flex w-full items-center gap-3 rounded-[18px] px-3 py-3 text-sm font-semibold text-white/[0.82] transition hover:bg-gold/10 hover:text-gold"
                                    >
                                      <ShieldCheck size={17} />
                                      Admin Dashboard
                                    </TransitionLink>
                                  ) : null}
                                  <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-[18px] px-3 py-3 text-left text-sm font-semibold text-white/[0.82] transition hover:bg-gold/10 hover:text-gold"
                                  >
                                    <LogOut size={17} />
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

          <div className="relative hidden shrink-0 lg:block" ref={desktopProfileMenuRef}>
            {user ? (
              <>
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen((value) => !value)}
                  className={clsx(
                    authButtonClass,
                    scrolled
                      ? 'border-white/[0.12] bg-black/[0.65] shadow-panel backdrop-blur-xl'
                      : 'border-white/10 bg-black/30 backdrop-blur-md',
                    profileMenuOpen && 'border-gold/[0.45] bg-gold/10 text-gold',
                  )}
                  aria-haspopup="menu"
                  aria-expanded={profileMenuOpen}
                >
                  <ProfileAvatar avatarUrl={avatarUrl} displayName={displayName} />
                  <span className="max-w-[10rem] truncate">{displayName}</span>
                  <ChevronDown
                    size={16}
                    className={clsx('transition', profileMenuOpen && 'rotate-180')}
                  />
                </button>

                <AnimatePresence>
                  {profileMenuOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
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
                  authButtonClass,
                  scrolled
                    ? 'border-white/[0.12] bg-black/[0.65] shadow-panel backdrop-blur-xl'
                    : 'border-white/10 bg-black/30 backdrop-blur-md',
                )}
              >
                Conecteaza-te
              </TransitionLink>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
