import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import useAdaptiveMotion from '../hooks/useAdaptiveMotion'

const RouteTransitionContext = createContext(null)

const NAVIGATION_DELAY_MS = 220
const TRANSITION_TOTAL_MS = 520

function isHashOnlyNavigation(currentLocation, to) {
  if (typeof to !== 'string') return false

  if (to.startsWith('#')) {
    return true
  }

  if (!to.includes('#')) {
    return false
  }

  const [pathWithoutHash] = to.split('#')
  const normalizedPath = pathWithoutHash || currentLocation.pathname

  return normalizedPath === currentLocation.pathname
}

export function RouteTransitionProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { useLiteMotion } = useAdaptiveMotion()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timersRef = useRef([])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer))
    timersRef.current = []
  }, [])

  useEffect(() => clearTimers, [clearTimers])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    if (isTransitioning) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = previousOverflow
    }

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isTransitioning])

  const startTransition = useCallback(
    (to, options = {}) => {
      if (typeof to === 'number') {
        navigate(to)
        return
      }

      const currentPath = `${location.pathname}${location.search}${location.hash}`

      if (to === currentPath) {
        return
      }

      if (isHashOnlyNavigation(location, to)) {
        navigate(to, options)
        return
      }

      if (isTransitioning) {
        return
      }

      setIsTransitioning(true)
      clearTimers()

      const navigationDelayMs = useLiteMotion ? 0 : NAVIGATION_DELAY_MS
      const transitionTotalMs = useLiteMotion ? 180 : TRANSITION_TOTAL_MS

      timersRef.current.push(
        window.setTimeout(() => {
          navigate(to, options)
        }, navigationDelayMs),
      )

      timersRef.current.push(
        window.setTimeout(() => {
          setIsTransitioning(false)
          clearTimers()
        }, transitionTotalMs),
      )
    },
    [clearTimers, isTransitioning, location, navigate, useLiteMotion],
  )

  const value = useMemo(
    () => ({
      isTransitioning,
      startTransition,
    }),
    [isTransitioning, startTransition],
  )

  return (
    <RouteTransitionContext.Provider value={value}>
      <motion.div
        animate={{
          opacity: isTransitioning ? (useLiteMotion ? 0.98 : 0.88) : 1,
          scale: isTransitioning ? (useLiteMotion ? 1 : 0.998) : 1,
          filter: isTransitioning && !useLiteMotion ? 'blur(0.5px)' : 'blur(0px)',
        }}
        transition={{ duration: useLiteMotion ? 0.08 : 0.14, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
      <PageTransition active={isTransitioning} />
    </RouteTransitionContext.Provider>
  )
}

export function useRouteTransition() {
  const context = useContext(RouteTransitionContext)

  if (!context) {
    throw new Error('useRouteTransition must be used within RouteTransitionProvider')
  }

  return context
}
