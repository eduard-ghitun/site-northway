import { useEffect, useState } from 'react'

function getAdaptiveMotionState() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return {
      canHover: true,
      hasCoarsePointer: false,
      isMobileViewport: false,
      isTabletViewport: false,
      isTouchDevice: false,
      isIOS: false,
      saveDataEnabled: false,
      prefersReducedMotion: false,
      useLiteMotion: false,
      useReducedEffects: false,
    }
  }

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches
  const isMobileViewport = window.matchMedia('(max-width: 767px)').matches
  const isTabletViewport = window.matchMedia('(min-width: 768px) and (max-width: 1024px)').matches
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isTouchDevice =
    hasCoarsePointer ||
    (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0)
  const isIOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent || '') &&
    !window.MSStream
  const saveDataEnabled = Boolean(navigator?.connection?.saveData)
  const useReducedEffects =
    prefersReducedMotion || saveDataEnabled || isMobileViewport || isTabletViewport || isTouchDevice

  return {
    canHover,
    hasCoarsePointer,
    isMobileViewport,
    isTabletViewport,
    isTouchDevice,
    isIOS,
    saveDataEnabled,
    prefersReducedMotion,
    useLiteMotion: useReducedEffects || !canHover,
    useReducedEffects,
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
      window.matchMedia('(pointer: coarse)'),
      window.matchMedia('(max-width: 767px)'),
      window.matchMedia('(min-width: 768px) and (max-width: 1024px)'),
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
