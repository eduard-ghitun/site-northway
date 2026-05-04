import { requireAdminUser } from '../_lib/auth.js'
import { allowMethods, sendJson } from '../_lib/request.js'
import { listAdminUsers, listTickets } from '../_lib/supabaseAdmin.js'

function sendAdminError(response, error) {
  const statusCode = error.statusCode || 500
  const message =
    statusCode === 403
      ? 'Acces interzis.'
      : statusCode === 401
        ? 'Autentificare necesara.'
        : error.message || 'A aparut o eroare in Admin Dashboard.'

  sendJson(response, statusCode, {
    success: false,
    message,
  })
}

export default async function handler(request, response) {
  if (!allowMethods(request, response, ['GET'])) {
    return
  }

  try {
    await requireAdminUser(request)
    const [users, tickets] = await Promise.all([listAdminUsers(), listTickets()])

    sendJson(response, 200, {
      success: true,
      users,
      tickets,
    })
  } catch (error) {
    console.error('Failed to load admin dashboard:', error)
    sendAdminError(response, error)
  }
}
