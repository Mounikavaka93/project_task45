import { useEffect } from 'react'

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

export function smoothScrollTo(targetY, duration) {
  const start = window.scrollY
  const distance = targetY - start
  if (Math.abs(distance) < 2) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    window.scrollTo(0, targetY)
    return
  }

  const time = duration ?? Math.min(1200, Math.max(520, Math.abs(distance) * 0.5))
  const origin = performance.now()

  const step = (now) => {
    const t = Math.min(1, (now - origin) / time)
    window.scrollTo(0, start + distance * easeInOutCubic(t))
    if (t < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

export function getSectionScrollTop(node) {
  if (!node) return 0
  if (node.id === 'home') return 0

  const navHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 56
  const paddingTop = Number.parseFloat(window.getComputedStyle(node).paddingTop) || 0
  const gap = 8
  const offset = navHeight + gap - paddingTop
  return Math.max(0, node.getBoundingClientRect().top + window.scrollY - offset)
}

export function useSmoothScroll() {
  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest('a[href^="#"]')
      if (!link || event.defaultPrevented || event.button !== 0) return
      if (link.target === '_blank') return

      const hash = link.getAttribute('href')
      if (!hash || hash === '#') return

      const node = document.querySelector(hash)
      if (!node) return

      event.preventDefault()
      smoothScrollTo(getSectionScrollTop(node))
      history.replaceState(null, '', hash)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
