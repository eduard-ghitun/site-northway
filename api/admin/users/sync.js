import { requireAdminUser } from '../../_lib/auth.js'
import { allowMethods, getJsonBody, sendJson } from '../../_lib/request.js'
import { updateAdminUser } from '../../_lib/supabaseAdmin.js'

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
    await requireAdminUser(request)
    const { id, full_name, role, status, is_banned } = getJsonBody(request)

    if (!id) {
      sendJson(response, 400, {
        success: false,
        message: 'UUID-ul utilizatorului este obligatoriu.',
      })
      return
    }

    const user = await updateAdminUser(id, { full_name, role, status, is_banned })

    sendJson(response, 200, {
      success: true,
      user,
    })
  } catch (error) {
    console.error('Failed to sync admin user:', error)
    sendAdminError(response, error)
  }
}
