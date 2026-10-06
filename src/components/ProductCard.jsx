import { useCart } from '../context/CartContext'
import JuiceImage from './JuiceImage'
import TiltCard from './TiltCard'

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart()

  return (
    <TiltCard>
      <article
        className="group relative flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-orange-100 bg-white shadow-sm shadow-orange-900/5 stagger-in dark:border-emerald-900/70 dark:bg-grove-900 dark:shadow-black/20"
        style={{ '--d': `${index * 70}ms` }}
      >
        <div className="shine relative overflow-hidden">
          <JuiceImage
            src={product.image}
            alt={product.name}
            className="aspect-[4/3] h-auto w-full object-cover transition duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/45 to-transparent opacity-60 transition duration-500 group-hover:opacity-80" />
          {product.tag ? (
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-zest-600 shadow-sm dark:bg-grove-950/90 dark:text-zest-400">
              {product.tag}
            </span>
          ) : null}
          <span className="absolute right-4 top-4 shrink-0 rounded-full bg-ink-900/90 px-3 py-1 text-sm font-semibold text-white backdrop-blur dark:bg-zest-500 dark:text-ink-950">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-leaf-600 dark:text-leaf-400">
            {product.category}
          </p>
          <h3 className="min-w-0 font-display mt-1 text-xl font-semibold text-ink-900 dark:text-zest-50">
            {product.name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            {product.blurb}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-stone-500">{product.calories} kcal</p>
            <button
              type="button"
              onClick={() => addItem(product)}
              className="btn-press inline-flex items-center gap-1.5 rounded-full bg-zest-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-orange-500/20 hover:bg-zest-600"
            >
              Add
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
        </div>
      </article>
    </TiltCard>
  )
}
