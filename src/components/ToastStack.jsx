import { useCart } from '../context/CartContext'

export default function ToastStack() {
  const { toasts } = useCart()

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[90] flex w-[min(90vw,22rem)] flex-col gap-2">
      {toasts.map((toast) => (
        <p
          key={toast.id}
          className="toast-in rounded-2xl bg-ink-900 px-4 py-3 text-sm font-medium text-white shadow-xl shadow-black/20 dark:bg-zest-500 dark:text-ink-950"
        >
          {toast.message}
        </p>
      ))}
    </div>
  )
}
