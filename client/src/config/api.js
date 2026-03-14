const fallbackBaseUrl = '/api'

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || fallbackBaseUrl).replace(
  /\/$/,
  '',
)

export function buildApiUrl(path) {
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
