import { motion } from 'framer-motion'
import AppImage from './AppImage'

export default function ShowcaseGrid({ items }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-5">
      {items.map((item, index) => (
        <motion.article
          key={item.title}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: index * 0.08, duration: 0.55 }}
          whileHover={{ y: -6 }}
          className="panel overflow-hidden"
        >
          <div className="overflow-hidden">
            <AppImage
              src={item.image}
              alt={item.imageAlt || item.title}
              wrapperClassName={item.imageWrapperClassName || 'aspect-[4/3] min-h-[220px] sm:h-64 sm:min-h-0'}
              className={`w-full object-cover transition duration-500 hover:scale-[1.04] ${
                item.imageClassName || 'h-full sm:h-64'
              }`}
              style={item.imageStyle}
            />
          </div>
          <div className="space-y-3 p-4 sm:p-5">
            <h3 className="font-display text-base uppercase tracking-[0.12em] text-white sm:text-lg sm:tracking-[0.14em]">
              {item.title}
            </h3>
            <p className="max-w-[32rem] text-sm leading-6 text-white/[0.66] sm:text-base">{item.caption}</p>
          </div>
        </motion.article>
      ))}
    </div>
  )
}
