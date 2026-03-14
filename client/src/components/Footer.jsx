import { Facebook, Instagram, Mail, MapPinned } from 'lucide-react'
import TikTokIcon from './TikTokIcon'
import TransitionLink from './TransitionLink'
import { contactEmail, contactLocation, socialLinks } from '../data/contactDetails'
import { navigation } from '../data/navigation'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40">
      <div className="container-shell grid gap-8 py-10 sm:gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="max-w-md">
          <TransitionLink to="/" className="font-display text-xl uppercase tracking-[0.14em] text-white sm:text-2xl sm:tracking-[0.18em]">
            NorthSideCrew
          </TransitionLink>
          <p className="mt-4 text-sm leading-7 text-white/[0.62] sm:text-base">
            O comunitate auto premium, construită în jurul pasiunii, stilului, respectului și
            evenimentelor memorabile.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">
            Navigare
          </h3>
          <div className="mt-4 space-y-3 text-sm leading-6 text-white/[0.68] sm:text-base">
            {navigation.map((item) => (
              <TransitionLink key={item.path} to={item.path} className="block transition hover:text-gold">
                {item.label}
              </TransitionLink>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">Contact</h3>
          <div className="mt-4 space-y-3 text-sm leading-6 text-white/[0.68] sm:text-base">
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-start gap-3 break-all transition hover:text-gold"
            >
              <Mail size={16} className="mt-1 shrink-0 text-gold" />
              <span>{contactEmail}</span>
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 transition hover:text-gold"
            >
              <Instagram size={16} className="text-gold" />
              Instagram
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 transition hover:text-gold"
            >
              <Facebook size={16} className="text-gold" />
              Facebook
            </a>
            <a
              href={socialLinks.tiktok}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 transition hover:text-gold"
            >
              <TikTokIcon size={16} className="text-gold" />
              TikTok
            </a>
            <p className="flex items-start gap-3">
              <MapPinned size={16} className="mt-1 shrink-0 text-gold" />
              <span>{contactLocation}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-2 py-4 text-sm text-white/[0.45] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 NorthSideCrew. Toate drepturile rezervate.</p>
          <p>Creat pentru experiențe auto premium.</p>
        </div>
      </div>
    </footer>
  )
}
