import { Instagram } from 'lucide-react'
import { motion } from 'framer-motion'
import AppImage from './AppImage'
import useAdaptiveMotion from '../hooks/useAdaptiveMotion'

export default function MemberCard({ member }) {
  const { canHover, useLiteMotion } = useAdaptiveMotion()

  return (
    <motion.article
      whileHover={canHover && !useLiteMotion ? { y: -4 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="member-card group"
    >
      <div className="member-card-media">
        <AppImage
          src={member.image}
          alt={member.imageAlt || member.car}
          wrapperClassName="member-card-media-frame"
          className={`member-card-media-image ${canHover && !useLiteMotion ? 'member-card-media-image-hover' : ''}`}
          style={{ objectPosition: member.imagePosition || 'center' }}
          loading="lazy"
        />
      </div>
      <div className="member-card-content">
        <div className="member-card-identity">
          <AppImage
            src={member.avatar || member.image}
            alt={member.avatarAlt || member.imageAlt || member.name}
            wrapperClassName="member-card-avatar"
            className="member-card-avatar-image"
            style={{ objectPosition: member.avatarPosition || member.imagePosition || 'center' }}
            loading="lazy"
          />
          <div className="member-card-heading">
            <h3 className="member-card-name">{member.name}</h3>
            <p className="member-card-role">{member.role}</p>
          </div>
        </div>
        {member.instagram ? (
          <a
            href={member.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label={`Instagram ${member.name}`}
            className="member-card-instagram"
          >
            <Instagram size={16} />
          </a>
        ) : null}
        <div className="member-card-copy">
          <p className="member-card-car">{member.car}</p>
          <p className="member-card-description">{member.description}</p>
        </div>
      </div>
    </motion.article>
  )
}
