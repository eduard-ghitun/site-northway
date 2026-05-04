import { LoaderCircle } from 'lucide-react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'

function RouteLoader({ message }) {
  return (
    <section className="section-space">
      <div className="container-shell">
        <div className="panel flex min-h-[18rem] flex-col items-center justify-center gap-4 px-6 py-10 text-center">
          <LoaderCircle size={28} className="animate-spin text-gold" />
          <p className="max-w-xl text-base leading-7 text-white/[0.68] sm:text-lg sm:leading-8">
            {message}
          </p>
        </div>
      </div>
    </section>
  )
}

export default function ProtectedRoute({ children }) {
  const location = useLocation()
  const { user, loading, isBanned } = useAuth()

  if (loading) {
    return <RouteLoader message="Verificam rapid sesiunea ta NorthSideCrew." />
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (isBanned) {
    return <Navigate to="/login?banned=1" replace />
  }

  return children
}
