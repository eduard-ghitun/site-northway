import { ticketCatalog } from '../config/tickets.js'
import {
  createTicketPurchase,
  getAuthenticatedUser,
  listUserTickets,
} from '../lib/supabaseAdmin.js'

function getBearerToken(request) {
  const authorization = request.headers.authorization || ''

  if (!authorization.startsWith('Bearer ')) {
    return null
  }

  return authorization.slice('Bearer '.length).trim()
}

function sendTicketError(response, error) {
  const statusCode = error.statusCode || 500
  const message =
    statusCode === 401
      ? 'Autentificare necesara pentru a cumpara bilete.'
      : error.message || 'A aparut o eroare la procesarea biletului.'

  response.status(statusCode).json({
    success: false,
    message,
  })
}

async function requireAuthenticatedUser(request) {
  const accessToken = getBearerToken(request)

  if (!accessToken) {
    const error = new Error('Unauthorized')
    error.statusCode = 401
    throw error
  }

  const user = await getAuthenticatedUser(accessToken)

  if (!user) {
    const error = new Error('Unauthorized')
    error.statusCode = 401
    throw error
  }

  return user
}

export async function getDashboardTickets(request, response) {
  try {
    const user = await requireAuthenticatedUser(request)
    const tickets = await listUserTickets(user.id)

    response.status(200).json({
      success: true,
      tickets,
      products: Object.values(ticketCatalog),
    })
  } catch (error) {
    console.error('Failed to load dashboard tickets:', error)
    sendTicketError(response, error)
  }
}

export async function purchaseDashboardTicket(request, response) {
  try {
    const user = await requireAuthenticatedUser(request)
    const { ticketType, quantity } = request.body || {}
    const product = ticketCatalog[ticketType]

    if (!product) {
      response.status(400).json({
        success: false,
        message: 'Tipul de bilet selectat nu este valid.',
      })
      return
    }

    const parsedQuantity = Number(quantity)

    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1 || parsedQuantity > 10) {
      response.status(400).json({
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

    response.status(200).json({
      success: true,
      ticket,
      paymentUrl: product.paymentUrl,
    })
  } catch (error) {
    console.error('Failed to purchase ticket:', error)
    sendTicketError(response, error)
  }
}
