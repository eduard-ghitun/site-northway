import { motion } from 'framer-motion'

export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="relative overflow-hidden pt-24 sm:pt-28 md:pt-32">
      <div className="container-shell">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="panel relative overflow-hidden px-5 py-8 text-center sm:px-8 sm:py-10 md:text-left lg:px-14 lg:py-16"
        >
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-gold/10 to-transparent sm:block" />
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="title-xl mx-auto max-w-4xl md:mx-0">{title}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-white/[0.68] sm:mt-5 sm:text-lg sm:leading-8 md:mx-0 md:mt-6">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
