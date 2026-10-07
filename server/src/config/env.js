import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const serverRoot = path.resolve(__dirname, '..', '..')
const repoRoot = path.resolve(serverRoot, '..')

;[
  path.join(serverRoot, '.env.local'),
  path.join(serverRoot, '.env'),
  path.join(repoRoot, '.env.local'),
  path.join(repoRoot, '.env'),
].forEach((envPath) => {
  dotenv.config({ path: envPath, override: false })
})

export const env = {
  port: Number(process.env.PORT) || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  emailUser: process.env.EMAIL_USER || '',
  emailPass: process.env.EMAIL_PASS || '',
  eventReceiverEmail: process.env.EVENT_RECEIVER_EMAIL || '',
}
