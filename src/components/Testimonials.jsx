import { TESTIMONIALS } from '../data/testimonials'
import SectionHeading from './SectionHeading'
import { useInView } from '../hooks/useInView'
import Container from './Container'

function Stars({ count, animate }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${index < count ? 'fill-amber-400' : 'fill-stone-300 dark:fill-stone-600'} ${animate && index < count ? 'stagger-in' : ''}`}
          style={{ '--d': `${index * 90}ms` }}
        >
          <path d="M10 1.5 12.5 7l6 .9-4.3 4.2 1 5.9L10 15.2 4.8 18l1-5.9L1.5 7.9 7.5 7 10 1.5Z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [ref, inView] = useInView()

  return (
    <section id="testimonials" className="bg-gradient-to-b from-zest-50 to-white py-16 dark:from-ink-950 dark:to-grove-950 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Reviews"
          title="What regulars say between sips"
          subtitle="We keep a tasting counter for a reason. Here’s the unfiltered pour from people who come back."
        />

        <div ref={ref} className="mt-12 grid items-stretch gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-4">
          {TESTIMONIALS.map((item, index) => (
            <blockquote
              key={item.id}
              className={`flex h-full flex-col rounded-[1.6rem] border border-orange-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-lg dark:border-emerald-900 dark:bg-grove-900 ${inView ? 'stagger-in' : 'opacity-0'}`}
              style={{ '--d': `${index * 100}ms` }}
            >
              <Stars count={item.rating} animate={inView} />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                “{item.quote}”
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br ${item.accent} text-sm font-bold text-white`}
                >
                  {item.initials}
                </span>
                <div>
                  <cite className="not-italic font-semibold text-ink-900 dark:text-zest-50">{item.name}</cite>
                  <p className="text-xs text-stone-500">{item.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  )
}
