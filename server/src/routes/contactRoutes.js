import { Router } from 'express'
import { submitContact } from '../controllers/contactController.js'
import { validateContactRequest } from '../middleware/validateContactRequest.js'

const router = Router()

router.post('/contact', validateContactRequest, submitContact)

export default router
