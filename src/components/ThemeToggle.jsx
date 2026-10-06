import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-orange-200/80 bg-white/80 text-zest-600 shadow-sm transition hover:scale-105 hover:border-zest-400 dark:border-emerald-900 dark:bg-grove-900 dark:text-zest-400 sm:h-10 sm:w-10"
    >
      {isDark ? (
        <svg key="sun" viewBox="0 0 24 24" className="icon-spin-in h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4" />
          <path
            strokeLinecap="round"
            d="M12 3v1.4M12 19.6V21M4.9 4.9l1 1M18.1 18.1l1 1M3 12h1.4M19.6 12H21M4.9 19.1l1-1M18.1 5.9l1-1"
          />
        </svg>
      ) : (
        <svg key="moon" viewBox="0 0 24 24" className="icon-spin-in h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 14.5A8.2 8.2 0 0 1 9.5 4 7.4 7.4 0 1 0 20 14.5Z"
          />
        </svg>
      )}
    </button>
  )
}
