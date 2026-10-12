import { ArrowLeft, Route } from 'lucide-react'
import Seo from '../components/Seo'
import TransitionLink from '../components/TransitionLink'
import { crewRidePhotos } from '../data/crewRide'

export default function CrewRidePage() {
  return (
    <div className="overflow-x-clip">
      <Seo
        title="Crew Ride — On the Road | NorthSideCrew"
        description="Crew Ride NorthSideCrew: același drum, aceeași pasiune, într-o poveste auto de toamnă spusă cadru cu cadru."
        path="/crew-ride"
        ogTitle="Crew Ride — On the Road | NorthSideCrew"
        ogDescription="Acelasi drum. Aceeasi pasiune."
        image="https://northsidecrew.ro/crew-ride/crew-ride-01.jpg"
      />

      <section className="relative overflow-hidden px-4 pb-8 pt-[max(7rem,calc(env(safe-area-inset-top)_+_6rem))] sm:px-6 sm:pb-12 sm:pt-32">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,rgba(184,74,36,0.2),transparent_28%),radial-gradient(circle_at_86%_68%,rgba(184,74,36,0.1),transparent_30%)]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-[#080807]" />
        <div className="container-shell relative">
          <TransitionLink to="/events#completed-events" className="button-secondary border-[#B84A24]/65 hover:border-[#B84A24] hover:bg-[#B84A24] hover:text-white">
            <ArrowLeft size={16} />
            Înapoi la evenimente
          </TransitionLink>

          <div className="mt-12 max-w-4xl sm:mt-16">
            <span className="inline-flex border-l-2 border-[#B84A24] bg-[#B84A24]/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#E07751] sm:text-[0.72rem]">
              NorthSideCrew · autumn edition
            </span>
            <h1 className="mt-5 font-display text-[clamp(2.6rem,12vw,7.6rem)] uppercase leading-[0.94] tracking-[0.02em] text-white sm:mt-7 sm:tracking-[0.08em]">Crew Ride</h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-white/75 sm:text-2xl sm:leading-9">Acelasi drum. Aceeasi pasiune. Cateva amintiri din iesirea noastra impreuna.</p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 sm:pb-20" aria-label="Galerie foto Crew Ride">
        <div className="container-shell">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {crewRidePhotos.map((photo, index) => (
              <figure
                key={photo.src}
                className="overflow-hidden rounded-[18px] border border-[#B84A24]/25 bg-[#0a0a0a] p-2.5 shadow-[0_16px_38px_rgba(0,0,0,0.28)] sm:rounded-[22px] sm:p-3"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-[12px] bg-black sm:rounded-[16px]">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    draggable="false"
                    className="h-full w-full select-none object-contain"
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-[max(4.5rem,calc(env(safe-area-inset-bottom)_+_3rem))] pt-5 sm:px-6 sm:pb-24 sm:pt-9">
        <div className="container-shell">
          <div className="border-t border-[#B84A24]/30 pt-8 sm:pt-10">
            <Route size={20} className="text-[#B84A24]" />
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">Drumul se termină aici. Comunitatea merge mai departe.</p>
            <TransitionLink to="/events" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-md border border-[#B84A24] bg-[#B84A24] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-[#963B1C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F1E8]">
              Vezi evenimentele
            </TransitionLink>
          </div>
        </div>
      </section>
    </div>
  )
}
