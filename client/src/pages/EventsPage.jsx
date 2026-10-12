import { History, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import TransitionLink from '../components/TransitionLink'
import useAdaptiveMotion from '../hooks/useAdaptiveMotion'

const tabs = [
  { id: 'upcoming', label: 'Evenimente viitoare', icon: Sparkles },
  { id: 'completed', label: 'Evenimente finalizate', icon: History },
]

export default function EventsPage() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(() =>
    location.hash === '#upcoming-events' ? 'upcoming' : 'completed',
  )
  const { useReducedEffects } = useAdaptiveMotion()

  useEffect(() => {
    setActiveTab(location.hash === '#upcoming-events' ? 'upcoming' : 'completed')
  }, [location.hash])

  return (
    <div>
      <Seo
        title="Evenimente Auto | NorthSideCrew"
        description="Descoperă evenimentele auto NorthSideCrew și intră pe pagina dedicată fiecărei ediții."
        path="/events"
        ogTitle="Evenimente Auto | NorthSideCrew"
        ogDescription="Vezi fiecare ediție NorthWay într-o pagină dedicată."
        image="https://northsidecrew.ro/events/northside-events-awards-1600.jpg"
      />
      <PageHero
        eyebrow="Evenimente"
        title="Evenimente"
        description="Alege o ediție pentru a vedea toate detaliile, galeria și momentele care au definit-o."
      />

      <section className="section-space pt-0">
        <div className="container-shell">
          <Reveal delay={0.06}>
            <div className="panel p-2.5 sm:p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                {tabs.map(({ id, label, icon: Icon }) => {
                  const isActive = activeTab === id

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActiveTab(id)}
                      aria-pressed={isActive}
                      className="relative min-h-[78px] overflow-hidden rounded-[16px] border border-white/10 px-3.5 py-3.5 text-left transition sm:min-h-0 sm:rounded-[26px] sm:px-5 sm:py-5"
                    >
                      <span className={`absolute inset-0 ${isActive ? 'border border-gold/40 bg-gold/10 shadow-glow' : 'bg-white/[0.02]'}`} />
                      <span className="relative flex items-center gap-3 sm:gap-4">
                        <span className={`rounded-2xl border p-3 ${isActive ? 'border-gold/35 bg-gold/10 text-gold' : 'border-white/10 bg-white/[0.03] text-white/70'}`}>
                          <Icon size={22} />
                        </span>
                        <span className={`font-display text-[0.92rem] uppercase tracking-[0.07em] sm:text-xl sm:tracking-[0.12em] ${isActive ? 'text-gold' : 'text-white/75'}`}>
                          {label}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </Reveal>

          {activeTab === 'completed' ? (
            <>
              <div className="mt-5 grid gap-3 sm:flex sm:flex-wrap" aria-label="Selectează ediția evenimentului">
                <TransitionLink
                  to="/events/edition-1"
                  aria-current="page"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-[#F5F1E8] bg-[#F5F1E8] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#121212] transition-colors duration-200 hover:border-[#F5F1E8] hover:bg-[#303030] hover:text-[#FFFFFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F1E8] sm:min-w-[9rem] sm:w-auto"
                >
                  Edition 1
                </TransitionLink>
                <TransitionLink
                  to="/events/edition-2"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-[#454545] bg-[#181818] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#F5F5F5] transition-colors duration-200 hover:border-[#F5F1E8] hover:bg-[#303030] hover:text-[#FFFFFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F1E8] sm:min-w-[9rem] sm:w-auto"
                >
                  Edition 2
                </TransitionLink>
                <TransitionLink
                  to="/events/last-call-2026"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-[#454545] bg-[#181818] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#F5F5F5] transition-colors duration-200 hover:border-[#F5F1E8] hover:bg-[#303030] hover:text-[#FFFFFF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F1E8] sm:min-w-[11rem] sm:w-auto"
                >
                  Last Call 2026
                </TransitionLink>
                <TransitionLink
                  to="/crew-ride"
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-[#B84A24] bg-[#B84A24] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:border-[#963B1C] hover:bg-[#963B1C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F1E8] sm:min-w-[10rem] sm:w-auto"
                >
                  Crew Ride
                </TransitionLink>
              </div>
              <motion.div
                key="events-cover"
                initial={useReducedEffects ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: useReducedEffects ? 0.16 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="panel mt-7 overflow-hidden p-3 sm:mt-10 sm:p-4"
              >
                <picture className="mx-auto block aspect-[3/2] w-full max-w-5xl overflow-hidden rounded-[18px] border border-white/10 bg-black sm:rounded-[28px]">
                  <source media="(max-width: 767px)" srcSet="/events/northside-events-awards-960.jpg" />
                  <img
                    src="/events/northside-events-awards-1600.jpg"
                    alt="Trofeele NorthSide Automotive Crew"
                    width="1600"
                    height="1067"
                    sizes="(max-width: 767px) 100vw, (max-width: 1280px) 90vw, 1024px"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    draggable="false"
                    className="h-full w-full object-cover"
                  />
                </picture>
              </motion.div>
            </>
          ) : (
            <div className="panel relative mt-7 flex min-h-[19rem] items-center justify-center overflow-hidden px-4 py-10 text-center sm:mt-10 sm:min-h-[26rem]">
              <div className="absolute h-56 w-56 rounded-full border border-gold/30 bg-gold/[0.08] blur-sm" />
              <div className="relative max-w-xl">
                <span className="eyebrow">În pregătire</span>
                <h2 className="font-display text-[clamp(2rem,10vw,4rem)] uppercase tracking-[0.08em] text-white sm:tracking-[0.14em]">Coming soon</h2>
                <p className="mt-5 text-base leading-7 text-white/[0.62] sm:text-lg">Următorul eveniment NorthSideCrew va fi anunțat aici.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
