import { lazy, Suspense, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import IntroLoader from './components/IntroLoader'
import SiteLayout from './layout/SiteLayout'
import useAdaptiveMotion from './hooks/useAdaptiveMotion'
import { RouteTransitionProvider } from './providers/RouteTransitionProvider'

const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const EventsPage = lazy(() => import('./pages/EventsPage'))
const MembersPage = lazy(() => import('./pages/MembersPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const TermsPage = lazy(() => import('./pages/Terms'))
const PrivacyPage = lazy(() => import('./pages/Privacy'))
const CookiesPage = lazy(() => import('./pages/Cookies'))

const pages = [
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/events', element: <EventsPage /> },
  { path: '/members', element: <MembersPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/terms', element: <TermsPage /> },
  { path: '/privacy', element: <PrivacyPage /> },
  { path: '/cookies', element: <CookiesPage /> },
]

export default function App() {
  const location = useLocation()
  const { useLiteMotion, useReducedEffects, isIOS } = useAdaptiveMotion()
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

  const shouldShowIntro = showIntro && !useReducedEffects && !isIOS

  const handleIntroComplete = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('northsidecrew:intro-seen', 'true')
    }

    setShowIntro(false)
  }

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
      {shouldShowIntro ? <IntroLoader onComplete={handleIntroComplete} /> : null}
      <Analytics />
    </>
  )
}
