import { ChevronDown, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import clsx from 'clsx'
import useAdaptiveMotion from '../hooks/useAdaptiveMotion'
import { navigation } from '../data/navigation'
import TransitionLink from './TransitionLink'
import TransitionNavLink from './TransitionNavLink'
import ConditionsDropdown from './legal/ConditionsDropdown'

const identityLinks = [
  { label: 'Despre Noi', path: '/about' },
  { label: 'Sponsori', path: '/sponsori' },
]

function WhoWeAreDropdown({ currentPath, location, mobile = false, onNavigate }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const buttonRef = useRef(null)
  const isActive = location.pathname === '/about' || location.pathname === '/sponsori'

  useEffect(() => {
    const closeOnOutsidePress = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePress)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  const closeMenu = () => {
    setOpen(false)
    onNavigate?.()
  }

  return (
    <div
      ref={containerRef}
      className={clsx('relative', mobile ? 'w-full' : 'group')}
      onMouseEnter={mobile ? undefined : () => setOpen(true)}
      onMouseLeave={mobile ? undefined : () => setOpen(false)}
      onFocusCapture={mobile ? undefined : () => setOpen(true)}
      onBlurCapture={mobile ? undefined : (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false)
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={clsx(
          mobile
            ? 'flex w-full items-center justify-between border-l-2 border-transparent px-4 py-3.5 text-left text-sm font-medium uppercase tracking-[0.18em] transition duration-200 hover:border-gold/50 hover:bg-white/[0.04] hover:text-white'
            : 'relative inline-flex h-12 items-center gap-1.5 px-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] transition duration-200 xl:px-4 xl:text-[0.72rem]',
          isActive || open
            ? mobile
              ? 'border-gold bg-gold/[0.08] text-gold'
              : 'bg-white/[0.05] text-white'
            : 'text-white/[0.56] hover:bg-white/[0.04] hover:text-white',
        )}
      >
        <span>Cine suntem?</span>
        <ChevronDown size={15} className={clsx('shrink-0 transition-transform duration-200', open && 'rotate-180')} />
        {!mobile ? (
          <span
            className={clsx(
              'absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-200',
              isActive || open ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100',
            )}
          />
        ) : null}
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: mobile ? -4 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: mobile ? -4 : -8 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            role="menu"
            aria-label="Cine suntem"
            className={clsx(
              'z-50 overflow-hidden border border-white/[0.16] bg-[#0a0a0a] shadow-[0_18px_42px_rgba(0,0,0,0.38)]',
              mobile
                ? 'mt-1.5 space-y-1 p-1.5'
                : 'absolute left-0 top-[calc(100%+0.5rem)] w-52 p-1.5',
            )}
          >
            {identityLinks.map((item) => {
              const itemIsActive = currentPath === item.path

              return (
                <TransitionNavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  role="menuitem"
                  className={clsx(
                    'block border-l-2 px-3 py-3 text-sm font-semibold uppercase tracking-[0.15em] transition duration-200',
                    itemIsActive
                      ? 'border-gold bg-gold/[0.08] text-gold'
                      : 'border-transparent text-white/[0.72] hover:border-gold hover:bg-white/[0.04] hover:text-white',
                  )}
                >
                  {item.label}
                </TransitionNavLink>
              )
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function DesktopNavigation({ currentPath, location }) {
  return (
    <nav className="flex items-center justify-center gap-0.5" aria-label="Navigatie principala">
      <WhoWeAreDropdown currentPath={currentPath} location={location} />
      {navigation.filter((item) => item.path !== '/about').map((item) => {
        const isActive =
          currentPath === item.path || (item.path === '/' && location.pathname === '/' && !location.hash)

        return (
          <TransitionNavLink
            key={item.path}
            to={item.path}
            className={() =>
              clsx(
                'group relative inline-flex h-12 items-center justify-center px-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] transition duration-200 xl:px-4 xl:text-[0.72rem]',
                isActive
                  ? 'bg-white/[0.05] text-white'
                  : 'text-white/[0.56] hover:bg-white/[0.04] hover:text-white',
              )
            }
          >
            <span className="relative">
              {item.label}
              <span
                className={clsx(
                  'absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-200',
                  isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100',
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
  const location = useLocation()
  const { useLiteMotion, useReducedEffects } = useAdaptiveMotion()
  const currentPath = `${location.pathname}${location.hash}`

  useEffect(() => {
    let animationFrame = 0

    const updateScrolledState = () => {
      animationFrame = 0
      const nextScrolledState = window.scrollY > 18

      setScrolled((currentScrolledState) =>
        currentScrolledState === nextScrolledState ? currentScrolledState : nextScrolledState,
      )
    }

    const onScroll = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateScrolledState)
      }
    }

    updateScrolledState()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!open) return undefined

    const scrollPosition = Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop)
    const previousStyles = {
      htmlOverflow: document.documentElement.style.overflow,
      htmlOverscrollBehavior: document.documentElement.style.overscrollBehavior,
      bodyOverflow: document.body.style.overflow,
      bodyOverscrollBehavior: document.body.style.overscrollBehavior,
    }

    const preventBackgroundScroll = (event) => {
      const target = event.target
      const isInsideMobileNavigation = target instanceof Element && target.closest('[data-mobile-navigation]')

      if (!isInsideMobileNavigation) {
        event.preventDefault()
      }
    }

    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.overscrollBehavior = 'none'
    document.body.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'none'
    document.addEventListener('touchmove', preventBackgroundScroll, { passive: false })
    document.addEventListener('wheel', preventBackgroundScroll, { passive: false })

    return () => {
      document.removeEventListener('touchmove', preventBackgroundScroll)
      document.removeEventListener('wheel', preventBackgroundScroll)

      window.scrollTo({ left: 0, top: scrollPosition, behavior: 'auto' })
      document.documentElement.scrollTop = scrollPosition
      document.body.scrollTop = scrollPosition
      document.documentElement.style.overflow = previousStyles.htmlOverflow
      document.documentElement.style.overscrollBehavior = previousStyles.htmlOverscrollBehavior
      document.body.style.overflow = previousStyles.bodyOverflow
      document.body.style.overscrollBehavior = previousStyles.bodyOverscrollBehavior
      window.scrollTo({ left: 0, top: scrollPosition, behavior: 'auto' })
    }
  }, [open])

  const shellClass = clsx(
    'relative overflow-visible border px-3 py-2 transition duration-300 sm:px-4 lg:px-5',
    scrolled
      ? useReducedEffects
        ? 'border-white/[0.16] bg-[#090909] shadow-[0_14px_34px_rgba(0,0,0,0.3)]'
        : 'border-white/[0.16] bg-[#090909]/95 shadow-[0_14px_34px_rgba(0,0,0,0.3)] backdrop-blur-md'
      : useReducedEffects
        ? 'border-white/[0.14] bg-[#0a0a0a] shadow-[0_10px_24px_rgba(0,0,0,0.24)]'
        : 'border-white/[0.14] bg-[#0a0a0a]/92 shadow-[0_10px_24px_rgba(0,0,0,0.24)] backdrop-blur-md',
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-shell pt-[max(0.625rem,env(safe-area-inset-top))] sm:pt-4">
        <div className={shellClass}>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/75 to-transparent" />

          <div className="relative flex min-h-[3.25rem] items-center justify-between gap-3 lg:gap-5">
            <TransitionLink
              to="/"
              className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap border-l-2 border-gold px-3 py-1 font-display text-[0.7rem] uppercase tracking-[0.17em] text-white transition duration-200 hover:text-gold sm:text-[0.88rem] sm:tracking-[0.24em]"
            >
              NorthSideCrew
            </TransitionLink>

            <div className="hidden flex-1 justify-end lg:flex">
              <DesktopNavigation currentPath={currentPath} location={location} />
            </div>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-white/[0.18] bg-white/[0.03] text-white transition duration-200 hover:border-gold hover:bg-gold hover:text-black lg:hidden"
              aria-label="Deschide meniul"
              aria-expanded={open}
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>

          <AnimatePresence>
            {open ? (
              <motion.nav
                initial={useReducedEffects ? { opacity: 0 } : { opacity: 0, height: 0, y: -8 }}
                animate={useReducedEffects ? { opacity: 1 } : { opacity: 1, height: 'auto', y: 0 }}
                exit={useReducedEffects ? { opacity: 0 } : { opacity: 0, height: 0, y: -8 }}
                transition={{ duration: useLiteMotion ? 0.14 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden lg:hidden"
              >
                <div data-mobile-navigation className="mt-4 max-h-[calc(100dvh_-_6.5rem_-_env(safe-area-inset-top))] touch-pan-y space-y-3 overflow-y-auto overscroll-contain border-t border-white/10 pt-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                  <div className="border border-white/[0.12] bg-[#0b0b0b] p-1.5">
                    <WhoWeAreDropdown
                      currentPath={currentPath}
                      location={location}
                      mobile
                      onNavigate={() => setOpen(false)}
                    />
                    {navigation.filter((item) => item.path !== '/about').map((item) => {
                      const isActive =
                        currentPath === item.path ||
                        (item.path === '/' && location.pathname === '/' && !location.hash)

                      return (
                        <TransitionNavLink
                          key={item.path}
                          to={item.path}
                          className={() =>
                            clsx(
                              'block border-l-2 px-4 py-3.5 text-sm font-medium uppercase tracking-[0.18em] transition duration-200',
                              isActive
                                ? 'border-gold bg-gold/[0.08] text-gold'
                                : 'border-transparent text-white/[0.72] hover:border-gold/50 hover:bg-white/[0.04] hover:text-white',
                            )
                          }
                        >
                          {item.label}
                        </TransitionNavLink>
                      )
                    })}
                  </div>

                  <ConditionsDropdown mobile />
                </div>
              </motion.nav>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
