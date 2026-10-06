import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'
import { useCart } from '../context/CartContext'
import { BRAND } from '../brand'

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#menu', label: 'Menu' },
  { href: '#about', label: 'About' },
  { href: '#offers', label: 'Offers' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')
  const { count, openCart, lastOrder, open: cartOpen } = useCart()

  useEffect(() => {
    const ids = LINKS.map((link) => link.href.slice(1))

    const onScroll = () => {
      setScrolled(window.scrollY > 16)
      const header = document.querySelector('header')
      const marker = window.scrollY + (header?.getBoundingClientRect().height ?? 56) + 12
      let current = 'home'

      ids.forEach((id) => {
        const section = document.getElementById(id)
        if (!section) return
        const top = section.getBoundingClientRect().top + window.scrollY
        if (top <= marker) current = id
      })

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 64) {
        current = 'contact'
      }

      setActive(`#${current}`)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden'
      return undefined
    }
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = cartOpen ? 'hidden' : ''
    }
  }, [open, cartOpen])

  const goCart = (view = 'cart') => {
    setOpen(false)
    openCart(view)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zest-50/90 shadow-lg shadow-orange-900/5 backdrop-blur-xl dark:bg-grove-950/85 dark:shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto grid h-14 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-16 sm:px-6 lg:px-8">
        <a href="#home" className="group flex min-w-0 items-center gap-2.5 justify-self-start">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-zest-500 to-amber-500 text-white shadow-md shadow-orange-500/30 transition group-hover:rotate-6 sm:h-10 sm:w-10">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M8 3h8l-1.2 13.2A3.8 3.8 0 0 1 11 20h-.1A3.8 3.8 0 0 1 7.2 16.2L8 3Z" />
            </svg>
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-semibold sm:text-xl text-ink-900 dark:text-zest-50">
              {BRAND.name}
            </span>
            <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-zest-600 dark:text-zest-400">
              {BRAND.mall}
            </span>
          </span>
        </a>

        <nav className="hidden h-full -translate-y-[3px] items-center gap-0.5 self-center lg:flex" aria-label="Primary">
          {LINKS.map((link) => {
            const isActive = active === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`flex h-9 items-center rounded-full px-3.5 text-sm font-medium leading-none transition ${
                  isActive
                    ? 'bg-white/80 text-zest-600 dark:bg-white/10 dark:text-zest-400'
                    : 'text-stone-700 hover:bg-white/70 hover:text-zest-600 dark:text-stone-200 dark:hover:bg-white/10 dark:hover:text-zest-400'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center justify-end gap-2 justify-self-end">
          {lastOrder ? (
            <button
              type="button"
              onClick={() => goCart('tracking')}
              className="hidden h-9 items-center rounded-full border border-leaf-500/40 bg-leaf-500/15 px-3 text-xs font-semibold leading-none text-leaf-700 transition hover:bg-leaf-500/25 dark:text-leaf-400 sm:inline-flex"
            >
              Track
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => goCart('cart')}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-orange-200/80 bg-white/80 text-ink-800 transition hover:scale-105 dark:border-emerald-900 dark:bg-grove-900 dark:text-zest-50 sm:h-10 sm:w-10"
            aria-label={`Open cart, ${count} items`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 7h14l-1.2 10.2A2 2 0 0 1 15.82 19H8.18a2 2 0 0 1-1.98-1.8L5 7Zm3-3h8"
              />
            </svg>
            {count > 0 ? (
              <span
                key={count}
                className="cart-pop absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-zest-500 px-1 text-[10px] font-bold text-white"
              >
                {count}
              </span>
            ) : null}
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => goCart('cart')}
            className="hidden h-9 items-center rounded-full bg-ink-900 px-4 text-sm font-semibold leading-none text-white shadow-md shadow-stone-900/20 transition hover:-translate-y-0.5 hover:bg-zest-600 dark:bg-zest-500 dark:text-ink-950 dark:hover:bg-zest-400 sm:inline-flex"
          >
            Order now
          </button>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-orange-200/80 bg-white/80 text-ink-900 lg:hidden dark:border-emerald-900 dark:bg-grove-900 dark:text-zest-50 sm:h-10 sm:w-10"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} fixed inset-0 top-14 overflow-y-auto bg-zest-50/96 backdrop-blur-xl transition-opacity duration-300 dark:bg-grove-950/96 sm:top-16`}
        aria-hidden={!open}
      >
        <nav className="mx-auto flex h-full w-full max-w-7xl flex-col gap-2 px-4 py-8 sm:px-6" aria-label="Mobile">
          {LINKS.map((link, index) => {
            const isActive = active === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${index * 60}ms` }}
                className={`reveal rounded-2xl px-4 py-4 font-display text-3xl font-semibold leading-none hover:bg-white/70 dark:hover:bg-white/5 ${
                  isActive ? 'text-zest-600 dark:text-zest-400' : 'text-ink-900 dark:text-zest-50'
                }`}
              >
                {link.label}
              </a>
            )
          })}
          <button
            type="button"
            onClick={() => goCart('cart')}
            className="mt-4 rounded-full bg-zest-500 px-5 py-4 text-center text-lg font-semibold text-white"
          >
            Order now · Cart ({count})
          </button>
        </nav>
      </div>
    </header>
  )
}
