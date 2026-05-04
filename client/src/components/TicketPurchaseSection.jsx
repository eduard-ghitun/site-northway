import { Check, LoaderCircle, Ticket } from 'lucide-react'
import { useEffect, useState } from 'react'
import { fetchApiWithFallback } from '../config/api'
import { ticketProducts } from '../data/ticketProducts'
import { useAuth } from '../providers/AuthProvider'
import Reveal from './Reveal'

function formatDate(value) {
  if (!value) {
    return 'Nedefinit'
  }

  return new Intl.DateTimeFormat('ro-RO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function TicketProductCard({ product, quantity, onQuantityChange, onPurchase, loading }) {
  const priceBadge = (
    <div className="rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
      {product.price} RON
    </div>
  )

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03]">
      <div className="aspect-[16/7] overflow-hidden bg-black/30">
        <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="eyebrow">{product.badge}</span>
            <h3 className="title-lg text-[clamp(1.4rem,4vw,2rem)]">{product.title}</h3>
            {product.priceBelowTitle ? <div className="mt-3">{priceBadge}</div> : null}
          </div>
          {!product.priceBelowTitle ? priceBadge : null}
        </div>

        <p className="mt-4 text-sm leading-6 text-white/[0.68] sm:text-base sm:leading-7">
          {product.description}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {product.perks.map((perk) => (
            <div
              key={perk}
              className="flex items-center gap-2 rounded-[18px] border border-white/10 bg-black/20 px-3 py-3 text-sm text-white/[0.78]"
            >
              <Check size={16} className="shrink-0 text-gold" />
              <span>{perk}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <label className="block sm:min-w-[10rem]">
            <span className="mb-2 block text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/[0.5] sm:text-sm">
              Cantitate
            </span>
            <select
              value={quantity}
              onChange={(event) => onQuantityChange(product.id, Number(event.target.value))}
              className="w-full rounded-2xl border border-white/10 bg-[#090909] px-4 py-3 text-white outline-none focus:border-gold/[0.45]"
            >
              {Array.from({ length: 10 }, (_, index) => index + 1).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={() => onPurchase(product)}
            disabled={loading}
            className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {loading ? (
              <>
                Se proceseaza
                <LoaderCircle size={16} className="animate-spin" />
              </>
            ) : (
              <>
                Cumpara Bilet
                <Ticket size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function TicketPurchaseSection() {
  const { session, user } = useAuth()
  const [tickets, setTickets] = useState([])
  const [quantities, setQuantities] = useState(() =>
    ticketProducts.reduce((accumulator, product) => ({ ...accumulator, [product.id]: 1 }), {}),
  )
  const [loadingProductId, setLoadingProductId] = useState(null)
  const [status, setStatus] = useState({ tone: 'idle', message: '' })
  const [initialLoading, setInitialLoading] = useState(true)
  const revolutUrl = 'https://revolut.me/unchiubenz'

  async function fetchTickets() {
    if (!session?.access_token) {
      setTickets([])
      setInitialLoading(false)
      return
    }

    try {
      const { payload } = await fetchApiWithFallback('/dashboard/tickets', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      setTickets(payload.tickets ?? [])
    } catch (error) {
      console.error('Failed to load tickets:', error)
      setTickets([])
    } finally {
      setInitialLoading(false)
    }
  }

  useEffect(() => {
    void fetchTickets()
  }, [session?.access_token])

  function handleQuantityChange(productId, nextQuantity) {
    setQuantities((current) => ({
      ...current,
      [productId]: nextQuantity,
    }))
  }

  async function handlePurchase(product) {
    if (!session?.access_token || !user?.id) {
      setStatus({
        tone: 'error',
        message: 'Trebuie sa fii autentificat pentru a cumpara bilete.',
      })
      return
    }

    const quantity = quantities[product.id] || 1
    setLoadingProductId(product.id)
    setStatus({ tone: 'idle', message: '' })
    const paymentUrl = product.checkoutUrl || revolutUrl

    try {
      const { payload } = await fetchApiWithFallback('/dashboard/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          ticketType: product.id,
          quantity,
        }),
      })

      setStatus({
        tone: 'success',
        message: `Redirectionam catre plata pentru ${quantity} x ${product.title}.`,
      })
      await fetchTickets()
      window.location.assign(payload.paymentUrl || paymentUrl)
    } catch (error) {
      console.error('Failed to purchase ticket:', error)
      window.location.assign(paymentUrl)
    } finally {
      setLoadingProductId(null)
    }
  }

  return (
    <section className="section-space pt-4 sm:pt-6 md:pt-8 lg:pt-10">
      <div className="container-shell space-y-6">
        <Reveal className="panel overflow-hidden p-5 sm:p-7 lg:p-8">
          <div>
            <div>
              <span className="eyebrow mx-auto flex w-fit justify-center px-4 py-1.5 text-[0.72rem] sm:text-[0.82rem]">
                Cumpara Bilete
              </span>
              <h2 className="title-lg">Acces rapid la NorthWay II</h2>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-white/[0.68] sm:text-base sm:leading-7">
                Acces exclusiv pentru persoanele cu varsta de minim 18 ani pentru data de
                20.06.2026 incepand cu ora 20:00.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            {ticketProducts.map((product) => (
              <TicketProductCard
                key={product.id}
                product={product}
                quantity={quantities[product.id] || 1}
                onQuantityChange={handleQuantityChange}
                onPurchase={handlePurchase}
                loading={loadingProductId === product.id}
              />
            ))}
          </div>

          {status.message ? (
            <div
              className={`mt-6 rounded-[22px] border px-5 py-4 text-sm leading-6 sm:text-base ${
                status.tone === 'success'
                  ? 'border-gold/30 bg-gold/10 text-gold'
                  : 'border-red-300/20 bg-red-400/10 text-red-200'
              }`}
            >
              {status.message}
            </div>
          ) : null}
        </Reveal>

        {initialLoading || tickets.length ? (
          <Reveal delay={0.08} className="panel overflow-hidden p-5 sm:p-7 lg:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="eyebrow">Istoric Bilete</span>
                <h2 className="title-lg">Biletele tale</h2>
              </div>
              {initialLoading ? <LoaderCircle size={22} className="animate-spin text-gold" /> : null}
            </div>

            {tickets.length ? (
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="text-lg font-semibold text-white">{ticket.event_name}</div>
                        <div className="mt-1 text-sm text-white/[0.55]">
                          Cumparat la {formatDate(ticket.created_at)}
                        </div>
                      </div>
                      <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">
                        {ticket.status}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      <div>
                        <div className="text-[0.68rem] uppercase tracking-[0.2em] text-white/[0.45]">
                          Nume
                        </div>
                        <div className="mt-1 text-white/[0.78]">{ticket.buyer_name}</div>
                      </div>
                      <div>
                        <div className="text-[0.68rem] uppercase tracking-[0.2em] text-white/[0.45]">
                          Cantitate
                        </div>
                        <div className="mt-1 text-white/[0.78]">{ticket.quantity}</div>
                      </div>
                      <div>
                        <div className="text-[0.68rem] uppercase tracking-[0.2em] text-white/[0.45]">
                          Total
                        </div>
                        <div className="mt-1 text-white/[0.78]">{ticket.total_price} RON</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
