import { ChevronDown, Cookie, FileBadge2, ShieldCheck } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import clsx from 'clsx'
import { legalLinks } from '../../data/legalLinks'
import useAdaptiveMotion from '../../hooks/useAdaptiveMotion'
import TransitionLink from '../TransitionLink'

const iconMap = {
  terms: FileBadge2,
  privacy: ShieldCheck,
  cookies: Cookie,
}

function DropdownItem({ item, onNavigate, mobile = false }) {
  const Icon = iconMap[item.id] || FileBadge2

  return (
    <TransitionLink
      to={item.path}
      onClick={onNavigate}
      className={clsx(
        'group flex items-start gap-3 rounded-[18px] border border-transparent px-4 py-3 text-left transition duration-300',
        mobile
          ? 'bg-white/[0.03] hover:border-gold/20 hover:bg-gold/10'
          : 'hover:border-gold/20 hover:bg-gold/10',
      )}
    >
      <span className="mt-0.5 rounded-2xl border border-gold/25 bg-gold/10 p-2.5 text-gold transition group-hover:shadow-[0_0_20px_rgba(245,196,0,0.16)]">
        <Icon size={16} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold uppercase tracking-[0.16em] text-white group-hover:text-gold">
          {item.label}
        </span>
        <span className="mt-1 block text-sm leading-6 text-white/[0.58] group-hover:text-white/[0.74]">
          {item.description}
        </span>
      </span>
    </TransitionLink>
  )
}

export default function ConditionsDropdown({
  mobile = false,
  scrolled = false,
  integrated = false,
  className = '',
}) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const { useLiteMotion } = useAdaptiveMotion()
  const location = useLocation()

  useEffect(() => {
    function handlePointerDown(event) {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [])

  const isLegalPage = legalLinks.some((item) => item.path === location.pathname)

  const desktopButtonClass = clsx(
    integrated
      ? 'group relative inline-flex h-11 items-center gap-2 rounded-full px-4 text-[0.76rem] font-medium uppercase tracking-[0.24em] transition duration-300'
      : 'inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium uppercase tracking-[0.18em] transition-[transform,background-color,border-color,box-shadow] duration-300 hover:-translate-y-0.5',
    integrated
      ? isLegalPage || open
        ? 'text-white'
        : 'text-white/[0.58] hover:bg-white/[0.03] hover:text-white'
      : scrolled
        ? 'border-white/[0.12] bg-white/[0.04] text-white hover:border-gold/30 hover:bg-gold/10 hover:text-gold'
        : 'border-white/10 bg-white/[0.03] text-white hover:border-gold/30 hover:bg-gold/10 hover:text-gold',
    !integrated && open && 'border-gold/30 bg-gold/10 text-gold shadow-[0_0_30px_rgba(245,196,0,0.12)]',
  )

  const mobileButtonClass = clsx(
    'flex w-full items-center justify-between rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-3.5 text-left text-sm font-medium uppercase tracking-[0.16em] text-white transition duration-300 active:scale-[0.98] hover:border-gold/25 hover:bg-gold/10 hover:text-gold',
    open && 'border-gold/30 bg-gold/10 text-gold',
  )

  return (
    <div className={clsx('relative', className)} ref={containerRef}>
      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        animate={
          mobile || !integrated || useLiteMotion
            ? undefined
            : {
                y: [0, -1.5, 0],
                boxShadow: [
                  '0 0 0 1px rgba(245,196,0,0.08), 0 0 18px rgba(245,196,0,0.04)',
                  '0 0 0 1px rgba(245,196,0,0.14), 0 0 24px rgba(245,196,0,0.08)',
                  '0 0 0 1px rgba(245,196,0,0.08), 0 0 18px rgba(245,196,0,0.04)',
                ],
              }
        }
        transition={
          mobile || !integrated || useLiteMotion
            ? undefined
            : {
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
        className={mobile ? mobileButtonClass : desktopButtonClass}
      >
        <span className="flex items-center gap-2">
          <span
            className={clsx(
              'inline-flex h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_12px_rgba(245,196,0,0.38)] transition-opacity duration-300',
              integrated
                ? isLegalPage || open
                  ? 'opacity-100'
                  : 'opacity-75 group-hover:opacity-100'
                : 'opacity-100',
            )}
          />
          Conditii
        </span>
        <ChevronDown size={15} className={clsx('shrink-0 transition duration-300', open && 'rotate-180')} />
        {integrated ? (
          <span
            className={clsx(
              'absolute -bottom-1 left-1/2 h-px -translate-x-1/2 bg-gold transition-all duration-300',
              isLegalPage || open
                ? 'w-[calc(100%-0.15rem)] opacity-100'
                : 'w-0 opacity-0 group-hover:w-[calc(100%-0.15rem)] group-hover:opacity-100',
            )}
          />
        ) : null}
      </motion.button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={useLiteMotion ? { opacity: 0 } : { opacity: 0, y: mobile ? -4 : -8, scale: 0.98 }}
            animate={useLiteMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={useLiteMotion ? { opacity: 0 } : { opacity: 0, y: mobile ? -4 : -8, scale: 0.98 }}
            transition={{ duration: useLiteMotion ? 0.14 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={clsx(
              'z-40 overflow-hidden rounded-[24px] border border-white/10 bg-black/[0.88] shadow-[0_26px_80px_rgba(0,0,0,0.42)] backdrop-blur-2xl',
              mobile
                ? 'mt-3 p-2'
                : integrated
                  ? 'absolute left-1/2 top-[calc(100%+0.8rem)] w-[24rem] -translate-x-1/2 p-2'
                  : 'absolute right-0 top-[calc(100%+0.85rem)] w-[24rem] p-2',
            )}
            role="menu"
            aria-label="Conditii legale"
          >
            <div className="rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-4">
              <div className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">
                Documente Legale
              </div>
              <p className="mt-2 text-sm leading-6 text-white/[0.62]">
                Acces rapid la politicile esentiale pentru platforma, cont si ticketing online.
              </p>
            </div>

            <div className="mt-2 space-y-1">
              {legalLinks.map((item) => (
                <DropdownItem
                  key={item.path}
                  item={item}
                  mobile={mobile}
                  onNavigate={() => setOpen(false)}
                />
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
