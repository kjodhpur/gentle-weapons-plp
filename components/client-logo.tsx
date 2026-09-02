import type { LogoMark } from '@/lib/clients'

/**
 * Hypothetical marks for the sample prospect companies. These are invented
 * placeholders for invented companies — swap in a real client's mark when
 * one exists. Drawn with currentColor so each takes the client's accent,
 * and kept to simple geometry so they hold up at nav size.
 */
export function ClientLogo({
  mark,
  size = 26,
  color,
  title,
}: {
  mark: LogoMark
  size?: number
  color?: string
  title?: string
}) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    style: { color, display: 'block', flexShrink: 0 },
    role: 'img' as const,
    'aria-label': title,
  }

  if (mark === 'delta') {
    // Vantage Aeronautics — a swept delta planform, climbing.
    return (
      <svg {...common}>
        <path
          d="M16 3 L28 27 L16 21 L4 27 Z"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.12"
        />
        <path d="M16 3 L16 21" strokeWidth="1.5" opacity="0.7" />
      </svg>
    )
  }

  if (mark === 'hull') {
    // Ironline Defense Systems — an armoured plate crossed by one iron line.
    return (
      <svg {...common}>
        <path
          d="M4 11 L11 4 L21 4 L28 11 L28 21 L21 28 L11 28 L4 21 Z"
          strokeWidth="2"
          strokeLinejoin="round"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <path d="M2 16 L30 16" strokeWidth="3" strokeLinecap="square" />
      </svg>
    )
  }

  // Meridian ISR — a globe crossed by its meridian, with a collection fix.
  return (
    <svg {...common}>
      <circle cx="16" cy="16" r="12" strokeWidth="2" fill="currentColor" fillOpacity="0.08" />
      <ellipse cx="16" cy="16" rx="5.5" ry="12" strokeWidth="1.6" />
      <path d="M4 16 L28 16" strokeWidth="1.6" />
      <circle cx="16" cy="16" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  )
}
