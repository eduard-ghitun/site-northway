import { transporter } from '../config/mailer.js'
import { env } from '../config/env.js'

export async function submitContact(request, response) {
  const { name, email, message } = request.body

  try {
    if (!env.emailUser || !env.emailPass || !env.eventReceiverEmail) {
      console.error('Email configuration is incomplete. Check EMAIL_USER, EMAIL_PASS and EVENT_RECEIVER_EMAIL.')

      return response.status(500).json({
        success: false,
        message: 'Serviciul de email nu este configurat corect.',
      })
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

    return response.status(200).json({
      success: true,
      message: 'Mesajul tău a fost trimis. Revenim către tine cât mai curând.',
    })
  } catch (error) {
    console.error('Failed to send contact email:', error)

    return response.status(500).json({
      success: false,
      message: 'A apărut o eroare la trimiterea emailului. Încearcă din nou.',
    })
  }
}
