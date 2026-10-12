import { X } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function ImageLightbox({ src, alt, onClose }) {
  const closeButtonRef = useRef(null)

  useLayoutEffect(() => {
    if (!src) {
      return undefined
    }

    const scrollPosition = Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop)
    const previousStyles = {
      documentOverflow: document.documentElement.style.overflow,
      documentOverscrollBehavior: document.documentElement.style.overscrollBehavior,
      bodyOverflow: document.body.style.overflow,
      bodyOverscrollBehavior: document.body.style.overscrollBehavior,
      bodyTouchAction: document.body.style.touchAction,
    }

    const scrollKeys = new Set([' ', 'Spacebar', 'PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown'])

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      const isButtonActivation = event.target?.tagName === 'BUTTON' && [' ', 'Spacebar', 'Enter'].includes(event.key)
      if (scrollKeys.has(event.key) && !isButtonActivation) {
        event.preventDefault()
      }
    }

    const preventPageScroll = (event) => event.preventDefault()

    // Keep the document in its current layout position. Fixing `body` and restoring it
    // on close causes a visible jump in Safari before the saved scroll offset is reapplied.
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.overscrollBehavior = 'none'
    document.body.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'none'
    document.body.style.touchAction = 'none'
    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('wheel', preventPageScroll, { passive: false })
    document.addEventListener('touchmove', preventPageScroll, { passive: false })

    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus())

    return () => {
      window.cancelAnimationFrame(focusFrame)
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('wheel', preventPageScroll)
      document.removeEventListener('touchmove', preventPageScroll)

      // The listeners above keep this offset unchanged. Setting it before and after
      // the lock is released also covers mobile browsers that alter scroll state.
      window.scrollTo({ left: 0, top: scrollPosition, behavior: 'auto' })
      document.documentElement.scrollTop = scrollPosition
      document.body.scrollTop = scrollPosition

      document.documentElement.style.overflow = previousStyles.documentOverflow
      document.documentElement.style.overscrollBehavior = previousStyles.documentOverscrollBehavior
      document.body.style.overflow = previousStyles.bodyOverflow
      document.body.style.overscrollBehavior = previousStyles.bodyOverscrollBehavior
      document.body.style.touchAction = previousStyles.bodyTouchAction

      window.scrollTo({ left: 0, top: scrollPosition, behavior: 'auto' })
      document.documentElement.scrollTop = scrollPosition
      document.body.scrollTop = scrollPosition
    }
  }, [onClose, src])

  if (!src) {
    return null
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex touch-none items-center justify-center overscroll-contain bg-black/85 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6 sm:pb-6 sm:pt-6"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Imagine mărită: ${alt}`}
        className="relative flex max-h-[calc(100dvh-1.5rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))] w-full max-w-7xl items-center justify-center overflow-hidden rounded-[16px] border border-white/20 bg-[#090909] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.62)] sm:max-h-[calc(100dvh-3rem)] sm:rounded-[22px] sm:p-3"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="block max-h-[calc(100dvh-2rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))] w-full select-none object-contain sm:max-h-[calc(100dvh-4.5rem)]"
          decoding="async"
          draggable="false"
        />
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/75 text-white shadow-lg transition-colors hover:border-gold hover:bg-gold hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:right-4 sm:top-4"
          aria-label="Închide imaginea"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
    </div>,
    document.body,
  )
}
