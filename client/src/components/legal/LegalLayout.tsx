import { ArrowUpRight, Clock3, FileText, Shield, Sparkles } from 'lucide-react'
import Reveal from '../Reveal'
import Seo from '../Seo'
import TransitionLink from '../TransitionLink'
import { legalLinks } from '../../data/legalLinks'

function SummaryCard({ icon: Icon, text }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl border border-gold/25 bg-gold/10 p-3 text-gold">
          <Icon size={18} />
        </div>
        <p className="text-sm leading-7 text-white/[0.74] sm:text-base">{text}</p>
      </div>
    </div>
  )
}

function SectionCard({ id, index, title, paragraphs = [], bullets = [] }) {
  return (
    <section
      id={id}
      className="scroll-mt-32 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-5 shadow-[0_26px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-7"
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center rounded-full border border-gold/25 bg-gold/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold">
          Sectiunea {index}
        </span>
        <h2 className="text-xl font-semibold uppercase tracking-[0.12em] text-white sm:text-2xl">
          {title}
        </h2>
      </div>

      <div className="mt-5 space-y-4 text-sm leading-7 text-white/[0.74] sm:text-base">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {bullets.length ? (
        <ul className="mt-5 grid gap-3">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-3 rounded-[20px] border border-white/10 bg-black/20 px-4 py-3.5 text-sm leading-6 text-white/[0.8] sm:text-base"
            >
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold shadow-[0_0_18px_rgba(245,196,0,0.45)]" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

export default function LegalLayout({ page }) {
  const summaryIcons = [Sparkles, Shield, FileText]

  return (
    <div>
      <Seo
        title={page.seoTitle}
        description={page.seoDescription}
        keywords={page.keywords}
        path={page.path}
        ogTitle={page.ogTitle}
        ogDescription={page.ogDescription}
        image="https://northside.ro/home/northsidecrew-home-hero.jpg"
      />

      <section className="section-space pt-28 sm:pt-32 lg:pt-36">
        <div className="container-shell">
          <Reveal className="overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(245,196,0,0.16),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-8 lg:p-10">
            <div className="max-w-4xl">
              <span className="eyebrow">{page.eyebrow}</span>
              <h1 className="title-xl">{page.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/[0.7] sm:text-lg">
                {page.description}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/[0.68]">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-4 py-2 backdrop-blur-xl">
                <Clock3 size={16} className="text-gold" />
                Actualizat: {page.updatedAt}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-4 py-2 backdrop-blur-xl">
                <Shield size={16} className="text-gold" />
                NorthSideCrew / NorthWay Event
              </div>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {page.summary.map((item, index) => (
                <SummaryCard key={item} icon={summaryIcons[index] || FileText} text={item} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-16 sm:pb-20 lg:pb-24">
        <div className="container-shell grid gap-6 xl:grid-cols-[0.34fr_0.66fr]">
          <Reveal className="h-fit rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-6 xl:sticky xl:top-28">
            <div>
              <span className="eyebrow mb-3">Navigare Rapida</span>
              <p className="text-sm leading-7 text-white/[0.68] sm:text-base">
                Acceseaza rapid sectiunile importante si celelalte documente legale ale
                platformei.
              </p>
            </div>

            <nav className="mt-5 space-y-2" aria-label="Cuprins document legal">
              {page.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center justify-between gap-3 rounded-[18px] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/[0.74] transition hover:border-gold/30 hover:bg-gold/10 hover:text-gold"
                >
                  <span>{section.title}</span>
                  <ArrowUpRight size={16} className="shrink-0" />
                </a>
              ))}
            </nav>

            <div className="mt-6 rounded-[22px] border border-gold/20 bg-gold/10 p-4">
              <div className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-gold">
                Alte Politici
              </div>
              <div className="mt-3 space-y-2">
                {legalLinks
                  .filter((item) => item.path !== page.path)
                  .map((item) => (
                    <TransitionLink
                      key={item.path}
                      to={item.path}
                      className="block rounded-[16px] border border-transparent px-3 py-2.5 text-sm text-white/[0.72] transition hover:border-gold/25 hover:bg-black/20 hover:text-gold"
                    >
                      {item.label}
                    </TransitionLink>
                  ))}
              </div>
            </div>
          </Reveal>

          <div className="space-y-5">
            {page.sections.map((section, index) => (
              <Reveal key={section.id} delay={Math.min(index * 0.03, 0.15)}>
                <SectionCard {...section} index={index + 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
