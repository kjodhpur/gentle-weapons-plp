import Link from 'next/link'
import type { ReactNode } from 'react'

import { ClientLogo } from '@/components/client-logo'
import { Ascii, BracketLink, DisplayHeading, Kicker, Section, TerminalPanel } from '@/components/gw-ui'
import { SiteFooter } from '@/components/sections'
import type { Alternative, ClientConfig, Product } from '@/lib/clients'
import { ALTERNATIVES, PRODUCTS } from '@/lib/clients'
import type { Guide } from '@/lib/subpages'
import { GUIDES, guidesForProduct } from '@/lib/subpages'

const PRODUCT_KEYS = ['gwos', 'poolnet', 'poolboy'] as const

/**
 * Sub-page nav. Mirrors the production sub-page nav, but every destination
 * stays inside this client's own routes — these pages never link out.
 */
function SubNav({ config }: { config: ClientConfig }) {
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
          {/* Same as the landing-page nav: the mark routes to the internal
              index listing every personalized page. */}
          <Link
            href="/"
            aria-label="All personalized pages"
            style={{ display: 'inline-flex', flexShrink: 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo.png"
              alt="Gentle Weapons"
              width={160}
              height={40}
              style={{ display: 'block', width: 'auto', height: 40 }}
            />
          </Link>
          <span style={{ color: 'var(--gw-gray-1)', flexShrink: 0 }}>×</span>
          <ClientLogo
            name={config.clientName}
            mark={config.logoMark}
            src={config.clientLogoSrc}
            website={config.website}
            color={config.accent}
            size={26}
          />
          {/* The mark goes to the index, so the client name is the way back
              to this prospect's own landing page. */}
          <Link
            href={`/${config.slug}`}
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {config.clientName}
          </Link>
          <div className="nav-links" style={{ display: 'none', gap: 4, marginLeft: 8 }}>
            {PRODUCT_KEYS.map((key) => (
              <Link
                key={key}
                href={`/${config.slug}/platform/${key}`}
                className="hover-invert"
                style={{
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  padding: '6px 10px',
                  border: '1px solid transparent',
                }}
              >
                {PRODUCTS[key].name}
              </Link>
            ))}
          </div>
        </div>
        <Link
          href={`/${config.slug}#contact`}
          className="hover-invert"
          style={{
            flexShrink: 0,
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            border: '1px solid #fff',
            padding: '8px 12px',
            whiteSpace: 'nowrap',
          }}
        >
          {config.ctaLabel}
        </Link>
      </div>
    </nav>
  )
}

function SubPageShell({ config, children }: { config: ClientConfig; children: ReactNode }) {
  return (
    <>
      <div className="noise" aria-hidden />
      <SubNav config={config} />
      <main>{children}</main>
      <SiteFooter config={config} />
    </>
  )
}

/** Pill used for category / readiness / location chips. */
function Pill({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <span
      style={{
        fontSize: 10,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        border: `1px solid ${color ?? '#fff'}`,
        padding: '3px 8px',
        color: color ?? '#fff',
      }}
    >
      {children}
    </span>
  )
}

/** [ OK ] capability rows. */
function OkList({ points, accent }: { points: string[]; accent: string }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
      {points.map((point) => (
        <li
          key={point}
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: 14,
            fontSize: 13.5,
            lineHeight: 1.5,
            alignItems: 'baseline',
          }}
        >
          <span style={{ color: accent }}>[ OK ]</span>
          <span style={{ color: 'var(--gw-bone)' }}>{point}</span>
        </li>
      ))}
    </ul>
  )
}

/** A labelled row of internal bracket links. */
function LinkRow({
  label,
  links,
}: {
  label: string
  links: { href: string; text: string }[]
}) {
  if (!links.length) return null
  return (
    <div style={{ borderTop: '1px solid var(--gw-gray-1)', paddingTop: 18 }}>
      <Kicker>&gt; {label}</Kicker>
      <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {links.map((l) => (
          <BracketLink key={l.href} href={l.href}>
            {l.text}
          </BracketLink>
        ))}
      </div>
    </div>
  )
}

const PRODUCT_ASCII: Record<string, string> = {
  gwos: `┌──────────────────────────────┐
│  JETSON ORIN / NX / NANO     │
│  GWOS KERNEL · CUDA 12.x     │
│  IMMUTABLE ROOTFS · A/B      │
│  attested boot · SBOM · TPM  │
└──────────────────────────────┘`,
  poolnet: `NODE_01 ─ NODE_02 ─ NODE_03
      \\     │     /
        NODE_04 ─ NODE_05
link:   p2p, encrypted, mesh
egress: optional · tethered OK`,
  poolboy: `[PAYLOAD] weights.safetensors
    ▼ manifest_signed
[POOLBOY] ─▶ POOLNET ─▶ GWOS
    ├─ canary → wave → fleet
    └─ rollback: last_known_good`,
}

/** Alternatives that argue for a given product. */
function alternativesForProduct(product: string): Alternative[] {
  return (Object.values(ALTERNATIVES) as Alternative[]).filter((a) => a.product === product)
}

export function PlatformPage({ config, product }: { config: ClientConfig; product: Product }) {
  const guides = guidesForProduct(product.key)
  const alts = alternativesForProduct(product.key)

  return (
    <SubPageShell config={config}>
      <Section style={{ borderTop: 'none' }}>
        <Kicker>// PLATFORM · PRODUCT</Kicker>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
          <Pill color={config.accent}>{product.category}</Pill>
          <Pill>{product.readiness}</Pill>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10 lg:gap-12"
          style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div>
              <DisplayHeading size="clamp(56px, 8vw, 110px)" style={{ lineHeight: 0.85 }}>
                {product.name}
              </DisplayHeading>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  marginTop: 16,
                  lineHeight: 1.2,
                }}
              >
                {product.headline}
              </div>
            </div>
            <p style={{ color: 'var(--gw-gray-3)', fontSize: 14.5, lineHeight: 1.7, margin: 0 }}>
              {product.body}
            </p>

            <div style={{ borderLeft: `3px solid ${config.accent}`, paddingLeft: 16 }}>
              <Kicker style={{ color: config.accent }}>
                &gt; FOR {config.clientName.toUpperCase()}
              </Kicker>
              <p style={{ marginTop: 8, color: 'var(--gw-bone)', fontSize: 14.5, lineHeight: 1.65 }}>
                {config.productNotes[product.key]}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--gw-gray-1)', paddingTop: 18 }}>
              <Kicker style={{ marginBottom: 12 }}>&gt; CAPABILITY_SET</Kicker>
              <OkList points={product.capabilities} accent={config.accent} />
            </div>

            <LinkRow
              label="GUIDES"
              links={guides.map((g) => ({ href: `/${config.slug}/${g.key}`, text: g.title }))}
            />
            <LinkRow
              label="ALTERNATIVES"
              links={alts.map((a) => ({
                href: `/${config.slug}/alternatives/${a.key}`,
                text: a.key.replace(/-/g, ' '),
              }))}
            />

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <BracketLink href={`/${config.slug}#contact`}>{config.ctaLabel}</BracketLink>
              <BracketLink href={`/${config.slug}#products`}>full stack</BracketLink>
            </div>
          </div>

          <TerminalPanel title={`${product.key} .sh`}>
            <Ascii>{PRODUCT_ASCII[product.key]}</Ascii>
          </TerminalPanel>
        </div>
      </Section>
    </SubPageShell>
  )
}

export function GuidePage({ config, guide }: { config: ClientConfig; guide: Guide }) {
  const product = PRODUCTS[guide.product]
  const alts = alternativesForProduct(guide.product)

  return (
    <SubPageShell config={config}>
      <Section style={{ borderTop: 'none' }}>
        <Kicker>// CATEGORY · {product.name.toUpperCase()}</Kicker>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
          <Pill color={config.accent}>{product.category}</Pill>
          <Pill>MESA, AZ</Pill>
        </div>

        <DisplayHeading size="clamp(42px, 6vw, 82px)" style={{ marginTop: 22 }}>
          {guide.title}
        </DisplayHeading>
        <p
          style={{
            marginTop: 18,
            color: 'var(--gw-gray-3)',
            fontSize: 15,
            lineHeight: 1.7,
            maxWidth: 720,
          }}
        >
          {guide.intro}
        </p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}>
          <BracketLink href={`/${config.slug}#contact`}>{config.ctaLabel}</BracketLink>
          <BracketLink href={`/${config.slug}/platform/${product.key}`}>
            explore {product.name}
          </BracketLink>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 lg:gap-12"
          style={{ marginTop: 44 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {guide.sections.map((section) => (
              <div key={section.heading}>
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    lineHeight: 1.2,
                    letterSpacing: '0.01em',
                    borderTop: `2px solid ${config.accent}`,
                    paddingTop: 16,
                  }}
                >
                  {section.heading}
                </h2>
                <p
                  style={{
                    marginTop: 12,
                    color: 'var(--gw-gray-3)',
                    fontSize: 14.5,
                    lineHeight: 1.7,
                  }}
                >
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <TerminalPanel title={`${guide.key}.md`}>
              <OkList points={guide.points} accent={config.accent} />
            </TerminalPanel>
            <LinkRow
              label="RELATED_TOPICS"
              links={guide.related.map((k) => ({
                href: `/${config.slug}/${k}`,
                text: GUIDES[k].title,
              }))}
            />
            <LinkRow
              label="ALTERNATIVES"
              links={alts.map((a) => ({
                href: `/${config.slug}/alternatives/${a.key}`,
                text: a.key.replace(/-/g, ' '),
              }))}
            />
          </div>
        </div>
      </Section>
    </SubPageShell>
  )
}

export function AlternativePage({
  config,
  alternative,
}: {
  config: ClientConfig
  alternative: Alternative
}) {
  const product = PRODUCTS[alternative.product]
  const guides = guidesForProduct(alternative.product)
  const siblings = alternativesForProduct(alternative.product).filter(
    (a) => a.key !== alternative.key,
  )

  return (
    <SubPageShell config={config}>
      <Section style={{ borderTop: 'none' }}>
        <Kicker>// ALTERNATIVE · {product.name.toUpperCase()}</Kicker>
        <DisplayHeading size="clamp(34px, 4.6vw, 68px)" style={{ marginTop: 14, color: config.accent }}>
          {alternative.vs}
        </DisplayHeading>
        <DisplayHeading size="clamp(30px, 4vw, 54px)" style={{ marginTop: 18 }}>
          {alternative.counter}
        </DisplayHeading>

        <div
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12"
          style={{ marginTop: 36 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <p style={{ color: 'var(--gw-gray-3)', fontSize: 14.5, lineHeight: 1.7, margin: 0 }}>
              Comparisons describe architectural fit for defense autonomy programs — not benchmarks
              or endorsements. Technical detail is shared under NDA with qualified program partners.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <BracketLink href={`/${config.slug}#contact`}>{config.ctaLabel}</BracketLink>
              <BracketLink href={`/${config.slug}/platform/${product.key}`}>
                explore {product.name}
              </BracketLink>
            </div>
            <LinkRow
              label="CONTINUE_READING"
              links={[
                ...guides.map((g) => ({ href: `/${config.slug}/${g.key}`, text: g.title })),
                ...siblings.map((a) => ({
                  href: `/${config.slug}/alternatives/${a.key}`,
                  text: a.key.replace(/-/g, ' '),
                })),
              ]}
            />
          </div>

          <TerminalPanel title="why_teams_switch">
            <OkList points={alternative.points} accent={config.accent} />
          </TerminalPanel>
        </div>
      </Section>
    </SubPageShell>
  )
}
