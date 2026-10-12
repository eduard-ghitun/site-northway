import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useAdaptiveMotion from '../hooks/useAdaptiveMotion'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const { useReducedEffects } = useAdaptiveMotion()

  useEffect(() => {
    const behavior = useReducedEffects ? 'auto' : 'smooth'

    if (hash) {
      const target = document.querySelector(hash)

      if (target) {
        const animationFrame = requestAnimationFrame(() => {
          target.scrollIntoView({ behavior, block: 'start' })
        })

        return () => cancelAnimationFrame(animationFrame)
      }

      return
    }

    window.scrollTo({ top: 0, behavior })
  }, [pathname, hash, useReducedEffects])

  return null
}
