import Link from 'next/link'

import { ClientLogo } from '@/components/client-logo'
import { Ascii, DisplayHeading, Kicker, TerminalPanel } from '@/components/gw-ui'
import { clients, getClient, PRODUCTS } from '@/lib/clients'
import { initials, OPEN_ROLES, PROSPECTS, prospectsForClient } from '@/lib/prospects'

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
    lines: ['One landing page', 'plus 16 sub-pages', 'at a distinct URL'],
  },
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
            fontSize: 26,
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
          fontSize: 15,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
        }}
      >
        {stage.title}
      </div>
      <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
        {stage.lines.map((line) => (
          <div key={line} style={{ fontSize: 12.5, color: 'var(--gw-gray-3)', lineHeight: 1.5 }}>
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
  accent,
  linkedin,
  verified,
  highlight,
}: {
  name: string
  title: string
  slug: string
  accent: string
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
        padding: '14px 16px',
        borderTop: '1px solid var(--gw-gray-1)',
        background: highlight ? 'rgba(255,255,255,0.03)' : 'transparent',
      }}
    >
      <span
        aria-hidden
        style={{
          width: 34,
          height: 34,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `1px solid ${accent}`,
          color: accent,
          fontSize: 12,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {initials(name)}
      </span>
      <span style={{ minWidth: 0 }}>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          title={verified ? 'LinkedIn profile' : 'LinkedIn search — profile not verified'}
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: 8,
            fontSize: 14,
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
              fontSize: 9.5,
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
            marginTop: 4,
            fontSize: 10.5,
            color: 'var(--gw-gray-2)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            lineHeight: 1.45,
          }}
        >
          {title}
        </span>
      </span>
      <Link
        href={`/${slug}`}
        className="hover-invert"
        style={{
          fontSize: 11.5,
          letterSpacing: '0.14em',
          color: accent,
          whiteSpace: 'nowrap',
          flexShrink: 0,
          padding: '6px 8px',
          border: '1px solid var(--gw-gray-1)',
        }}
      >
        /{slug} →
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
              fontSize: 14.5,
              lineHeight: 1.7,
              maxWidth: 660,
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
                <Stage stage={stage} accent={clients[i % clients.length].accent} />
              </div>
            ))}
          </div>

          {/* Worked example, read from live config so it cannot drift. */}
          {example && exampleContact && (
            <div style={{ marginTop: 26 }}>
              <TerminalPanel title="plp_resolve.sh">
                <Ascii color="var(--gw-bone)">{`$ plp resolve --contact "${exampleContact.name}" --company "${example.clientName}"

  [ 01 ] SOURCE   name: ${exampleContact.name} · title: ${exampleContact.title}
  [ 02 ] MATCH    "${example.clientName}"  ──▶  ${example.slug}
  [ 03 ] RESOLVE  accent: ${example.accent}   lead: ${PRODUCTS[example.productOrder[0]].name}
                  competitor: ${example.competitor}   cta: ${example.ctaLabel}
                  sections: ${example.sectionOrder.join(' → ')}
  [ 04 ] EMIT     1 landing page + 16 sub-pages

$ → /${example.slug}  [ READY ]`}</Ascii>
              </TerminalPanel>
              <p
                style={{
                  marginTop: 14,
                  fontSize: 12,
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
                  fontSize: 14,
                  lineHeight: 1.65,
                  maxWidth: 700,
                }}
              >
                Publicly named leadership at {clients.length} Series A defense-autonomy companies,
                taken from each company&apos;s own funding announcements. Titles checked September
                2026. Names link to LinkedIn — a verified profile where marked{' '}
                <span style={{ color: 'var(--gw-bone)' }}>in</span>, otherwise a LinkedIn search, so
                no profile is guessed. Company names link to their sites; the URL on each row is the
                page that contact would receive.
              </p>
            </div>
            <span style={{ fontSize: 11, letterSpacing: '0.22em', color: 'var(--gw-gray-3)' }}>
              {PROSPECTS.length} CONTACTS · {clients.length} COMPANIES
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {clients.map((client) => (
              <div key={client.slug} style={{ border: '1px solid var(--gw-gray-1)', minWidth: 0 }}>
                <div style={{ padding: '16px 16px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <ClientLogo
                      name={client.clientName}
                      mark={client.logoMark}
                      src={client.clientLogoSrc}
                      website={client.website}
                      color={client.accent}
                      size={26}
                    />
                    <a
                      href={client.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={client.website}
                      style={{
                        fontSize: 14,
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
                      marginTop: 8,
                      fontSize: 10,
                      letterSpacing: '0.2em',
                      color: client.accent,
                      textTransform: 'uppercase',
                    }}
                  >
                    {client.round}
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: 10,
                      letterSpacing: '0.2em',
                      color: 'var(--gw-gray-2)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {client.clientDescriptor} · leads with{' '}
                    {PRODUCTS[client.productOrder[0]].name} · {client.ctaLabel}
                  </div>
                  <p
                    style={{
                      marginTop: 10,
                      fontSize: 12.5,
                      color: 'var(--gw-gray-3)',
                      lineHeight: 1.55,
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
                    accent={client.accent}
                    linkedin={p.linkedin}
                    verified={p.linkedinVerified}
                    highlight={p.name === EXAMPLE_CONTACT}
                  />
                ))}
                {OPEN_ROLES[client.slug]?.length ? (
                  <div
                    style={{
                      borderTop: '1px solid var(--gw-gray-1)',
                      padding: '12px 16px',
                      fontSize: 10.5,
                      color: 'var(--gw-gray-2)',
                      letterSpacing: '0.12em',
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

          <p style={{ marginTop: 26, fontSize: 11.5, color: 'var(--gw-gray-2)', lineHeight: 1.7 }}>
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
