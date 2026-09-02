'use client'

import { useEffect, useRef, useState } from 'react'

import type { LogoMark } from '@/lib/clients'

/**
 * Client mark in the co-branded lockup.
 *
 * Precedence:
 *   1. `src`     — a real logo file under /public. Always wins.
 *   2. `website` — the company's real favicon, fetched by the visitor's
 *                  browser from a favicon service. Falls through on error.
 *   3. `mark`    — a generated shape, for hypothetical demo companies only.
 *   4. monogram  — neutral initials in a bordered box.
 *
 * A real company never gets a made-up logo attached to its name: it gets its
 * own favicon or the neutral monogram, nothing in between.
 */
export function ClientLogo({
  name,
  mark,
  src,
  website,
  size = 26,
  color,
  title,
}: {
  name: string
  mark?: LogoMark
  src?: string
  website?: string
  size?: number
  color?: string
  title?: string
}) {
  const [remoteFailed, setRemoteFailed] = useState(false)
  const remoteRef = useRef<HTMLImageElement>(null)
  const label = title ?? `${name} logo`

  // If the favicon failed to load before React hydrated, the error event has
  // already fired and onError will never see it. Check the element's state on
  // mount so a pre-hydration failure still falls back to the monogram instead
  // of leaving a broken-image glyph in the lockup.
  useEffect(() => {
    const el = remoteRef.current
    if (el && el.complete && el.naturalWidth === 0) setRemoteFailed(true)
  }, [])

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={label}
        height={size}
        style={{ display: 'block', height: size, width: 'auto', flexShrink: 0 }}
      />
    )
  }

  if (website && !remoteFailed) {
    const domain = website.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={remoteRef}
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
        alt={label}
        width={size}
        height={size}
        onError={() => setRemoteFailed(true)}
        style={{
          display: 'block',
          width: size,
          height: size,
          objectFit: 'contain',
          flexShrink: 0,
          background: '#fff',
          padding: Math.round(size * 0.08),
        }}
      />
    )
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
    return (
      <svg {...common}>
        <circle cx="16" cy="16" r="12" strokeWidth="2" fill="currentColor" fillOpacity="0.08" />
        <ellipse cx="16" cy="16" rx="5.5" ry="12" strokeWidth="1.6" />
        <path d="M4 16 L28 16" strokeWidth="1.6" />
        <circle cx="16" cy="16" r="2.6" fill="currentColor" stroke="none" />
      </svg>
    )
  }

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
