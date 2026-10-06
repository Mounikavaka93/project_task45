const FRUITS = [
  { label: '🍊', bg: 'from-orange-400 to-amber-500', style: { top: '-8px', left: '50%', marginLeft: '-22px' }, delay: '0s' },
  { label: '🍋', bg: 'from-yellow-300 to-lime-400', style: { top: '50%', right: '-8px', marginTop: '-22px' }, delay: '0.4s' },
  { label: '🍓', bg: 'from-rose-400 to-pink-500', style: { bottom: '-8px', left: '50%', marginLeft: '-22px' }, delay: '0.8s' },
  { label: '🥝', bg: 'from-lime-400 to-emerald-500', style: { top: '50%', left: '-8px', marginTop: '-22px' }, delay: '1.2s' },
]

export default function FruitOrbit() {
  return (
    <div className="pointer-events-none absolute -inset-9 hidden sm:block" aria-hidden="true">
      <div className="orbit relative h-full w-full rounded-full border border-orange-200/40 dark:border-emerald-800/50">
        {FRUITS.map((fruit) => (
          <span key={fruit.label} className="absolute" style={fruit.style}>
            <span className="orbit-fix block">
              <span
                className={`fruit-bob grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br text-lg shadow-lg ${fruit.bg}`}
                style={{ animationDelay: fruit.delay }}
              >
                {fruit.label}
              </span>
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
