const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactRequest(request, response, next) {
  const { name, email, message } = request.body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return response.status(400).json({
      success: false,
      message: 'Toate câmpurile sunt obligatorii.',
    })
  }

  if (!emailPattern.test(email)) {
    return response.status(400).json({
      success: false,
      message: 'Adresa de email nu este validă.',
    })
  }

  return next()
}
