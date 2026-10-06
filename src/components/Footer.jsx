import { BRAND } from '../brand'
import Container from './Container'

const SOCIAL = [
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.2" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1Z" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M14.7 10.3 21 3h-2.1l-5.2 6L9.3 3H3l6.7 9.7L3 21h2.1l5.6-6.5L14.6 21H21l-6.3-10.7ZM6.3 4.5h2.2l9.1 15h-2.2L6.3 4.5Z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M14 4c.4 2.6 1.8 4.4 4.4 4.7v2.4c-1.5 0-2.9-.5-4.1-1.3v6.4A6.2 6.2 0 1 1 9.8 10v2.5a3.7 3.7 0 1 0 2.5 3.5V4h1.7Z" />
      </svg>
    ),
  },
]

const FOOTER_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#menu', label: 'Menu' },
  { href: '#about', label: 'About' },
  { href: '#offers', label: 'Offers' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-orange-200/70 bg-ink-950 text-stone-300 dark:border-emerald-900">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <a href="#home" className="inline-flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-zest-500 text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M8 3h8l-1.2 13.2A3.8 3.8 0 0 1 11 20h-.1A3.8 3.8 0 0 1 7.2 16.2L8 3Z" />
              </svg>
            </span>
            <span className="font-display text-2xl font-semibold text-white">{BRAND.name}</span>
          </a>
          <p className="mt-4 max-w-md text-sm leading-relaxed">
            Freshly pressed juices, seasonal combos, and a tasting bar in the heart of Riverside Market.
          </p>
          <div className="mt-5 flex gap-2">
            {SOCIAL.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white transition hover:-translate-y-0.5 hover:border-zest-400 hover:text-zest-400"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zest-400">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zest-400">Hours</p>
          <p className="mt-4 text-sm">Mon–Fri 7:30–20:00</p>
          <p className="text-sm">Sat–Sun 8:00–21:00</p>
          <p className="mt-4 text-sm">{BRAND.email}</p>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-5 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} {BRAND.full}. Pressed with care.
        </Container>
      </div>
    </footer>
  )
}
