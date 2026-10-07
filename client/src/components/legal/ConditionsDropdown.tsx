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
        'group flex items-start gap-3 border-l-2 border-transparent px-3 py-2.5 text-left transition duration-200',
        mobile
          ? 'bg-white/[0.03] hover:border-gold hover:bg-gold/[0.08]'
          : 'hover:border-gold hover:bg-white/[0.04]',
      )}
    >
      <span className="mt-0.5 border border-gold/35 bg-gold/[0.08] p-2 text-gold transition group-hover:bg-gold group-hover:text-black">
        <Icon size={16} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold uppercase tracking-[0.16em] text-white group-hover:text-gold">
          {item.label}
        </span>
        {mobile ? <span className="mt-1 block text-sm leading-6 text-white/[0.58] group-hover:text-white/[0.74]">{item.description}</span> : null}
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
      ? 'group relative inline-flex h-12 items-center gap-2 px-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] transition duration-200 xl:px-4 xl:text-[0.72rem]'
      : 'inline-flex h-10 items-center gap-2 border px-4 text-sm font-medium uppercase tracking-[0.18em] transition-[transform,background-color,border-color,box-shadow] duration-200',
    integrated
      ? isLegalPage || open
        ? 'text-white'
        : 'text-white/[0.56] hover:bg-white/[0.04] hover:text-white'
      : scrolled
        ? 'border-white/[0.18] bg-white/[0.04] text-white hover:border-gold hover:bg-gold hover:text-black'
        : 'border-white/[0.16] bg-white/[0.03] text-white hover:border-gold hover:bg-gold hover:text-black',
    !integrated && open && 'border-gold bg-gold text-black shadow-none',
  )

  const mobileButtonClass = clsx(
    'flex w-full items-center justify-between border border-white/[0.14] bg-white/[0.03] px-4 py-3.5 text-left text-sm font-medium uppercase tracking-[0.16em] text-white transition duration-200 active:translate-y-px hover:border-gold hover:bg-gold hover:text-black',
    open && 'border-gold bg-gold text-black',
  )

  return (
    <div className={clsx('relative', className)} ref={containerRef}>
      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
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
              'absolute bottom-0 left-0 h-[2px] bg-gold transition-all duration-200',
              isLegalPage || open
                ? 'w-full opacity-100'
                : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100',
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
              'z-40 overflow-hidden border border-white/[0.16] bg-[#0a0a0a] shadow-[0_18px_42px_rgba(0,0,0,0.38)]',
              mobile
                ? 'mt-3 p-2'
                : integrated
                  ? 'absolute left-1/2 top-[calc(100%+0.6rem)] w-[20rem] -translate-x-1/2 p-1.5'
                  : 'absolute right-0 top-[calc(100%+0.65rem)] w-[20rem] p-1.5',
            )}
            role="menu"
            aria-label="Conditii legale"
          >
            <div className="border-b border-white/[0.1] px-3 py-3">
              <div className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">
                Documente Legale
              </div>
              <p className="mt-1 text-xs leading-5 text-white/[0.5]">Politici pentru platformă, cont și ticketing.</p>
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
