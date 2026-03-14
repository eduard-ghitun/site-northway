import { Router } from 'express'
import { submitEventRegistration } from '../controllers/eventRegistrationController.js'
import { uploadEventImages } from '../middleware/uploadEventImages.js'
import { validateEventRegistrationRequest } from '../middleware/validateEventRegistrationRequest.js'

const router = Router()

router.post(
  '/event-registrations',
  uploadEventImages.array('images', 6),
  validateEventRegistrationRequest,
  submitEventRegistration,
)

export default router
