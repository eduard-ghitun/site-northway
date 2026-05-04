import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import IntroLoader from './components/IntroLoader'
import AdminRoute from './components/AdminRoute'
import ProtectedRoute from './components/ProtectedRoute'
import SiteLayout from './layout/SiteLayout'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import DashboardPage from './pages/DashboardPage'
import EventsPage from './pages/EventsPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MembersPage from './pages/MembersPage'
import RegisterPage from './pages/RegisterPage'
import { AuthProvider } from './providers/AuthProvider'
import { RouteTransitionProvider } from './providers/RouteTransitionProvider'

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
  const [showIntro, setShowIntro] = useState(true)
  const pageTransition = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -4 },
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  }

  return (
    <>
      <AuthProvider>
        <RouteTransitionProvider>
          <SiteLayout>
            <AnimatePresence mode="wait">
              <motion.div key={location.key} {...pageTransition}>
                <Routes location={location}>
                  {pages.map((page) => (
                    <Route key={page.path} path={page.path} element={page.element} />
                  ))}
                </Routes>
              </motion.div>
            </AnimatePresence>
          </SiteLayout>
        </RouteTransitionProvider>
      </AuthProvider>
      {showIntro ? <IntroLoader onComplete={() => setShowIntro(false)} /> : null}
    </>
  )
}
