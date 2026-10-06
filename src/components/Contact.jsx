import { useState } from 'react'
import SectionHeading from './SectionHeading'
import { useCart } from '../context/CartContext'
import { BRAND } from '../brand'
import Container from './Container'

const INITIAL = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const { notify } = useCart()

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Please add your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (form.message.trim().length < 8) next.message = 'Tell us a little more (8+ characters).'
    setErrors(next)
    if (Object.keys(next).length) return

    notify('Message received — the tasting bar will write back soon')
    setForm(INITIAL)
  }

  return (
    <section id="contact" className="bg-white py-16 dark:bg-grove-950 sm:py-20 lg:py-24">
      <Container className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Visit & contact"
            title="Come taste, or send a note"
            subtitle="The mall is walk-in friendly. Catering, office crates, and reset packs can be booked from this form."
          />
          <ul className="mt-8 space-y-5 text-sm text-stone-600 dark:text-stone-300">
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-zest-100 text-zest-600 dark:bg-zest-500/15 dark:text-zest-400">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.2" />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-ink-900 dark:text-zest-50">{BRAND.full}</p>
                <p>{BRAND.address}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-zest-100 text-zest-600 dark:bg-zest-500/15 dark:text-zest-400">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" d="M4 6h16v12H4z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-ink-900 dark:text-zest-50">{BRAND.email}</p>
                <p>{BRAND.phone}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-zest-100 text-zest-600 dark:bg-zest-500/15 dark:text-zest-400">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="8" />
                  <path strokeLinecap="round" d="M12 8v4l2.5 1.5" />
                </svg>
              </span>
              <div>
                <p className="font-semibold text-ink-900 dark:text-zest-50">Open daily</p>
                <p>Mon–Fri 7:30–20:00 · Sat–Sun 8:00–21:00</p>
              </div>
            </li>
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="h-full rounded-[1.8rem] border border-orange-100 bg-zest-50 p-6 shadow-sm dark:border-emerald-900 dark:bg-grove-900 sm:p-8"
        >
          <label className="block text-sm font-medium text-ink-900 dark:text-zest-50">
            Name
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              autoComplete="name"
              className="mt-2 w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-stone-800 outline-none transition focus:border-zest-500 focus:ring-2 focus:ring-zest-200 dark:border-emerald-800 dark:bg-grove-950 dark:text-zest-50 dark:focus:ring-zest-500/30"
              placeholder="Your name"
            />
            {errors.name ? <span className="mt-1 block text-xs text-rose-500">{errors.name}</span> : null}
          </label>

          <label className="mt-4 block text-sm font-medium text-ink-900 dark:text-zest-50">
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              autoComplete="email"
              className="mt-2 w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-stone-800 outline-none transition focus:border-zest-500 focus:ring-2 focus:ring-zest-200 dark:border-emerald-800 dark:bg-grove-950 dark:text-zest-50 dark:focus:ring-zest-500/30"
              placeholder="you@email.com"
            />
            {errors.email ? <span className="mt-1 block text-xs text-rose-500">{errors.email}</span> : null}
          </label>

          <label className="mt-4 block text-sm font-medium text-ink-900 dark:text-zest-50">
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              rows={5}
              className="mt-2 w-full resize-none rounded-2xl border border-orange-200 bg-white px-4 py-3 text-stone-800 outline-none transition focus:border-zest-500 focus:ring-2 focus:ring-zest-200 dark:border-emerald-800 dark:bg-grove-950 dark:text-zest-50 dark:focus:ring-zest-500/30"
              placeholder="Catering, a crate, or just a hello…"
            />
            {errors.message ? <span className="mt-1 block text-xs text-rose-500">{errors.message}</span> : null}
          </label>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-ink-900 py-3.5 text-sm font-semibold text-white transition hover:bg-zest-600 dark:bg-zest-500 dark:text-ink-950 dark:hover:bg-zest-400"
          >
            Send message
          </button>
        </form>
      </Container>
    </section>
  )
}
