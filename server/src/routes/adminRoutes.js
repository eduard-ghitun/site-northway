import { Router } from 'express'
import {
  banUser,
  getAdminDashboard,
  makeAdminRole,
  removeAdminRole,
  removeAdminUser,
  syncManualAdminUser,
  updateAdminUserProfile,
} from '../controllers/adminController.js'

const router = Router()

router.get('/admin/dashboard', getAdminDashboard)
router.post('/admin/make-admin', makeAdminRole)
router.post('/admin/remove-admin', removeAdminRole)
router.post('/admin/ban-user', banUser)
router.patch('/admin/users', updateAdminUserProfile)
router.post('/admin/users/sync', syncManualAdminUser)
router.delete('/admin/users', removeAdminUser)

export default router
