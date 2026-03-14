import { AnimatePresence, motion } from 'framer-motion'

const easing = [0.22, 1, 0.36, 1]

const textBaseClass =
  'pointer-events-none select-none font-display text-[clamp(1.85rem,8vw,6.5rem)] uppercase tracking-[0.1em] leading-none sm:tracking-[0.18em]'

function PanelWord({ word, side }) {
  const isLeft = side === 'left'

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -18 : 18, scale: 0.985 }}
      animate={{ opacity: 1, x: isLeft ? 12 : -12, scale: 1 }}
      exit={{ opacity: 0, x: isLeft ? -8 : 8, scale: 0.99 }}
      transition={{ duration: 0.6, delay: 0.08, ease: easing }}
      className={`absolute inset-y-0 z-10 flex items-center ${
        isLeft ? 'right-[5%] justify-end sm:right-[10%]' : 'left-[5%] justify-start sm:left-[10%]'
      }`}
    >
      <span
        className={textBaseClass}
        style={{
          color: 'transparent',
          backgroundImage: isLeft
            ? 'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.92) 38%, rgba(245,196,0,0.78) 100%)'
            : 'linear-gradient(270deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.92) 38%, rgba(245,196,0,0.78) 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          WebkitMaskImage: isLeft
            ? 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.55) 12%, black 28%, black 100%)'
            : 'linear-gradient(270deg, transparent 0%, rgba(0,0,0,0.55) 12%, black 28%, black 100%)',
          maskImage: isLeft
            ? 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.55) 12%, black 28%, black 100%)'
            : 'linear-gradient(270deg, transparent 0%, rgba(0,0,0,0.55) 12%, black 28%, black 100%)',
          textShadow: '0 0 22px rgba(255,255,255,0.04)',
        }}
      >
        {word}
      </span>
    </motion.div>
  )
}

export default function PageTransition({ active }) {
  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key="northside-bar-transition"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          className="pointer-events-none fixed inset-0 z-[110] overflow-hidden"
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.42, ease: easing }}
            className="absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(180deg,#020202_0%,#090909_100%)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_50%,rgba(245,196,0,0.05),transparent_38%)]" />
            <PanelWord word="NORTH" side="left" />
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-gold/55 to-transparent shadow-[0_0_18px_rgba(245,196,0,0.16)]" />
          </motion.div>

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.42, ease: easing }}
            className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(180deg,#090909_0%,#020202_100%)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_50%,rgba(245,196,0,0.05),transparent_38%)]" />
            <PanelWord word="SIDE" side="right" />
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-gold/55 to-transparent shadow-[0_0_18px_rgba(245,196,0,0.16)]" />
          </motion.div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,196,0,0.04),transparent_30%)]" />
          <motion.div
            initial={{ opacity: 0, scaleY: 0.4 }}
            animate={{ opacity: [0, 0.26, 0.46, 0.16], scaleY: [0.4, 1, 1.15, 0.7] }}
            exit={{ opacity: 0, scaleY: 0.5 }}
            transition={{ duration: 0.52, delay: 0.18, ease: easing, times: [0, 0.4, 0.62, 1] }}
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/65 to-transparent shadow-[0_0_16px_rgba(245,196,0,0.22)]"
          />

          <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
            <motion.p
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 0.36, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, delay: 0.06, ease: easing }}
              className="mt-5 text-[0.62rem] font-semibold uppercase tracking-[0.38em] text-white/40"
            >
              NorthSideCrew
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
