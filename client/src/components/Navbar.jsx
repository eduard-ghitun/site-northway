import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import clsx from 'clsx'
import TransitionLink from './TransitionLink'
import TransitionNavLink from './TransitionNavLink'
import { navigation } from '../data/navigation'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const currentPath = `${location.pathname}${location.hash}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
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

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-shell pt-3 sm:pt-4">
        <div
          className={clsx(
            'rounded-[26px] border px-3 py-3 transition duration-300 sm:rounded-full sm:px-6',
            scrolled
              ? 'border-white/[0.12] bg-black/[0.65] shadow-panel backdrop-blur-xl'
              : 'border-white/10 bg-black/30 backdrop-blur-md',
          )}
        >
          <div className="flex items-center justify-between gap-4 sm:gap-6">
            <TransitionLink
              to="/"
              className="max-w-[11rem] font-display text-sm uppercase tracking-[0.18em] text-white sm:max-w-none sm:text-lg sm:tracking-[0.24em]"
            >
              NorthSideCrew
            </TransitionLink>

            <nav className="hidden items-center gap-7 lg:flex">
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

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex min-h-[3rem] min-w-[3rem] items-center justify-center rounded-full border border-white/[0.12] bg-white/5 p-3 text-white transition hover:border-gold/[0.45] hover:text-gold lg:hidden"
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
                <div className="mt-4 max-h-[calc(100svh-7rem)] space-y-3 overflow-y-auto border-t border-white/10 pt-4 pb-1">
                  {navigation.map((item) => (
                    <TransitionNavLink
                      key={item.path}
                      to={item.path}
                      className={() =>
                        clsx(
                          'block rounded-2xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] transition sm:tracking-[0.24em]',
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
                </div>
              </motion.nav>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
