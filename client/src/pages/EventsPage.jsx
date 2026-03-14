import { ArrowUpRight, CalendarRange, Clock3, History, MapPin, Sparkles, Trophy } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AppImage from '../components/AppImage'
import EventAnnouncementModal from '../components/EventAnnouncementModal'
import EventRegistrationForm from '../components/EventRegistrationForm'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import { completedEventHighlight, nextEventHighlight, upcomingEventAnnouncement } from '../data/events'

const tabs = [
  {
    id: 'upcoming',
    label: 'Evenimente Viitoare',
    eyebrow: 'Evenimente viitoare',
    icon: Sparkles,
  },
  {
    id: 'completed',
    label: 'Evenimente Finalizate',
    eyebrow: 'Evenimente finalizate',
    icon: History,
  },
]

const panelMotion = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
}

export default function EventsPage() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(() =>
    location.hash === '#completed-events' ? 'completed' : 'upcoming',
  )
  const [showAnnouncement, setShowAnnouncement] = useState(false)

  const handleOpenAnnouncement = () => {
    setShowAnnouncement(true)

    window.setTimeout(() => {
      const el = document.getElementById('announcement-full')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  useEffect(() => {
    if (location.hash === '#completed-events') {
      setActiveTab('completed')
      return
    }

    if (location.hash === '#upcoming-events') {
      setActiveTab('upcoming')
    }
  }, [location.hash])

  return (
    <div>
      <Seo
        title="Evenimente Auto | NorthSideCrew"
        description="Descopera evenimente auto NorthSideCrew, editii finalizate, inscrieri active si experiente premium dedicate comunitatii auto din Romania."
        path="/events"
        ogTitle="Evenimente Auto | NorthSideCrew"
        ogDescription="Vezi evenimentele auto NorthSideCrew, galeria editiei finalizate si inscrierile pentru urmatorul eveniment."
        image="https://northsidecrew.ro/events/northway-edition-1-completed-card.jpg"
      />
      <section className="relative overflow-hidden pb-10 pt-24 sm:pb-14 sm:pt-28 md:pb-16 md:pt-32 lg:pb-24">
        <div className="container-shell">
          <EventRegistrationForm />
        </div>
      </section>

      <PageHero
        eyebrow="Evenimente"
        title="Evenimente"
        description="Descoperă evenimentele NorthSideCrew într-o structură mai clară, mai premium și mai ușor de parcurs, cu separare vizuală între edițiile finalizate și următorul moment important al comunității."
      />

      <section className="section-space pt-0">
        <div className="container-shell">
          <Reveal>
            <SectionTitle
              eyebrow="Intro"
              title="O pagină gândită ca un hub premium pentru experiențele NorthSideCrew."
              description="Aici găsești rapid diferența dintre edițiile deja încheiate și evenimentul viitor pentru care sunt deschise înscrierile, într-un format cinematic, curat și interactiv."
            />
          </Reveal>

          <Reveal delay={0.06} className="mt-10">
            <div className="panel relative overflow-hidden p-3 sm:p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className="relative overflow-hidden rounded-[24px] border border-white/10 px-4 py-4 text-left transition sm:rounded-[26px] sm:px-5 sm:py-5"
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="events-tab-highlight"
                          className="absolute inset-0 rounded-[26px] border border-gold/40 bg-gold/10 shadow-glow"
                        />
                      ) : (
                        <span className="absolute inset-0 rounded-[26px] bg-white/[0.02]" />
                      )}

                      <span className="relative flex items-start gap-4">
                        <span
                          className={`inline-flex rounded-2xl border p-3 ${
                            isActive
                              ? 'border-gold/35 bg-gold/10 text-gold'
                              : 'border-white/10 bg-white/[0.03] text-white/70'
                          }`}
                        >
                          <Icon size={22} />
                        </span>

                        <span className="block">
                          <span
                          className={`block font-display text-base uppercase tracking-[0.1em] sm:text-xl sm:tracking-[0.12em] ${
                              isActive ? 'text-gold' : 'text-white/75'
                            }`}
                          >
                            {tab.eyebrow}
                          </span>
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </Reveal>

          <div className="mt-10">
            <AnimatePresence mode="wait">
              {activeTab === 'completed' ? (
                <motion.div key="completed" id="completed-events" {...panelMotion}>
                  <div className="panel overflow-hidden">
                    <div className="grid gap-0 xl:grid-cols-[1.02fr_0.98fr]">
                      <div className="border-b border-white/10 p-4 xl:self-start xl:border-b-0 xl:border-r xl:p-5">
                        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]">
                          <AppImage
                            src={completedEventHighlight.image}
                            alt={completedEventHighlight.imageAlt || completedEventHighlight.title}
                            wrapperClassName="aspect-[16/11] max-h-[420px] w-full sm:aspect-[4/3]"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="mt-4 rounded-[24px] border border-gold/15 bg-[radial-gradient(circle_at_top,rgba(245,196,0,0.08),transparent_52%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-5">
                          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                            Showcase NorthWay
                          </p>
                          <div className="mt-3 space-y-4 text-sm leading-6 text-white/[0.58]">
                            <p>{completedEventHighlight.description}</p>
                            <p>{completedEventHighlight.summary}</p>
                            {completedEventHighlight.testimonials.map((testimonial, index) => (
                              <p
                                key={`${completedEventHighlight.title}-showcase-testimonial-${index}`}
                                className="border-l border-gold/30 pl-4 text-white/[0.62]"
                              >
                                "{testimonial}"
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex h-full flex-col p-5 sm:p-8 lg:p-10">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="eyebrow">Eveniment finalizat</span>
                          <span className="rounded-full border border-gold/25 bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
                            {completedEventHighlight.status}
                          </span>
                        </div>

                        <h2 className="mt-5 inline-block rounded-[18px] border border-gold/20 bg-gold/5 px-3 py-3 font-display text-[1.7rem] uppercase tracking-[0.1em] text-white shadow-[0_0_30px_rgba(245,196,0,0.08)] sm:rounded-[20px] sm:px-4 sm:text-4xl sm:tracking-[0.14em] lg:text-[2.7rem]">
                          {completedEventHighlight.title}
                        </h2>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                              <MapPin size={16} />
                              Locație
                            </div>
                            <p className="mt-3 text-lg text-white">
                              {completedEventHighlight.location}
                            </p>
                          </div>
                          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                              <CalendarRange size={16} />
                              Perioadă
                            </div>
                            <p className="mt-3 text-lg text-white">
                              {completedEventHighlight.startDate} - {completedEventHighlight.endDate}
                            </p>
                          </div>
                          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 sm:col-span-2 xl:col-span-1">
                            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                              <Clock3 size={16} />
                              Ora deschiderii
                            </div>
                            <p className="mt-3 text-lg text-white">
                              {completedEventHighlight.openingHour}
                            </p>
                          </div>
                        </div>

                        <div className="mt-8 grid gap-4 md:grid-cols-2">
                          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                              <Trophy size={16} />
                              Rezumat
                            </div>
                            <p className="mt-3 text-white/[0.66]">
                              Primul capitol NorthSideCrew a setat tonul pentru experiențele care au
                              urmat.
                            </p>
                          </div>
                          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                              <Sparkles size={16} />
                              Atmosferă
                            </div>
                            <p className="mt-3 text-white/[0.66]">
                              Un mix de mașini atent pregătite, comunitate și vibe premium, în stil
                              cinematic automotive.
                            </p>
                          </div>
                        </div>

                        <div className="mt-8 flex-1">
                          <div className="flex h-full min-h-[260px] flex-col overflow-hidden rounded-[24px] border border-dashed border-gold/25 bg-[radial-gradient(circle_at_top,rgba(245,196,0,0.08),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-5">
                            {completedEventHighlight.sideMedia.image ? (
                              <AppImage
                                src={completedEventHighlight.sideMedia.image}
                                alt={
                                  completedEventHighlight.sideMedia.imageAlt ||
                                  completedEventHighlight.sideMedia.title
                                }
                                wrapperClassName="mb-4 aspect-[16/11] w-full overflow-hidden rounded-[20px] bg-black/40 sm:aspect-[4/5]"
                                className="h-full w-full rounded-[20px] object-cover object-center"
                              />
                            ) : null}
                            <div className="flex flex-1 items-end">
                              <div>
                                <p className="text-base font-semibold uppercase tracking-[0.12em] text-white">
                                  {completedEventHighlight.sideMedia.title}
                                </p>
                                <p className="mt-3 max-w-lg text-sm leading-6 text-white/[0.58]">
                                  {completedEventHighlight.sideMedia.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="border-t border-white/10 px-6 py-8 sm:px-8 lg:px-10">
                      <div className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-gold sm:tracking-[0.18em]">
                        <Sparkles size={16} />
                        Galerie competiție
                      </div>
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                        {completedEventHighlight.galleryPlaceholders.map((item, index) => (
                          <div
                            key={`${completedEventHighlight.title}-gallery-slot-${index}`}
                            className="flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(245,196,0,0.06),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-4"
                          >
                            {item.image ? (
                              <AppImage
                                src={item.image}
                                alt={item.imageAlt || item.title}
                                wrapperClassName="mb-4 aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-black/40"
                                className="h-full w-full rounded-[20px] object-cover object-center"
                              />
                            ) : null}
                            <div className={item.image ? 'mt-0' : 'min-h-[220px] rounded-[20px] border border-dashed border-gold/20 bg-white/[0.02] p-5'}>
                              <p className="text-base font-semibold uppercase tracking-[0.12em] text-white">
                                {item.title}
                              </p>
                              <p className="mt-3 text-sm leading-6 text-white/[0.58]">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="upcoming" id="upcoming-events" {...panelMotion}>
                  <div className="panel overflow-hidden">
                    <div className="grid gap-0 xl:grid-cols-[1.02fr_0.98fr]">
                      <div className="overflow-hidden border-b border-white/10 xl:border-b-0 xl:border-r">
                        <AppImage
                          src={nextEventHighlight.image}
                          alt={nextEventHighlight.imageAlt || nextEventHighlight.title}
                          wrapperClassName="h-full min-h-[260px] sm:min-h-[360px]"
                          className="h-full min-h-[260px] w-full object-cover sm:min-h-[360px]"
                        />
                      </div>

                      <div className="p-5 sm:p-8 lg:p-10">
                        <span className="eyebrow">Eveniment viitor</span>
                        <h2 className="mt-5 font-display text-[1.7rem] uppercase tracking-[0.1em] text-white sm:text-4xl sm:tracking-[0.14em] lg:text-[2.6rem]">
                          {nextEventHighlight.title}
                        </h2>
                        <p className="mt-5 text-lg font-semibold leading-7 text-gold sm:text-xl sm:leading-8">
                          {nextEventHighlight.subtitle}
                        </p>
                        <p className="mt-5 text-base leading-7 text-white/[0.68] sm:text-lg sm:leading-8">
                          {nextEventHighlight.description}
                        </p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                              <MapPin size={16} />
                              Locație
                            </div>
                            <p className="mt-3 text-lg text-white">{nextEventHighlight.location}</p>
                          </div>
                          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                              <CalendarRange size={16} />
                              Perioadă
                            </div>
                            <p className="mt-3 text-lg text-white">
                              {nextEventHighlight.startDate} - {nextEventHighlight.endDate}
                            </p>
                          </div>
                          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                              <Clock3 size={16} />
                              Ora deschiderii
                            </div>
                            <p className="mt-3 text-lg text-white">{nextEventHighlight.openingHour}</p>
                          </div>
                        </div>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                          <button
                            type="button"
                            onClick={handleOpenAnnouncement}
                            className="announcement-button button-primary w-full sm:w-auto"
                          >
                            Vezi anuntul complet
                            <ArrowUpRight size={16} />
                          </button>
                          <div className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-center text-[0.72rem] uppercase tracking-[0.16em] text-white/60 sm:text-sm sm:tracking-[0.2em]">
                            Lansare oficiala NORTHway - Second Edition
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      <EventAnnouncementModal
        open={showAnnouncement}
        onClose={() => setShowAnnouncement(false)}
        announcement={upcomingEventAnnouncement}
      />
    </div>
  )
}
