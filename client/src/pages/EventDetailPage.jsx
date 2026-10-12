import { CalendarRange, ChevronLeft, Clock3, MapPin, Sparkles, Trophy } from 'lucide-react'
import { Navigate, useParams } from 'react-router-dom'
import AppImage from '../components/AppImage'
import EventPhotoGallery from '../components/EventPhotoGallery'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import TransitionLink from '../components/TransitionLink'
import { eventEditions } from '../data/events'

function EventInfo({ icon: Icon, label, children }) {
  return (
    <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-4 sm:rounded-[24px] sm:p-5">
      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold sm:text-sm sm:tracking-[0.18em]">
        <Icon size={16} />
        {label}
      </div>
      <p className="mt-2 text-base text-white sm:mt-3 sm:text-lg">{children}</p>
    </div>
  )
}

export default function EventDetailPage() {
  const { eventSlug } = useParams()
  const event = eventEditions.find((item) => item.slug === eventSlug)

  if (!event) {
    return <Navigate to="/events" replace />
  }

  const editionLabel = event.slug === 'edition-1' ? 'Edition 1' : 'Edition 2'
  const gallery = event.gallery || []
  const eventImage = `https://northsidecrew.ro${event.image}`
  const isPortraitHero = event.slug === 'edition-2'

  return (
    <div>
      <Seo
        title={`${event.title} | NorthSideCrew`}
        description={event.description}
        path={`/events/${event.slug}`}
        ogTitle={`${event.title} | NorthSideCrew`}
        ogDescription={event.summary || event.description}
        image={eventImage}
      />
      <PageHero eyebrow={event.category} title={event.title} description={event.description} />

      <section className="section-space pt-0">
        <div className="container-shell">
          <TransitionLink to="/events#completed-events" className="button-secondary mb-6 sm:mb-8">
            <ChevronLeft size={16} />
            Toate evenimentele
          </TransitionLink>

          <Reveal className="panel overflow-hidden">
            <div className="grid gap-0 xl:grid-cols-[1.02fr_0.98fr]">
              <div className="border-b border-white/10 p-3 sm:p-4 xl:border-b-0 xl:border-r xl:p-5">
                <AppImage
                  src={event.image}
                  alt={event.imageAlt || event.title}
                  wrapperClassName={`w-full overflow-hidden rounded-[16px] border border-white/10 bg-black sm:rounded-[28px] ${
                    isPortraitHero ? 'mx-auto aspect-[2/3] max-w-[30rem]' : 'aspect-[16/11] sm:aspect-[4/3]'
                  }`}
                  className={`h-full w-full ${isPortraitHero ? 'object-contain' : 'object-cover'}`}
                />
                {event.sideMedia?.image ? (
                  <AppImage
                    src={event.sideMedia.image}
                    alt={event.sideMedia.imageAlt || event.sideMedia.title}
                    wrapperClassName="mt-3 aspect-[16/8] overflow-hidden rounded-[16px] border border-white/10 sm:mt-4 sm:rounded-[24px]"
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>

              <div className="p-5 sm:p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="eyebrow">{event.category}</span>
                  {event.status ? <span className="rounded-full border border-gold/25 bg-gold/10 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold">{event.status}</span> : null}
                </div>
                <h2 className="mt-4 font-display text-[1.7rem] uppercase leading-[1.05] tracking-[0.08em] text-white sm:text-4xl sm:tracking-[0.12em]">{event.title}</h2>
                <p className="mt-5 text-base leading-7 text-white/[0.66] sm:text-lg sm:leading-8">{event.summary || event.longDescription}</p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  <EventInfo icon={MapPin} label="Locație">{event.location}</EventInfo>
                  <EventInfo icon={CalendarRange} label="Perioadă">{event.startDate && event.endDate ? `${event.startDate} - ${event.endDate}` : event.date}</EventInfo>
                  {event.openingHour ? <EventInfo icon={Clock3} label="Deschidere">{event.openingHour}</EventInfo> : null}
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-4 sm:rounded-[24px] sm:p-5">
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold"><Trophy size={16} /> Ediție</div>
                    <p className="mt-3 text-sm leading-6 text-white/[0.66]">{event.editionNote || `${editionLabel} NorthWay, într-o pagină separată cu toate momentele sale.`}</p>
                  </div>
                  <div className="rounded-[16px] border border-white/10 bg-white/[0.03] p-4 sm:rounded-[24px] sm:p-5">
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold"><Sparkles size={16} /> Atmosferă</div>
                    <p className="mt-3 text-sm leading-6 text-white/[0.66]">{event.tagline || event.sideMedia?.description || 'Pasiune auto, comunitate și energie NorthSideCrew.'}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {event.testimonials?.length ? (
            <section className="mt-10">
              <Reveal>
                <span className="eyebrow">Din comunitate</span>
                <h2 className="title-lg">Ce s-a simțit la {editionLabel}</h2>
              </Reveal>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {event.testimonials.slice(0, 6).map((testimonial, index) => (
                  <Reveal key={`${event.slug}-testimonial-${index}`} delay={index * 0.04}>
                    <blockquote className="panel h-full border-l-2 border-l-gold p-5 text-white/[0.7]">„{testimonial}”</blockquote>
                  </Reveal>
                ))}
              </div>
            </section>
          ) : null}

          {gallery.length ? (
            <section className="mt-12">
              <Reveal>
                <span className="eyebrow">Galerie</span>
                <h2 className="title-lg">Momente din {editionLabel}</h2>
              </Reveal>
              <EventPhotoGallery photos={gallery} galleryId={event.slug} />
            </section>
          ) : null}
        </div>
      </section>
    </div>
  )
}
