export function getJsonBody(request) {
  if (!request.body) {
    return {}
  }

  if (typeof request.body === 'string') {
    try {
      return JSON.parse(request.body)
    } catch {
      return {}
    }
  }

  return request.body
}

export function sendJson(response, statusCode, payload) {
  response.status(statusCode).json(payload)
}

export function allowMethods(request, response, methods) {
  if (methods.includes(request.method)) {
    return true
  }

  response.setHeader('Allow', methods.join(', '))
  sendJson(response, 405, {
    success: false,
    message: 'Method Not Allowed',
  })
  return false
}
