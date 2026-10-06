import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'

export default function CountUp({ end, suffix = '', decimals = 0, duration = 1400 }) {
  const [ref, inView] = useInView()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setValue(end)
      return undefined
    }

    let frame = 0
    const origin = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - origin) / duration)
      const eased = 1 - (1 - t) ** 3
      setValue(end * eased)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, end, duration])

  const shown = decimals ? value.toFixed(decimals) : Math.round(value)

  return (
    <span ref={ref}>
      {shown}
      {suffix}
    </span>
  )
}
