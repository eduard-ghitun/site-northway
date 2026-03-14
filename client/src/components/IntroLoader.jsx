import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

const introDuration = 3.8
const exitStart = 3.32
const easing = [0.22, 1, 0.36, 1]

const drawSegments = [
  {
    id: 'roofline',
    d: 'M186 191C213 141 252 112 316 112H428C481 112 517 126 548 154L598 196',
    delay: 0.08,
    width: 4,
  },
  {
    id: 'front',
    d: 'M598 196H648C677 196 698 210 704 232H666',
    delay: 0.3,
    width: 4,
  },
  {
    id: 'base',
    d: 'M126 232H192L224 185H596L642 232H566',
    delay: 0.48,
    width: 4,
  },
  {
    id: 'rear',
    d: 'M126 232H94C82 232 72 223 72 212V206',
    delay: 0.65,
    width: 4,
  },
  {
    id: 'window',
    d: 'M244 181L279 132H427C468 132 494 143 520 165L541 181Z',
    delay: 0.36,
    width: 2.4,
  },
  {
    id: 'beltline',
    d: 'M296 181H512',
    delay: 0.82,
    width: 2.4,
  },
  {
    id: 'light',
    d: 'M643 206L684 211',
    delay: 0.96,
    width: 4.5,
  },
]

const particles = [
  { id: 1, cx: 138, cy: 228, dx: -42, dy: -22, size: 3.2, delay: 0 },
  { id: 2, cx: 198, cy: 189, dx: -32, dy: -52, size: 2.8, delay: 0.04 },
  { id: 3, cx: 224, cy: 228, dx: -20, dy: 34, size: 3.6, delay: 0.08 },
  { id: 4, cx: 276, cy: 132, dx: -18, dy: -46, size: 2.4, delay: 0.12 },
  { id: 5, cx: 328, cy: 116, dx: 0, dy: -44, size: 3, delay: 0.16 },
  { id: 6, cx: 376, cy: 112, dx: 12, dy: -40, size: 2.2, delay: 0.2 },
  { id: 7, cx: 436, cy: 118, dx: 28, dy: -38, size: 2.8, delay: 0.24 },
  { id: 8, cx: 488, cy: 138, dx: 38, dy: -26, size: 2.6, delay: 0.28 },
  { id: 9, cx: 544, cy: 172, dx: 52, dy: -16, size: 3.4, delay: 0.32 },
  { id: 10, cx: 606, cy: 198, dx: 58, dy: -6, size: 3, delay: 0.36 },
  { id: 11, cx: 654, cy: 210, dx: 46, dy: 8, size: 3.2, delay: 0.4 },
  { id: 12, cx: 612, cy: 232, dx: 40, dy: 28, size: 2.7, delay: 0.44 },
  { id: 13, cx: 556, cy: 232, dx: 24, dy: 38, size: 2.4, delay: 0.48 },
  { id: 14, cx: 482, cy: 228, dx: 8, dy: 46, size: 3.6, delay: 0.52 },
  { id: 15, cx: 404, cy: 231, dx: -12, dy: 38, size: 2.2, delay: 0.56 },
  { id: 16, cx: 328, cy: 232, dx: 0, dy: 48, size: 2.8, delay: 0.6 },
  { id: 17, cx: 252, cy: 232, dx: -10, dy: 42, size: 2.4, delay: 0.64 },
  { id: 18, cx: 174, cy: 228, dx: -26, dy: 36, size: 2.8, delay: 0.68 },
]

function LoadingBar() {
  const progress = useMotionValue(0)
  const width = useTransform(progress, (value) => `${value}%`)

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: introDuration,
      ease: 'easeInOut',
    })

    return () => controls.stop()
  }, [progress])

  return (
    <div className="mx-auto mt-12 w-full max-w-lg">
      <p className="text-center text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-white/45">
        Loading NorthSideCrew Experience
      </p>
      <div className="mt-4 h-[2px] overflow-hidden rounded-full bg-white/8">
        <motion.div
          style={{ width }}
          className="h-full rounded-full bg-gold shadow-[0_0_14px_rgba(245,196,0,0.85),0_0_26px_rgba(245,196,0,0.28)]"
        />
      </div>
    </div>
  )
}

function ParticleField() {
  return (
    <g>
      {particles.map((particle) => (
        <motion.circle
          key={particle.id}
          cx={particle.cx}
          cy={particle.cy}
          r={particle.size}
          fill="rgba(245,196,0,0.95)"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{
            opacity: [0, 0, 0.92, 0.55, 0.88, 0],
            translateX: [0, 0, particle.dx, particle.dx * 0.55, 0, 0],
            translateY: [0, 0, particle.dy, particle.dy * 0.6, 0, 0],
            scale: [0.3, 0.3, 1, 0.65, 1.05, 0.25],
          }}
          transition={{
            duration: 1.72,
            delay: 1.56 + particle.delay * 0.35,
            ease: easing,
            times: [0, 0.18, 0.38, 0.54, 0.82, 1],
          }}
          style={{ filter: 'drop-shadow(0 0 8px rgba(245,196,0,0.95))' }}
        />
      ))}
    </g>
  )
}

function CarSilhouette() {
  return (
    <div className="relative w-full max-w-[20rem] sm:max-w-[31rem] lg:max-w-[43rem]">
      <motion.div
        animate={{
          opacity: [0.12, 0.2, 0.1, 0.22, 0.08],
          scale: [0.96, 1.02, 0.98, 1.04, 1],
        }}
        transition={{ duration: introDuration, ease: 'easeInOut' }}
        className="absolute inset-x-[12%] top-20 h-24 rounded-full bg-gold/15 blur-[90px] sm:h-32 lg:top-24 lg:h-36"
      />

      <svg viewBox="0 0 760 340" className="relative w-full overflow-visible">
        <motion.ellipse
          cx="380"
          cy="255"
          rx="232"
          ry="24"
          fill="rgba(245,196,0,0.08)"
          animate={{
            opacity: [0, 0.16, 0.06, 0.22, 0],
            scaleX: [0.85, 1, 0.92, 1.06, 1],
          }}
          transition={{ duration: introDuration, ease: 'easeInOut' }}
          style={{ originX: '50%', originY: '50%' }}
        />

        {drawSegments.map((segment) => (
          <motion.path
            key={segment.id}
            d={segment.d}
            fill="none"
            stroke="rgba(245,196,0,0.88)"
            strokeWidth={segment.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0.1, 1, 1],
              opacity: [0, 0.95, 0.95, 0.04, 0.92, 0.8],
            }}
            transition={{
              duration: 3,
              delay: segment.delay,
              ease: easing,
              times: [0, 0.28, 0.5, 0.62, 0.82, 1],
            }}
            style={{ filter: 'drop-shadow(0 0 12px rgba(245,196,0,0.48))' }}
          />
        ))}

        <motion.path
          d="M168 232H194L226 186H598L636 232H560"
          fill="none"
          stroke="rgba(245,196,0,0.24)"
          strokeWidth="7"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0.16, 0.04, 0.34, 0.2] }}
          transition={{ duration: introDuration, times: [0, 0.24, 0.44, 0.62, 0.82, 1], ease: 'easeInOut' }}
          style={{ filter: 'blur(1px)' }}
        />

        <motion.g
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.96, 0.96, 0.08, 1, 0.9],
            scale: [0.9, 1, 1, 0.94, 1.03, 1],
          }}
          transition={{ duration: 2.8, delay: 0.82, ease: easing, times: [0, 0.22, 0.42, 0.58, 0.84, 1] }}
          style={{ originX: '216px', originY: '224px' }}
        >
          <circle cx="216" cy="225" r="41" fill="#050505" stroke="rgba(245,196,0,0.96)" strokeWidth="4.5" />
          <circle cx="216" cy="225" r="18" fill="#f5f5f5" />
        </motion.g>

        <motion.g
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.96, 0.96, 0.08, 1, 0.9],
            scale: [0.9, 1, 1, 0.94, 1.03, 1],
          }}
          transition={{ duration: 2.8, delay: 0.92, ease: easing, times: [0, 0.22, 0.42, 0.58, 0.84, 1] }}
          style={{ originX: '542px', originY: '224px' }}
        >
          <circle cx="542" cy="225" r="41" fill="#050505" stroke="rgba(245,196,0,0.96)" strokeWidth="4.5" />
          <circle cx="542" cy="225" r="18" fill="#f5f5f5" />
        </motion.g>

        <motion.path
          d="M643 206L684 211"
          fill="none"
          stroke="rgba(245,196,0,0.96)"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.4, 0.48, 0.06, 1, 1],
            filter: [
              'drop-shadow(0 0 4px rgba(245,196,0,0.22))',
              'drop-shadow(0 0 10px rgba(245,196,0,0.38))',
              'drop-shadow(0 0 8px rgba(245,196,0,0.26))',
              'drop-shadow(0 0 2px rgba(245,196,0,0.08))',
              'drop-shadow(0 0 18px rgba(245,196,0,0.9))',
              'drop-shadow(0 0 22px rgba(245,196,0,1))',
            ],
          }}
          transition={{ duration: introDuration, times: [0, 0.26, 0.46, 0.62, 0.84, 1], ease: 'easeInOut' }}
        />

        <motion.path
          d="M90 212H70"
          fill="none"
          stroke="rgba(245,196,0,0.6)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0.3, 0.03, 0.55, 0.4] }}
          transition={{ duration: introDuration, times: [0, 0.28, 0.48, 0.62, 0.84, 1], ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 8px rgba(245,196,0,0.3))' }}
        />

        <ParticleField />

        <motion.g
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0, 0, 0.08, 0.95, 0.9],
            scale: [0.98, 0.98, 0.98, 1, 1.02, 1],
          }}
          transition={{ duration: introDuration, times: [0, 0.48, 0.58, 0.72, 0.9, 1], ease: easing }}
          style={{ originX: '50%', originY: '50%' }}
        >
          <path
            d="M186 191C213 141 252 112 316 112H428C481 112 517 126 548 154L598 196H648C677 196 698 210 704 232H638L598 196H224L192 232H126L94 232C82 232 72 223 72 212V206"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(245,196,0,0.98)"
            strokeWidth="4.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 0 18px rgba(245,196,0,0.42))' }}
          />
          <path
            d="M244 181L279 132H427C468 132 494 143 520 165L541 181Z"
            fill="rgba(245,196,0,0.08)"
            stroke="rgba(245,196,0,0.5)"
            strokeWidth="2.4"
          />
          <path
            d="M296 181H512"
            fill="none"
            stroke="rgba(245,196,0,0.54)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </motion.g>

        <motion.rect
          x="198"
          y="238"
          width="360"
          height="3"
          rx="999"
          fill="rgba(245,196,0,0.95)"
          initial={{ opacity: 0, scaleX: 0.72 }}
          animate={{
            opacity: [0, 0, 0, 0.1, 0.76, 0.54],
            scaleX: [0.72, 0.72, 0.72, 1, 1.08, 1],
          }}
          transition={{ duration: introDuration, times: [0, 0.56, 0.66, 0.78, 0.9, 1], ease: easing }}
          style={{
            originX: '50%',
            originY: '50%',
            filter: 'drop-shadow(0 0 10px rgba(245,196,0,0.72))',
          }}
        />
      </svg>
    </div>
  )
}

export default function IntroLoader({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const exitTimer = window.setTimeout(() => {
      setIsExiting(true)
    }, exitStart * 1000)

    const completeTimer = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow
      onComplete()
    }, introDuration * 1000)

    return () => {
      window.clearTimeout(exitTimer)
      window.clearTimeout(completeTimer)
      document.body.style.overflow = previousOverflow
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={
        isExiting
          ? { opacity: 0, scale: 0.988, filter: 'blur(10px)' }
          : { opacity: 1, scale: 1, filter: 'blur(0px)' }
      }
      transition={{ duration: 0.58, ease: easing }}
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#020202]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,196,0,0.08),transparent_28%),radial-gradient(circle_at_50%_65%,rgba(245,196,0,0.06),transparent_32%),linear-gradient(180deg,#020202_0%,#050505_100%)]" />
      <div className="absolute inset-0 ambient-grid opacity-20" />
      <motion.div
        animate={{ opacity: [0.18, 0.3, 0.16, 0.24], scale: [0.96, 1.02, 0.98, 1] }}
        transition={{ duration: introDuration, ease: 'easeInOut' }}
        className="absolute left-1/2 top-[16%] h-40 w-40 -translate-x-1/2 rounded-full bg-gold/12 blur-[120px] sm:h-56 sm:w-56"
      />
      <motion.div
        animate={{ opacity: [0.04, 0.12, 0.04, 0.16], scale: [1, 1.06, 0.98, 1.08] }}
        transition={{ duration: introDuration, ease: 'easeInOut' }}
        className="absolute inset-x-0 bottom-[12%] mx-auto h-28 w-[46vw] max-w-xl rounded-full bg-gold/10 blur-[130px]"
      />

      <motion.div
        animate={{
          opacity: [0, 0.08, 0.04, 0.14, 0],
        }}
        transition={{ duration: introDuration, ease: 'easeInOut' }}
        className="absolute inset-0 bg-[linear-gradient(115deg,transparent_28%,rgba(245,196,0,0.08)_50%,transparent_72%)]"
      />

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-4 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isExiting ? { opacity: 0, y: -6 } : { opacity: [0, 1, 1, 1], y: 0 }}
          transition={{ duration: 0.7, ease: easing, times: [0, 0.2, 0.8, 1] }}
          className="mb-8 text-center text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-gold/75 sm:mb-10 sm:text-[0.68rem] sm:tracking-[0.46em]"
        >
          NorthSideCrew Launch Sequence
        </motion.p>

        <CarSilhouette />
        <LoadingBar />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isExiting ? [0, 0.12, 0.18] : [0, 0, 0, 0.16, 0],
        }}
        transition={{ duration: isExiting ? 0.36 : introDuration, ease: 'easeOut', times: isExiting ? undefined : [0, 0.76, 0.84, 0.9, 1] }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,196,0,0.18),transparent_34%)]"
      />
    </motion.div>
  )
}
