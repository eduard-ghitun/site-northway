import { ArrowUpRight } from 'lucide-react'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'
import TransitionLink from './TransitionLink'

export default function CTASection({
  eyebrow = 'Alătură-te comunității',
  title,
  description,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
}) {
  return (
    <Reveal className="section-space">
      <section className="container-shell">
        <div className="panel relative overflow-hidden px-5 py-10 sm:px-8 sm:py-12 lg:px-14">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-gold/10 to-transparent sm:block" />
          <SectionTitle eyebrow={eyebrow} title={title} description={description} />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <TransitionLink to={primaryTo} className="button-primary w-full sm:w-auto">
              {primaryLabel}
              <ArrowUpRight size={16} />
            </TransitionLink>
            {secondaryLabel ? (
              <TransitionLink to={secondaryTo} className="button-secondary w-full sm:w-auto">
                {secondaryLabel}
              </TransitionLink>
            ) : null}
          </div>
        </div>
      </section>
    </Reveal>
  )
}
