import { ArrowUpRight, CalendarDays, History, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import AppImage from '../components/AppImage'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import TransitionLink from '../components/TransitionLink'

const tabs = [
  { id: 'upcoming', label: 'Evenimente viitoare', icon: Sparkles },
  { id: 'completed', label: 'Evenimente finalizate', icon: History },
]

const completedArchive = [
  {
    title: 'Last Call 2026',
    date: '3–4 Octombrie 2026',
    image: '/events/last-call-2026-1600.jpg',
    alt: 'Mașini clasice și membri NorthSideCrew la Last Call 2026',
    to: '/events/last-call-2026',
  },
  {
    title: 'NorthWay - Edition II',
    date: '19–21 Iunie',
    image: '/events/northway-edition-2-detail.jpg',
    alt: 'Moment nocturn de la NorthWay - Edition II',
    to: '/events/edition-2',
  },
  {
    title: 'NorthWay - Ediția I',
    date: '19–21 Iunie',
    image: '/events/northway-edition-1-completed-card.jpg',
    alt: 'Mașini la NorthWay - Ediția I',
    to: '/events/edition-1',
  },
  {
    title: 'Crew Ride',
    date: 'Dată nepublicată',
    image: '/crew-ride/crew-ride-cover.png',
    alt: 'Mașini NorthSideCrew într-o plimbare de seară',
    to: '/crew-ride',
    label: 'Iesire de comunitate',
    accent: '#B84A24',
  },
]

export default function EventsPage() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(() =>
    location.hash === '#upcoming-events' ? 'upcoming' : 'completed',
  )
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

          {activeTab === 'completed' ? (
            <section id="completed-events" className="scroll-mt-28 pt-10 sm:pt-14" aria-labelledby="completed-events-title">
              <div className="max-w-3xl">
                <span className="eyebrow">Arhivă</span>
                <h2 id="completed-events-title" className="title-lg">Asa a fost la NorthWay</h2>
                <p className="mt-4 text-base leading-7 text-white/[0.68] sm:mt-5 sm:text-lg sm:leading-8">
                  Fiecare editie, cu oamenii, masinile si amintirile ei. Alege un eveniment si vezi fotografiile.
                </p>
              </div>

              <div className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-2 lg:gap-6">
                {completedArchive.map((event, index) => {
                  const accentStyle = event.accent ? { borderColor: `${event.accent}66` } : undefined
                  const labelStyle = event.accent ? { borderColor: `${event.accent}99`, backgroundColor: `${event.accent}1A`, color: event.accent } : undefined

                  return (
                    <article key={event.to} className="overflow-hidden rounded-[20px] border border-white/[0.14] bg-white/[0.03] shadow-[0_16px_38px_rgba(0,0,0,0.24)] sm:rounded-[24px]" style={accentStyle}>
                      <AppImage
                        src={event.image}
                        alt={event.alt}
                        wrapperClassName="aspect-[16/10] w-full border-b border-white/10 bg-black"
                        className="object-cover object-center"
                        loading={index < 2 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        sizes="(max-width: 1023px) 100vw, 50vw"
                      />
                      <div className="flex min-h-[13rem] flex-col p-5 sm:p-6">
                        {event.label ? (
                          <span className="mb-4 inline-flex w-fit rounded-md border px-3 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.16em]" style={labelStyle}>
                            {event.label}
                          </span>
                        ) : null}
                        <h3 className="font-display text-2xl uppercase tracking-[0.08em] text-white sm:text-3xl">{event.title}</h3>
                        <div className="mt-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.13em] text-white/[0.62]">
                          <CalendarDays size={16} className={event.accent ? 'text-[#B84A24]' : 'text-gold'} />
                          <span>{event.date}</span>
                        </div>
                        <TransitionLink
                          to={event.to}
                          className={`mt-auto inline-flex min-h-11 w-fit items-center gap-2 rounded-md border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F1E8] ${event.accent ? 'border-[#B84A24] bg-[#B84A24] text-white hover:border-[#963B1C] hover:bg-[#963B1C]' : 'border-white/[0.22] bg-white/[0.04] text-white hover:border-gold hover:bg-gold hover:text-black'}`}
                        >
                          Vezi evenimentul
                          <ArrowUpRight size={15} />
                        </TransitionLink>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
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
