export default function RevealWords({ text, className = '', delay = 0 }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom pb-[0.12em]">
          <span className="word-up inline-block" style={{ '--d': `${delay + index * 70}ms` }}>
            {word}
            {index < text.split(' ').length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </span>
  )
}
