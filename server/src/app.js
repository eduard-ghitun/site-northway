import cors from 'cors'
import express from 'express'
import { env } from './config/env.js'
import adminRoutes from './routes/adminRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import eventRegistrationRoutes from './routes/eventRegistrationRoutes.js'
import healthRoutes from './routes/healthRoutes.js'
import ticketRoutes from './routes/ticketRoutes.js'

const app = express()

app.use(
  cors({
    origin: env.clientUrl,
  }),
)
app.use(express.json())

app.use('/api', healthRoutes)
app.use('/api', adminRoutes)
app.use('/api', contactRoutes)
app.use('/api', eventRegistrationRoutes)
app.use('/api', ticketRoutes)

app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: `Route not found: ${request.originalUrl}`,
  })
})

export default app
