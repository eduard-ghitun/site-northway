import SponsorPosterGrid from '../components/SponsorPosterGrid'
import Seo from '../components/Seo'
import TransitionLink from '../components/TransitionLink'
import { sponsorGroups } from '../data/sponsors'

export default function SponsorsPage() {
  return (
    <div>
      <Seo
        title="Sponsorii nostri | NorthSideCrew"
        description="Descoperă oamenii și brandurile care susțin pasiunea NorthSideCrew și evenimentele comunității noastre auto."
        path="/sponsori"
      />

      <section className="relative overflow-hidden px-4 pb-12 pt-[max(8.5rem,calc(6.25rem+env(safe-area-inset-top)))] sm:px-6 sm:pb-16 sm:pt-36 lg:pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_50%_0%,rgba(224,161,35,0.15),transparent_42%)]" />
        <div className="container-shell relative">
          <span className="eyebrow">Parteneri NorthSideCrew</span>
          <h1 className="title-xl max-w-4xl">Sponsorii nostri</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/[0.68] sm:text-lg sm:leading-8">
            Oamenii si brandurile care ne sustin pasiunea si ne ajuta sa aducem comunitatea impreuna. Va multumim!
          </p>
        </div>
      </section>

      {sponsorGroups.map((group) => (
        <section key={group.title} className="px-4 pb-14 sm:px-6 sm:pb-20 lg:pb-24">
          <div className="container-shell">
            <div className="mb-7 flex items-center gap-4 sm:mb-9">
              <span className="h-px w-10 bg-gold sm:w-14" />
              <h2 className="font-display text-2xl uppercase tracking-[0.08em] text-white sm:text-3xl">{group.title}</h2>
            </div>
            <SponsorPosterGrid posters={group.posters} />
          </div>
        </section>
      ))}

      <section className="px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="container-shell border border-white/[0.14] bg-white/[0.03] px-5 py-8 text-center sm:px-8 sm:py-11">
          <h2 className="font-display text-2xl uppercase tracking-[0.08em] text-white sm:text-3xl">Vrei sa sustii urmatorul eveniment?</h2>
          <TransitionLink to="/contact" className="button-primary mt-6">
            Contacteaza-ne
          </TransitionLink>
        </div>
      </section>
    </div>
  )
}
