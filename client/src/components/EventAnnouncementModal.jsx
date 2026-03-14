import { useEffect } from 'react'
import { AlertTriangle, CalendarDays, Clock3, MapPin, ShieldCheck, Trophy, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const sectionMotion = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
}

function ModalSection({ title, eyebrow, children, icon: Icon }) {
  return (
    <motion.section {...sectionMotion} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4 sm:rounded-[28px] sm:p-6">
      <div className="flex items-start gap-4">
        {Icon ? (
          <div className="inline-flex rounded-2xl border border-gold/30 bg-gold/10 p-3 text-gold">
            <Icon size={18} />
          </div>
        ) : null}
        <div className="flex-1">
          {eyebrow ? (
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-gold/70">{eyebrow}</p>
          ) : null}
          <h3 className="mt-2 font-display text-lg uppercase tracking-[0.1em] text-white sm:text-xl sm:tracking-[0.12em]">{title}</h3>
          <div className="mt-4 space-y-4">{children}</div>
        </div>
      </div>
    </motion.section>
  )
}

export default function EventAnnouncementModal({ open, onClose, announcement }) {
  useEffect(() => {
    if (!open) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, open])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[130] flex items-start justify-center bg-black/78 px-3 py-3 backdrop-blur-md sm:px-6 sm:py-6"
        >
          <motion.button
            type="button"
            aria-label="Închide anunțul"
            onClick={onClose}
            className="absolute inset-0"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[calc(100svh-1.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[#060606] shadow-[0_30px_90px_rgba(0,0,0,0.48)] sm:max-h-[92vh] sm:rounded-[34px]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,196,0,0.08),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_26%)]" />
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

            <div className="relative z-10 flex items-start justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-7 sm:py-6">
              <div className="max-w-3xl">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.4em] text-gold/80">
                  Anunț oficial eveniment
                </p>
                <h2 className="mt-3 font-display text-[1.8rem] uppercase tracking-[0.1em] text-white sm:text-4xl sm:tracking-[0.14em]">
                  {announcement.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-white/[0.68] sm:text-lg sm:leading-7">
                  {announcement.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex min-h-[3rem] min-w-[3rem] items-center justify-center rounded-full border border-white/12 bg-white/[0.04] p-3 text-white transition hover:border-gold/45 hover:text-gold"
                aria-label="Închide anunțul"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative z-10 overflow-y-auto px-4 py-4 sm:px-7 sm:py-7">
              <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
                <div className="space-y-5">
                  <ModalSection title="Lansare eveniment" eyebrow="NORTHway launch" icon={CalendarDays}>
                    <p className="text-white/[0.72]">{announcement.intro}</p>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                        <div className="flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-gold">
                          <MapPin size={15} />
                          Locație
                        </div>
                        <p className="mt-3 text-white">Complex Imperia Cucorani</p>
                      </div>
                      <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                        <div className="flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-gold">
                          <CalendarDays size={15} />
                          Perioadă
                        </div>
                        <p className="mt-3 text-white">20-21 Iunie</p>
                      </div>
                      <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                        <div className="flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-gold">
                          <Trophy size={15} />
                          Locuri
                        </div>
                        <p className="mt-3 text-white">120 locuri alocate</p>
                      </div>
                    </div>
                  </ModalSection>

                  <ModalSection title={announcement.participantFee.title} eyebrow="Participant access" icon={ShieldCheck}>
                    <p className="text-white/[0.72]">{announcement.participantFee.note}</p>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {announcement.participantFee.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-[20px] border border-gold/15 bg-gold/[0.05] px-4 py-3 text-white/[0.72]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </ModalSection>

                  <ModalSection title={announcement.visitorFees.title} eyebrow="Public access" icon={Clock3}>
                    <div className="space-y-3">
                      {announcement.visitorFees.items.map((item) => (
                        <div
                          key={item}
                          className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-4 text-white/[0.72]"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </ModalSection>

                  <ModalSection title={announcement.registration.title} eyebrow="Înscriere" icon={CalendarDays}>
                    <p className="text-white/[0.72]">{announcement.registration.intro}</p>
                    <ul className="space-y-3">
                      {announcement.registration.requirements.map((item) => (
                        <li
                          key={item}
                          className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-4 text-white/[0.72]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="rounded-[24px] border border-gold/25 bg-gold/10 p-4 text-gold">
                      <div className="flex items-start gap-3">
                        <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                        <p className="text-sm font-semibold uppercase tracking-[0.22em]">
                          {announcement.registration.warning}
                        </p>
                      </div>
                    </div>
                  </ModalSection>
                </div>

                <div className="space-y-5">
                  <ModalSection title={announcement.minimumRequirements.title} eyebrow="Acceptance" icon={ShieldCheck}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {announcement.minimumRequirements.items.map((item) => (
                        <div
                          key={item}
                          className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-4 text-white/[0.72]"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </ModalSection>

                  <ModalSection title={announcement.regulations.title} eyebrow="Rules">
                    <div className="space-y-3">
                      {announcement.regulations.items.map((item, index) => (
                        <div
                          key={item}
                          className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-4 text-white/[0.72]"
                        >
                          <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-xs font-semibold text-gold">
                            {index + 1}
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </ModalSection>

                  <ModalSection title={announcement.stays.title} eyebrow="Stay nearby" icon={MapPin}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {announcement.stays.items.map((item) => (
                        <div
                          key={item}
                          className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-4 text-white/[0.72]"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </ModalSection>

                  <ModalSection title={announcement.schedule.title} eyebrow="Event flow" icon={Clock3}>
                    {[announcement.schedule.dayOne, announcement.schedule.dayTwo].map((day) => (
                      <div key={day.title} className="rounded-[22px] border border-white/10 bg-black/20 p-4">
                        <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">{day.title}</h4>
                        <ul className="mt-4 space-y-3 text-white/[0.72]">
                          {day.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </ModalSection>

                  <ModalSection title={announcement.awards.title} eyebrow="Awards" icon={Trophy}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {announcement.awards.items.map((item) => (
                        <div
                          key={item}
                          className="rounded-[20px] border border-gold/15 bg-gold/[0.05] px-4 py-3 text-white/[0.72]"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </ModalSection>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
