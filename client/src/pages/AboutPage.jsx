import AppImage from '../components/AppImage'
import CTASection from '../components/CTASection'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import { aboutHero, aboutMission, aboutStory, aboutValues } from '../data/aboutContent'

export default function AboutPage() {
  return (
    <div>
      <Seo
        title="Despre NorthSideCrew | Comunitate Auto"
        description="Afla povestea NorthSideCrew, comunitatea auto dedicata pasionatilor de masini, evenimentelor premium si culturii auto din Romania."
        path="/about"
        ogTitle="Despre NorthSideCrew | Comunitate Auto"
        ogDescription="Descopera povestea, valorile si misiunea comunitatii auto NorthSideCrew."
        image="https://northsidecrew.ro/about/about-story-community.jpg"
      />
      <PageHero
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        description={aboutHero.description}
      />

      <section className="section-space">
        <div className="container-shell grid items-center gap-8 sm:gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <SectionTitle
              eyebrow={aboutStory.eyebrow}
              title={aboutStory.title}
              description={aboutStory.description}
            />
            <div className="mt-6 space-y-5 text-base leading-7 text-white/[0.66] sm:text-lg sm:leading-8">
              {aboutStory.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="panel overflow-hidden p-3">
              <AppImage
                src={aboutStory.media.image}
                alt={aboutStory.media.alt}
                wrapperClassName="aspect-[16/11] rounded-[24px] sm:aspect-[5/4]"
                className="h-full w-full rounded-[24px] object-cover object-center"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container-shell">
          <SectionTitle
            eyebrow="Valorile noastre"
            title="Principiile care definesc NorthSideCrew."
            description="Construim o comunitate bazată pe pasiune, respect și o identitate auto asumată."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {aboutValues.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.08} className="panel h-full p-5 sm:p-7">
                <h3 className="font-display text-base uppercase tracking-[0.12em] text-white sm:text-lg sm:tracking-[0.14em]">
                  {value.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-white/[0.66] sm:text-base">{value.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container-shell">
          <Reveal className="panel overflow-hidden px-5 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-14">
            <SectionTitle
              eyebrow={aboutMission.eyebrow}
              title={aboutMission.title}
              description={aboutMission.description}
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-5">
              {aboutMission.points.map((point) => (
                <div key={point} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 text-sm leading-6 text-white/[0.68] sm:text-base sm:leading-7">
                  {point}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Descoperă cum prinde viață comunitatea NorthSideCrew."
        description="Vezi evenimentele noastre și energia care definește fiecare apariție NorthSideCrew."
        primaryLabel="Vezi Evenimentele"
        primaryTo="/events"
        secondaryLabel="Vezi Membrii"
        secondaryTo="/members"
      />
    </div>
  )
}
