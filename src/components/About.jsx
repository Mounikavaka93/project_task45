import SectionHeading from './SectionHeading'
import { useInView } from '../hooks/useInView'
import JuiceImage from './JuiceImage'
import Container from './Container'

const PILLARS = [
  {
    title: 'Pressed, not poured from mix',
    body: 'Fruit is milled and pressed on site. No concentrates, no shelf-stable syrups hiding in the back.',
  },
  {
    title: 'Harvest-led menu',
    body: 'Citrus in winter, mango in late spring, berries when they actually taste like berries. The board moves with the farms.',
  },
  {
    title: 'A mall, not a kiosk',
    body: 'Twelve signature pours, rotating combos, and a tasting counter so you can sip before you commit.',
  },
]

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section id="about" className="overflow-x-hidden bg-white py-16 dark:bg-grove-950 sm:py-20 lg:py-24">
      <Container className="grid items-start gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="relative pb-10 sm:pb-6">
          <div className="blob-morph absolute -left-3 -top-3 h-20 w-20 bg-zest-200 dark:bg-zest-500/20 sm:-left-4 sm:-top-4 sm:h-24 sm:w-24" />
          <div className="relative overflow-hidden rounded-[2rem] shadow-xl">
            <JuiceImage
              src="https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="Fresh citrus, berries, and greens arranged for pressing"
              className="ken-burns h-[320px] w-full object-cover sm:h-[420px]"
            />
          </div>
          <div className="stagger-in absolute bottom-2 right-3 max-w-[220px] rounded-2xl border border-orange-100 bg-white p-4 shadow-lg dark:border-emerald-900 dark:bg-grove-900 sm:bottom-0 sm:right-6" style={{ '--d': '280ms' }}>
            <p className="font-display text-3xl font-semibold text-zest-600">2018</p>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Opened as a two-press stall. Now a full juice mall with a tasting bar.
            </p>
          </div>
        </div>

        <div ref={ref}>
          <SectionHeading
            align="left"
            eyebrow="About us"
            title="We built a juice mall for people who care how fruit tastes"
            subtitle="Naranza started with a borrowed press and a crate of Valencia oranges. We still chase the same thing: juice that tastes like the fruit, served in a space you want to linger in."
          />
          <ul className="mt-8 space-y-5">
            {PILLARS.map((item, index) => (
              <li
                key={item.title}
                className={`flex items-start gap-4 ${inView ? 'stagger-in' : 'opacity-0'}`}
                style={{ '--d': `${180 + index * 120}ms` }}
              >
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-zest-100 text-zest-600 dark:bg-zest-500/15 dark:text-zest-400">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5 9.2 17 19 7" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-ink-900 dark:text-zest-50">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
