import { env } from './_lib/env.js'
import { transporter } from './_lib/mailer.js'
import { allowMethods, getJsonBody, sendJson } from './_lib/request.js'
import { validateContactRequest } from './_lib/validateContactRequest.js'

export default async function handler(request, response) {
  if (!allowMethods(request, response, ['POST'])) {
    return
  }

  const body = getJsonBody(request)
  const validation = validateContactRequest(body)

  if (!validation.success) {
    sendJson(response, validation.statusCode, {
      success: false,
      message: validation.message,
    })
    return
  }

  const { name, email, message } = body

  try {
    if (!env.emailUser || !env.emailPass || !env.eventReceiverEmail) {
      console.error('Email configuration is incomplete. Check EMAIL_USER, EMAIL_PASS and EVENT_RECEIVER_EMAIL.')

      sendJson(response, 500, {
        success: false,
        message: 'Serviciul de email nu este configurat corect.',
      })
      return
    }

    const emailText = [
      'Mesaj nou primit din pagina Contact Us',
      '',
      'Nume:',
      name,
      '',
      'Email:',
      email,
      '',
      'Mesaj:',
      message,
    ].join('\n')

    await transporter.sendMail({
      from: `"NorthSideCrew Contact Us" <${env.emailUser}>`,
      to: env.eventReceiverEmail,
      replyTo: email,
      subject: 'Mesaj nou din formularul Contact Us',
      text: emailText,
    })

    console.log('New contact request:', {
      name,
      email,
      message,
    })

    sendJson(response, 200, {
      success: true,
      message: 'Mesajul tău a fost trimis. Revenim către tine cât mai curând.',
    })
  } catch (error) {
    console.error('Failed to send contact email:', error)

    sendJson(response, 500, {
      success: false,
      message: 'A apărut o eroare la trimiterea emailului. Încearcă din nou.',
    })
  }
}
