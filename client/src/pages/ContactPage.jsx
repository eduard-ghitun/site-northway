import { ExternalLink, Instagram, Mail, MapPinned } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import TransitionLink from '../components/TransitionLink'
import {
  contactEmail,
  contactLocation,
  contactLocationEmbedUrl,
  contactLocationMapUrl,
  socialLinks,
} from '../data/contactDetails'

export default function ContactPage() {
  return (
    <div>
      <Seo
        title="Contact NorthSideCrew | Evenimente Auto Romania"
        description="Contacteaza NorthSideCrew pentru evenimente auto, colaborari, inscrieri si informatii despre comunitatea auto din Romania."
        path="/contact"
        ogTitle="Contact NorthSideCrew | Evenimente Auto Romania"
        ogDescription="Trimite un mesaj catre NorthSideCrew si intra in legatura cu comunitatea si evenimentele auto din Romania."
        image="https://northsidecrew.ro/home/northsidecrew-home-community.jpg"
      />
      <PageHero
        eyebrow="Contact"
        title="Contactează-ne"
        description="Dacă vrei să participi la evenimentele noastre sau să afli mai multe despre comunitatea NorthSideCrew, ne poți contacta folosind formularul de mai jos."
      />

      <section className="section-space">
        <div className="container-shell">
          <Reveal className="panel overflow-hidden p-5 sm:p-7 lg:p-10">
            <div className="grid gap-8 sm:gap-9 lg:grid-cols-[1.06fr_0.94fr]">
              <div className="border-b border-white/10 pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
                <div className="mb-7 sm:mb-8">
                  <span className="eyebrow">Formular Contact</span>
                  <h2 className="title-lg">Scrie-ne direct din NorthSideCrew</h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/[0.64] sm:text-lg sm:leading-8">
                    Trimite-ne un mesaj pentru întrebări, colaborări sau orice informație legată de
                    comunitate și evenimente.
                  </p>
                </div>

                <ContactForm embedded />
              </div>

              <div className="space-y-5 sm:space-y-6">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-5 sm:rounded-[28px] sm:p-6">
                  <div className="mb-4 inline-flex rounded-2xl border border-gold/30 bg-gold/10 p-3 text-gold">
                    <Mail size={24} />
                  </div>
                  <h2 className="font-display text-lg uppercase tracking-[0.14em] text-white">
                    Contact
                  </h2>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="mt-3 inline-flex max-w-full items-start gap-2 break-all text-base text-white transition hover:text-gold sm:text-lg"
                  >
                    <span>{contactEmail}</span>
                    <ExternalLink size={16} className="text-gold" />
                  </a>
                  <p className="mt-3 text-white/[0.62]">
                    Pentru întrebări despre evenimente, colaborări sau informații despre comunitate.
                  </p>

                  <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-4 sm:p-5">
                    <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                      <MapPinned size={16} />
                      Locație
                    </div>
                    <a
                      href={contactLocationMapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-start gap-2 text-sm text-white transition hover:text-gold sm:text-base"
                    >
                      <span>{contactLocation}</span>
                      <ExternalLink size={15} className="text-gold" />
                    </a>
                    <div className="mt-4 overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.03]">
                      <iframe
                        title={`Google Maps - ${contactLocation}`}
                        src={contactLocationEmbedUrl}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="h-40 w-full border-0 sm:h-48"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-5 sm:rounded-[28px] sm:p-6">
                  <div className="mb-4 inline-flex rounded-2xl border border-gold/30 bg-gold/10 p-3 text-gold">
                    <Mail size={24} />
                  </div>
                  <h2 className="font-display text-lg uppercase tracking-[0.14em] text-white">
                    Înscrieri Eveniment
                  </h2>
                  <p className="mt-3 text-white/[0.62]">
                    Pentru înscrieri și detalii legate de participarea la evenimentul NorthWay.
                  </p>
                  <TransitionLink
                    to="/events#event-registration-form"
                    className="button-primary mt-5 w-full"
                  >
                    Mergi la formular
                  </TransitionLink>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-5 sm:rounded-[28px] sm:p-6">
                  <div className="mb-4 inline-flex rounded-2xl border border-gold/30 bg-gold/10 p-3 text-gold">
                    <Instagram size={24} />
                  </div>
                  <h2 className="font-display text-lg uppercase tracking-[0.14em] text-white">
                    Instagram
                  </h2>
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex max-w-full items-start gap-2 break-all text-base text-white transition hover:text-gold sm:text-lg"
                  >
                    <span>@northwaytuning</span>
                    <ExternalLink size={16} className="text-gold" />
                  </a>
                  <p className="mt-3 text-white/[0.62]">
                    Urmărește noutățile, aparițiile mașinilor și energia din jurul comunității
                    NorthSideCrew.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-6 sm:mt-8">
            <p className="max-w-3xl text-base leading-7 text-white/[0.64] sm:text-lg sm:leading-8">
              Suntem mereu deschiși să cunoaștem oameni noi care împărtășesc aceeași pasiune pentru
              mașini.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
