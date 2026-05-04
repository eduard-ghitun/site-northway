import { getAuthenticatedAdminUser, getAuthenticatedUser } from './supabaseAdmin.js'

export function getBearerToken(request) {
  const authorization = request.headers.authorization || ''

  if (!authorization.startsWith('Bearer ')) {
    return null
  }

  return authorization.slice('Bearer '.length).trim()
}

export async function requireAuthenticatedUser(request) {
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

export async function requireAdminUser(request) {
  const accessToken = getBearerToken(request)

  if (!accessToken) {
    const error = new Error('Unauthorized')
    error.statusCode = 401
    throw error
  }

  return getAuthenticatedAdminUser(accessToken)
}
