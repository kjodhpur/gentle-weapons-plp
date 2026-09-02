import type { LogoMark } from '@/lib/clients'

/**
 * Client mark in the co-branded lockup.
 *
 * Precedence: a real logo file (`src`) wins; a generated mark (`mark`) is for
 * hypothetical demo companies only; everything else gets a neutral monogram.
 * The monogram is deliberately generic — a real company never gets a made-up
 * logo attached to its name.
 */
export function ClientLogo({
  name,
  mark,
  src,
  size = 26,
  color,
  title,
}: {
  name: string
  mark?: LogoMark
  src?: string
  size?: number
  color?: string
  title?: string
}) {
  const label = title ?? `${name} logo`

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={label} height={size} style={{ display: 'block', height: size, width: 'auto' }} />
  }

  const common = {
    width: size,
    height: size,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    style: { color, display: 'block', flexShrink: 0 },
    role: 'img' as const,
    'aria-label': label,
  }

  if (mark === 'delta') {
    // Swept delta planform, climbing.
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
    // Armoured plate crossed by one line.
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

  if (mark === 'meridian') {
    // Globe crossed by its meridian, with a fix at centre.
    return (
      <svg {...common}>
        <circle cx="16" cy="16" r="12" strokeWidth="2" fill="currentColor" fillOpacity="0.08" />
        <ellipse cx="16" cy="16" rx="5.5" ry="12" strokeWidth="1.6" />
        <path d="M4 16 L28 16" strokeWidth="1.6" />
        <circle cx="16" cy="16" r="2.6" fill="currentColor" stroke="none" />
      </svg>
    )
  }

  // Neutral monogram: initials in a bordered box, in the accent.
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <span
      role="img"
      aria-label={label}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `1px solid ${color ?? '#fff'}`,
        color: color ?? '#fff',
        fontSize: Math.round(size * 0.42),
        fontWeight: 700,
        letterSpacing: '0.02em',
        lineHeight: 1,
        flexShrink: 0,
      }}
    >
      {initials}
    </span>
  )
}
