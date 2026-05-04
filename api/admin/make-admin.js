import { requireAdminUser } from '../_lib/auth.js'
import { allowMethods, getJsonBody, sendJson } from '../_lib/request.js'
import { makeAdmin } from '../_lib/supabaseAdmin.js'

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
  if (!allowMethods(request, response, ['POST'])) {
    return
  }

  try {
    const adminUser = await requireAdminUser(request)
    const { userId } = getJsonBody(request)

    if (!userId) {
      sendJson(response, 400, { success: false, message: 'Lipseste ID-ul utilizatorului.' })
      return
    }

    if (adminUser.id === userId) {
      sendJson(response, 400, { success: false, message: 'Contul tau are deja acces de admin.' })
      return
    }

    const user = await makeAdmin(userId)

    sendJson(response, 200, {
      success: true,
      user,
    })
  } catch (error) {
    console.error('Failed to make admin:', error)
    sendAdminError(response, error)
  }
}
