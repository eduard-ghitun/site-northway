import { motion } from 'framer-motion'

export default function HighlightCard({ item, index }) {
  const Icon = item.icon

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.08, duration: 0.55 }}
      whileHover={{ y: -8 }}
      className="panel h-full p-5 sm:p-7"
    >
      <div className="mb-4 inline-flex rounded-2xl border border-gold/30 bg-gold/10 p-3 text-gold sm:mb-5">
        <Icon size={24} />
      </div>
      <h3 className="font-display text-base uppercase tracking-[0.12em] text-white sm:text-lg sm:tracking-[0.14em]">
        {item.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-white/[0.66] sm:mt-4 sm:text-base">{item.text}</p>
    </motion.article>
  )
}
