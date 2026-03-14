import { allowMethods, sendJson } from './_lib/request.js'

export default function handler(request, response) {
  if (!allowMethods(request, response, ['GET'])) {
    return
  }

  sendJson(response, 200, {
    success: true,
    message: 'Server is running',
  })
}
