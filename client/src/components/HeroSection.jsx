import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { heroContent } from '../data/homeContent'
import AppImage from './AppImage'
import TransitionLink from './TransitionLink'

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-24 lg:pb-10">
      <div className="container-shell grid items-center gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,1.04fr)] lg:gap-16 xl:grid-cols-[minmax(0,0.64fr)_minmax(0,1.08fr)] xl:gap-24">
        <div className="relative z-10 max-w-[34rem] lg:-translate-y-8 lg:pr-4 xl:max-w-[31rem] xl:pr-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">{heroContent.eyebrow}</span>
            <h1 className="font-display text-[2.6rem] uppercase leading-[0.94] tracking-[0.06em] text-white sm:text-5xl sm:tracking-[0.08em] lg:text-[3.75rem] xl:text-[4.2rem]">
              {heroContent.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg font-semibold uppercase tracking-[0.1em] text-gold sm:mt-6 sm:text-2xl sm:tracking-[0.14em]">
              {heroContent.subtitle}
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/[0.72] sm:mt-6 sm:text-lg sm:leading-8">
              {heroContent.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            <TransitionLink to="/events" className="button-primary w-full sm:w-auto">
              Vezi Evenimentele
              <ArrowUpRight size={16} />
            </TransitionLink>
            <TransitionLink to="/about" className="button-secondary w-full sm:w-auto">
              Despre Noi
            </TransitionLink>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 28 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[42rem] lg:ml-auto lg:max-w-[46rem]"
        >
          <div className="absolute inset-6 rounded-[32px] bg-gold/10 blur-3xl" />
          <div className="panel relative overflow-hidden p-3">
            <AppImage
              src={heroContent.media.image}
              alt={heroContent.media.alt}
              loading="eager"
              fetchPriority="high"
              wrapperClassName="aspect-[16/11] rounded-[24px] sm:aspect-[16/10]"
              className="h-full w-full rounded-[24px] object-cover object-center"
            />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#home-intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.68rem] uppercase tracking-[0.3em] text-white/[0.46] sm:flex sm:text-xs sm:tracking-[0.34em]"
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
    </section>
  )
}
