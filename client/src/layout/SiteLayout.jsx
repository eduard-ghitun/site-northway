import AmbientBackground from '../components/AmbientBackground'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'

export default function SiteLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-night">
      <AmbientBackground />
      <ScrollToTop />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}
