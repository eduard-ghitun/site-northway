import { LoaderCircle, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { useLocation, Navigate, useSearchParams } from 'react-router-dom'
import CTASection from '../components/CTASection'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import TransitionLink from '../components/TransitionLink'
import { useAuth } from '../providers/AuthProvider'

const initialFormData = {
  email: '',
  password: '',
}

function AuthField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
  icon: Icon,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/[0.72] sm:text-sm">
        {label}
      </span>
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 transition focus-within:border-gold/[0.55] focus-within:bg-white/[0.05] focus-within:shadow-[0_0_0_4px_rgba(245,196,0,0.08)] sm:px-5">
        <Icon size={18} className="shrink-0 text-gold" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/[0.32]"
        />
      </div>
    </label>
  )
}

export default function LoginPage() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { login, hasSupabaseConfig, loading, user, defaultDashboardPath } = useAuth()
  const bannedFlag = searchParams.get('banned') === '1'
  const [formData, setFormData] = useState(initialFormData)
  const [status, setStatus] = useState({
    state: 'idle',
    message: bannedFlag
      ? 'Contul tau a fost suspendat.'
      : hasSupabaseConfig
        ? 'Introdu emailul si parola pentru a intra in cont.'
        : 'Lipsesc cheile frontend pentru Supabase Auth.',
  })

  if (loading) {
    return (
      <section className="section-space">
        <div className="container-shell">
          <div className="panel flex min-h-[18rem] flex-col items-center justify-center gap-4 px-6 py-10 text-center">
            <LoaderCircle size={28} className="animate-spin text-gold" />
            <p className="max-w-xl text-base leading-7 text-white/[0.68] sm:text-lg sm:leading-8">
              Verificam starea autentificarii.
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (user) {
    return <Navigate to={defaultDashboardPath} replace />
  }

  const redirectTarget = location.state?.from?.pathname || '/dashboard'

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setStatus({
      state: 'loading',
      message: 'Se verifica datele de autentificare...',
    })

    const result = await login({
      email: formData.email.trim(),
      password: formData.password,
      redirectPath: redirectTarget,
    })

    setStatus({
      state: result.success ? 'success' : 'error',
      message: result.success
        ? `Autentificare reusita. Redirect catre ${redirectTarget}.`
        : result.message,
    })
  }

  return (
    <div>
      <Seo
        title="Log In NorthSideCrew | Cont membru"
        description="Autentificare NorthSideCrew cu email si parola folosind Supabase Auth."
        path="/login"
        ogTitle="Log In NorthSideCrew | Cont membru"
        ogDescription="Pagina de login NorthSideCrew conectata la Supabase Auth."
        image="https://northsidecrew.ro/home/northsidecrew-home-hero.jpg"
      />
      <PageHero
        eyebrow="Member Access"
        title="Log In in contul tau NorthSideCrew"
        description="Autentificarea intra direct in dashboard, iar datele de profil sunt citite din Supabase dupa login."
      />

      <section className="section-space">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal className="panel overflow-hidden p-5 sm:p-7 lg:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="eyebrow">Log In</span>
                <h2 className="title-lg">Intra in zona ta privata.</h2>
              </div>
              <div className="rounded-2xl border border-gold/30 bg-gold/10 p-3 text-gold">
                <ShieldCheck size={22} />
              </div>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <AuthField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nume@email.com"
                autoComplete="email"
                icon={Mail}
              />
              <AuthField
                label="Parola"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Introdu parola"
                autoComplete="current-password"
                icon={LockKeyhole}
              />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status.state === 'loading'}
                  className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                >
                  {status.state === 'loading' ? (
                    <>
                      Se proceseaza
                      <LoaderCircle size={16} className="animate-spin" />
                    </>
                  ) : (
                    'Log In'
                  )}
                </button>

                <TransitionLink to="/register" className="button-secondary w-full sm:w-auto">
                  Creeaza cont
                </TransitionLink>
              </div>
            </form>

            <p
              className={`mt-5 text-sm leading-6 sm:text-base sm:leading-7 ${
                status.state === 'success'
                  ? 'text-gold'
                  : status.state === 'error'
                    ? 'text-red-300'
                    : 'text-white/[0.62]'
              }`}
            >
              {status.message}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="panel overflow-hidden p-5 sm:p-7 lg:p-8">
            <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(245,196,0,0.16),rgba(255,255,255,0.04))] p-5 sm:p-6">
              <span className="eyebrow">Supabase Auth</span>
              <h2 className="title-lg max-w-2xl">Email si parola sunt gestionate exclusiv de Supabase.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/[0.68] sm:text-lg sm:leading-8">
                Dupa autentificare, aplicatia incarca sesiunea curenta, sincronizeaza profilul public
                si deschide dashboard-ul privat fara sa stocheze parole in baza de date proprie.
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              {[
                'Login-ul foloseste supabase.auth.signInWithPassword.',
                'Ruta /dashboard este protejata pentru userii autentificati.',
                'Profilul este citit din public.profiles dupa autentificare.',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5 text-sm leading-6 text-white/[0.68] sm:text-base sm:leading-7"
                >
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Esti nou aici?"
        title="Creeaza rapid un cont si intra in dashboard."
        description="Username-ul se salveaza in profilul public, iar autentificarea ramane complet gestionata de Supabase."
        primaryLabel="Create Account"
        primaryTo="/register"
        secondaryLabel="Mergi Acasa"
        secondaryTo="/"
      />
    </div>
  )
}
