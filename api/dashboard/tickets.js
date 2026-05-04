import { requireAuthenticatedUser } from '../_lib/auth.js'
import { allowMethods, getJsonBody, sendJson } from '../_lib/request.js'
import { ticketCatalog } from '../_lib/tickets.js'
import { createTicketPurchase, listUserTickets } from '../_lib/supabaseAdmin.js'

function sendTicketError(response, error) {
  const statusCode = error.statusCode || 500
  const message =
    statusCode === 401
      ? 'Autentificare necesara pentru a cumpara bilete.'
      : error.message || 'A aparut o eroare la procesarea biletului.'

  sendJson(response, statusCode, {
    success: false,
    message,
  })
}

export default async function handler(request, response) {
  if (!allowMethods(request, response, ['GET', 'POST'])) {
    return
  }

  try {
    const user = await requireAuthenticatedUser(request)

    if (request.method === 'GET') {
      const tickets = await listUserTickets(user.id)

      sendJson(response, 200, {
        success: true,
        tickets,
        products: Object.values(ticketCatalog),
      })
      return
    }

    const body = getJsonBody(request)
    const { ticketType, quantity } = body || {}
    const product = ticketCatalog[ticketType]

    if (!product) {
      sendJson(response, 400, {
        success: false,
        message: 'Tipul de bilet selectat nu este valid.',
      })
      return
    }

    const parsedQuantity = Number(quantity)

    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1 || parsedQuantity > 10) {
      sendJson(response, 400, {
        success: false,
        message: 'Cantitatea trebuie sa fie intre 1 si 10 bilete.',
      })
      return
    }

    const buyerName =
      user?.user_metadata?.username?.trim() ||
      user?.user_metadata?.full_name?.trim() ||
      user?.user_metadata?.name?.trim() ||
      user?.email?.split('@')[0] ||
      'Membru NorthSideCrew'

    const ticket = await createTicketPurchase({
      user_id: user.id,
      event_name: product.eventName,
      buyer_email: user.email,
      buyer_name: buyerName,
      quantity: parsedQuantity,
      total_price: product.price * parsedQuantity,
      status: product.status,
    })

    sendJson(response, 200, {
      success: true,
      ticket,
      paymentUrl: product.paymentUrl,
    })
  } catch (error) {
    console.error('Failed to handle dashboard tickets:', error)
    sendTicketError(response, error)
  }
}
