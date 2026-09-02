import Link from 'next/link'

import { Kicker } from '@/components/gw-ui'
import { clients } from '@/lib/clients'

export default function Home() {
  return (
    <>
      <div className="noise" aria-hidden />
      <main
        className="px-4 py-12 md:px-8 md:py-20"
        style={{ maxWidth: 1280, margin: '0 auto', minHeight: '100vh' }}
      >
        <Kicker>// PLP_INDEX · INTERNAL</Kicker>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            textTransform: 'uppercase',
            fontSize: 'clamp(42px, 6vw, 92px)',
            lineHeight: 0.9,
            letterSpacing: '-0.015em',
            margin: '14px 0 0',
          }}
        >
          Personalized
          <br />
          landing pages.
        </h1>
        <p
          style={{
            marginTop: 20,
            color: 'var(--gw-gray-3)',
            fontSize: 14.5,
            lineHeight: 1.7,
            maxWidth: 620,
          }}
        >
          One page per prospective client. Each carries the Gentle Weapons layout with its own
          accent, co-branded lockup, section order, lead product, and CTA.
        </p>

        <div style={{ marginTop: 40, border: '1px solid var(--gw-gray-1)' }}>
          {clients.map((client, i) => (
            <Link
              key={client.slug}
              href={`/${client.slug}`}
              className="hover-invert"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0,1fr) auto',
                gap: 16,
                alignItems: 'center',
                padding: '20px 22px',
                borderTop: i === 0 ? 'none' : '1px solid var(--gw-gray-1)',
              }}
            >
              <span style={{ minWidth: 0 }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: 17,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                  }}
                >
                  {client.clientName}
                </span>
                <span
                  style={{
                    display: 'block',
                    marginTop: 6,
                    fontSize: 10.5,
                    letterSpacing: '0.22em',
                    color: 'var(--gw-gray-2)',
                    textTransform: 'uppercase',
                  }}
                >
                  {client.clientDescriptor} · leads with {client.productOrder[0]} ·{' '}
                  {client.ctaLabel}
                </span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
                <span
                  aria-hidden
                  style={{ width: 12, height: 12, background: client.accent, display: 'block' }}
                />
                <span style={{ fontSize: 12, letterSpacing: '0.18em', color: 'var(--gw-gray-3)' }}>
                  /{client.slug}
                </span>
              </span>
            </Link>
          ))}
        </div>

        <p style={{ marginTop: 28, fontSize: 11.5, color: 'var(--gw-gray-2)', lineHeight: 1.7 }}>
          Add a prospect by appending an entry to <code>lib/clients.ts</code> — the page builds
          automatically at <code>/&lt;slug&gt;</code>.
        </p>
      </main>
    </>
  )
}
