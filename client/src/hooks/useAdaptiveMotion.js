import { useEffect, useState } from 'react'

function getAdaptiveMotionState() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return {
      canHover: true,
      isMobileViewport: false,
      prefersReducedMotion: false,
      useLiteMotion: false,
    }
  }

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const isMobileViewport = window.matchMedia('(max-width: 767px)').matches
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return {
    canHover,
    isMobileViewport,
    prefersReducedMotion,
    useLiteMotion: prefersReducedMotion || isMobileViewport || !canHover,
  }
}

export default function useAdaptiveMotion() {
  const [state, setState] = useState(getAdaptiveMotionState)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined
    }

    const mediaQueries = [
      window.matchMedia('(hover: hover) and (pointer: fine)'),
      window.matchMedia('(max-width: 767px)'),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
    ]

    const updateState = () => {
      setState(getAdaptiveMotionState())
    }

    mediaQueries.forEach((query) => {
      query.addEventListener('change', updateState)
    })

    updateState()

    return () => {
      mediaQueries.forEach((query) => {
        query.removeEventListener('change', updateState)
      })
    }
  }, [])

  return state
}
