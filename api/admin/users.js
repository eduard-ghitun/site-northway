import { requireAdminUser } from '../_lib/auth.js'
import { allowMethods, getJsonBody, sendJson } from '../_lib/request.js'
import { deleteAdminUser, updateAdminUser } from '../_lib/supabaseAdmin.js'

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
  if (!allowMethods(request, response, ['PATCH', 'DELETE'])) {
    return
  }

  try {
    const adminUser = await requireAdminUser(request)
    const { id, full_name, role, status, is_banned } = getJsonBody(request)

    if (!id) {
      sendJson(response, 400, { success: false, message: 'Lipseste ID-ul utilizatorului.' })
      return
    }

    if (adminUser.id === id) {
      if (request.method === 'DELETE') {
        sendJson(response, 400, { success: false, message: 'Nu iti poti sterge propriul cont.' })
        return
      }

      if (status === 'banned' || is_banned === true) {
        sendJson(response, 400, { success: false, message: 'Nu iti poti suspenda propriul cont.' })
        return
      }
    }

    if (request.method === 'PATCH') {
      const user = await updateAdminUser(id, { full_name, role, status, is_banned })

      sendJson(response, 200, {
        success: true,
        user,
      })
      return
    }

    await deleteAdminUser(id)

    sendJson(response, 200, {
      success: true,
    })
  } catch (error) {
    console.error('Failed to mutate admin user:', error)
    sendAdminError(response, error)
  }
}
