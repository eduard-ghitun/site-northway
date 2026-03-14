import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'
import CTASection from '../components/CTASection'
import AppImage from '../components/AppImage'
import HeroSection from '../components/HeroSection'
import HighlightCard from '../components/HighlightCard'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import SloganPuzzle from '../components/SloganPuzzle'
import ShowcaseGrid from '../components/ShowcaseGrid'
import TransitionLink from '../components/TransitionLink'
import { featuredEvent } from '../data/events'
import { highlights, homeFeaturedEvent, homeIntro, showcaseItems } from '../data/homeContent'

export default function HomePage() {
  return (
    <div>
      <Seo
        title="NorthSideCrew | Comunitate Auto si Evenimente"
        description="NorthSideCrew este o comunitate dedicata pasionatilor auto. Descopera evenimente auto, car meets si proiecte speciale organizate in Romania."
        path="/"
        ogTitle="NorthSideCrew – Automotive Community"
        ogDescription="Descopera evenimente auto si comunitatea NorthSideCrew"
        image="https://northsidecrew.ro/home/northsidecrew-home-hero.jpg"
      />
      <HeroSection />
      <SloganPuzzle />

      <section id="home-intro" className="section-space">
        <div className="container-shell grid items-center gap-8 sm:gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <SectionTitle eyebrow="Comunitatea" title={homeIntro.title} description={homeIntro.description} />
            <p className="mt-5 max-w-xl text-base leading-7 text-white/[0.62] sm:text-lg sm:leading-8">
              {homeIntro.secondary}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="panel overflow-hidden p-3">
              <AppImage
                src={homeIntro.media.image}
                alt={homeIntro.media.alt}
                wrapperClassName="aspect-[16/11] max-h-[620px] rounded-[24px] sm:aspect-[5/4]"
                className="h-full w-full rounded-[24px] object-cover object-center"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container-shell">
          <SectionTitle
            eyebrow="Ce ne definește"
            title="Pasiune, comunitate, mașini și experiențe care rămân în memorie."
            description="Fiecare parte din NorthSideCrew este construită în jurul pasiunii pentru mașini și al unei atmosfere autentice."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {highlights.map((item, index) => (
              <HighlightCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container-shell">
          <Reveal className="panel overflow-hidden">
            <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="overflow-hidden border-b border-white/10 p-3 lg:border-b-0 lg:border-r">
                <AppImage
                  src={featuredEvent.image}
                  alt={featuredEvent.imageAlt || featuredEvent.title}
                  wrapperClassName="aspect-[16/11] min-h-[280px] rounded-[24px] sm:aspect-[4/5] sm:min-h-[360px] lg:min-h-[520px]"
                  className="h-full w-full rounded-[24px] object-cover object-center"
                />
              </div>
              <div className="p-5 sm:p-8 lg:p-10">
                <span className="eyebrow">Eveniment principal</span>
                <h2 className="title-lg">{homeFeaturedEvent.title}</h2>
                <p className="mt-5 text-base leading-7 text-white/[0.68] sm:text-lg sm:leading-8">{homeFeaturedEvent.description}</p>
                <div className="mt-6 space-y-3 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-white/60 sm:text-sm sm:tracking-[0.18em]">
                  <div className="flex items-center gap-3">
                    <CalendarDays size={16} className="text-gold" />
                    <span>{featuredEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-gold" />
                    <span>{featuredEvent.location}</span>
                  </div>
                </div>
                <p className="mt-6 text-sm leading-6 text-white/[0.58] sm:text-base sm:leading-7">{homeFeaturedEvent.secondary}</p>
                <p className="mt-4 text-sm leading-6 text-white/[0.58] sm:text-base sm:leading-7">{homeFeaturedEvent.tertiary}</p>
                <TransitionLink to="/events#completed-events" className="button-primary mt-8 w-full sm:w-auto">
                  Vezi Evenimentul
                  <ArrowUpRight size={16} />
                </TransitionLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="home-gallery" className="section-space pt-0">
        <div className="container-shell">
          <SectionTitle
            eyebrow="Galerie"
            title="Momente vizuale care definesc atmosfera NorthSideCrew."
            description="O selectie de cadre care surprind autentic atmosfera de voie buna, conexiunea dintre membri si energia care defineste fiecare aparitie NorthSideCrew."
          />
          <div className="mt-10">
            <ShowcaseGrid items={showcaseItems} />
          </div>
        </div>
      </section>

      <CTASection
        title="Alătură-te comunității NorthSideCrew"
        description="Dacă pasiunea pentru mașini face parte din stilul tău de viață, atunci NorthSideCrew este locul potrivit pentru tine. Participă la evenimentele noastre și devino parte dintr-o comunitate construită în jurul performanței, stilului și respectului pentru cultura auto."
        primaryLabel="Contactează-ne"
        primaryTo="/contact"
        secondaryLabel="Vezi Evenimentele"
        secondaryTo="/events"
      />
    </div>
  )
}
