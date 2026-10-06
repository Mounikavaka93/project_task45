const DROPS = [
  { left: '8%', delay: '0s', dur: '4.6s', color: '#fb923c', size: 10 },
  { left: '22%', delay: '1.1s', dur: '5.2s', color: '#f97316', size: 7 },
  { left: '41%', delay: '0.4s', dur: '4.1s', color: '#4ade80', size: 8 },
  { left: '63%', delay: '1.8s', dur: '5.6s', color: '#fb7185', size: 9 },
  { left: '78%', delay: '0.7s', dur: '4.8s', color: '#fbbf24', size: 6 },
  { left: '91%', delay: '2.2s', dur: '5.1s', color: '#fb923c', size: 11 },
]

export default function JuiceDrops() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {DROPS.map((drop) => (
        <span
          key={`${drop.left}-${drop.delay}`}
          className="drip absolute top-0 rounded-full"
          style={{
            left: drop.left,
            width: drop.size,
            height: drop.size * 1.35,
            background: `radial-gradient(circle at 30% 30%, #fff7, ${drop.color})`,
            '--delay': drop.delay,
            '--dur': drop.dur,
          }}
        />
      ))}
    </div>
  )
}
