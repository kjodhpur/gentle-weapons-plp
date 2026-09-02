import type { CSSProperties, ReactNode } from 'react'

/** 11px / 0.22em uppercase label, e.g. "// SYSTEMS_MANIFEST". */
export function Kicker({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        fontSize: 11,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--gw-gray-3)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/** Display-face section heading. */
export function DisplayHeading({
  children,
  size = 'clamp(36px, 5vw, 64px)',
  style,
}: {
  children: ReactNode
  size?: string
  style?: CSSProperties
}) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        textTransform: 'uppercase',
        fontSize: size,
        lineHeight: 0.92,
        letterSpacing: '-0.01em',
        margin: 0,
        ...style,
      }}
    >
      {children}
    </h2>
  )
}

/** Section header: kicker + heading + lede on the left, § counter on the right. */
export function SectionHead({
  kicker,
  title,
  lede,
  counter,
}: {
  kicker: string
  title: ReactNode
  lede?: string
  counter: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 40,
        gap: 24,
      }}
    >
      {/* Left side may shrink so a wide title wraps rather than pushing the
          § counter onto its own line below the lede. */}
      <div style={{ flex: '1 1 0', minWidth: 0 }}>
        <Kicker>{kicker}</Kicker>
        <DisplayHeading style={{ marginTop: 10 }}>{title}</DisplayHeading>
        {lede && (
          <p
            style={{
              marginTop: 18,
              color: 'var(--gw-gray-3)',
              fontSize: 14.5,
              lineHeight: 1.65,
              maxWidth: 720,
            }}
          >
            {lede}
          </p>
        )}
      </div>
      <span
        style={{
          fontSize: 11,
          letterSpacing: '0.22em',
          color: 'var(--gw-gray-3)',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {counter}
      </span>
    </div>
  )
}

/** Standard section shell: 1280px, hairline top rule. */
export function Section({
  id,
  children,
  className = 'px-4 py-12 md:px-8 md:py-16',
  style,
}: {
  id?: string
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <section
      id={id}
      className={className}
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        borderTop: '1px solid var(--gw-gray-1)',
        ...style,
      }}
    >
      {children}
    </section>
  )
}

/** Offset-shadow CTA: a solid layer sits 8px down-right behind the button. */
export function OffsetButton({
  href,
  children,
  offsetColor = '#fff',
}: {
  href: string
  children: ReactNode
  offsetColor?: string
}) {
  return (
    <a href={href} style={{ position: 'relative', display: 'inline-block' }}>
      <span
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: offsetColor,
          transform: 'translate(8px, 8px)',
        }}
      />
      <span
        style={{
          position: 'relative',
          border: '2px solid #fff',
          background: '#000',
          color: '#fff',
          display: 'inline-block',
          padding: '14px 22px',
          fontSize: 13,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}
      >
        {children}
      </span>
    </a>
  )
}

/** Uppercase bracket link that inverts on hover. */
export function BracketLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="hover-invert"
      style={{
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        background: 'transparent',
        color: '#fff',
        padding: '6px 10px',
        border: '1px solid var(--gw-gray-1)',
      }}
    >
      [ {children} ]
    </a>
  )
}

/** Scrolling ticker bounded by hairlines. Items are duplicated for the loop. */
export function Marquee({ items }: { items: string[] }) {
  const run = [...items, ...items]
  return (
    <div
      style={{
        marginTop: 48,
        overflow: 'hidden',
        borderTop: '1px solid var(--gw-gray-1)',
        borderBottom: '1px solid var(--gw-gray-1)',
        padding: '10px 0',
      }}
    >
      <div className="marquee-track" style={{ color: 'var(--gw-gray-3)', fontSize: 11, letterSpacing: '0.3em' }}>
        {run.map((item, i) => (
          <span key={i}>
            {item}
            <span style={{ color: 'var(--gw-gray-2)', marginLeft: 48 }}>///</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/** Terminal-style panel with a title bar, used for ASCII schematics. */
export function TerminalPanel({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div style={{ border: '1px solid var(--gw-gray-1)', background: 'var(--gw-near-black)', minWidth: 0 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--gw-gray-1)',
          padding: '8px 12px',
          fontSize: 11,
          letterSpacing: '0.22em',
          color: 'var(--gw-gray-3)',
          textTransform: 'uppercase',
        }}
      >
        <span>{title}</span>
        <span style={{ color: 'var(--gw-gray-2)' }}>_ X</span>
      </div>
      <div style={{ padding: '16px 12px', overflowX: 'auto' }}>{children}</div>
    </div>
  )
}

/** Preformatted ASCII art / shell transcript. */
export function Ascii({
  children,
  color,
  size = 11.5,
}: {
  children: string
  color?: string
  size?: number
}) {
  return (
    <pre
      style={{
        margin: 0,
        fontFamily: 'var(--font-mono)',
        fontSize: size,
        lineHeight: 1.5,
        color: color ?? 'var(--gw-gray-3)',
        whiteSpace: 'pre',
      }}
    >
      {children}
    </pre>
  )
}
