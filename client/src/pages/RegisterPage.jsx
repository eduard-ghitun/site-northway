import { LoaderCircle, LockKeyhole, Mail, ShieldCheck, UserPlus } from 'lucide-react'
import { useState } from 'react'
import CTASection from '../components/CTASection'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import TransitionLink from '../components/TransitionLink'
import { useAuth } from '../providers/AuthProvider'

const initialFormData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
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
  required = false,
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
          required={required}
          className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/[0.32]"
        />
      </div>
    </label>
  )
}

export default function RegisterPage() {
  const { register, hasSupabaseConfig } = useAuth()
  const [formData, setFormData] = useState(initialFormData)
  const [status, setStatus] = useState({
    state: 'idle',
    message: hasSupabaseConfig
      ? 'Creeaza un cont nou cu email, username si parola.'
      : 'Lipsesc cheile frontend pentru Supabase Auth.',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.username.trim()) {
      setStatus({
        state: 'error',
        message: 'Username-ul este obligatoriu.',
      })
      return
    }

    if (formData.password.length < 6) {
      setStatus({
        state: 'error',
        message: 'Parola trebuie sa aiba minimum 6 caractere.',
      })
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setStatus({
        state: 'error',
        message: 'Parolele introduse nu coincid.',
      })
      return
    }

    setStatus({
      state: 'loading',
      message: 'Se creeaza contul tau NorthSideCrew...',
    })

    const result = await register({
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password,
    })

    if (result.success) {
      setFormData(initialFormData)
    }

    setStatus({
      state: result.success ? 'success' : 'error',
      message: result.message,
    })
  }

  return (
    <div>
      <Seo
        title="Register NorthSideCrew | Creeaza cont"
        description="Inregistrare NorthSideCrew cu username, email si parola folosind Supabase Auth."
        path="/register"
        ogTitle="Register NorthSideCrew | Creeaza cont"
        ogDescription="Creeaza un cont NorthSideCrew cu email si parola."
        image="https://northsidecrew.ro/home/northsidecrew-home-hero.jpg"
      />
      <PageHero
        eyebrow="Create Account"
        title="Creeaza contul tau NorthSideCrew"
        description="Formularul de inregistrare foloseste Supabase Auth pentru email si parola, iar profilul public este sincronizat separat pentru username si rol."
      />

      <section className="section-space">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal className="panel overflow-hidden p-5 sm:p-7 lg:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="eyebrow">Register</span>
                <h2 className="title-lg">Cont nou cu stilul NorthSideCrew.</h2>
              </div>
              <div className="rounded-2xl border border-gold/30 bg-gold/10 p-3 text-gold">
                <UserPlus size={22} />
              </div>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              <AuthField
                label="Username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Alege un username"
                autoComplete="username"
                icon={ShieldCheck}
                required
              />
              <AuthField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nume@email.com"
                autoComplete="email"
                icon={Mail}
                required
              />
              <AuthField
                label="Parola"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 caractere"
                autoComplete="new-password"
                icon={LockKeyhole}
                required
              />
              <AuthField
                label="Confirma parola"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeta parola"
                autoComplete="new-password"
                icon={LockKeyhole}
                required
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
                    'Create Account'
                  )}
                </button>

                <TransitionLink to="/login" className="button-secondary w-full sm:w-auto">
                  Ai deja cont?
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
              <span className="eyebrow">Auth Flow</span>
              <h2 className="title-lg max-w-2xl">Username in profil, parola in Supabase Auth.</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/[0.68] sm:text-lg sm:leading-8">
                Parolele nu sunt salvate manual in baza de date. Supabase Auth gestioneaza
                credentialele, iar tabelul <code>public.profiles</code> pastreaza doar datele de
                profil de care avem nevoie in aplicatie.
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              {[
                'Username-ul este trimis in metadata la sign up prin options.data.username.',
                'Profilul public este sincronizat cu id, email, username si role.',
                'Fluxul este pregatit pentru dashboard si roluri viitoare.',
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
        eyebrow="Ai deja cont?"
        title="Intra in dashboard-ul tau dupa autentificare."
        description="Dupa login, rutele private devin disponibile si profilul este incarcat direct din Supabase."
        primaryLabel="Log In"
        primaryTo="/login"
        secondaryLabel="Vezi Acasa"
        secondaryTo="/"
      />
    </div>
  )
}
