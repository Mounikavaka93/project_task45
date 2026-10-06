import { useState } from 'react'

export default function JuiceImage({ src, alt, className, loading = 'lazy' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-zest-400 via-amber-400 to-leaf-500 ${className}`}
      >
        <span className="px-4 text-center font-display text-lg font-semibold text-white/90">{alt}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      {...(loading === 'eager' ? { fetchPriority: 'high' } : {})}
    />
  )
}
