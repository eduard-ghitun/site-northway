import { Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { useAuth } from '../providers/AuthProvider'

function AdminRouteContent({ children }) {
  const { isAdmin, isBanned } = useAuth()

  if (isBanned) {
    return <Navigate to="/login?banned=1" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default function AdminRoute({ children }) {
  return (
    <ProtectedRoute>
      <AdminRouteContent>{children}</AdminRouteContent>
    </ProtectedRoute>
  )
}
