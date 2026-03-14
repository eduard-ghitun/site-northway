import { LoaderCircle, Send } from 'lucide-react'
import { useState } from 'react'
import { buildApiUrl } from '../config/api'
import Reveal from './Reveal'

const fields = [
  { label: 'Nume', type: 'text', name: 'name', placeholder: 'Numele tău' },
  { label: 'Email', type: 'email', name: 'email', placeholder: 'name@email.com' },
]

export default function ContactForm({ embedded = false }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState({
    state: 'idle',
    message: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setStatus({
      state: 'loading',
      message: 'Mesajul se trimite...',
    })

    fetch(buildApiUrl('/contact'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        const payload = await response.json()

        if (!response.ok) {
          throw new Error(payload.message || 'A apărut o problemă la trimiterea mesajului.')
        }

        setFormData({
          name: '',
          email: '',
          message: '',
        })
        setStatus({
          state: 'success',
          message: payload.message || 'Mesajul a fost trimis cu succes.',
        })
      })
      .catch((error) => {
        setStatus({
          state: 'error',
          message: error.message || 'A apărut o problemă neașteptată.',
        })
      })
  }

  const formContent = (
    <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <label key={field.name} className="block">
          <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.22em] text-white/[0.72]">
            {field.label}
          </span>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-base text-white outline-none transition placeholder:text-white/[0.32] focus:border-gold/[0.55] focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(245,196,0,0.08)]"
          />
        </label>
      ))}

      <label className="block">
        <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.22em] text-white/[0.72]">
          Mesaj
        </span>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Scrie-ne despre mașina ta, despre interesul tău pentru evenimente sau orice întrebare ai."
          rows="6"
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-base text-white outline-none transition placeholder:text-white/[0.32] focus:border-gold/[0.55] focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(245,196,0,0.08)]"
        />
      </label>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status.state === 'loading'}
          className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {status.state === 'loading' ? (
            <>
              Se trimite
              <LoaderCircle size={16} className="animate-spin" />
            </>
          ) : (
            <>
              Trimite Mesajul
              <Send size={16} />
            </>
          )}
        </button>

        {status.message ? (
          <p
            className={`max-w-md text-sm leading-6 break-words ${
              status.state === 'success'
                ? 'text-gold'
                : status.state === 'error'
                  ? 'text-red-300'
                  : 'text-white/[0.62]'
            }`}
          >
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  )

  if (embedded) {
    return formContent
  }

  return <Reveal className="panel h-full p-6 sm:p-8">{formContent}</Reveal>
}
