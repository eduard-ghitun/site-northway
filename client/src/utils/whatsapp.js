export function buildEventRegistrationWhatsAppMessage(formData) {
  return [
    'INSCRIERE EVENIMENT NORTHWAY - SECOND EDITION',
    '',
    'Nume Prenume:',
    formData.fullName.trim(),
    '',
    'Email:',
    formData.email.trim(),
    '',
    'Telefon:',
    formData.phone.trim(),
    '',
    'Numar inmatriculare:',
    formData.plateNumber.trim(),
    '',
    'Username Instagram:',
    formData.instagramUsername.trim(),
    '',
    'Modificari aduse masinii:',
    formData.carModifications.trim(),
  ].join('\n')
}

export function buildWhatsAppUrl(number, message) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}
