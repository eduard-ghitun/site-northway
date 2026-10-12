import { BellRing, CalendarDays, ChevronLeft, Flag, MapPin, Ticket } from 'lucide-react'
import AppImage from '../components/AppImage'
import Seo from '../components/Seo'
import TransitionLink from '../components/TransitionLink'

const statusItems = [
  { icon: CalendarDays, label: 'Dată', value: '3–4 Octombrie 2026' },
  { icon: MapPin, label: 'Locație', value: 'Centrul Vechi Botoșani' },
  { icon: Ticket, label: 'Acces', value: 'Gratuit' },
]

const gallery = [
  { image: '/events/last-call-2026-gallery-01.jpg', title: 'BMW Seria 3 (E36)' },
  { image: '/events/last-call-2026-gallery-02.jpg', title: 'BMW Seria 5 (E34)' },
  { image: '/events/last-call-2026-gallery-03.jpg', title: 'Volkswagen Golf GTI' },
  { image: '/events/last-call-2026-gallery-04.jpg', title: 'BMW Seria 3 (E36)' },
  { image: '/events/last-call-2026-gallery-05.jpg', title: 'BMW E46 & Mercedes-Benz CLK' },
]

export default function LastCallPage() {
  return (
    <div>
      <Seo
        title="Last Call 2026 | NorthSideCrew"
        description="Last Call 2026 — ediția tomnatică NorthSideCrew, desfășurată în Centrul Vechi Botoșani pe 3–4 octombrie 2026."
        path="/events/last-call-2026"
        ogTitle="Last Call 2026 | NorthSideCrew"
        ogDescription="Ediția tomnatică Last Call 2026, cu acces gratuit în Centrul Vechi Botoșani."
      />

      <section className="relative overflow-hidden px-4 pb-12 pt-[max(6.5rem,calc(env(safe-area-inset-top)_+_5.5rem))] sm:px-6 sm:pb-16 sm:pt-28 lg:pb-24 lg:pt-36">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_15%_35%,rgba(245,241,232,0.14),transparent_22%),radial-gradient(circle_at_82%_72%,rgba(245,196,0,0.16),transparent_28%)]" />
        <div className="container-shell relative">
          <TransitionLink to="/events#completed-events" className="button-secondary mb-7 sm:mb-10">
            <ChevronLeft size={16} />
            Toate evenimentele
          </TransitionLink>

          <div className="relative overflow-hidden rounded-[24px] border border-[#F5F1E8]/30 bg-[#121212] shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:rounded-[36px]">
            <div aria-hidden="true" className="absolute inset-0 opacity-25 [background-image:linear-gradient(90deg,transparent_49.6%,rgba(245,241,232,0.2)_49.8%,rgba(245,241,232,0.2)_50.2%,transparent_50.4%)] [background-size:18px_18px]" />
            <div aria-hidden="true" className="absolute -right-24 -top-36 h-80 w-80 rounded-full border border-[#F5F1E8]/20 sm:h-[30rem] sm:w-[30rem]" />
            <div aria-hidden="true" className="absolute -bottom-28 -left-28 h-64 w-64 rounded-full border border-gold/30 sm:h-96 sm:w-96" />

            <div className="relative grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="border-b border-[#F5F1E8]/20 p-6 sm:p-10 lg:border-b-0 lg:border-r lg:p-14 xl:p-16">
                <div className="flex items-center gap-3 text-[#F5F1E8]/75">
                  <Flag size={18} className="text-gold" />
                  <span className="text-xs font-semibold uppercase tracking-[0.22em]">NorthSideCrew prezintă</span>
                </div>

                <p className="mt-10 font-display text-sm uppercase tracking-[0.35em] text-gold sm:mt-14 sm:text-base">Ediția tomnatică · 2026</p>
                <h1 className="mt-2 font-display text-[clamp(4rem,15vw,9.5rem)] uppercase leading-[0.77] tracking-[-0.035em] text-[#F5F1E8]">
                  Last<br />
                  <span className="text-gold">Call</span>
                </h1>
                <p className="mt-9 max-w-xl text-base leading-7 text-[#F5F1E8]/70 sm:text-lg sm:leading-8">
                  Last Call 2026 a adus pasiunea auto în Centrul Vechi Botoșani, într-un weekend de toamnă cu mașini memorabile și energia comunității NorthSide.
                </p>

                <div className="mt-9 flex flex-wrap gap-3 sm:mt-12">
                  <span className="inline-flex min-h-12 items-center gap-2 rounded-md border border-[#454545] bg-[#181818] px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#F5F5F5]">
                    <BellRing size={16} className="text-gold" />
                    Acces gratuit
                  </span>
                </div>
              </div>

              <div className="relative flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Status eveniment</p>
                  <p className="mt-4 font-display text-3xl uppercase leading-none tracking-[0.08em] text-[#F5F1E8] sm:text-4xl">Ediție încheiată</p>
                </div>

                <figure className="relative mt-8 overflow-hidden rounded-[18px] border border-[#F5F1E8]/20 bg-black shadow-[0_18px_40px_rgba(0,0,0,0.35)] sm:rounded-[22px]">
                  <picture>
                    <source media="(max-width: 767px)" srcSet="/events/last-call-2026-960.jpg" />
                    <img
                      src="/events/last-call-2026-1600.jpg"
                      alt="Mașini clasice și membri ai comunității NorthSideCrew"
                      width="1600"
                      height="1067"
                      sizes="(max-width: 767px) 100vw, (max-width: 1280px) 42vw, 520px"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      className="aspect-[3/2] h-full w-full object-cover"
                    />
                  </picture>
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-4 pb-3 pt-8 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#F5F1E8]/90">
                    NorthSideCrew · Last Call 2026
                  </figcaption>
                </figure>

                <div className="my-8 h-px w-full bg-[#F5F1E8]/20" />

                <dl className="space-y-6">
                  {statusItems.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <span className="mt-0.5 rounded-full border border-gold/35 bg-gold/10 p-2 text-gold"><Icon size={16} /></span>
                      <div>
                        <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#F5F1E8]/55">{label}</dt>
                        <dd className="mt-1 text-base text-[#F5F1E8]">{value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <section className="relative mt-12 sm:mt-16">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Galerie</p>
              <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.08em] text-[#F5F1E8] sm:text-5xl">Momente din Ediția Tomnatică</h2>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((item) => (
                <figure key={item.image} className="overflow-hidden rounded-[16px] border border-white/10 bg-white/[0.03] p-2.5 sm:rounded-[20px] sm:p-3">
                  <AppImage
                    src={item.image}
                    alt={item.title}
                    wrapperClassName="aspect-[4/3] overflow-hidden rounded-[10px] bg-black/40 sm:rounded-[12px]"
                    className="h-full w-full object-cover"
                  />
                  <figcaption className="px-1 pb-1 pt-3 text-sm font-semibold uppercase tracking-[0.1em] text-white">{item.title}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
