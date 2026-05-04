import {
  banAdminUser,
  deleteAdminUser,
  getAuthenticatedAdminUser,
  listAdminUsers,
  makeAdmin,
  removeAdmin,
  listTickets,
  syncAdminUserProfile,
  updateAdminUser,
} from '../lib/supabaseAdmin.js'

function getBearerToken(request) {
  const authorization = request.headers.authorization || ''

  if (!authorization.startsWith('Bearer ')) {
    return null
  }

  return authorization.slice('Bearer '.length).trim()
}

async function requireAdmin(request) {
  const accessToken = getBearerToken(request)

  if (!accessToken) {
    const error = new Error('Unauthorized')
    error.statusCode = 401
    throw error
  }

  return getAuthenticatedAdminUser(accessToken)
}

function sendAdminError(response, error) {
  const statusCode = error.statusCode || 500
  const message =
    statusCode === 403
      ? 'Acces interzis.'
      : statusCode === 401
        ? 'Autentificare necesara.'
        : error.message || 'A aparut o eroare in Admin Dashboard.'

  response.status(statusCode).json({
    success: false,
    message,
  })
}

export async function getAdminDashboard(request, response) {
  try {
    await requireAdmin(request)
    const [users, tickets] = await Promise.all([listAdminUsers(), listTickets()])

    response.status(200).json({
      success: true,
      users,
      tickets,
    })
  } catch (error) {
    console.error('Failed to load admin dashboard:', error)
    sendAdminError(response, error)
  }
}

export async function updateAdminUserProfile(request, response) {
  try {
    const adminUser = await requireAdmin(request)
    const { id, full_name, role, status, is_banned } = request.body || {}

    if (!id) {
      response.status(400).json({ success: false, message: 'Lipseste ID-ul utilizatorului.' })
      return
    }

    if (adminUser.id === id && (status === 'banned' || is_banned === true)) {
      response.status(400).json({ success: false, message: 'Nu iti poti suspenda propriul cont.' })
      return
    }

    const user = await updateAdminUser(id, { full_name, role, status, is_banned })

    response.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    console.error('Failed to update admin user:', error)
    sendAdminError(response, error)
  }
}

export async function syncManualAdminUser(request, response) {
  try {
    await requireAdmin(request)
    const { id, full_name, role, status, is_banned } = request.body || {}

    if (!id) {
      response.status(400).json({ success: false, message: 'UUID-ul utilizatorului este obligatoriu.' })
      return
    }

    const user = await syncAdminUserProfile({ id, full_name, role, status, is_banned })

    response.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    console.error('Failed to sync admin user:', error)
    sendAdminError(response, error)
  }
}

export async function removeAdminUser(request, response) {
  try {
    const adminUser = await requireAdmin(request)
    const { id } = request.body || {}

    if (!id) {
      response.status(400).json({ success: false, message: 'Lipseste ID-ul utilizatorului.' })
      return
    }

    if (adminUser.id === id) {
      response.status(400).json({ success: false, message: 'Nu iti poti sterge propriul cont.' })
      return
    }

    await deleteAdminUser(id)

    response.status(200).json({
      success: true,
    })
  } catch (error) {
    console.error('Failed to delete admin user:', error)
    sendAdminError(response, error)
  }
}

export async function makeAdminRole(request, response) {
  try {
    const adminUser = await requireAdmin(request)
    const { userId } = request.body || {}

    if (!userId) {
      response.status(400).json({ success: false, message: 'Lipseste ID-ul utilizatorului.' })
      return
    }

    if (adminUser.id === userId) {
      response.status(400).json({ success: false, message: 'Contul tau are deja acces de admin.' })
      return
    }

    const user = await makeAdmin(userId)

    response.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    console.error('Failed to make admin:', error)
    sendAdminError(response, error)
  }
}

export async function removeAdminRole(request, response) {
  try {
    const adminUser = await requireAdmin(request)
    const { userId } = request.body || {}

    if (!userId) {
      response.status(400).json({ success: false, message: 'Lipseste ID-ul utilizatorului.' })
      return
    }

    if (adminUser.id === userId) {
      response.status(400).json({
        success: false,
        message: 'Nu iti poti elimina propriul rol de admin din Admin Dashboard.',
      })
      return
    }

    const user = await removeAdmin(userId)

    response.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    console.error('Failed to remove admin:', error)
    sendAdminError(response, error)
  }
}

export async function banUser(request, response) {
  try {
    const adminUser = await requireAdmin(request)
    const { userId } = request.body || {}

    if (!userId) {
      response.status(400).json({ success: false, message: 'Lipseste ID-ul utilizatorului.' })
      return
    }

    if (adminUser.id === userId) {
      response.status(400).json({
        success: false,
        message: 'Nu iti poti suspenda propriul cont din Admin Dashboard.',
      })
      return
    }

    const user = await banAdminUser(userId)

    response.status(200).json({
      success: true,
      user,
    })
  } catch (error) {
    console.error('Failed to ban user:', error)
    sendAdminError(response, error)
  }
}
