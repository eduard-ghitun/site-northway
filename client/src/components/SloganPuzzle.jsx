import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { homeSlogan } from '../data/homeContent'

const tokens = homeSlogan.split(' ').map((word, index) => ({
  id: `${word}-${index}`,
  text: word,
  accent: word === '×' || word === 'cars' || word === 'drive' || word === 'us!',
}))

const WORD_INITIAL_DELAY = 0.12
const WORD_STAGGER_DELAY = 0.08
const WORD_ANIMATION_DURATION = 0.65
const RESTART_DELAY_MS = 10000

export default function SloganPuzzle() {
  const [animationKey, setAnimationKey] = useState(0)

  useEffect(() => {
    const totalAnimationDurationMs =
      (WORD_INITIAL_DELAY + (tokens.length - 1) * WORD_STAGGER_DELAY + WORD_ANIMATION_DURATION) *
      1000

    const timeoutId = window.setTimeout(() => {
      setAnimationKey((current) => current + 1)
    }, totalAnimationDurationMs + RESTART_DELAY_MS)

    return () => window.clearTimeout(timeoutId)
  }, [animationKey])

  return (
    <section className="relative -mt-2 pb-6 sm:pb-10 lg:pb-14">
      <div className="container-shell">
        <div className="panel relative overflow-hidden px-4 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div className="ambient-grid absolute inset-0 opacity-60" />
          <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="absolute inset-y-8 left-0 w-24 bg-gold/10 blur-3xl" />
          <div className="absolute inset-y-8 right-0 w-24 bg-gold/10 blur-3xl" />

          <motion.div
            key={animationKey}
            initial="hidden"
            animate="visible"
            className="relative flex flex-wrap items-center justify-center gap-2 text-center sm:gap-3 lg:gap-4"
          >
            {tokens.map((token, index) => (
              <motion.span
                key={token.id}
                variants={{
                  hidden: {
                    opacity: 0,
                    x: index % 2 === 0 ? -48 : 48,
                    y: index % 3 === 0 ? 32 : -32,
                    rotate: index % 2 === 0 ? -7 : 7,
                    filter: 'blur(10px)',
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: 0,
                    filter: 'blur(0px)',
                    transition: {
                      delay: WORD_INITIAL_DELAY + index * WORD_STAGGER_DELAY,
                      duration: WORD_ANIMATION_DURATION,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                whileHover={{ y: -2, scale: 1.015 }}
                className={`rounded-[18px] border px-2.5 py-2 font-display text-[1.2rem] uppercase leading-none tracking-[0.06em] shadow-panel sm:rounded-[22px] sm:px-3 sm:text-3xl sm:tracking-[0.1em] lg:px-4 lg:py-3 lg:text-5xl xl:text-[3.75rem] ${
                  token.accent
                    ? 'border-gold/40 bg-gold/10 text-gold shadow-glow'
                    : 'border-white/10 bg-white/[0.03] text-white'
                }`}
              >
                {token.text}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
