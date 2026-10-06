import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Offers from './components/Offers'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ToastStack from './components/ToastStack'
import CartCheckout from './components/CartCheckout'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  useSmoothScroll()

  return (
    <div className="min-h-svh overflow-x-hidden bg-zest-50 font-sans text-ink-900 antialiased dark:bg-grove-950 dark:text-zest-50">
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        Skip to menu
      </a>
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <About />
        <Offers />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <CartCheckout />
      <ToastStack />
    </div>
  )
}
