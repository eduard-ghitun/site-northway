import { ArrowLeft, Route } from 'lucide-react'
import { useCallback, useState } from 'react'
import AppImage from '../components/AppImage'
import ImageLightbox from '../components/ImageLightbox'
import Seo from '../components/Seo'
import TransitionLink from '../components/TransitionLink'
import { crewRidePhotos } from '../data/crewRide'

export default function CrewRidePage() {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const selectedPhoto = selectedIndex === null ? null : crewRidePhotos[selectedIndex]
  const closeLightbox = useCallback(() => setSelectedIndex(null), [])

  return (
    <div className="overflow-x-clip">
      <Seo
        title="Crew Ride — On the Road | NorthSideCrew"
        description="Crew Ride NorthSideCrew: o galerie de amintiri din plimbările noastre împreună."
        path="/crew-ride"
        ogTitle="Crew Ride — On the Road | NorthSideCrew"
        ogDescription="Acelasi drum. Aceeasi pasiune."
        image="https://northsidecrew.ro/crew-ride/crew-ride-cover.png"
      />

      <section className="relative overflow-hidden px-4 pb-8 pt-[max(7rem,calc(env(safe-area-inset-top)_+_6rem))] sm:px-6 sm:pb-12 sm:pt-32">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_12%_22%,rgba(184,74,36,0.2),transparent_28%),radial-gradient(circle_at_86%_68%,rgba(184,74,36,0.1),transparent_30%)]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-[#080807]" />
        <div className="container-shell relative">
          <TransitionLink to="/events#completed-events" className="button-secondary border-[#B84A24]/65 hover:border-[#B84A24] hover:bg-[#B84A24] hover:text-white">
            <ArrowLeft size={16} />
            Înapoi la evenimente
          </TransitionLink>

          <div className="mt-12 grid items-center gap-7 sm:mt-16 sm:gap-9 lg:grid-cols-[minmax(0,0.78fr)_minmax(24rem,1.22fr)] lg:gap-12">
            <div className="max-w-2xl">
              <span className="inline-flex border-l-2 border-[#B84A24] bg-[#B84A24]/10 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#E07751] sm:text-[0.72rem]">
                NorthSideCrew
              </span>
              <p className="mt-5 text-xl leading-8 text-white/75 sm:mt-7 sm:text-2xl sm:leading-9">Acelasi drum. Aceeasi pasiune. Cateva amintiri din iesirea noastra impreuna.</p>
            </div>

            <div className="relative overflow-hidden rounded-[20px] border border-[#B84A24]/35 bg-black shadow-[0_20px_52px_rgba(0,0,0,0.35)] sm:rounded-[26px]">
              <AppImage
                src="/crew-ride/crew-ride-cover.png"
                alt="Mașini NorthSideCrew într-o plimbare de seară"
                wrapperClassName="aspect-[3/2] w-full"
                className="object-cover object-center"
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 1023px) 100vw, 60vw"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/12 to-transparent" />
              <h1 className="absolute inset-x-0 bottom-0 px-5 pb-5 font-display text-[clamp(2.6rem,10vw,6.25rem)] uppercase leading-[0.92] tracking-[0.04em] text-white sm:px-7 sm:pb-7 sm:tracking-[0.08em]">
                Crew Ride
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 sm:pb-20" aria-label="Galerie foto Crew Ride">
        <div className="container-shell">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {crewRidePhotos.map((photo, index) => (
              <figure
                key={photo.src}
                className="h-full w-full overflow-hidden rounded-[18px] border border-[#B84A24]/25 bg-[#0a0a0a] p-2.5 shadow-[0_16px_38px_rgba(0,0,0,0.28)] sm:rounded-[22px] sm:p-3"
              >
                <button
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className="block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-[12px] bg-black text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B84A24] sm:rounded-[16px]"
                  aria-label={`Deschide fotografia: ${photo.alt}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    draggable="false"
                    className="h-full w-full select-none object-contain"
                  />
                </button>
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
      <ImageLightbox
        src={selectedPhoto?.src}
        alt={selectedPhoto?.alt || ''}
        onClose={closeLightbox}
      />
    </div>
  )
}
