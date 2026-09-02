import type { ClientConfig, SectionKey } from '@/lib/clients'

const TAB_LABELS: Record<SectionKey, string> = {
  doctrine: 'Doctrine',
  products: 'Products',
  deployment: 'Deployment',
  company: 'Company',
}

/**
 * Sticky nav, co-branded for the prospect. Tabs follow the client's own
 * section order so the nav matches the order of the page beneath it.
 */
export function SiteNav({ config }: { config: ClientConfig }) {
  const tabs = config.sectionOrder.map((key) => ({
    label: TAB_LABELS[key],
    href: `#${key}`,
  }))

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: '#000',
        borderBottom: '2px solid #fff',
      }}
    >
      <div
        className="flex justify-between items-center gap-4 px-4 py-3 md:px-8 md:py-[14px]"
        style={{ maxWidth: 1280, margin: '0 auto' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, minWidth: 0 }}>
          <a
            href="https://gentleweapons.com/"
            aria-label="Gentle Weapons — home"
            style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo.png"
              alt="Gentle Weapons"
              width={160}
              height={40}
              style={{ display: 'block', width: 'auto', height: 40 }}
            />
          </a>

          {/* Co-brand divider + prospect name */}
          <span style={{ color: 'var(--gw-gray-1)', flexShrink: 0 }}>×</span>
          <span style={{ minWidth: 0 }}>
            <span
              style={{
                display: 'block',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {config.clientName}
            </span>
            <span
              style={{
                display: 'block',
                fontSize: 9.5,
                letterSpacing: '0.22em',
                color: config.accent,
                textTransform: 'uppercase',
              }}
            >
              {config.clientDescriptor}
            </span>
          </span>

          <div className="nav-links" style={{ display: 'none', gap: 4, marginLeft: 8 }}>
            {tabs.map((tab) => (
              <a
                key={tab.href}
                href={tab.href}
                className="hover-invert"
                style={{
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  background: 'transparent',
                  color: '#fff',
                  padding: '6px 10px',
                  border: '1px solid transparent',
                }}
              >
                {tab.label}
              </a>
            ))}
            <a
              href="#careers"
              className="hover-invert"
              style={{
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                background: 'transparent',
                color: '#fff',
                padding: '6px 10px',
                border: '1px solid transparent',
              }}
            >
              Careers
            </a>
          </div>
        </div>

        <a
          href="#contact"
          className="hover-invert"
          style={{
            flexShrink: 0,
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            border: '1px solid #fff',
            color: '#fff',
            padding: '8px 12px',
            whiteSpace: 'nowrap',
          }}
        >
          {config.ctaLabel}
        </a>
      </div>
    </nav>
  )
}
