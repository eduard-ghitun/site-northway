import { lazy, Suspense, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import IntroLoader from './components/IntroLoader'
import AdminRoute from './components/AdminRoute'
import ProtectedRoute from './components/ProtectedRoute'
import SiteLayout from './layout/SiteLayout'
import useAdaptiveMotion from './hooks/useAdaptiveMotion'
import { AuthProvider } from './providers/AuthProvider'
import { RouteTransitionProvider } from './providers/RouteTransitionProvider'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const EventsPage = lazy(() => import('./pages/EventsPage'))
const MembersPage = lazy(() => import('./pages/MembersPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'))

const pages = [
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/events', element: <EventsPage /> },
  { path: '/members', element: <MembersPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminDashboardPage />
      </AdminRoute>
    ),
  },
  {
    path: '/admin/dashboard',
    element: (
      <AdminRoute>
        <AdminDashboardPage />
      </AdminRoute>
    ),
  },
]

export default function App() {
  const location = useLocation()
  const { useLiteMotion } = useAdaptiveMotion()
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return !window.sessionStorage.getItem('northsidecrew:intro-seen')
  })
  const pageTransition = useMemo(
    () => ({
      initial: useLiteMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: useLiteMotion ? { opacity: 0 } : { opacity: 0, y: -4 },
      transition: {
        duration: useLiteMotion ? 0.16 : 0.24,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    [useLiteMotion],
  )

  const shouldShowIntro = showIntro && !useLiteMotion

  const handleIntroComplete = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('northsidecrew:intro-seen', 'true')
    }

    setShowIntro(false)
  }

  return (
    <>
      <AuthProvider>
        <RouteTransitionProvider>
          <SiteLayout>
            <Suspense fallback={null}>
              <AnimatePresence mode="wait">
                <motion.div key={location.key} {...pageTransition}>
                  <Routes location={location}>
                    {pages.map((page) => (
                      <Route key={page.path} path={page.path} element={page.element} />
                    ))}
                  </Routes>
                </motion.div>
              </AnimatePresence>
            </Suspense>
          </SiteLayout>
        </RouteTransitionProvider>
      </AuthProvider>
      {shouldShowIntro ? <IntroLoader onComplete={handleIntroComplete} /> : null}
    </>
  )
}
