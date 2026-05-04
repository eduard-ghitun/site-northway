const fallbackBaseUrl = '/api'
const localDevBaseUrl = 'http://localhost:5000/api'
const isLocalDev =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')

function normalizeApiBaseUrl(value) {
  const normalizedValue = (value || fallbackBaseUrl).replace(/\/$/, '')

  if (
    normalizedValue === '/api' ||
    normalizedValue.endsWith('/api') ||
    normalizedValue.includes('/api/')
  ) {
    return normalizedValue
  }

  return `${normalizedValue}/api`
}

export const API_BASE_URL = normalizeApiBaseUrl(
  import.meta.env.VITE_API_BASE_URL || fallbackBaseUrl,
)

export function buildApiUrl(path) {
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildApiCandidates(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const candidates = isLocalDev
    ? [`${localDevBaseUrl}${normalizedPath}`, `${fallbackBaseUrl}${normalizedPath}`, buildApiUrl(normalizedPath)]
    : [buildApiUrl(normalizedPath), `${fallbackBaseUrl}${normalizedPath}`]

  return [...new Set(candidates.map((value) => value.replace(/([^:]\/)\/+/g, '$1')))]
}

export async function fetchApiWithFallback(path, options = {}) {
  const candidates = buildApiCandidates(path)
  let lastError = null

  for (const candidate of candidates) {
    try {
      const response = await fetch(candidate, options)
      const payload = await response.json().catch(() => ({}))

      if (!response.ok || payload?.success === false) {
        const message = payload?.message || `Request failed for ${candidate}.`
        const error = new Error(message)
        error.payload = payload
        error.status = response.status

        const isMissingRoute =
          response.status === 404 &&
          (isLocalDev || (typeof message === 'string' && message.includes('Route not found:')))

        if (isMissingRoute) {
          lastError = error
          continue
        }

        throw error
      }

      return { response, payload, url: candidate }
    } catch (error) {
      lastError = error
    }
  }

  throw lastError || new Error('API request failed.')
}
