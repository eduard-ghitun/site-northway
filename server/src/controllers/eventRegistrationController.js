export function submitEventRegistration(request, response) {
  const { fullName, email, phone, plateNumber, carModifications } = request.body
  const images = (request.files || []).map((file) => ({
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
  }))

  // Temporary registration handling until persistence or email delivery is added.
  console.log('New event registration:', {
    fullName,
    email,
    phone,
    plateNumber,
    carModifications,
    images,
  })

  response.status(200).json({
    success: true,
    message: 'Înscrierea pentru NorthWay - Edition II a fost trimisă cu succes.',
  })
}
