import { CalendarRange, ChevronDown, Clock3, History, MapPin, Sparkles, Trophy } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AppImage from '../components/AppImage'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { completedEventHighlight } from '../data/events'
import useAdaptiveMotion from '../hooks/useAdaptiveMotion'

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
  const [showEdition1Gallery, setShowEdition1Gallery] = useState(false)
  const { useReducedEffects } = useAdaptiveMotion()
  const activePanelMotion = useReducedEffects
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.16 } }
    : panelMotion

  useEffect(() => {
    if (location.hash === '#completed-events') {
      setActiveTab('completed')
      return
    }

    if (location.hash === '#upcoming-events') {
      setActiveTab('upcoming')
    }
  }, [location.hash])

  const scrollToEdition = (editionId) => {
    document.getElementById(editionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <div>
      <Seo
        title="Evenimente Auto | NorthSideCrew"
        description="Descopera evenimente auto NorthSideCrew, editii finalizate si experiente premium dedicate comunitatii auto din Romania."
        path="/events"
        ogTitle="Evenimente Auto | NorthSideCrew"
        ogDescription="Vezi evenimentele auto NorthSideCrew si galeria editiei finalizate."
        image="https://northsidecrew.ro/events/northway-edition-1-completed-card.jpg"
      />
      <PageHero
        eyebrow="Evenimente"
        title="Evenimente"
        description="Descoperă evenimentele NorthSideCrew într-o structură mai clară, mai premium și mai ușor de parcurs, cu separare vizuală între edițiile finalizate și următorul moment important al comunității."
      />

      <section className="section-space pt-0">
        <div className="container-shell">
          <Reveal delay={0.06}>
            <div className="panel relative overflow-hidden p-2.5 sm:p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      aria-pressed={isActive}
                      className="relative min-h-[78px] overflow-hidden rounded-[16px] border border-white/10 px-3.5 py-3.5 text-left transition sm:min-h-0 sm:rounded-[26px] sm:px-5 sm:py-5"
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="events-tab-highlight"
                          className="absolute inset-0 rounded-[26px] border border-gold/40 bg-gold/10 shadow-glow"
                        />
                      ) : (
                        <span className="absolute inset-0 rounded-[26px] bg-white/[0.02]" />
                      )}

                      <span className="relative flex items-center gap-3 sm:items-start sm:gap-4">
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
                          className={`block font-display text-[0.92rem] uppercase leading-tight tracking-[0.07em] sm:text-xl sm:tracking-[0.12em] ${
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

          {activeTab === 'completed' ? (
            <div className="mt-5 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap" aria-label="Selectează ediția evenimentului">
              <button
                type="button"
                onClick={() => scrollToEdition('edition-1')}
                className="button-primary w-full sm:min-w-[9rem] sm:w-auto"
              >
                Edition 1
              </button>
              <button
                type="button"
                onClick={() => scrollToEdition('edition-2')}
                className="button-secondary w-full sm:min-w-[9rem] sm:w-auto"
              >
                Edition 2
              </button>
            </div>
          ) : null}

          <div className="mt-7 sm:mt-10">
            <AnimatePresence mode="wait">
              {activeTab === 'completed' ? (
                <motion.div key="completed" id="completed-events" {...activePanelMotion}>
                  <div id="edition-1" className="panel scroll-mt-28 overflow-hidden">
                    <div className="grid gap-0 xl:grid-cols-[1.02fr_0.98fr]">
                      <div className="border-b border-white/10 p-3 sm:p-4 xl:self-start xl:border-b-0 xl:border-r xl:p-5">
                        <div className="overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.03] sm:rounded-[28px]">
                          <AppImage
                            src={completedEventHighlight.image}
                            alt={completedEventHighlight.imageAlt || completedEventHighlight.title}
                            wrapperClassName="aspect-[16/11] max-h-[420px] w-full sm:aspect-[4/3]"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="mt-3 rounded-[16px] border border-gold/15 bg-[radial-gradient(circle_at_top,rgba(245,196,0,0.08),transparent_52%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-4 sm:mt-4 sm:rounded-[24px] sm:p-5">
                          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-gold sm:text-sm sm:tracking-[0.2em]">
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

                      <div className="flex h-full flex-col p-4 sm:p-8 lg:p-10">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="eyebrow">Eveniment finalizat</span>
                          <span className="rounded-full border border-gold/25 bg-gold/10 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold sm:px-4 sm:text-xs sm:tracking-[0.24em]">
                            {completedEventHighlight.status}
                          </span>
                        </div>

                        <h2 className="mt-4 inline-block rounded-[14px] border border-gold/20 bg-gold/5 px-3 py-3 font-display text-[1.48rem] uppercase leading-[0.95] tracking-[0.07em] text-white shadow-[0_0_30px_rgba(245,196,0,0.08)] sm:mt-5 sm:rounded-[20px] sm:px-4 sm:text-4xl sm:leading-normal sm:tracking-[0.14em] lg:text-[2.7rem]">
                          {completedEventHighlight.title}
                        </h2>

                        <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
                          <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-4 sm:rounded-[24px] sm:p-5">
                            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold sm:text-sm sm:tracking-[0.18em]">
                              <MapPin size={16} />
                              Locație
                            </div>
                            <p className="mt-2 text-base text-white sm:mt-3 sm:text-lg">
                              {completedEventHighlight.location}
                            </p>
                          </div>
                          <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-4 sm:rounded-[24px] sm:p-5">
                            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold sm:text-sm sm:tracking-[0.18em]">
                              <CalendarRange size={16} />
                              Perioadă
                            </div>
                            <p className="mt-2 text-base text-white sm:mt-3 sm:text-lg">
                              {completedEventHighlight.startDate} - {completedEventHighlight.endDate}
                            </p>
                          </div>
                          <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-4 sm:col-span-2 sm:rounded-[24px] sm:p-5 xl:col-span-1">
                            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold sm:text-sm sm:tracking-[0.18em]">
                              <Clock3 size={16} />
                              Ora deschiderii
                            </div>
                            <p className="mt-2 text-base text-white sm:mt-3 sm:text-lg">
                              {completedEventHighlight.openingHour}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-2">
                          <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-4 sm:rounded-[24px] sm:p-5">
                            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold sm:text-sm sm:tracking-[0.18em]">
                              <Trophy size={16} />
                              Rezumat
                            </div>
                            <p className="mt-2 text-sm leading-6 text-white/[0.66] sm:mt-3 sm:text-base">
                              Primul capitol NorthSideCrew a setat tonul pentru experiențele care au
                              urmat.
                            </p>
                          </div>
                          <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-4 sm:rounded-[24px] sm:p-5">
                            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold sm:text-sm sm:tracking-[0.18em]">
                              <Sparkles size={16} />
                              Atmosferă
                            </div>
                            <p className="mt-2 text-sm leading-6 text-white/[0.66] sm:mt-3 sm:text-base">
                              Un mix de mașini atent pregătite, comunitate și vibe premium, în stil
                              cinematic automotive.
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 flex-1 sm:mt-8">
                          <div className="flex h-full min-h-[220px] flex-col overflow-hidden rounded-[16px] border border-dashed border-gold/25 bg-[radial-gradient(circle_at_top,rgba(245,196,0,0.08),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-4 sm:min-h-[260px] sm:rounded-[24px] sm:p-5">
                            {completedEventHighlight.sideMedia.image ? (
                              <AppImage
                                src={completedEventHighlight.sideMedia.image}
                                alt={
                                  completedEventHighlight.sideMedia.imageAlt ||
                                  completedEventHighlight.sideMedia.title
                                }
                                wrapperClassName="mb-4 aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-black/40 sm:aspect-[4/5] sm:rounded-[20px]"
                                className="h-full w-full rounded-[12px] object-cover object-center sm:rounded-[20px]"
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

                    <div className="border-t border-white/10 px-4 py-4 sm:px-8 sm:py-6 lg:px-10">
                      <button
                        type="button"
                        onClick={() => setShowEdition1Gallery((value) => !value)}
                        aria-expanded={showEdition1Gallery}
                        aria-controls="edition-1-gallery"
                        className="flex w-full items-center justify-between gap-3 border-l-2 border-gold bg-white/[0.03] px-3 py-3.5 text-left transition hover:bg-gold/[0.08] sm:gap-4 sm:px-4 sm:py-4"
                      >
                        <span className="flex min-w-0 items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-gold sm:gap-3 sm:text-sm sm:tracking-[0.18em]">
                          <Sparkles size={16} />
                          Galerie competiție
                        </span>
                        <span className="flex shrink-0 items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-white/[0.58] sm:gap-3 sm:text-xs sm:tracking-[0.16em]">
                          <span className="hidden sm:inline">{completedEventHighlight.galleryPlaceholders.length} fotografii</span>
                          <span className="sm:hidden">{completedEventHighlight.galleryPlaceholders.length}</span>
                          <ChevronDown
                            size={18}
                            className={`text-gold transition-transform duration-200 ${showEdition1Gallery ? 'rotate-180' : ''}`}
                          />
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {showEdition1Gallery ? (
                          <motion.div
                            id="edition-1-gallery"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: useReducedEffects ? 0.16 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="grid gap-2.5 pt-3 sm:grid-cols-2 sm:gap-4 sm:pt-4 lg:grid-cols-3 2xl:grid-cols-4">
                              {completedEventHighlight.galleryPlaceholders.map((item, index) => (
                                <div
                                  key={`${completedEventHighlight.title}-gallery-slot-${index}`}
                                  className="flex h-full flex-col overflow-hidden rounded-[12px] border border-white/10 bg-black/20 p-2.5 sm:rounded-[14px] sm:p-3"
                                >
                                  {item.image ? (
                                    <AppImage
                                      src={item.image}
                                      alt={item.imageAlt || item.title}
                                      wrapperClassName="aspect-[4/3] w-full overflow-hidden rounded-[8px] bg-black/40 sm:rounded-[10px]"
                                      className="h-full w-full rounded-[8px] object-cover object-center sm:rounded-[10px]"
                                    />
                                  ) : null}
                                  <div className={item.image ? 'mt-2.5 sm:mt-3' : 'min-h-[130px] rounded-[8px] border border-dashed border-gold/20 bg-white/[0.02] p-3 sm:min-h-[160px] sm:rounded-[10px] sm:p-4'}>
                                    <p className="text-sm font-semibold uppercase tracking-[0.1em] text-white">{item.title}</p>
                                    <p className="mt-1.5 text-sm leading-5 text-white/[0.58] sm:mt-2">{item.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    <div id="edition-2" className="scroll-mt-28 border-t border-white/10 px-4 py-7 sm:px-8 sm:py-8 lg:px-10">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="eyebrow mb-0">Ediție documentată</span>
                        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/[0.46]">
                          NorthWay Archive
                        </span>
                      </div>
                      <div className="mt-5 grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                        <AppImage
                          src={completedEventHighlight.featuredEdition.image}
                          alt={completedEventHighlight.featuredEdition.imageAlt}
                          wrapperClassName="aspect-[16/10] overflow-hidden rounded-[18px] border border-white/10"
                          className="h-full w-full object-cover"
                        />
                        <div>
                          <h3 className="font-display text-[1.45rem] uppercase tracking-[0.08em] text-white sm:text-3xl sm:tracking-[0.12em]">
                            {completedEventHighlight.featuredEdition.title}
                          </h3>
                          <p className="mt-4 text-base font-semibold leading-7 text-gold sm:text-lg">
                            {completedEventHighlight.featuredEdition.subtitle}
                          </p>
                          <p className="mt-4 max-w-3xl text-base leading-7 text-white/[0.66]">
                            {completedEventHighlight.featuredEdition.description}
                          </p>
                          <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            <div className="border-l-2 border-gold bg-white/[0.03] px-4 py-3">
                              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/[0.46]">
                                Locație
                              </span>
                              <span className="mt-1 block text-sm text-white">{completedEventHighlight.featuredEdition.location}</span>
                            </div>
                            <div className="border-l-2 border-gold bg-white/[0.03] px-4 py-3">
                              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/[0.46]">
                                Perioadă
                              </span>
                              <span className="mt-1 block text-sm text-white">
                                {completedEventHighlight.featuredEdition.startDate} - {completedEventHighlight.featuredEdition.endDate}
                              </span>
                            </div>
                            <div className="border-l-2 border-gold bg-white/[0.03] px-4 py-3">
                              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/[0.46]">
                                Deschidere
                              </span>
                              <span className="mt-1 block text-sm text-white">{completedEventHighlight.featuredEdition.openingHour}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {completedEventHighlight.featuredEdition.gallery.map((image, index) => (
                          <AppImage
                            key={`${completedEventHighlight.featuredEdition.title}-gallery-${index}`}
                            src={image}
                            alt={`${completedEventHighlight.featuredEdition.title}, galerie ${index + 1}`}
                            wrapperClassName="aspect-[16/9] overflow-hidden rounded-[14px] border border-white/10"
                            className="h-full w-full object-cover"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="upcoming" id="upcoming-events" {...activePanelMotion}>
                  <div className="panel relative isolate flex min-h-[19rem] items-center justify-center overflow-hidden px-4 py-10 text-center sm:min-h-[26rem] sm:px-8 sm:py-14">
                    <motion.div
                      aria-hidden="true"
                      animate={useReducedEffects ? undefined : { scale: [1, 1.06, 1], opacity: [0.18, 0.34, 0.18] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute h-48 w-48 rounded-full border border-gold/30 bg-gold/[0.08] blur-sm sm:h-64 sm:w-64"
                    />
                    <div className="relative max-w-xl">
                      <span className="eyebrow">În pregătire</span>
                      <h2 className="font-display text-[clamp(2rem,10vw,4rem)] uppercase tracking-[0.08em] text-white sm:tracking-[0.14em]">
                        Coming soon
                      </h2>
                      <p className="mx-auto mt-5 max-w-md text-base leading-7 text-white/[0.62] sm:text-lg sm:leading-8">
                        Următorul eveniment NorthSideCrew va fi anunțat aici.
                      </p>
                      <div className="mt-7 flex justify-center gap-2" aria-label="Anunț în pregătire">
                        {[0, 1, 2].map((dot) => (
                          <motion.span
                            key={dot}
                            animate={useReducedEffects ? undefined : { opacity: [0.35, 1, 0.35], y: [0, -4, 0] }}
                            transition={{ duration: 1.4, delay: dot * 0.16, repeat: Infinity, ease: 'easeInOut' }}
                            className="h-2.5 w-2.5 rounded-full bg-gold"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  )
}
