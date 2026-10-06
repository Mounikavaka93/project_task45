const TAX_RATE = 0.08
const DELIVERY_FEE = 2.5

export function money(value) {
  return `$${value.toFixed(2)}`
}

export function cartTotals(items, fulfillment = 'pickup') {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const tax = subtotal * TAX_RATE
  const delivery = fulfillment === 'delivery' && subtotal > 0 ? DELIVERY_FEE : 0
  const total = subtotal + tax + delivery
  return { subtotal, tax, delivery, total }
}

export function makeOrderId() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5)
  const salt = Math.random().toString(36).toUpperCase().slice(2, 5)
  return `NRZ-${stamp}${salt}`
}

export function formatCardNumber(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
}

export function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length < 3) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export function luhnValid(number) {
  const digits = number.replace(/\D/g, '')
  if (digits.length < 13 || digits.length > 19) return false
  let sum = 0
  let alternate = false
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let n = Number(digits[i])
    if (alternate) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
    alternate = !alternate
  }
  return sum % 10 === 0
}

export function expiryValid(value) {
  const match = /^(\d{2})\/(\d{2})$/.exec(value)
  if (!match) return false
  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  if (month < 1 || month > 12) return false
  const now = new Date()
  const exp = new Date(year, month, 1)
  return exp > now
}

export function getTrackingSteps(order, now = Date.now()) {
  const elapsed = Math.max(0, (now - new Date(order.placedAt).getTime()) / 1000)
  const delivery = order.fulfillment === 'delivery'
  const steps = [
    { id: 'placed', at: 0, label: 'Order placed', detail: 'Payment confirmed and ticket sent to the press.' },
    { id: 'pressing', at: 5, label: 'Pressing juices', detail: 'Fruit is on the mill — bottles filling now.' },
    { id: 'packed', at: 12, label: 'Packed & chilled', detail: 'Sealed, labeled, and waiting on ice.' },
    {
      id: delivery ? 'enroute' : 'ready',
      at: 18,
      label: delivery ? 'Out for delivery' : 'Ready for pickup',
      detail: delivery
        ? 'A rider has your crate. Track live below.'
        : 'Show your order ID at the tasting counter.',
    },
    {
      id: 'done',
      at: 28,
      label: delivery ? 'Delivered' : 'Collected',
      detail: delivery ? 'Enjoy while it is still cold.' : 'Thanks for swinging by Naranza.',
    },
  ]

  return steps.map((step, index) => {
    const isLast = index === steps.length - 1
    const nextAt = steps[index + 1]?.at
    let status = 'upcoming'
    if (isLast && elapsed >= step.at) status = 'complete'
    else if (!isLast && elapsed >= nextAt) status = 'complete'
    else if (elapsed >= step.at) status = 'current'
    return { ...step, status }
  })
}

export function etaLabel(order, now = Date.now()) {
  const placed = new Date(order.placedAt).getTime()
  const eta = placed + order.etaMinutes * 60 * 1000
  const mins = Math.max(0, Math.ceil((eta - now) / 60000))
  if (mins <= 0) return order.fulfillment === 'delivery' ? 'Arriving any moment' : 'Ready now'
  return `${mins} min`
}
