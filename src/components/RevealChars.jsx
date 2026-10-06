export default function RevealChars({ text, className = '', delay = 0 }) {
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span key={`${char}-${index}`} className="inline-block overflow-hidden align-bottom pb-[0.12em]">
          <span className="word-up inline-block" style={{ '--d': `${delay + index * 32}ms` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </span>
  )
}
