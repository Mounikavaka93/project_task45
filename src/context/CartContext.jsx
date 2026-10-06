import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { cartTotals, makeOrderId } from '../utils/checkout'

const CartContext = createContext(null)
const CART_KEY = 'naranza-cart'
const ORDER_KEY = 'naranza-order'

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readJson(CART_KEY, []))
  const [lastOrder, setLastOrder] = useState(() => readJson(ORDER_KEY, null))
  const [toasts, setToasts] = useState([])
  const [open, setOpen] = useState(false)
  const [view, setView] = useState('cart')

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  useEffect(() => {
    if (lastOrder) localStorage.setItem(ORDER_KEY, JSON.stringify(lastOrder))
    else localStorage.removeItem(ORDER_KEY)
  }, [lastOrder])

  const notify = useCallback((message) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`
    setToasts((current) => [...current, { id, message }])
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 2400)
  }, [])

  const openCart = useCallback((nextView = 'cart') => {
    setView(nextView)
    setOpen(true)
  }, [])

  const closeCart = useCallback(() => setOpen(false), [])

  const addItem = useCallback(
    (product) => {
      setItems((current) => {
        const existing = current.find((item) => item.id === product.id)
        if (existing) {
          return current.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
          )
        }
        return [
          ...current,
          {
            id: product.id,
            name: product.name || product.title,
            price: product.price,
            image: product.image,
            qty: 1,
          },
        ]
      })
      notify(`Added ${product.name || product.title} to your cart`)
    },
    [notify],
  )

  const setQty = useCallback((id, qty) => {
    setItems((current) => {
      if (qty < 1) return current.filter((item) => item.id !== id)
      return current.map((item) => (item.id === id ? { ...item, qty } : item))
    })
  }, [])

  const removeItem = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }, [])

  const placeOrder = useCallback((details) => {
    const snapshot = items
    if (!snapshot.length) return null
    const totals = cartTotals(snapshot, details.fulfillment)
    const order = {
      id: makeOrderId(),
      items: snapshot,
      totals,
      fulfillment: details.fulfillment,
      customer: {
        name: details.name,
        phone: details.phone,
        email: details.email,
        address: details.fulfillment === 'delivery' ? details.address : 'Naranza tasting counter',
      },
      payment: {
        method: details.paymentMethod,
        last4: details.last4 || '',
        brand: details.cardBrand || '',
      },
      placedAt: new Date().toISOString(),
      etaMinutes: details.fulfillment === 'delivery' ? 32 : 18,
    }
    setLastOrder(order)
    setItems([])
    setView('tracking')
    notify('Order placed — you can track it live')
    return order
  }, [items, notify])

  const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items])

  const value = useMemo(
    () => ({
      items,
      count,
      addItem,
      setQty,
      removeItem,
      notify,
      toasts,
      open,
      view,
      setView,
      openCart,
      closeCart,
      lastOrder,
      placeOrder,
    }),
    [
      items,
      count,
      addItem,
      setQty,
      removeItem,
      notify,
      toasts,
      open,
      view,
      openCart,
      closeCart,
      lastOrder,
      placeOrder,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart must be used within CartProvider')
  return value
}
