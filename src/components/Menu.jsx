import { useMemo, useState } from 'react'
import { CATEGORIES, PRODUCTS } from '../data/menu'
import ProductCard from './ProductCard'
import SectionHeading from './SectionHeading'
import Container from './Container'

export default function Menu() {
  const [category, setCategory] = useState('All')

  const items = useMemo(
    () => (category === 'All' ? PRODUCTS : PRODUCTS.filter((item) => item.category === category)),
    [category],
  )

  return (
    <section id="menu" className="relative bg-white py-16 dark:bg-grove-950 sm:py-20 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="The juice bar"
          title="A mall of flavors, poured to order"
          subtitle="Filter by mood — citrus, berry, tropical, greens, or a clean detox line. Every bottle is pressed in small batches."
        />

        <div className="mt-10 flex justify-start gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center">
          {CATEGORIES.map((item) => {
            const active = item === category
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  active
                    ? 'bg-ink-900 text-white shadow-md dark:bg-zest-500 dark:text-ink-950'
                    : 'border border-orange-200 bg-zest-50 text-stone-700 hover:border-zest-400 dark:border-emerald-900 dark:bg-grove-900 dark:text-stone-200'
                }`}
              >
                {item}
              </button>
            )
          })}
        </div>

        <div className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((product, index) => (
            <ProductCard key={`${category}-${product.id}`} product={product} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}
