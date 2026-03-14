import { AnimatePresence, motion } from 'framer-motion'

function WheelRim() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.86 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(6px)' }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="absolute inset-[-12%] rounded-full bg-gold/10 blur-3xl" />
      <svg viewBox="0 0 240 240" className="relative h-40 w-40 sm:h-48 sm:w-48 lg:h-56 lg:w-56">
        <defs>
          <radialGradient id="wheelCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(245,196,0,0.18)" />
            <stop offset="55%" stopColor="rgba(245,196,0,0.04)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <linearGradient id="wheelEdge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe27a" />
            <stop offset="45%" stopColor="#f5c400" />
            <stop offset="100%" stopColor="#9b7a00" />
          </linearGradient>
        </defs>

        <circle cx="120" cy="120" r="108" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
        <motion.circle
          cx="120"
          cy="120"
          r="96"
          fill="none"
          stroke="url(#wheelEdge)"
          strokeWidth="8"
          animate={{
            filter: [
              'drop-shadow(0 0 10px rgba(245,196,0,0.18))',
              'drop-shadow(0 0 18px rgba(245,196,0,0.34))',
              'drop-shadow(0 0 12px rgba(245,196,0,0.2))',
            ],
          }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <circle cx="120" cy="120" r="84" fill="rgba(8,8,8,0.94)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
        <circle cx="120" cy="120" r="68" fill="url(#wheelCore)" />

        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 1.35, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '120px', originY: '120px' }}
        >
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 120 120)`}>
              <path
                d="M118 54H122L138 101L162 117V123L138 139L122 186H118L102 139L78 123V117L102 101Z"
                fill="rgba(245,196,0,0.1)"
                stroke="rgba(245,196,0,0.9)"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                d="M120 62L133 104L154 120L133 136L120 178L107 136L86 120L107 104Z"
                fill="rgba(255,255,255,0.02)"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            </g>
          ))}
        </motion.g>

        <circle cx="120" cy="120" r="26" fill="#0a0a0a" stroke="rgba(245,196,0,0.78)" strokeWidth="4" />
        <circle cx="120" cy="120" r="9" fill="#f5f5f5" />
        {[0, 72, 144, 216, 288].map((angle) => (
          <circle
            key={angle}
            cx={120 + Math.cos((angle * Math.PI) / 180) * 17}
            cy={120 + Math.sin((angle * Math.PI) / 180) * 17}
            r="2.2"
            fill="rgba(245,196,0,0.82)"
          />
        ))}
      </svg>
    </motion.div>
  )
}

export default function PageTransitionLoader({ active }) {
  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key="page-transition-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-0 z-[110] flex items-center justify-center overflow-hidden bg-[#030303]/96 backdrop-blur-md"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,196,0,0.08),transparent_26%),linear-gradient(180deg,#030303_0%,#050505_100%)]" />
          <div className="absolute inset-0 ambient-grid opacity-20" />
          <motion.div
            animate={{ opacity: [0.08, 0.16, 0.08], scale: [0.96, 1.02, 0.98] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px] sm:h-72 sm:w-72"
          />

          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <WheelRim />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0.42, 0.74, 0.42], y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-8 text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-white/52"
            >
              Loading Next Experience
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
