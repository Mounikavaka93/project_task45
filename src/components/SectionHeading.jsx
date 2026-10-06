import { useInView } from '../hooks/useInView'
import RevealWords from './RevealWords'

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}) {
  const [ref, inView] = useInView()
  const alignment =
    align === 'left' ? 'text-left max-w-2xl' : 'text-center max-w-2xl mx-auto'

  return (
    <div ref={ref} className={alignment}>
      <p
        className={`text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-zest-600 dark:text-zest-400 ${inView ? 'stagger-in' : 'opacity-0'}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-display text-3xl sm:text-4xl lg:text-5xl font-semibold mt-3 text-ink-900 dark:text-zest-50 leading-tight ${inView ? '' : 'opacity-0'}`}
      >
        {inView ? <RevealWords text={title} delay={80} /> : title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed ${inView ? 'stagger-in' : 'opacity-0'}`}
          style={{ '--d': '220ms' }}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
