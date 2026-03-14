import { motion } from 'framer-motion'
import AppImage from './AppImage'

export default function MemberCard({ member }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="panel overflow-hidden"
    >
      <div className="overflow-hidden border-b border-white/10">
        <AppImage
          src={member.image}
          alt={member.imageAlt || member.carModel}
          wrapperClassName="h-52 sm:h-56"
          className="h-52 w-full object-cover transition duration-500 hover:scale-[1.04] sm:h-56"
        />
      </div>
      <div className="space-y-4 p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <h3 className="font-display text-base uppercase tracking-[0.12em] text-white sm:text-lg sm:tracking-[0.14em]">
              {member.name}
            </h3>
            <p className="mt-1 text-sm uppercase tracking-[0.18em] text-gold">{member.nickname}</p>
          </div>
          <span className="w-fit rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold">
            {member.badge}
          </span>
        </div>
        <div>
          <p className="text-[0.74rem] uppercase tracking-[0.18em] text-white/[0.45] sm:text-sm sm:tracking-[0.2em]">
            {member.carModel}
          </p>
          <p className="mt-3 text-sm leading-6 text-white/[0.68] sm:text-base sm:leading-7">
            {member.description}
          </p>
        </div>
      </div>
    </motion.article>
  )
}
