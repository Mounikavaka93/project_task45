import { useEffect, useMemo, useState } from 'react'
import { useCart } from '../context/CartContext'
import {
  cartTotals,
  etaLabel,
  expiryValid,
  formatCardNumber,
  formatExpiry,
  getTrackingSteps,
  luhnValid,
  money,
} from '../utils/checkout'
import JuiceImage from './JuiceImage'
import { getSectionScrollTop, smoothScrollTo } from '../hooks/useSmoothScroll'

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  address: '',
  fulfillment: 'pickup',
  paymentMethod: 'card',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  upiId: '',
}

function fieldClass() {
  return 'mt-1.5 w-full rounded-2xl border border-orange-200 bg-white px-4 py-2.5 text-sm text-stone-800 outline-none transition focus:border-zest-500 focus:ring-2 focus:ring-zest-200 dark:border-emerald-800 dark:bg-grove-950 dark:text-zest-50 dark:focus:ring-zest-500/30'
}

export default function CartCheckout() {
  const {
    open,
    closeCart,
    view,
    setView,
    items,
    setQty,
    removeItem,
    lastOrder,
    placeOrder,
  } = useCart()

  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event) => {
      if (event.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open, closeCart])

  const title =
    view === 'checkout' ? 'Checkout' : view === 'tracking' ? 'Order tracking' : 'Your cart'

  return (
    <div
      className={`fixed inset-0 z-[80] flex justify-end transition-[visibility] duration-300 ${
        open ? 'visible' : 'invisible pointer-events-none'
      }`}
    >
      <button
        type="button"
        aria-label="Close cart"
        className={`absolute inset-0 bg-ink-950/45 backdrop-blur-[2px] transition-opacity duration-500 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeCart}
      />
      <aside
        className={`relative flex h-full w-full max-w-md flex-col overflow-hidden bg-zest-50 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:bg-grove-950 sm:max-w-lg ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-orange-200/80 px-5 py-4 dark:border-emerald-900">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zest-600 dark:text-zest-400">
              Naranza
            </p>
            <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-zest-50">{title}</h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="grid h-10 w-10 place-items-center rounded-full border border-orange-200 bg-white text-ink-900 dark:border-emerald-800 dark:bg-grove-900 dark:text-zest-50"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        {lastOrder ? (
          <div className="flex gap-2 border-b border-orange-200/70 px-5 py-3 dark:border-emerald-900">
            <Tab active={view === 'cart' || view === 'checkout'} onClick={() => setView('cart')}>
              Cart
            </Tab>
            <Tab active={view === 'tracking'} onClick={() => setView('tracking')}>
              Track {lastOrder.id}
            </Tab>
          </div>
        ) : null}

        {view === 'cart' ? (
          <CartView
            items={items}
            setQty={setQty}
            removeItem={removeItem}
            onCheckout={() => setView('checkout')}
            onBrowse={() => {
              closeCart()
              const menu = document.querySelector('#menu')
              if (menu) {
                window.setTimeout(() => smoothScrollTo(getSectionScrollTop(menu)), 80)
              }
            }}
          />
        ) : null}
        {view === 'checkout' ? (
          <CheckoutView items={items} onBack={() => setView('cart')} placeOrder={placeOrder} />
        ) : null}
        {view === 'tracking' ? <TrackingView order={lastOrder} /> : null}
      </aside>
    </div>
  )
}

function Tab({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
        active
          ? 'bg-ink-900 text-white dark:bg-zest-500 dark:text-ink-950'
          : 'bg-white text-stone-600 dark:bg-grove-900 dark:text-stone-300'
      }`}
    >
      {children}
    </button>
  )
}

function CartView({ items, setQty, removeItem, onCheckout, onBrowse }) {
  const totals = cartTotals(items, 'pickup')

  if (!items.length) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <p className="font-display text-2xl font-semibold text-ink-900 dark:text-zest-50">Your cart is empty</p>
        <p className="mt-2 text-sm text-stone-500">Add a pour from the menu, then check out here.</p>
        <button
          type="button"
          onClick={onBrowse}
          className="mt-6 rounded-full bg-zest-500 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Browse the menu
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <ul className="space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex gap-3 rounded-2xl border border-orange-100 bg-white p-3 dark:border-emerald-900 dark:bg-grove-900"
            >
              <JuiceImage src={item.image} alt={item.name} className="h-16 w-16 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-ink-900 dark:text-zest-50">{item.name}</p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="text-xs font-semibold text-rose-500"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-sm text-stone-500">{money(item.price)}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="inline-flex items-center rounded-full border border-orange-200 dark:border-emerald-800">
                    <button
                      type="button"
                      className="h-8 w-8 text-lg"
                      onClick={() => setQty(item.id, item.qty - 1)}
                      aria-label={`Decrease ${item.name}`}
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                    <button
                      type="button"
                      className="h-8 w-8 text-lg"
                      onClick={() => setQty(item.id, item.qty + 1)}
                      aria-label={`Increase ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm font-semibold">{money(item.price * item.qty)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-orange-200/80 bg-white px-5 py-4 dark:border-emerald-900 dark:bg-grove-900">
        <Row label="Subtotal" value={money(totals.subtotal)} />
        <Row label="Tax (8%)" value={money(totals.tax)} />
        <Row label="Total" value={money(totals.total)} strong />
        <button
          type="button"
          onClick={onCheckout}
          className="mt-4 w-full rounded-full bg-ink-900 py-3.5 text-sm font-semibold text-white transition hover:bg-zest-600 dark:bg-zest-500 dark:text-ink-950 dark:hover:bg-zest-400"
        >
          Place order · Checkout
        </button>
      </div>
    </>
  )
}

function CheckoutView({ items, onBack, placeOrder }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [paying, setPaying] = useState(false)
  const totals = useMemo(() => cartTotals(items, form.fulfillment), [items, form.fulfillment])

  const update = (event) => {
    const { name, value } = event.target
    let next = value
    if (name === 'cardNumber') next = formatCardNumber(value)
    if (name === 'expiry') next = formatExpiry(value)
    if (name === 'cvv') next = value.replace(/\D/g, '').slice(0, 4)
    if (name === 'phone') next = value.replace(/[^\d+\-\s]/g, '').slice(0, 16)
    setForm((current) => ({ ...current, [name]: next }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!/^[+\d][\d\s-]{8,}$/.test(form.phone)) next.phone = 'Enter a valid phone number.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (form.fulfillment === 'delivery' && form.address.trim().length < 8) {
      next.address = 'Add a delivery address.'
    }
    if (form.paymentMethod === 'card') {
      if (!form.cardName.trim()) next.cardName = 'Name on card is required.'
      if (!luhnValid(form.cardNumber)) next.cardNumber = 'Enter a valid card number.'
      if (!expiryValid(form.expiry)) next.expiry = 'Enter a future expiry (MM/YY).'
      if (!/^\d{3,4}$/.test(form.cvv)) next.cvv = 'Enter a 3 or 4 digit CVV.'
    }
    if (form.paymentMethod === 'upi' && !/^[\w.-]+@[\w.-]+$/.test(form.upiId)) {
      next.upiId = 'Enter a UPI ID like name@bank.'
    }
    setErrors(next)
    if (Object.keys(next).length) return

    setPaying(true)
    window.setTimeout(() => {
      const digits = form.cardNumber.replace(/\D/g, '')
      placeOrder({
        ...form,
        last4: form.paymentMethod === 'card' ? digits.slice(-4) : '',
        cardBrand: form.paymentMethod === 'card' ? cardBrand(digits) : '',
      })
      setPaying(false)
    }, 1100)
  }

  return (
    <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col" noValidate>
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <button type="button" onClick={onBack} className="text-sm font-semibold text-zest-600">
          ← Back to cart
        </button>

        <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-stone-500">Fulfillment</h3>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {[
            { id: 'pickup', label: 'Pickup', hint: 'Ready in ~18 min' },
            { id: 'delivery', label: 'Delivery', hint: `+${money(2.5)} · ~32 min` },
          ].map((option) => (
            <label
              key={option.id}
              className={`cursor-pointer rounded-2xl border p-3 text-sm ${
                form.fulfillment === option.id
                  ? 'border-zest-500 bg-white dark:bg-grove-900'
                  : 'border-orange-200 dark:border-emerald-900'
              }`}
            >
              <input
                type="radio"
                name="fulfillment"
                value={option.id}
                checked={form.fulfillment === option.id}
                onChange={update}
                className="sr-only"
              />
              <span className="font-semibold text-ink-900 dark:text-zest-50">{option.label}</span>
              <span className="mt-0.5 block text-xs text-stone-500">{option.hint}</span>
            </label>
          ))}
        </div>

        <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-stone-500">Your details</h3>
        <label className="mt-3 block text-sm font-medium">
          Full name
          <input name="name" value={form.name} onChange={update} className={fieldClass()} autoComplete="name" />
          <Error text={errors.name} />
        </label>
        <label className="mt-3 block text-sm font-medium">
          Phone
          <input name="phone" value={form.phone} onChange={update} className={fieldClass()} autoComplete="tel" />
          <Error text={errors.phone} />
        </label>
        <label className="mt-3 block text-sm font-medium">
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={update}
            className={fieldClass()}
            autoComplete="email"
          />
          <Error text={errors.email} />
        </label>
        {form.fulfillment === 'delivery' ? (
          <label className="mt-3 block text-sm font-medium">
            Delivery address
            <textarea
              name="address"
              value={form.address}
              onChange={update}
              rows={3}
              className={`${fieldClass()} resize-none`}
            />
            <Error text={errors.address} />
          </label>
        ) : null}

        <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-stone-500">Payment</h3>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {[
            { id: 'card', label: 'Card' },
            { id: 'upi', label: 'UPI' },
            { id: 'cod', label: 'Pay later' },
          ].map((option) => (
            <label
              key={option.id}
              className={`cursor-pointer rounded-2xl border px-2 py-2.5 text-center text-sm font-semibold ${
                form.paymentMethod === option.id
                  ? 'border-zest-500 bg-white dark:bg-grove-900'
                  : 'border-orange-200 dark:border-emerald-900'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={option.id}
                checked={form.paymentMethod === option.id}
                onChange={update}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>

        {form.paymentMethod === 'card' ? (
          <div className="mt-3 space-y-3 rounded-2xl border border-orange-200 bg-white p-4 dark:border-emerald-900 dark:bg-grove-900">
            <p className="text-xs text-stone-500">Demo checkout — use 4242 4242 4242 4242, expiry 12/28, any CVV. No real charge.</p>
            <label className="block text-sm font-medium">
              Name on card
              <input name="cardName" value={form.cardName} onChange={update} className={fieldClass()} />
              <Error text={errors.cardName} />
            </label>
            <label className="block text-sm font-medium">
              Card number
              <input
                name="cardNumber"
                value={form.cardNumber}
                onChange={update}
                inputMode="numeric"
                placeholder="•••• •••• •••• ••••"
                className={fieldClass()}
              />
              <Error text={errors.cardNumber} />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-sm font-medium">
                Expiry
                <input
                  name="expiry"
                  value={form.expiry}
                  onChange={update}
                  placeholder="MM/YY"
                  className={fieldClass()}
                />
                <Error text={errors.expiry} />
              </label>
              <label className="block text-sm font-medium">
                CVV
                <input
                  name="cvv"
                  value={form.cvv}
                  onChange={update}
                  inputMode="numeric"
                  placeholder="123"
                  className={fieldClass()}
                />
                <Error text={errors.cvv} />
              </label>
            </div>
          </div>
        ) : null}

        {form.paymentMethod === 'upi' ? (
          <label className="mt-3 block text-sm font-medium">
            UPI ID
            <input
              name="upiId"
              value={form.upiId}
              onChange={update}
              placeholder="name@upi"
              className={fieldClass()}
            />
            <Error text={errors.upiId} />
          </label>
        ) : null}

        {form.paymentMethod === 'cod' ? (
          <p className="mt-3 rounded-2xl bg-white p-3 text-sm text-stone-600 dark:bg-grove-900 dark:text-stone-300">
            Pay with cash or tap-to-pay when your order is handed over. No card needed now.
          </p>
        ) : null}

        <div className="mt-6 space-y-1 text-sm">
          <Row label="Subtotal" value={money(totals.subtotal)} />
          <Row label="Tax (8%)" value={money(totals.tax)} />
          {form.fulfillment === 'delivery' ? <Row label="Delivery" value={money(totals.delivery)} /> : null}
          <Row label="Amount due" value={money(totals.total)} strong />
        </div>
      </div>

      <div className="border-t border-orange-200/80 bg-white px-5 py-4 dark:border-emerald-900 dark:bg-grove-900">
        <button
          type="submit"
          disabled={paying || !items.length}
          className="w-full rounded-full bg-zest-500 py-3.5 text-sm font-semibold text-white transition hover:bg-zest-600 disabled:opacity-60"
        >
          {paying ? 'Confirming payment…' : `Pay ${money(totals.total)} & place order`}
        </button>
      </div>
    </form>
  )
}

function TrackingView({ order }) {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  if (!order) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 text-center text-sm text-stone-500">
        Place an order to see live tracking.
      </div>
    )
  }

  const steps = getTrackingSteps(order, now)
  const current = steps.find((step) => step.status === 'current') || steps[steps.length - 1]
  const done = steps.every((step) => step.status === 'complete') || current.id === 'done'

  return (
    <div className="flex-1 overflow-y-auto px-5 py-5">
      <div className="relative overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-leaf-500 to-emerald-700 p-5 text-white shadow-lg">
        <span className="splash-ring pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/20" />
        <span className="splash-ring-late pointer-events-none absolute -right-2 top-4 h-16 w-16 rounded-full bg-white/15" />
        <p className="relative text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
          {done ? 'Complete' : current.label}
        </p>
        <p className="relative font-display mt-1 text-3xl font-semibold">
          {done
            ? order.fulfillment === 'delivery'
              ? 'Delivered'
              : 'Ready & collected'
            : 'Order placed'}
        </p>
        <p className="relative mt-1 text-sm text-white/90">
          {order.id} · {etaLabel(order, now)}
        </p>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <Info label="Fulfillment" value={order.fulfillment === 'delivery' ? 'Delivery' : 'Pickup'} />
        <Info
          label="Payment"
          value={
            order.payment.method === 'card'
              ? `${order.payment.brand} •••• ${order.payment.last4}`
              : order.payment.method === 'upi'
                ? 'UPI'
                : 'Pay on handover'
          }
        />
        <Info label="Name" value={order.customer.name} />
        <Info label="Phone" value={order.customer.phone} />
      </dl>
      <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">
        {order.fulfillment === 'delivery' ? 'Delivering to' : 'Pickup at'} {order.customer.address}
      </p>

      <ol className="mt-6 space-y-0">
        {steps.map((step, index) => (
          <li key={step.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={`grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${
                  step.status === 'complete'
                    ? 'bg-leaf-500 text-ink-950'
                    : step.status === 'current'
                      ? 'bg-zest-500 text-white'
                      : 'bg-orange-100 text-stone-400 dark:bg-grove-900'
                }`}
              >
                {step.status === 'complete' ? '✓' : index + 1}
              </span>
              {index < steps.length - 1 ? (
                <span className="w-0.5 flex-1 bg-orange-200 dark:bg-emerald-900" />
              ) : null}
            </div>
            <div className={`pb-5 ${step.status === 'upcoming' ? 'opacity-50' : ''}`}>
              <p className="font-semibold text-ink-900 dark:text-zest-50">{step.label}</p>
              <p className="text-sm text-stone-500">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="rounded-2xl border border-orange-100 bg-white p-4 dark:border-emerald-900 dark:bg-grove-900">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Items</p>
        <ul className="mt-2 space-y-1 text-sm">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>{money(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex justify-between font-semibold">
          <span>Paid</span>
          <span>{money(order.totals.total)}</span>
        </p>
      </div>
    </div>
  )
}

function Row({ label, value, strong }) {
  return (
    <p className={`flex items-center justify-between text-sm ${strong ? 'mt-1 font-semibold' : 'text-stone-600 dark:text-stone-400'}`}>
      <span>{label}</span>
      <span>{value}</span>
    </p>
  )
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-white p-3 dark:bg-grove-900">
      <dt className="text-[11px] uppercase tracking-wider text-stone-500">{label}</dt>
      <dd className="mt-0.5 font-semibold text-ink-900 dark:text-zest-50">{value}</dd>
    </div>
  )
}

function Error({ text }) {
  if (!text) return null
  return <span className="mt-1 block text-xs text-rose-500">{text}</span>
}

function cardBrand(digits) {
  if (digits.startsWith('4')) return 'Visa'
  if (/^5[1-5]/.test(digits)) return 'Mastercard'
  if (/^3[47]/.test(digits)) return 'Amex'
  return 'Card'
}
