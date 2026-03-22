import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Instagram, VenetianMask } from 'lucide-react'
import { motion } from 'framer-motion'
import AppImage from './AppImage'
import useAdaptiveMotion from '../hooks/useAdaptiveMotion'

export default function MemberCard({ member }) {
  const { canHover, useLiteMotion } = useAdaptiveMotion()
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [canToggleDescription, setCanToggleDescription] = useState(false)
  const descriptionShellRef = useRef(null)
  const descriptionMeasureRef = useRef(null)
  const MemberBadgeIcon = member.badgeIcon === 'incognito' ? VenetianMask : Instagram
  const layoutTransition = useLiteMotion
    ? { duration: 0.2, ease: 'linear' }
    : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }

  useEffect(() => {
    setIsDescriptionExpanded(false)
  }, [member.id])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const shellElement = descriptionShellRef.current
    const measureElement = descriptionMeasureRef.current

    if (!shellElement || !measureElement) {
      return undefined
    }

    const measureDescription = () => {
      const computedStyles = window.getComputedStyle(measureElement)
      const lineHeight = Number.parseFloat(computedStyles.lineHeight)

      if (!lineHeight) {
        return
      }

      const collapsedHeight = lineHeight * 4
      const nextCanToggleDescription = measureElement.scrollHeight - collapsedHeight > 1

      setCanToggleDescription(nextCanToggleDescription)

      if (!nextCanToggleDescription) {
        setIsDescriptionExpanded(false)
      }
    }

    measureDescription()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measureDescription)

      return () => {
        window.removeEventListener('resize', measureDescription)
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      measureDescription()
    })

    resizeObserver.observe(shellElement)

    return () => {
      resizeObserver.disconnect()
    }
  }, [member.description])

  return (
    <motion.article
      layout
      whileHover={canHover && !useLiteMotion ? { y: -4 } : undefined}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
        layout: layoutTransition,
      }}
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
            aria-label={member.badgeLabel || `Instagram ${member.name}`}
            className="member-card-instagram"
          >
            <MemberBadgeIcon size={16} />
          </a>
        ) : member.badgeIcon ? (
          <span
            role="img"
            aria-label={member.badgeLabel || member.name}
            title={member.badgeLabel || member.name}
            className="member-card-instagram"
          >
            <MemberBadgeIcon size={16} />
          </span>
        ) : null}
        <div className="member-card-copy">
          <p className="member-card-car">{member.car}</p>
          <motion.div layout ref={descriptionShellRef} className="member-card-description-shell">
            <p
              ref={descriptionMeasureRef}
              aria-hidden="true"
              className="member-card-description member-card-description-measure"
            >
              {member.description}
            </p>
            <p
              className={`member-card-description ${isDescriptionExpanded ? 'member-card-description-expanded' : ''}`}
            >
              {member.description}
            </p>
          </motion.div>
          {canToggleDescription ? (
            <motion.button
              layout
              type="button"
              aria-expanded={isDescriptionExpanded}
              className="member-card-toggle"
              onClick={() => {
                setIsDescriptionExpanded((currentValue) => !currentValue)
              }}
            >
              {isDescriptionExpanded ? 'Vezi mai puțin' : 'Vezi mai mult'}
            </motion.button>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}
