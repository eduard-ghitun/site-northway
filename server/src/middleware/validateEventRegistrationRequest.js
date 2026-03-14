const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEventRegistrationRequest(request, response, next) {
  const { fullName, email, phone, plateNumber, carModifications } = request.body
  const images = request.files || []

  if (
    !fullName?.trim() ||
    !email?.trim() ||
    !phone?.trim() ||
    !plateNumber?.trim() ||
    !carModifications?.trim()
  ) {
    return response.status(400).json({
      success: false,
      message: 'Toate câmpurile formularului sunt obligatorii.',
    })
  }

  if (!emailPattern.test(email)) {
    return response.status(400).json({
      success: false,
      message: 'Adresa de email introdusă nu este validă.',
    })
  }

  if (!images.length) {
    return response.status(400).json({
      success: false,
      message: 'Încarcă cel puțin o imagine cu mașina.',
    })
  }

  return next()
}
