import { CalendarDays, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import AppImage from './AppImage'

export default function EventCard({ event }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="panel overflow-hidden"
    >
      <div className="overflow-hidden border-b border-white/10">
        <AppImage
          src={event.image}
          alt={event.imageAlt || event.title}
          wrapperClassName="h-56"
          className="h-56 w-full object-cover transition duration-500 hover:scale-[1.03]"
        />
      </div>
      <div className="space-y-4 p-6">
        <div>
          <h3 className="font-display text-xl uppercase tracking-[0.14em] text-white">
            {event.title}
          </h3>
          <p className="mt-3 text-white/[0.68]">{event.description}</p>
        </div>
        <div className="flex flex-col gap-3 text-sm uppercase tracking-[0.18em] text-white/60">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-gold" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gold" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
