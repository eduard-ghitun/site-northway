import { Router } from 'express'
import { getDashboardTickets, purchaseDashboardTicket } from '../controllers/ticketController.js'

const router = Router()

router.get('/dashboard/tickets', getDashboardTickets)
router.post('/dashboard/tickets', purchaseDashboardTicket)

export default router
