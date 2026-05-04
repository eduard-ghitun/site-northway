import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { heroContent } from '../data/homeContent'
import useAdaptiveMotion from '../hooks/useAdaptiveMotion'
import AppImage from './AppImage'
import TransitionLink from './TransitionLink'

export default function HeroSection() {
  const { useLiteMotion } = useAdaptiveMotion()

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-14 lg:pt-24 lg:pb-10">
      <div className="container-shell grid items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.04fr)] lg:gap-16 xl:grid-cols-[minmax(0,0.64fr)_minmax(0,1.08fr)] xl:gap-24">
        <div className="relative z-10 mx-auto max-w-[34rem] text-center lg:-translate-y-8 lg:mx-0 lg:pr-4 lg:text-left xl:max-w-[31rem] xl:pr-8">
          <motion.div
            initial={useLiteMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: useLiteMotion ? 0.3 : 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow mx-auto lg:mx-0">{heroContent.eyebrow}</span>
            <h1 className="mx-auto max-w-[12ch] text-balance font-display text-[clamp(2.1rem,9vw,4.2rem)] uppercase leading-[0.92] tracking-[0.04em] text-white sm:max-w-[12ch] sm:tracking-[0.08em] lg:mx-0 lg:max-w-none lg:text-[3.75rem] xl:text-[4.2rem]">
              {heroContent.title}
            </h1>
            <p className="mx-auto mt-4 max-w-[28rem] text-[clamp(1rem,4.4vw,1.5rem)] font-semibold uppercase leading-[1.35] tracking-[0.07em] text-gold sm:mt-5 sm:tracking-[0.12em] lg:mx-0 lg:mt-6 lg:max-w-xl">
              {heroContent.subtitle}
            </p>
            <p className="mx-auto mt-4 max-w-[32rem] text-[0.98rem] leading-7 text-white/[0.72] sm:mt-5 sm:text-lg sm:leading-8 lg:mx-0 lg:mt-6 lg:max-w-xl">
              {heroContent.description}
            </p>
          </motion.div>

          <motion.div
            initial={useLiteMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: useLiteMotion ? 0 : 0.15,
              duration: useLiteMotion ? 0.28 : 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:justify-start"
          >
            <TransitionLink to="/events" className="button-primary w-full sm:min-w-[14rem] sm:w-auto">
              Vezi Evenimentele
              <ArrowUpRight size={16} />
            </TransitionLink>
            <TransitionLink to="/about" className="button-secondary w-full sm:w-auto">
              Despre Noi
            </TransitionLink>
          </motion.div>
        </div>

        <motion.div
          initial={useLiteMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, x: 28 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: useLiteMotion ? 0.32 : 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[38rem] lg:ml-auto lg:max-w-[46rem]"
        >
          {!useLiteMotion ? (
            <div className="absolute inset-4 rounded-[28px] bg-gold/10 blur-3xl sm:inset-6 sm:rounded-[32px]" />
          ) : null}
          <div className="panel relative overflow-hidden p-2.5 sm:p-3">
            <AppImage
              src={heroContent.media.image}
              alt={heroContent.media.alt}
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 86vw, 46rem"
              wrapperClassName="aspect-[16/11] rounded-[20px] sm:aspect-[16/10] sm:rounded-[24px]"
              className="h-full w-full rounded-[20px] object-cover object-center sm:rounded-[24px]"
            />
          </div>
        </motion.div>
      </div>

      {!useLiteMotion ? (
        <motion.a
          href="#home-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.68rem] uppercase tracking-[0.3em] text-white/[0.46] sm:flex sm:text-xs sm:tracking-[0.34em]"
        >
          Derulează
          <span className="flex h-11 w-7 items-start justify-center rounded-full border border-white/[0.15] p-1">
            <motion.span
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="block h-2 w-2 rounded-full bg-gold"
            />
          </span>
          <ArrowDown size={14} className="text-gold" />
        </motion.a>
      ) : null}
    </section>
  )
}
