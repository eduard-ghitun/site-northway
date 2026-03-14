const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactRequest(body) {
  const { name, email, message } = body

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return {
      success: false,
      statusCode: 400,
      message: 'Toate câmpurile sunt obligatorii.',
    }
  }

  if (!emailPattern.test(email)) {
    return {
      success: false,
      statusCode: 400,
      message: 'Adresa de email nu este validă.',
    }
  }

  return {
    success: true,
    statusCode: 200,
    message: '',
  }
}
