import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import useAdaptiveMotion from '../hooks/useAdaptiveMotion'

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
  const { isIOS, useLiteMotion, useReducedEffects } = useAdaptiveMotion()
  const shouldUseLightEffects = isIOS || useLiteMotion || useReducedEffects

  const overlayClassName = useMemo(
    () =>
      [
        'fixed inset-0 z-[150] flex min-h-[100dvh] items-center justify-center overflow-hidden bg-black/78 px-3 sm:px-6',
        shouldUseLightEffects ? 'backdrop-blur-[2px]' : 'backdrop-blur-md',
      ].join(' '),
    [shouldUseLightEffects],
  )

  const overlayMotion = useMemo(
    () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: {
        duration: shouldUseLightEffects ? 0.18 : 0.28,
        ease: easing,
      },
    }),
    [shouldUseLightEffects],
  )

  const popupMotion = useMemo(
    () => ({
      initial: shouldUseLightEffects
        ? { opacity: 0, scale: 0.98 }
        : { opacity: 0, scale: 0.94, y: 18 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: shouldUseLightEffects
        ? { opacity: 0, scale: 0.985 }
        : { opacity: 0, scale: 0.96, y: 12 },
      transition: {
        duration: shouldUseLightEffects ? 0.22 : 0.34,
        ease: easing,
      },
    }),
    [shouldUseLightEffects],
  )

  const closePopup = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const preloadImage = new Image()
    preloadImage.decoding = 'async'
    preloadImage.src = imageSrc

    return undefined
  }, [imageSrc])

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

  useLayoutEffect(() => {
    if (!isOpen || typeof window === 'undefined') {
      return undefined
    }

    const scrollY = Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop)
    const previousStyles = {
      bodyOverflow: document.body.style.overflow,
      bodyOverscrollBehavior: document.body.style.overscrollBehavior,
      bodyTouchAction: document.body.style.touchAction,
      htmlOverflow: document.documentElement.style.overflow,
      htmlOverscrollBehavior: document.documentElement.style.overscrollBehavior,
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closePopup()
      }
    }
    const preventPageScroll = (event: Event) => event.preventDefault()

    document.body.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'none'
    document.body.style.touchAction = 'none'
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.overscrollBehavior = 'none'
    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('wheel', preventPageScroll, { passive: false })
    document.addEventListener('touchmove', preventPageScroll, { passive: false })

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('wheel', preventPageScroll)
      document.removeEventListener('touchmove', preventPageScroll)
      window.scrollTo({ left: 0, top: scrollY, behavior: 'auto' })
      document.documentElement.scrollTop = scrollY
      document.body.scrollTop = scrollY
      document.body.style.overflow = previousStyles.bodyOverflow
      document.body.style.overscrollBehavior = previousStyles.bodyOverscrollBehavior
      document.body.style.touchAction = previousStyles.bodyTouchAction
      document.documentElement.style.overflow = previousStyles.htmlOverflow
      document.documentElement.style.overscrollBehavior = previousStyles.htmlOverscrollBehavior
      window.scrollTo({ left: 0, top: scrollY, behavior: 'auto' })
    }
  }, [closePopup, isOpen])

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          aria-modal="true"
          className={overlayClassName}
          style={{
            paddingTop: 'max(1.25rem, env(safe-area-inset-top))',
            paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))',
          }}
          {...overlayMotion}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) {
              closePopup()
            }
          }}
        >
          <motion.div
            role="dialog"
            aria-label={imageAlt}
            className="relative w-full max-w-[min(92vw,64rem)] transform-gpu overflow-hidden rounded-[20px] border border-white/12 bg-black shadow-[0_24px_70px_rgba(0,0,0,0.72),0_0_0_1px_rgba(245,196,0,0.12)] will-change-transform sm:rounded-[30px] sm:shadow-[0_34px_110px_rgba(0,0,0,0.78),0_0_0_1px_rgba(245,196,0,0.12)]"
            {...popupMotion}
            onPointerDown={(event) => event.stopPropagation()}
          >
            {!shouldUseLightEffects ? (
              <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),transparent_22%,transparent_78%,rgba(245,196,0,0.05))]" />
            ) : null}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

            <motion.button
              type="button"
              aria-label="Inchide popup"
              onClick={closePopup}
              className="absolute right-2.5 top-2.5 z-20 inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.36)] transition-colors hover:border-gold/55 hover:bg-gold/12 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 sm:right-4 sm:top-4 sm:h-11 sm:w-11 sm:backdrop-blur-xl"
              whileHover={shouldUseLightEffects ? undefined : { scale: 1.06, rotate: 4 }}
              whileTap={{ scale: 0.94 }}
              transition={{ duration: 0.2, ease: easing }}
            >
              <X size={18} strokeWidth={1.8} />
            </motion.button>

            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-auto w-full select-none object-contain"
              style={{
                maxHeight: 'calc(100dvh - 2.5rem - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
              }}
              decoding="async"
              draggable="false"
              fetchPriority="high"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
