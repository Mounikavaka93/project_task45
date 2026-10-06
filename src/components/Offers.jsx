import { OFFERS } from '../data/offers'
import SectionHeading from './SectionHeading'
import { useCart } from '../context/CartContext'
import { useInView } from '../hooks/useInView'
import JuiceImage from './JuiceImage'
import Container from './Container'

export default function Offers() {
  const featured = OFFERS.find((offer) => offer.featured)
  const rest = OFFERS.filter((offer) => !offer.featured)
  const { addItem, openCart } = useCart()
  const [ref, inView] = useInView()

  const claim = (offer) => {
    addItem({
      id: offer.id,
      name: offer.title,
      price: offer.price,
      image: offer.image,
    })
    openCart('cart')
  }

  return (
    <section id="offers" className="relative overflow-hidden bg-zest-50 py-16 dark:bg-ink-950 sm:py-20 lg:py-24">
      <div className="pointer-events-none blob-morph absolute -right-24 top-10 h-64 w-64 bg-zest-300/40 blur-3xl dark:bg-zest-500/10" />
      <Container>
        <SectionHeading
          eyebrow="Specials"
          title="Combos worth sharing"
          subtitle="Stack a citrus with a green, grab a family crate, or start a three-day reset. Offers rotate with the harvest."
        />

        <div ref={ref} className="mt-12 grid items-stretch gap-6 lg:grid-cols-12">
          {featured ? (
            <article
              className={`group relative min-h-[340px] overflow-hidden rounded-[2rem] lg:col-span-7 lg:min-h-full ${inView ? 'stagger-in' : 'opacity-0'}`}
            >
              <JuiceImage
                src={featured.image}
                alt={featured.title}
                className="ken-burns absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
              <div className="relative z-10 flex h-full min-h-[340px] flex-col justify-end p-6 sm:p-8 lg:min-h-[28rem]">
                <span className="w-fit rounded-full bg-leaf-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-950">
                  {featured.save}
                </span>
                <h3 className="font-display mt-3 text-3xl font-semibold text-white sm:text-4xl">
                  {featured.title}
                </h3>
                <p className="mt-2 max-w-md text-sm text-stone-200">{featured.detail}</p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-white">
                    <span className="font-display text-3xl font-semibold">${featured.price.toFixed(2)}</span>
                    <span className="ml-2 text-sm text-stone-300 line-through">${featured.was.toFixed(2)}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => claim(featured)}
                    className="btn-press rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-900"
                  >
                    Claim combo
                  </button>
                </div>
              </div>
            </article>
          ) : null}

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {rest.map((offer, index) => (
              <article
                key={offer.id}
                className={`group flex min-h-[7.5rem] overflow-hidden rounded-[1.6rem] border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-emerald-900 dark:bg-grove-900 ${inView ? 'stagger-in' : 'opacity-0'}`}
                style={{ '--d': `${120 + index * 90}ms` }}
              >
                <JuiceImage
                  src={offer.image}
                  alt={offer.title}
                  className="h-auto w-28 shrink-0 self-stretch object-cover transition duration-500 group-hover:scale-110 sm:w-32"
                />
                <div className="flex min-w-0 flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-zest-600">
                        {offer.subtitle}
                      </p>
                      <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-zest-50">
                        {offer.title}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-full bg-zest-100 px-2 py-1 text-[11px] font-bold text-zest-600 dark:bg-zest-500/20 dark:text-zest-400">
                      {offer.save}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm text-stone-600 dark:text-stone-400">{offer.detail}</p>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                    <p className="text-sm font-semibold text-ink-900 dark:text-zest-50">
                      ${offer.price.toFixed(2)}{' '}
                      <span className="font-normal text-stone-400 line-through">${offer.was.toFixed(2)}</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => claim(offer)}
                      className="shrink-0 text-sm font-semibold text-zest-600 transition hover:text-zest-500 dark:text-zest-400"
                    >
                      Add pack
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
