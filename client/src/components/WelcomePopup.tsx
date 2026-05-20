import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

type WelcomePopupProps = {
  imageSrc: string
  imageAlt?: string
  openDelay?: number
  storageKey?: string
}

const defaultStorageKey = 'northsidecrew:welcome-popup-seen'
const easing = [0.22, 1, 0.36, 1] as const

export default function WelcomePopup({
  imageSrc,
  imageAlt = 'Mesaj despre bilete si dashboard',
  openDelay = 3000,
  storageKey = defaultStorageKey,
}: WelcomePopupProps) {
  const [isOpen, setIsOpen] = useState(false)

  const closePopup = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    if (window.sessionStorage.getItem(storageKey)) {
      return undefined
    }

    const openTimer = window.setTimeout(() => {
      window.sessionStorage.setItem(storageKey, 'true')
      setIsOpen(true)
    }, openDelay)

    return () => window.clearTimeout(openTimer)
  }, [openDelay, storageKey])

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') {
      return undefined
    }

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopup()
      }
    }

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closePopup, isOpen])

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          aria-modal="true"
          className="fixed inset-0 z-[150] flex min-h-[100svh] items-center justify-center overflow-hidden bg-black/75 px-3 py-5 backdrop-blur-md sm:px-6 sm:py-8"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(14px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.28, ease: easing }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closePopup()
            }
          }}
        >
          <motion.div
            role="dialog"
            aria-label={imageAlt}
            className="relative w-full max-w-[min(92vw,64rem)] overflow-hidden rounded-[22px] border border-white/12 bg-black shadow-[0_34px_110px_rgba(0,0,0,0.78),0_0_0_1px_rgba(245,196,0,0.12)] sm:rounded-[30px]"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.34, ease: easing }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),transparent_22%,transparent_78%,rgba(245,196,0,0.05))]" />
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

            <motion.button
              type="button"
              aria-label="Inchide popup"
              onClick={closePopup}
              className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white/85 shadow-[0_10px_30px_rgba(0,0,0,0.36)] backdrop-blur-xl transition-colors hover:border-gold/55 hover:bg-gold/12 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 sm:right-4 sm:top-4 sm:h-11 sm:w-11"
              whileHover={{ scale: 1.06, rotate: 4 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.2, ease: easing }}
            >
              <X size={18} strokeWidth={1.8} />
            </motion.button>

            <img
              src={imageSrc}
              alt={imageAlt}
              className="max-h-[calc(100svh-2.5rem)] w-full object-contain sm:max-h-[calc(100svh-4rem)]"
              draggable="false"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
