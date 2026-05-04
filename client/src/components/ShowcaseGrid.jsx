import { motion } from 'framer-motion'
import useAdaptiveMotion from '../hooks/useAdaptiveMotion'
import AppImage from './AppImage'

export default function ShowcaseGrid({ items }) {
  const { useLiteMotion } = useAdaptiveMotion()

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-5">
      {items.map((item, index) => (
        <motion.article
          key={item.title}
          initial={useLiteMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
          whileInView={useLiteMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: useLiteMotion ? 0 : index * 0.08, duration: useLiteMotion ? 0.24 : 0.55 }}
          whileHover={useLiteMotion ? undefined : { y: -6 }}
          className="panel overflow-hidden [content-visibility:auto]"
        >
          <div className="overflow-hidden">
            <AppImage
              src={item.image}
              alt={item.imageAlt || item.title}
              sizes="(max-width: 768px) 92vw, 46vw"
              wrapperClassName={item.imageWrapperClassName || 'aspect-[4/3] min-h-[220px] sm:h-64 sm:min-h-0'}
              className={`w-full object-cover transition duration-500 ${useLiteMotion ? '' : 'hover:scale-[1.04]'} ${
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
