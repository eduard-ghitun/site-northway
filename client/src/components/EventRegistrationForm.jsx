import {
  AlertCircle,
  CalendarRange,
  CarFront,
  CheckCircle2,
  Instagram,
  Mail,
  Phone,
  Send,
  UserRound,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { registrationWhatsAppNumber } from '../data/contactDetails'
import { buildEventRegistrationWhatsAppMessage, buildWhatsAppUrl } from '../utils/whatsapp'
import Reveal from './Reveal'

const initialFormData = {
  fullName: '',
  email: '',
  phone: '',
  plateNumber: '',
  instagramUsername: '',
  carModifications: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const formFields = [
  {
    name: 'fullName',
    label: 'Nume Prenume',
    placeholder: 'Ex: Andrei Popescu',
    icon: UserRound,
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'nume@email.com',
    icon: Mail,
    type: 'email',
  },
  {
    name: 'phone',
    label: 'Număr telefon',
    placeholder: '07xx xxx xxx',
    icon: Phone,
    type: 'tel',
  },
  {
    name: 'plateNumber',
    label: 'Număr înmatriculare',
    placeholder: 'BT 00 NSC',
    icon: CalendarRange,
    type: 'text',
  },
  {
    name: 'instagramUsername',
    label: 'Username Instagram',
    placeholder: '@username',
    icon: Instagram,
    type: 'text',
  },
]

export default function EventRegistrationForm() {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({
    state: 'idle',
    message: '',
  })

  useEffect(() => {
    if (status.state !== 'error') {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setStatus({
        state: 'idle',
        message: '',
      })
    }, 5000)

    return () => window.clearTimeout(timeoutId)
  }, [status])

  useEffect(() => {
    if (status.state !== 'success') {
      return undefined
    }

    const reloadTimeoutId = window.setTimeout(() => {
      window.location.reload()
    }, 2500)

    return () => window.clearTimeout(reloadTimeoutId)
  }, [status.state])

  const validateForm = () => {
    const nextErrors = {}

    if (!formData.fullName.trim()) nextErrors.fullName = 'Completează numele complet.'
    if (!formData.email.trim()) nextErrors.email = 'Completează adresa de email.'
    else if (!emailPattern.test(formData.email)) nextErrors.email = 'Introdu un email valid.'
    if (!formData.phone.trim()) nextErrors.phone = 'Completează numărul de telefon.'
    if (!formData.plateNumber.trim()) nextErrors.plateNumber = 'Completează numărul de înmatriculare.'
    if (!formData.instagramUsername.trim()) {
      nextErrors.instagramUsername = 'Completează username-ul de Instagram.'
    }
    if (!formData.carModifications.trim()) {
      nextErrors.carModifications = 'Descrie modificările aduse mașinii.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
    setErrors((current) => ({
      ...current,
      [name]: '',
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      setStatus({
        state: 'error',
        message: 'Verifică datele introduse și încearcă din nou.',
      })
      return
    }

    const message = buildEventRegistrationWhatsAppMessage(formData)
    const whatsappUrl = buildWhatsAppUrl(registrationWhatsAppNumber, message)
    const whatsappWindow = window.open(whatsappUrl, '_blank')

    if (whatsappWindow) {
      whatsappWindow.opener = null
      whatsappWindow.focus?.()
      setStatus({
        state: 'success',
        message: 'Felicitari! V-ati inscris cu succes',
      })
      return
    }

    setStatus({
      state: 'error',
      message: 'WhatsApp nu a putut fi deschis automat. Verificati setarile browserului.',
    })
  }

  return (
    <Reveal id="event-registration-form" className="panel overflow-hidden p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow">Formular de înscriere</span>
          <h2 className="title-lg">Aplică pentru NorthWay - Edition II</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/[0.66] sm:text-lg sm:leading-8">
            Completează datele tale, adaugă username-ul de Instagram, descrie mașina și pregătește
            pozele pe care le vei trimite ulterior pe WhatsApp pentru selecția de participare.
          </p>
        </div>
      </div>

      <form className="mt-8 space-y-7 sm:mt-10 sm:space-y-8" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          {formFields.map((field) => {
            const Icon = field.icon

            return (
              <label key={field.name} className="block">
                <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.22em] text-white/[0.72]">
                  {field.label}
                </span>
                <div className="group flex min-h-[3.5rem] items-center gap-3 rounded-[22px] border border-white/10 bg-white/[0.03] px-4 py-4 transition focus-within:border-gold/[0.55] focus-within:bg-white/[0.05] focus-within:shadow-[0_0_0_4px_rgba(245,196,0,0.08)]">
                  <Icon size={18} className="text-gold" />
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/[0.32]"
                  />
                </div>
                {errors[field.name] ? (
                  <p className="mt-2 flex items-center gap-2 text-sm text-red-300">
                    <AlertCircle size={14} />
                    {errors[field.name]}
                  </p>
                ) : null}
              </label>
            )
          })}
        </div>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.22em] text-white/[0.72]">
            Modificări aduse mașinii
          </span>
          <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4 transition focus-within:border-gold/[0.55] focus-within:bg-white/[0.05] focus-within:shadow-[0_0_0_4px_rgba(245,196,0,0.08)]">
            <div className="mb-3 flex items-center gap-3 text-gold">
              <CarFront size={18} />
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                Setup & detalii
              </span>
            </div>
            <textarea
              name="carModifications"
              value={formData.carModifications}
              onChange={handleChange}
              rows="5"
              placeholder="Descrie suspensia, jantele, evacuarea, pachetul estetic, interiorul sau orice element care face mașina ta specială."
              className="w-full bg-transparent text-base leading-7 text-white outline-none placeholder:text-white/[0.32]"
            />
          </div>
          {errors.carModifications ? (
            <p className="mt-2 flex items-center gap-2 text-sm text-red-300">
              <AlertCircle size={14} />
              {errors.carModifications}
            </p>
          ) : null}
        </label>

        <div>
          <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.22em] text-white/[0.72]">
            Trimitere poze pe WhatsApp
          </span>
          <div className="rounded-[24px] border border-gold/20 bg-gradient-to-br from-gold/10 via-white/[0.03] to-white/[0.02] p-5 sm:rounded-[28px] sm:p-8">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-base font-semibold leading-7 text-white sm:text-lg">
                  Pozele mașinii se trimit manual pe WhatsApp după trimiterea formularului.
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-white/[0.62] sm:text-base sm:leading-7">
                  După ce apeși pe „Trimite înscrierea”, ți se va deschide conversația WhatsApp
                  unde vei putea atașa fotografiile necesare pentru evaluare.
                </p>
              </div>
              <div className="grid gap-3 text-sm leading-6 text-white/[0.68] sm:grid-cols-2">
                <div className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3">
                  Trimite minim 5 poze calitative din unghiuri diferite.
                </div>
                <div className="rounded-[20px] border border-white/10 bg-black/20 px-4 py-3">
                  Include obligatoriu cel putin 1 poza in format portret.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl text-sm leading-6 text-white/[0.56]">
            Prin trimiterea formularului confirmi că informațiile completate sunt reale și că
            pozele pe care le vei trimite ulterior pe WhatsApp pot fi folosite pentru selecția
            evenimentului.
          </div>

          <div className="flex w-full flex-col gap-3 sm:max-w-md sm:items-end lg:ml-auto">
            <button type="submit" className="button-primary w-full sm:w-auto">
              Trimite înscrierea
              <Send size={16} />
            </button>

            {status.message ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className={`w-full rounded-2xl border px-4 py-3 text-sm leading-6 sm:w-auto ${
                  status.state === 'success'
                    ? 'border-gold/30 bg-gold/10 text-gold'
                    : 'border-red-300/25 bg-red-400/10 text-red-300'
                }`}
              >
                <p className="flex items-center gap-2">
                  {status.state === 'success' ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <AlertCircle size={16} />
                  )}
                  {status.message}
                </p>
              </motion.div>
            ) : null}
          </div>
        </div>
      </form>
    </Reveal>
  )
}
