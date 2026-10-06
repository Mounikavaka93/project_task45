import { useEffect, useRef, useState } from 'react'
import JuiceImage from './JuiceImage'
import Container from './Container'
import JuiceDrops from './JuiceDrops'
import RevealChars from './RevealChars'
import CountUp from './CountUp'
import MagneticButton from './MagneticButton'
import TiltCard from './TiltCard'
import FruitOrbit from './FruitOrbit'
import LiquidWave from './LiquidWave'

const MARQUEE = [
  'Cold-pressed daily',
  'No concentrates',
  'Farm citrus',
  'Seasonal combos',
  'Glass bottles',
  'Same-day pickup',
  'Plant-powered',
  'Zero syrups',
]

export default function Hero() {
  const scene = useRef(null)
  const stage = useRef(null)
  const [spot, setSpot] = useState({ x: 68, y: 32 })

  useEffect(() => {
    const node = scene.current
    if (!node) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    const onScroll = () => {
      node.style.transform = `translate3d(0, ${window.scrollY * 0.1}px, 0)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onMove = (event) => {
    const box = stage.current?.getBoundingClientRect()
    if (!box) return
    setSpot({
      x: ((event.clientX - box.left) / box.width) * 100,
      y: ((event.clientY - box.top) / box.height) * 100,
    })
  }

  return (
    <section id="home" ref={stage} onMouseMove={onMove} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="blob-morph absolute -left-24 top-10 h-72 w-72 bg-zest-300/50 blur-3xl dark:bg-zest-500/20" />
        <div
          className="blob-morph absolute right-0 top-32 h-80 w-80 bg-leaf-400/30 blur-3xl dark:bg-leaf-500/10"
          style={{ animationDelay: '-4s' }}
        />
        <div
          className="absolute inset-0 transition-[background] duration-200"
          style={{
            background: `radial-gradient(520px circle at ${spot.x}% ${spot.y}%, rgba(249,115,22,0.22), transparent 55%)`,
          }}
        />
        <JuiceDrops />
      </div>

      <Container className="relative grid items-center gap-10 pb-20 pt-20 sm:gap-12 sm:pt-24 lg:grid-cols-2 lg:gap-16 lg:pb-24 lg:pt-28">
        <div className="max-w-xl lg:max-w-none">
          <p className="stagger-in inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zest-600 shadow-sm dark:border-emerald-900 dark:bg-grove-900 dark:text-zest-400">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-leaf-500" />
            Pressed this morning
          </p>
          <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.05] text-ink-900 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-zest-50">
            <RevealChars text="Squeeze the day." />
            <span
              className="stagger-in mt-2 block bg-gradient-to-r from-zest-600 via-amber-500 to-leaf-600 bg-clip-text text-transparent gradient-flow dark:from-zest-400 dark:via-amber-300 dark:to-leaf-400"
              style={{ '--d': '420ms' }}
            >
              Sip something brilliant.
            </span>
          </h1>
          <svg className="mt-3 h-8 w-40 text-zest-500" viewBox="0 0 160 32" fill="none" aria-hidden="true">
            <path
              className="dash-draw"
              d="M4 18 C28 6, 52 30, 80 14 S132 4, 156 20"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <p
            className="stagger-in mt-4 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg dark:text-stone-300"
            style={{ '--d': '500ms' }}
          >
            Naranza is a juice mall built around peak-season fruit, cold-pressed
            bottles, and combos you can actually finish. Bright citrus, deep
            berries, and greens that still taste like a treat.
          </p>
          <div className="stagger-in mt-8 flex flex-wrap items-center gap-3" style={{ '--d': '620ms' }}>
            <MagneticButton
              href="#menu"
              className="btn-press inline-flex items-center gap-2 rounded-full bg-zest-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 hover:bg-zest-600"
            >
              Explore the menu
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </MagneticButton>
            <MagneticButton
              href="#offers"
              className="btn-press inline-flex items-center rounded-full border border-stone-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-ink-900 hover:border-zest-400 hover:text-zest-600 dark:border-emerald-800 dark:bg-grove-900 dark:text-zest-50"
            >
              Today&apos;s offers
            </MagneticButton>
          </div>
          <dl className="stagger-in mt-10 grid grid-cols-3 gap-3 border-t border-orange-200/70 pt-6 dark:border-emerald-900 sm:gap-6" style={{ '--d': '740ms' }}>
            <div>
              <dt className="text-[11px] uppercase leading-tight tracking-wider text-stone-500 sm:text-xs">Bottles / day</dt>
              <dd className="font-display mt-1 text-2xl font-semibold text-ink-900 dark:text-zest-50">
                <CountUp end={400} suffix="+" />
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase leading-tight tracking-wider text-stone-500 sm:text-xs">Fruit partners</dt>
              <dd className="font-display mt-1 text-2xl font-semibold text-ink-900 dark:text-zest-50">
                <CountUp end={18} />
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase leading-tight tracking-wider text-stone-500 sm:text-xs">Avg. rating</dt>
              <dd className="font-display mt-1 text-2xl font-semibold text-ink-900 dark:text-zest-50">
                <CountUp end={4.9} decimals={1} />
              </dd>
            </div>
          </dl>
        </div>

        <div ref={scene} className="relative mx-auto w-full max-w-lg lg:mx-0 lg:ml-auto">
          <FruitOrbit />
          <div className="absolute -left-6 top-8 fruit-bob hidden h-16 w-16 rounded-full bg-gradient-to-br from-amber-300 to-zest-500 shadow-lg sm:block" />
          <div className="absolute -right-4 bottom-16 float-y hidden h-12 w-12 rounded-full bg-gradient-to-br from-leaf-400 to-emerald-600 shadow-lg sm:block" style={{ animationDelay: '0.8s' }} />

          <TiltCard max={8}>
            <div className="shine shine-loop relative overflow-hidden rounded-[2.2rem] border border-white/60 bg-white/50 p-3 shadow-2xl shadow-orange-900/10 backdrop-blur dark:border-emerald-900/60 dark:bg-grove-900/60">
              <JuiceImage
                src="https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Glasses of freshly poured orange juice on a sunlit counter"
                loading="eager"
                className="ken-burns h-[420px] w-full rounded-[1.7rem] object-cover sm:h-[480px]"
              />
              <div className="stagger-in absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 rounded-2xl bg-white/90 p-3 shadow-lg backdrop-blur sm:bottom-8 sm:left-8 sm:right-8 sm:p-4 dark:bg-grove-950/90" style={{ '--d': '820ms' }}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zest-600">House pour</p>
                  <p className="font-display text-lg font-semibold text-ink-900 dark:text-zest-50">Sunset Orange</p>
                </div>
                <p className="shrink-0 rounded-full bg-ink-900 px-3 py-1 text-sm font-semibold text-white dark:bg-zest-500 dark:text-ink-950">
                  $4.99
                </p>
              </div>
            </div>
          </TiltCard>
        </div>
      </Container>

      <LiquidWave />

      <div className="marquee-pause relative border-y border-orange-200/80 bg-ink-900 py-3 text-zest-50 dark:border-emerald-900 dark:bg-zest-500 dark:text-ink-950">
        <div className="overflow-hidden">
          <div className="marquee-track flex w-max gap-10 whitespace-nowrap px-6 text-sm font-semibold uppercase tracking-[0.22em]">
            {[...MARQUEE, ...MARQUEE].map((item, index) => (
              <span key={`${item}-${index}`} className="flex items-center gap-10">
                {item}
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-leaf-400 dark:bg-ink-900" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
