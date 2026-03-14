import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: Number(process.env.PORT) || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  emailUser: process.env.EMAIL_USER || '',
  emailPass: process.env.EMAIL_PASS || '',
  eventReceiverEmail: process.env.EVENT_RECEIVER_EMAIL || '',
}
