import { Gauge, LogOut, ShieldCheck } from 'lucide-react'
import { dashboardImages } from '../assets/images'
import CTASection from '../components/CTASection'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import TicketPurchaseSection from '../components/TicketPurchaseSection'
import TransitionLink from '../components/TransitionLink'
import { useAuth } from '../providers/AuthProvider'

function DashboardItem({ label, value }) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/[0.5] sm:text-sm">
        {label}
      </div>
      <div className="mt-3 text-base leading-7 text-white sm:text-lg sm:leading-8">{value}</div>
    </div>
  )
}

export default function DashboardPage() {
  const { isAdmin, profile, user, logout } = useAuth()
  const displayName =
    profile?.full_name?.trim() ||
    user?.user_metadata?.username?.trim() ||
    user?.user_metadata?.preferred_username?.trim() ||
    user?.user_metadata?.full_name?.trim() ||
    user?.email?.split('@')[0]?.trim() ||
    'Profil'
  const username =
    profile?.full_name?.trim() ||
    user?.user_metadata?.username?.trim() ||
    user?.user_metadata?.preferred_username?.trim() ||
    user?.user_metadata?.full_name?.trim() ||
    'Nedefinit'

  return (
    <div>
      <Seo
        title="Dashboard NorthSideCrew | Cont membru"
        description="Zona privata NorthSideCrew pentru utilizatorii autentificati."
        path="/dashboard"
        ogTitle="Dashboard NorthSideCrew | Cont membru"
        ogDescription="Acces privat pentru membrii autentificati NorthSideCrew."
        image="https://northsidecrew.ro/home/northsidecrew-home-hero.jpg"
      />
      <PageHero
        eyebrow="Private Area"
        title="Dashboard-ul tau NorthSideCrew"
      />

      <section className="section-space">
        <div className="container-shell grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal className="panel overflow-hidden p-5 sm:p-7 lg:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="eyebrow">Member Profile</span>
                <h2 className="title-lg">Bine ai venit, {displayName}.</h2>
              </div>
              <div className="rounded-2xl border border-gold/30 bg-gold/10 p-3 text-gold">
                <Gauge size={22} />
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <DashboardItem label="Profil" value={displayName} />
              <DashboardItem label="Username" value={username} />
              <DashboardItem label="Rol" value={profile?.role || 'member'} />
              <DashboardItem label="User ID" value={profile?.id || user?.id || 'Nedefinit'} />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="panel overflow-hidden p-5 sm:p-7 lg:p-8">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0a0a]">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
                <img
                  src={dashboardImages.connect}
                  alt="NorthSideCrew connect visual"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.08),rgba(5,5,5,0.88))]" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/35 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur">
                    <ShieldCheck size={16} />
                    NorthWay Access
                  </div>
                </div>
              </div>

              <div className="grid gap-3 border-t border-white/10 bg-[linear-gradient(180deg,rgba(245,196,0,0.1),rgba(255,255,255,0.02))] p-5 text-sm text-white/[0.78] sm:grid-cols-3 sm:p-6">
                <div className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-4">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold/80">
                    NorthWay
                  </div>
                  <div className="mt-2 leading-6">Zona privata pentru participanti, spectatori si membri.</div>
                </div>
                <div className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-4">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold/80">
                    Event Ready
                  </div>
                  <div className="mt-2 leading-6">Acces rapid la bilete, profil si functionalitati noi.</div>
                </div>
                <div className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-4">
                  <div className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold/80">
                    Community
                  </div>
                  <div className="mt-2 leading-6">Totul ramane conectat cu identitatea vizuala NorthWay.</div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {isAdmin ? (
                <TransitionLink to="/admin" className="button-primary w-full">
                  Admin Dashboard
                  <ShieldCheck size={16} />
                </TransitionLink>
              ) : null}

              <button type="button" onClick={logout} className="button-secondary w-full">
                Log Out
                <LogOut size={16} />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space pt-0">
        <div className="container-shell">
          <Reveal className="panel overflow-hidden p-5 sm:p-7 lg:p-8">
            <span className="eyebrow">Tutorial Cumparare</span>
            <h2 className="title-lg">Cum cumperi un bilet</h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/[0.68] sm:text-base sm:leading-7">
              Urmeaza acesti pasi simpli pentru a finaliza rapid comanda.
            </p>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold/80">
                  Pasul 1
                </div>
                <div className="mt-3 text-lg font-semibold text-white">Selectezi biletul</div>
                <p className="mt-3 text-sm leading-6 text-white/[0.68] sm:text-base sm:leading-7">
                  Alegi tipul de bilet dorit si cantitatea potrivita pentru tine.
                </p>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold/80">
                  Pasul 2
                </div>
                <div className="mt-3 text-lg font-semibold text-white">Plata prin Revolut</div>
                <p className="mt-3 text-sm leading-6 text-white/[0.68] sm:text-base sm:leading-7">
                  Plata se face prin Revolut, exact conform pretului afisat pe biletul ales.
                </p>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold/80">
                  Pasul 3
                </div>
                <div className="mt-3 text-lg font-semibold text-white">Completezi descrierea</div>
                <p className="mt-3 text-sm leading-6 text-white/[0.68] sm:text-base sm:leading-7">
                  In descrierea platii Revolut treci: tipul de bilet, nume, prenume si emailul
                  unde vrei sa primesti biletele.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <TicketPurchaseSection />

      <CTASection
        eyebrow="Continuam"
        title="Acceseaza rapid toate evenimentele disponibile si gestioneaza-ti participarile intr-un singur loc."
        description="Dashboard-ul tau devine punctul de control unde descoperi, alegi si te inscrii in cateva secunde."
        primaryLabel="Vezi Evenimentele"
        primaryTo="/events"
        secondaryLabel="Mergi Acasa"
        secondaryTo="/"
      />
    </div>
  )
}
