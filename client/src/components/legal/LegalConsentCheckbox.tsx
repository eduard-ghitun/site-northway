import clsx from 'clsx'
import { Info } from 'lucide-react'
import TransitionLink from '../TransitionLink'

export default function LegalConsentCheckbox({
  checked,
  onChange,
  id = 'legal-consent',
  required = false,
  error = '',
  className = '',
  children,
  hint = '',
  icon: Icon = null,
}) {
  return (
    <div className={clsx('space-y-2', className)}>
      <label
        htmlFor={id}
        className={clsx(
          'flex cursor-pointer items-start gap-3 rounded-[22px] border px-4 py-4 transition duration-300 sm:px-5',
          error
            ? 'border-red-300/30 bg-red-400/10'
            : 'border-white/10 bg-white/[0.03] hover:border-gold/25 hover:bg-gold/10',
        )}
      >
        <span className="relative mt-0.5 flex shrink-0">
          <input
            id={id}
            name={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            required={required}
            className="peer sr-only"
          />
          <span className="flex h-5 w-5 items-center justify-center rounded-md border border-white/20 bg-black/30 transition peer-checked:border-gold peer-checked:bg-gold peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold/60">
            <span className="h-2 w-2 rounded-sm bg-black opacity-0 transition peer-checked:opacity-100" />
          </span>
        </span>

        <span className="min-w-0">
          <span className="text-sm leading-6 text-white/[0.78] sm:text-base">
            {children || (
              <>
                Am citit si sunt de acord cu{' '}
                <TransitionLink to="/terms" className="font-semibold text-gold transition hover:text-amber">
                  Termenii si Conditiile
                </TransitionLink>{' '}
                si{' '}
                <TransitionLink
                  to="/privacy"
                  className="font-semibold text-gold transition hover:text-amber"
                >
                  Politica de Confidentialitate
                </TransitionLink>
                .
              </>
            )}
          </span>

          {hint ? (
            <span className="mt-2 flex items-start gap-2 text-sm leading-6 text-white/[0.54]">
              {Icon ? <Icon size={15} className="mt-1 shrink-0 text-gold" /> : <Info size={15} className="mt-1 shrink-0 text-gold" />}
              <span>{hint}</span>
            </span>
          ) : null}
        </span>
      </label>

      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </div>
  )
}
