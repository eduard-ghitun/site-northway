import { lazy, Suspense, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import SiteLayout from './layout/SiteLayout'
import useAdaptiveMotion from './hooks/useAdaptiveMotion'
import { RouteTransitionProvider } from './providers/RouteTransitionProvider'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const EventsPage = lazy(() => import('./pages/EventsPage'))
const EventDetailPage = lazy(() => import('./pages/EventDetailPage'))
const LastCallPage = lazy(() => import('./pages/LastCallPage'))
const CrewRidePage = lazy(() => import('./pages/CrewRidePage'))
const MembersPage = lazy(() => import('./pages/MembersPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const TermsPage = lazy(() => import('./pages/Terms'))
const PrivacyPage = lazy(() => import('./pages/Privacy'))
const CookiesPage = lazy(() => import('./pages/Cookies'))

const pages = [
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/events', element: <EventsPage /> },
  { path: '/events/last-call-2026', element: <LastCallPage /> },
  { path: '/crew-ride', element: <CrewRidePage /> },
  { path: '/events/:eventSlug', element: <EventDetailPage /> },
  { path: '/members', element: <MembersPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/terms', element: <TermsPage /> },
  { path: '/privacy', element: <PrivacyPage /> },
  { path: '/cookies', element: <CookiesPage /> },
]

export default function App() {
  const location = useLocation()
  const { useLiteMotion, useReducedEffects } = useAdaptiveMotion()
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

  return (
    <>
      <RouteTransitionProvider>
        <SiteLayout>
          <Suspense fallback={null}>
            {useReducedEffects ? (
              <Routes location={location}>
                {pages.map((page) => (
                  <Route key={page.path} path={page.path} element={page.element} />
                ))}
              </Routes>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div key={location.key} {...pageTransition}>
                  <Routes location={location}>
                    {pages.map((page) => (
                      <Route key={page.path} path={page.path} element={page.element} />
                    ))}
                  </Routes>
                </motion.div>
              </AnimatePresence>
            )}
          </Suspense>
        </SiteLayout>
      </RouteTransitionProvider>
      <Analytics />
    </>
  )
}
