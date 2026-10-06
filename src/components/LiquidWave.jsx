export default function LiquidWave() {
  return (
    <div className="relative -mb-px h-14 overflow-hidden text-ink-900 sm:h-16 dark:text-zest-500" aria-hidden="true">
      <svg className="wave-shift h-full w-[200%]" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path
          fill="currentColor"
          d="M0,40 C180,70 360,10 540,40 C720,70 900,10 1080,40 C1260,70 1380,20 1440,36 L1440,80 L0,80 Z"
        />
        <path
          fill="currentColor"
          className="opacity-70"
          d="M1440,48 C1620,78 1800,18 1980,48 C2160,78 2340,18 2520,48 C2700,78 2820,28 2880,44 L2880,80 L1440,80 Z"
        />
      </svg>
    </div>
  )
}
