import Link from 'next/link'

import { ClientLogo } from '@/components/client-logo'
import { Ascii, DisplayHeading, Kicker, TerminalPanel } from '@/components/gw-ui'
import { clients, getClient, PRODUCT_COLORS, PRODUCTS } from '@/lib/clients'
import { prospectPhoto } from '@/lib/photos'
import { initials, OPEN_ROLES, PROSPECTS, prospectPath, prospectsForClient } from '@/lib/prospects'

const STAGES = [
  {
    n: '01',
    label: 'SOURCE',
    title: 'Contact identified',
    lines: ['Name · title · company', 'From a prospect list', 'or a LinkedIn export'],
  },
  {
    n: '02',
    label: 'MATCH',
    title: 'Company resolved',
    lines: ['Employer string matched', 'to a client config', 'in lib/clients.ts'],
  },
  {
    n: '03',
    label: 'RESOLVE',
    title: 'Variants selected',
    lines: ['Accent · lead product', 'Section order · competitor', 'CTA label'],
  },
  {
    n: '04',
    label: 'EMIT',
    title: 'Pages generated',
    lines: ['A page per contact', 'plus the company site', 'at a distinct URL'],
  },
]

/** Stable per-name angle so placeholder gradients vary without being random. */
function gradientAngle(name: string): number {
  let h = 0
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 360
  return h
}

// Pipeline stages cycle the three product colors, as the site does.
const STAGE_COLORS = [
  PRODUCT_COLORS.gwos,
  PRODUCT_COLORS.poolnet,
  PRODUCT_COLORS.poolboy,
  PRODUCT_COLORS.gwos,
]

// The worked example the pipeline transcript walks through.
const EXAMPLE_SLUG = 'scout-ai'
const EXAMPLE_CONTACT = 'Colby Adcock'

function Stage({ stage, accent }: { stage: (typeof STAGES)[number]; accent: string }) {
  return (
    <div style={{ padding: '22px 20px', minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 30,
            lineHeight: 1,
            color: accent,
          }}
        >
          {stage.n}
        </span>
        <Kicker style={{ fontSize: 10 }}>{stage.label}</Kicker>
      </div>
      <div
        style={{
          marginTop: 12,
          fontSize: 17,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
        }}
      >
        {stage.title}
      </div>
      <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
        {stage.lines.map((line) => (
          <div key={line} style={{ fontSize: 14, color: 'var(--gw-gray-3)', lineHeight: 1.55 }}>
            <span style={{ color: 'var(--gw-gray-2)', marginRight: 8 }}>▸</span>
            {line}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * One prospect row. The name links out to LinkedIn — a verified profile where
 * we have one, otherwise a LinkedIn search for the name and company, marked as
 * such. The URL on the right links to the page that contact would receive.
 */
function ProspectRow({
  name,
  title,
  slug,
  path,
  accent,
  photo,
  linkedin,
  verified,
  highlight,
}: {
  name: string
  title: string
  slug: string
  /** This person's own page. */
  path: string
  accent: string
  /** Headshot under /public/people, when one has been supplied. */
  photo?: string
  linkedin: string
  verified: boolean
  highlight?: boolean
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto minmax(0,1fr) auto',
        gap: 14,
        alignItems: 'center',
        padding: '16px 20px',
        borderTop: '1px solid var(--gw-gray-1)',
        background: highlight ? 'rgba(255,255,255,0.03)' : 'transparent',
      }}
    >
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo}
          alt={name}
          width={42}
          height={42}
          style={{
            width: 42,
            height: 42,
            objectFit: 'cover',
            border: `1px solid ${accent}`,
            // Keep headshots inside the site's monochrome system.
            filter: 'grayscale(1) contrast(1.08)',
            flexShrink: 0,
            display: 'block',
          }}
        />
      ) : (
        // No headshot supplied: a gradient tile in the accent, angled per
        // person so neighbouring placeholders do not look identical.
        <span
          aria-hidden
          style={{
            width: 42,
            height: 42,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${accent}`,
            background: `linear-gradient(${gradientAngle(name)}deg, ${accent} 0%, ${accent}55 45%, #111 100%)`,
            color: '#000',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.02em',
            flexShrink: 0,
          }}
        >
          {initials(name)}
        </span>
      )}
      <span style={{ minWidth: 0 }}>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          title={verified ? 'LinkedIn profile' : 'LinkedIn search — profile not verified'}
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: 10,
            fontSize: 16.5,
            fontWeight: 700,
            letterSpacing: '0.02em',
            textDecoration: 'underline',
            textDecorationColor: 'var(--gw-gray-1)',
            textUnderlineOffset: 4,
          }}
        >
          {name}
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 400,
              letterSpacing: '0.18em',
              color: verified ? accent : 'var(--gw-gray-2)',
              textTransform: 'uppercase',
            }}
          >
            {verified ? 'in ↗' : 'search ↗'}
          </span>
        </a>
        <span
          style={{
            display: 'block',
            marginTop: 5,
            fontSize: 12.5,
            color: 'var(--gw-gray-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            lineHeight: 1.45,
          }}
        >
          {title}
        </span>
      </span>
      <Link
        href={path}
        className="hover-invert"
        style={{
          fontSize: 13,
          letterSpacing: '0.12em',
          color: accent,
          whiteSpace: 'nowrap',
          flexShrink: 0,
          padding: '8px 10px',
          border: '1px solid var(--gw-gray-1)',
        }}
      >
        /{slug}/for/… →
      </Link>
    </div>
  )
}

export function LeadFlow() {
  const example = getClient(EXAMPLE_SLUG)
  const exampleContact = PROSPECTS.find((p) => p.name === EXAMPLE_CONTACT)

  return (
    <>
      <header
        style={{ borderBottom: '2px solid #fff', background: '#000', position: 'sticky', top: 0, zIndex: 40 }}
      >
        <div
          className="flex justify-between items-center gap-4 px-4 py-3 md:px-8 md:py-[14px]"
          style={{ maxWidth: 1280, margin: '0 auto' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo.png"
            alt="Gentle Weapons"
            width={160}
            height={40}
            style={{ display: 'block', width: 'auto', height: 40 }}
          />
          <span
            style={{
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--gw-gray-3)',
            }}
          >
            PLP_INDEX · INTERNAL
          </span>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section
          className="px-4 py-12 md:px-8 md:py-20"
          style={{ maxWidth: 1280, margin: '0 auto' }}
        >
          <Kicker>// LEAD_ROUTING</Kicker>
          <DisplayHeading
            size="clamp(42px, 6vw, 92px)"
            style={{ marginTop: 14, maxWidth: 900 }}
          >
            One prospect list in.
            <br />
            A tailored site each out.
          </DisplayHeading>
          <p
            style={{
              marginTop: 20,
              color: 'var(--gw-gray-3)',
              fontSize: 16.5,
              lineHeight: 1.7,
              maxWidth: 720,
            }}
          >
            A contact&apos;s employer decides which page they receive. Match the company, and the
            accent, lead product, section order, competitor comparison, and CTA all follow from one
            config entry — no page is authored by hand.
          </p>
        </section>

        {/* Pipeline */}
        <section
          className="px-4 py-12 md:px-8 md:py-16"
          style={{ maxWidth: 1280, margin: '0 auto', borderTop: '1px solid var(--gw-gray-1)' }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: 12,
              marginBottom: 26,
            }}
          >
            <div>
              <Kicker>// ROUTING_PIPELINE</Kicker>
              <DisplayHeading style={{ marginTop: 10 }}>How a lead becomes a link.</DisplayHeading>
            </div>
            <span style={{ fontSize: 11, letterSpacing: '0.22em', color: 'var(--gw-gray-3)' }}>
              4 STAGES
            </span>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
            style={{ border: '1px solid var(--gw-gray-1)', gap: 1, background: 'var(--gw-gray-1)' }}
          >
            {STAGES.map((stage, i) => (
              <div key={stage.n} style={{ background: '#000' }}>
                <Stage stage={stage} accent={STAGE_COLORS[i]} />
              </div>
            ))}
          </div>

          {/* Worked example, read from live config so it cannot drift. */}
          {example && exampleContact && (
            <div style={{ marginTop: 26 }}>
              <TerminalPanel title="plp_resolve.sh">
                <Ascii color="var(--gw-bone)" size={13.5}>{`$ plp resolve --contact "${exampleContact.name}" --company "${example.clientName}"

  [ 01 ] SOURCE   name: ${exampleContact.name} · title: ${exampleContact.title}
  [ 02 ] MATCH    "${example.clientName}"  ──▶  ${example.slug}
  [ 03 ] RESOLVE  accent: ${example.accent}   lead: ${PRODUCTS[example.productOrder[0]].name}
                  competitor: ${example.competitor}   cta: ${example.ctaLabel}
                  sections: ${example.sectionOrder.join(' → ')}
                  reader: ${exampleContact.role} → ${exampleContact.role === 'technical' ? 'stack + rollback bullets' : 'program-readiness bullets'}
  [ 04 ] EMIT     1 page for ${exampleContact.name.split(' ')[0]} + company page + 16 sub-pages

$ → ${prospectPath(exampleContact)}  [ READY ]`}</Ascii>
              </TerminalPanel>
              <p
                style={{
                  marginTop: 14,
                  fontSize: 13.5,
                  color: 'var(--gw-gray-2)',
                  lineHeight: 1.6,
                  maxWidth: 720,
                }}
              >
                Illustrative. Matching is currently by company name against the client registry —
                connecting a live CRM or LinkedIn export would replace stage 01 only; stages 02–04
                already run at build time.
              </p>
            </div>
          )}
        </section>

        {/* Contacts by company */}
        <section
          className="px-4 py-12 md:px-8 md:py-16"
          style={{ maxWidth: 1280, margin: '0 auto', borderTop: '1px solid var(--gw-gray-1)' }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: 12,
              marginBottom: 26,
            }}
          >
            <div>
              <Kicker>// TARGET_CONTACTS</Kicker>
              <DisplayHeading style={{ marginTop: 10 }}>Who gets which page.</DisplayHeading>
              <p
                style={{
                  marginTop: 16,
                  color: 'var(--gw-gray-3)',
                  fontSize: 16,
                  lineHeight: 1.7,
                  maxWidth: 760,
                }}
              >
                Publicly named leadership at {clients.length} Series A defense-autonomy companies,
                taken from each company&apos;s own funding announcements. Titles checked September
                2026. Names link to LinkedIn — a verified profile where marked{' '}
                <span style={{ color: 'var(--gw-bone)' }}>in</span>, otherwise a LinkedIn search, so
                no profile is guessed. Company names link to their sites; the URL on each row is that
                person&apos;s own page — greeted by name, with bullets for their role.
              </p>
            </div>
            <span style={{ fontSize: 11, letterSpacing: '0.22em', color: 'var(--gw-gray-3)' }}>
              {PROSPECTS.length} CONTACTS · {clients.length} COMPANIES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {clients.map((client) => (
              <div key={client.slug} style={{ border: '1px solid var(--gw-gray-1)', minWidth: 0 }}>
                <div style={{ padding: '20px 20px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <ClientLogo
                      name={client.clientName}
                      mark={client.logoMark}
                      src={client.clientLogoSrc}
                      website={client.website}
                      color={PRODUCT_COLORS[client.productOrder[0]]}
                      size={32}
                    />
                    <a
                      href={client.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={client.website}
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.02em',
                        minWidth: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textDecoration: 'underline',
                        textDecorationColor: 'var(--gw-gray-1)',
                        textUnderlineOffset: 4,
                      }}
                    >
                      {client.clientName}
                      <span
                        style={{
                          marginLeft: 8,
                          fontSize: 9.5,
                          fontWeight: 400,
                          letterSpacing: '0.18em',
                          color: 'var(--gw-gray-2)',
                        }}
                      >
                        ↗
                      </span>
                    </a>
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      fontSize: 12,
                      letterSpacing: '0.18em',
                      color: PRODUCT_COLORS[client.productOrder[0]],
                      textTransform: 'uppercase',
                    }}
                  >
                    {client.round}
                  </div>
                  <div
                    style={{
                      marginTop: 5,
                      fontSize: 11.5,
                      letterSpacing: '0.16em',
                      color: 'var(--gw-gray-3)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {client.clientDescriptor} · leads with{' '}
                    {PRODUCTS[client.productOrder[0]].name} · {client.ctaLabel}
                  </div>
                  <p
                    style={{
                      marginTop: 12,
                      fontSize: 15,
                      color: 'var(--gw-gray-3)',
                      lineHeight: 1.6,
                    }}
                  >
                    {client.fit}
                  </p>
                </div>
                {prospectsForClient(client.slug).map((p) => (
                  <ProspectRow
                    key={p.name}
                    name={p.name}
                    title={p.title}
                    slug={client.slug}
                    path={prospectPath(p)}
                    accent={PRODUCT_COLORS[client.productOrder[0]]}
                    photo={prospectPhoto(p)}
                    linkedin={p.linkedin}
                    verified={p.linkedinVerified}
                    highlight={p.name === EXAMPLE_CONTACT}
                  />
                ))}
                {OPEN_ROLES[client.slug]?.length ? (
                  <div
                    style={{
                      borderTop: '1px solid var(--gw-gray-1)',
                      padding: '14px 20px',
                      fontSize: 12.5,
                      color: 'var(--gw-gray-3)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: 'var(--gw-gray-3)' }}>&gt; ALSO_FIND </span>
                    {OPEN_ROLES[client.slug].join(' · ')}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <p style={{ marginTop: 26, fontSize: 13.5, color: 'var(--gw-gray-2)', lineHeight: 1.7 }}>
            Adding a company means one entry in <code>lib/clients.ts</code>; its 17 pages build at{' '}
            <code>/&lt;slug&gt;</code> automatically. Contacts and their sources live in{' '}
            <code>lib/prospects.ts</code>.
          </p>
        </section>
      </main>

      <footer
        className="px-4 py-6 md:px-8 md:py-7"
        style={{ maxWidth: 1280, margin: '0 auto', borderTop: '1px solid var(--gw-gray-1)' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            fontSize: 11,
            letterSpacing: '0.14em',
            color: 'var(--gw-gray-2)',
            textTransform: 'uppercase',
          }}
        >
          <span>© 2026 Gentle Systems, Inc. · All rights reserved.</span>
          <span>Internal · not indexed</span>
        </div>
      </footer>
    </>
  )
}
