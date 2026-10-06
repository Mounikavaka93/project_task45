import { useRef } from 'react'

export default function TiltCard({ children, className = '', max = 9 }) {
  const ref = useRef(null)

  const onMove = (event) => {
    const node = ref.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const box = node.getBoundingClientRect()
    const px = (event.clientX - box.left) / box.width
    const py = (event.clientY - box.top) / box.height
    const rotateX = (py - 0.5) * -max
    const rotateY = (px - 0.5) * max
    node.style.transform = `perspective(920px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const onLeave = () => {
    const node = ref.current
    if (!node) return
    node.style.transform = 'perspective(920px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt-card h-full ${className}`}
    >
      {children}
    </div>
  )
}
