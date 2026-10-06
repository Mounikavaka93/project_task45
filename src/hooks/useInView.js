import { useEffect, useRef, useState } from 'react'

export function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const show = () => setInView(true)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced || typeof IntersectionObserver === 'undefined') {
      show()
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show()
          observer.disconnect()
        }
      },
      { threshold: 0.01, rootMargin: '80px 0px 80px 0px' },
    )

    observer.observe(node)
    const fallback = window.setTimeout(show, 700)

    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])

  return [ref, inView]
}
