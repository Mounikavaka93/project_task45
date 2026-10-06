import { useRef } from 'react'

export default function MagneticButton({ as = 'a', className = '', children, ...props }) {
  const ref = useRef(null)
  const Tag = as

  const onMove = (event) => {
    const node = ref.current
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const box = node.getBoundingClientRect()
    const x = event.clientX - box.left - box.width / 2
    const y = event.clientY - box.top - box.height / 2
    node.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`
  }

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`magnetic ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
