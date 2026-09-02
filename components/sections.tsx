import {
  Ascii,
  BracketLink,
  DisplayHeading,
  Kicker,
  Marquee,
  OffsetButton,
  Section,
  SectionHead,
  TerminalPanel,
} from '@/components/gw-ui'
import type { ClientConfig } from '@/lib/clients'
import { ALTERNATIVES, PRODUCTS, PROBLEMS } from '@/lib/clients'
import { guidesForProduct } from '@/lib/subpages'

export function Hero({ config }: { config: ClientConfig }) {
  const { hero } = config

  return (
    <section
      className="px-4 py-12 md:px-8 md:py-20"
      style={{ position: 'relative', maxWidth: 1280, margin: '0 auto' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr)', gap: 32 }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            alignItems: 'center',
            fontSize: 11,
            letterSpacing: '0.22em',
            color: 'var(--gw-gray-3)',
            textTransform: 'uppercase',
          }}
        >
          <span>// MISSION_MANIFEST</span>
          <span style={{ color: 'var(--gw-gray-2)' }}>/</span>
          <span>{hero.rev}</span>
          <span style={{ color: 'var(--gw-gray-2)' }}>/</span>
          <span>prepared for: {config.clientName}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-8 md:gap-12">
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: 'clamp(42px, 6vw, 100px)',
              lineHeight: 0.9,
              letterSpacing: '-0.015em',
              margin: 0,
            }}
          >
            {hero.headlineTop}
            <br />
            {hero.headlineBottom}
            <span
              className="blink"
              style={{
                display: 'inline-block',
                width: 18,
                height: '0.78em',
                background: config.accent,
                verticalAlign: 'baseline',
                marginLeft: 10,
              }}
            />
          </h1>

          <div style={{ borderLeft: '4px solid #fff', paddingLeft: 20, paddingBottom: 8 }}>
            <p
              style={{
                fontSize: 'clamp(18px, 1.6vw, 24px)',
                textTransform: 'uppercase',
                fontWeight: 700,
                letterSpacing: '0.02em',
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              {hero.lede}
            </p>
            <p style={{ marginTop: 16, fontSize: 14.5, color: 'var(--gw-gray-3)', lineHeight: 1.65 }}>
              {config.hero.context}
            </p>
          </div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-4 md:gap-6 md:items-center"
          style={{ marginTop: 24, border: '1px solid var(--gw-gray-1)', padding: '20px 24px' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 14, lineHeight: 1.7 }}>
            {hero.bullets.map((bullet, i) => (
              <div key={i}>
                <span style={{ color: 'var(--gw-gray-2)', marginRight: 8 }}>&gt;</span>
                {bullet}
                {i === hero.bullets.length - 1 && (
                  <span style={{ color: config.accent, marginLeft: 8 }}>{hero.flag}</span>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <OffsetButton href="#contact" offsetColor={config.accent}>
              {config.ctaLabel}
            </OffsetButton>
          </div>
        </div>
      </div>

      <Marquee items={config.marquee} />
    </section>
  )
}

export function Doctrine({ config, counter }: { config: ClientConfig; counter: string }) {
  // Client-specific pain points take the place of the shared problems when
  // the config supplies them, so the doctrine section reads as written for
  // this prospect rather than for the market in general.
  const tailored = config.painPoints?.length ? config.painPoints : undefined
  const items = tailored
    ? tailored.map((p, i) => ({
        key: `pain-${i}`,
        label: `PROBLEM_0${i + 1} — OBSERVED AT ${config.clientName.toUpperCase()}`,
        title: p.title,
        body: p.body,
      }))
    : config.problemOrder.map((key) => PROBLEMS[key])

  return (
    <Section id="doctrine">
      <SectionHead
        kicker="// OPERATING_DOCTRINE"
        title="The path to scale is treacherous."
        lede={
          tailored
            ? `Where ${config.clientName}'s stack meets the field, as we read it from what you ship publicly. Correct us in the briefing.`
            : undefined
        }
        counter={counter}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {items.map((problem) => {
          return (
            <div key={problem.key} style={{ borderTop: `2px solid ${config.accent}`, paddingTop: 18 }}>
              <Kicker style={{ color: config.accent }}>{problem.label}</Kicker>
              <h3
                style={{
                  marginTop: 12,
                  fontSize: 20,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  lineHeight: 1.15,
                  letterSpacing: '0.01em',
                }}
              >
                {problem.title}
              </h3>
              <p style={{ marginTop: 12, color: 'var(--gw-gray-3)', fontSize: 14, lineHeight: 1.7 }}>
                {problem.body}
              </p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

const PRODUCT_ASCII: Record<string, string> = {
  gwos: `┌──────────────────────────────────┐
│  JETSON ORIN / NX / NANO         │
│  ┌────────────┐  ┌────────────┐  │
│  │ GWOS KERNEL│  │ CUDA 12.x  │  │
│  └────┬───────┘  └─────┬──────┘  │
│       │   signed OTA   │         │
│  ┌────▼────────────────▼──────┐  │
│  │  IMMUTABLE ROOTFS · A/B    │  │
│  └────────────┬───────────────┘  │
│   attested boot · SBOM · TPM     │
└──────────────┬───────────────────┘
               │
        [ FIELDED_DEVICES: ███ ]`,
  poolnet: `NODE_01 ─── NODE_02 ─── NODE_03
        \\      │      /
         \\     │     /
          \\    │    /
NODE_04 ─── NODE_05
            │
NODE_06 ─┴─ NODE_07
::::::::::::::::::::::::::::::::::
link:      p2p, encrypted, mesh
egress:    optional · tethered OK
discovery: self-forming`,
  poolboy: `[PAYLOAD] weights.safetensors 128MB
     │
     ▼ manifest_signed
[POOLBOY] ──▶ POOLNET ──▶ N x GWOS
     │
     ├─ rollout:  canary → wave → fleet
     ├─ rollback: last_known_good
     └─ ack:      cryptographic · per-node

TARGET_FLEET: ROBOTS / UAS / GCV`,
}

export function Products({ config, counter }: { config: ClientConfig; counter: string }) {
  return (
    <Section id="products">
      <SectionHead
        kicker="// SYSTEMS_MANIFEST"
        title="Three systems. One stack."
        lede="A hardened base, a private network, and an edge deployment control plane. Engineered to interlock, built from the ground up for defense autonomy."
        counter={counter}
      />

      <div style={{ display: 'grid', gap: 36 }}>
        {config.productOrder.map((key, index) => {
          const product = PRODUCTS[key]
          return (
            <div key={key} id={key} style={{ position: 'relative', scrollMarginTop: 80 }}>
              {/* Accent block offset behind the card. Kept as a sibling rather
                  than a z-index:-1 child, which would sit behind the card's own
                  black background and never be seen. */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: config.accent,
                  transform: 'translate(8px, 8px)',
                }}
              />

              <article
                className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
                style={{
                  position: 'relative',
                  border: '2px solid #fff',
                  background: '#000',
                }}
              >
              <div
                style={{
                  padding: '32px 36px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 22,
                  minWidth: 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 34,
                      lineHeight: 1,
                      color: config.accent,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      border: `1px solid ${config.accent}`,
                      padding: '3px 8px',
                      color: config.accent,
                    }}
                  >
                    {product.category}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      border: '1px solid #fff',
                      padding: '3px 8px',
                    }}
                  >
                    {product.readiness}
                  </span>
                </div>

                <div>
                  <Kicker style={{ fontSize: 12, marginBottom: 10 }}>
                    // PRODUCT_ID: <span style={{ color: config.accent }}>{product.key}</span>
                  </Kicker>
                  <DisplayHeading size="clamp(56px, 7vw, 96px)" style={{ lineHeight: 0.85 }}>
                    {product.name}
                  </DisplayHeading>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                      textTransform: 'uppercase',
                      marginTop: 14,
                      lineHeight: 1.2,
                    }}
                  >
                    {product.headline}
                  </div>
                </div>

                <p
                  style={{
                    color: 'var(--gw-gray-3)',
                    fontSize: 14.5,
                    lineHeight: 1.7,
                    margin: 0,
                    maxWidth: 560,
                  }}
                >
                  {product.body}
                </p>

                {/* What this product means for this prospect specifically. */}
                <div
                  style={{
                    borderLeft: `3px solid ${config.accent}`,
                    paddingLeft: 16,
                    maxWidth: 560,
                  }}
                >
                  <Kicker style={{ color: config.accent }}>
                    &gt; FOR {config.clientName.toUpperCase()}
                  </Kicker>
                  <p
                    style={{
                      marginTop: 8,
                      color: 'var(--gw-bone)',
                      fontSize: 14.5,
                      lineHeight: 1.65,
                    }}
                  >
                    {config.productNotes[product.key]}
                  </p>
                </div>

                <div
                  style={{
                    borderTop: '1px solid var(--gw-gray-1)',
                    paddingTop: 18,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  <Kicker>&gt; CAPABILITY_SET</Kicker>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                    {product.capabilities.map((capability) => (
                      <li
                        key={capability}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'auto 1fr',
                          gap: 14,
                          fontSize: 13.5,
                          lineHeight: 1.5,
                          alignItems: 'baseline',
                        }}
                      >
                        <span style={{ color: config.accent }}>[ OK ]</span>
                        <span style={{ color: 'var(--gw-bone)' }}>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cross-links into this client's own sub-pages — never out
                    to the main site. */}
                <div
                  style={{
                    borderTop: '1px solid var(--gw-gray-1)',
                    paddingTop: 18,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  <Kicker>&gt; GUIDES</Kicker>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    <BracketLink href={`/${config.slug}/platform/${product.key}`}>
                      platform
                    </BracketLink>
                    {guidesForProduct(product.key).map((guide) => (
                      <BracketLink key={guide.key} href={`/${config.slug}/${guide.key}`}>
                        {guide.title.toLowerCase()}
                      </BracketLink>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    flexWrap: 'wrap',
                    borderTop: '1px solid var(--gw-gray-1)',
                    paddingTop: 18,
                  }}
                >
                  <BracketLink href="#contact">{config.ctaLabel}</BracketLink>
                  <span style={{ fontSize: 10, letterSpacing: '0.22em', color: 'var(--gw-gray-2)' }}>
                    AVAILABILITY: LIMITED_PILOT
                  </span>
                </div>
              </div>

              <div
                className="md:border-l md:border-[#333]"
                style={{ padding: '32px 24px', minWidth: 0 }}
              >
                <TerminalPanel title={`${product.key} .sh`}>
                  <Ascii>{PRODUCT_ASCII[product.key]}</Ascii>
                </TerminalPanel>
              </div>
              </article>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

/**
 * Comparison against the stack the prospect runs today. Rendered only when
 * the client config names a competitor.
 */
export function Competitor({ config, counter }: { config: ClientConfig; counter: string }) {
  if (!config.competitor) return null
  const alt = ALTERNATIVES[config.competitor]
  const product = PRODUCTS[alt.product]

  return (
    <Section id="alternative">
      <SectionHead
        kicker={`// ALTERNATIVE · ${product.name.toUpperCase()}`}
        title={alt.counter}
        lede={`Where ${product.name} fits for teams already running this stack.`}
        counter={counter}
      />

      <div style={{ position: 'relative' }}>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: config.accent,
            transform: 'translate(8px, 8px)',
          }}
        />
        <div
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
          style={{ position: 'relative', border: '2px solid #fff', background: '#000' }}
        >
          <div style={{ padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span
              style={{
                alignSelf: 'flex-start',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                lineHeight: 1,
                letterSpacing: '-0.01em',
                color: config.accent,
              }}
            >
              {alt.vs}
            </span>
            <p style={{ color: 'var(--gw-gray-3)', fontSize: 14.5, lineHeight: 1.7, margin: 0 }}>
              Comparisons describe architectural fit for defense autonomy programs — not benchmarks
              or endorsements.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <BracketLink href={`/${config.slug}/alternatives/${alt.key}`}>
                full comparison
              </BracketLink>
              <BracketLink href="#contact">{config.ctaLabel}</BracketLink>
            </div>
          </div>

          <div
            className="md:border-l md:border-[#333]"
            style={{ padding: '32px 30px', display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            <Kicker>&gt; WHY_TEAMS_SWITCH</Kicker>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
              {alt.points.map((point) => (
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
                  <span style={{ color: config.accent }}>[ OK ]</span>
                  <span style={{ color: 'var(--gw-bone)' }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}

const DEPLOYMENT_STAGES = [
  {
    step: '§ 1',
    title: 'ORIGIN',
    subtitle: 'Operator · Program Office',
    lines: ['R&D', 'Two-operator gates', 'Policy authoring'],
  },
  {
    step: '§ 2',
    title: 'DISTRIBUTION',
    subtitle: 'Poolboy + Poolnet',
    lines: ['Signed rollouts', 'Encrypted overlay', 'Bandwidth-aware'],
  },
  {
    step: '§ 3',
    title: 'EDGE',
    subtitle: 'GWOS on Jetson',
    lines: ['Attested boot and secure inference', 'Intelligent rollback', 'Payload agnostic'],
  },
]

const DEPLOYMENT_SPECS = [
  { label: 'CLASSIFICATION', value: 'UNCLASSIFIED // CUI AWARE' },
  { label: 'ENVIRONMENT', value: 'DDIL · JAMMED · AUTONOMOUS' },
  { label: 'OPERATOR LOAD', value: 'CLI + SIGNED MANIFESTS' },
  { label: 'FAILURE MODE', value: 'LKG ROLLBACK · NO-BRICK' },
]

export function Deployment({ config, counter }: { config: ClientConfig; counter: string }) {
  return (
    <Section id="deployment">
      <SectionHead
        kicker="// DEPLOYMENT_VIEW"
        title="How it fields."
        lede={config.deploymentNote}
        counter={counter}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 11,
          letterSpacing: '0.22em',
          color: 'var(--gw-gray-2)',
          textTransform: 'uppercase',
          marginBottom: 20,
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <span>schematic_v12 · integrated_stack</span>
        <span>scale: 1 : [REDACTED]</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3" style={{ border: '1px solid var(--gw-gray-1)' }}>
        {DEPLOYMENT_STAGES.map((stage, i) => (
          <div
            key={stage.title}
            style={{
              padding: '28px 26px',
              borderLeft: i === 0 ? 'none' : '1px solid var(--gw-gray-1)',
              minWidth: 0,
            }}
          >
            <Kicker style={{ color: config.accent }}>{stage.step}</Kicker>
            <DisplayHeading size="clamp(28px, 3vw, 40px)" style={{ marginTop: 10 }}>
              {stage.title}
            </DisplayHeading>
            <div
              style={{
                marginTop: 10,
                fontSize: 13,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--gw-bone)',
              }}
            >
              {stage.subtitle}
            </div>
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {stage.lines.map((line) => (
                <div key={line} style={{ fontSize: 13, color: 'var(--gw-gray-3)', lineHeight: 1.5 }}>
                  <span style={{ color: config.accent, marginRight: 8 }}>▸</span>
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(4,minmax(0,1fr))]"
        style={{ marginTop: 24, gap: 1, background: 'var(--gw-gray-1)', border: '1px solid var(--gw-gray-1)' }}
      >
        {DEPLOYMENT_SPECS.map((spec) => (
          <div key={spec.label} style={{ background: '#000', padding: '18px 20px' }}>
            <Kicker style={{ fontSize: 10 }}>{spec.label}</Kicker>
            <div style={{ marginTop: 8, fontSize: 13, color: 'var(--gw-bone)', lineHeight: 1.4 }}>
              {spec.value}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

const OPERATING_PROFILE = [
  { label: 'HQ', value: 'Mesa, AZ · UNITED STATES' },
  { label: 'FOUNDED', value: '2026' },
  { label: 'HEADCOUNT', value: '███ · GROWING' },
  { label: 'BACKING', value: 'STRATEGIC · PROGRAM-LED' },
  { label: 'PARTNERS', value: 'NVIDIA · DIU' },
  { label: 'ACTIVE PROGRAMS', value: 'AUTONOMY · ISR · GCV · C2' },
  { label: 'CMMC', value: 'L2 ROADMAP' },
]

const FIELD_LOG = [
  '2026.03 · poolboy fleet rollout · OK',
  '2026.02 · gwos image signed for [REDACTED] · OK',
  '2026.01 · poolnet partition test · 6 nodes · OK',
  '2025.12 · integrated stack live-fire exercise · OK',
]

export function Company({ config, counter }: { config: ClientConfig; counter: string }) {
  return (
    <Section id="company">
      <SectionHead kicker="// POSTURE" title="Scaling national interest." counter={counter} />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10 lg:gap-12">
        <div>
          <p style={{ color: 'var(--gw-gray-3)', fontSize: 14.5, lineHeight: 1.7 }}>
            Gentle Weapons is an American company building the infrastructure layer for
            next-generation defense autonomy. Our customers deliver capability; we make sure the
            software underneath reaches the edge intact.
          </p>
          <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.6, color: 'var(--gw-bone)' }}>
            One stack, one mission: protect and defend via scalable deployed systems.
          </p>

          <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['DEFENSE_FIRST', 'US_OWNED', 'ITAR_AWARE', 'SECURE_SUPPLY_CHAIN'].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 10,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  border: '1px solid var(--gw-gray-1)',
                  padding: '5px 10px',
                  color: 'var(--gw-gray-3)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div style={{ marginTop: 28, borderTop: '1px solid var(--gw-gray-1)', paddingTop: 18 }}>
            <Kicker>&gt; FIELD_USE_LOG</Kicker>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {FIELD_LOG.map((entry) => (
                <div key={entry} style={{ fontSize: 12.5, color: 'var(--gw-gray-3)' }}>
                  <span style={{ color: config.accent, marginRight: 8 }}>·</span>
                  {entry}
                </div>
              ))}
            </div>
          </div>
        </div>

        <TerminalPanel title="OPERATING_PROFILE">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {OPERATING_PROFILE.map((row) => (
              <div
                key={row.label}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.2fr)',
                  gap: 12,
                  padding: '10px 0',
                  borderBottom: '1px solid var(--gw-gray-1)',
                  fontSize: 12,
                }}
              >
                <span style={{ color: 'var(--gw-gray-2)', letterSpacing: '0.18em' }}>{row.label}</span>
                <span style={{ color: 'var(--gw-bone)' }}>{row.value}</span>
              </div>
            ))}
          </div>
        </TerminalPanel>
      </div>
    </Section>
  )
}

export function Contact({ config, counter }: { config: ClientConfig; counter: string }) {
  const mailto = `mailto:hello@gentleweapons.com?subject=${encodeURIComponent(
    `Briefing request — ${config.clientName}`,
  )}`

  return (
    <Section id="contact" className="px-4 py-12 pb-16 md:px-8 md:py-16 md:pb-24">
      <SectionHead
        kicker="// OPEN_CHANNEL"
        title={`Request a briefing for ${config.clientName}.`}
        lede={`Why we think this fits: ${config.fit} Send a short note — qualified inquiries get a scheduling link to meet the founder within 24 hours.`}
        counter={counter}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 lg:gap-12">
        <TerminalPanel title="gw_brief.sh">
          {/*
            Visual parity with the production form. Submission is not wired to a
            backend yet — Transmit opens a prefilled mail draft. Swap in a real
            endpoint (API route or form service) before sending to prospects.
          */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: '> OPERATOR_NAME', placeholder: 'callsign', type: 'text' },
              { label: '> ORGANIZATION', placeholder: 'program / unit / prime', type: 'text' },
              { label: '> RETURN_ADDR', placeholder: 'you@domain.mil', type: 'email' },
              { label: '> ROLE', placeholder: 'pm · eng · ops', type: 'text' },
            ].map((field) => (
              <label key={field.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Kicker style={{ fontSize: 10 }}>{field.label}</Kicker>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  style={{
                    background: '#000',
                    border: '1px solid var(--gw-gray-1)',
                    color: '#fff',
                    padding: '10px 12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                  }}
                />
              </label>
            ))}
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Kicker style={{ fontSize: 10 }}>&gt; MESSAGE</Kicker>
              <textarea
                rows={4}
                placeholder="// platform, program, timeline . . ."
                style={{
                  background: '#000',
                  border: '1px solid var(--gw-gray-1)',
                  color: '#fff',
                  padding: '10px 12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  resize: 'vertical',
                }}
              />
            </label>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <OffsetButton href={mailto} offsetColor={config.accent}>
                Transmit
              </OffsetButton>
              <span style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--gw-gray-2)' }}>
                enc: aes-256 · xmit: outbound
              </span>
            </div>
          </div>
        </TerminalPanel>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div>
            <Kicker>&gt; DIRECT_CHANNELS</Kicker>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
              <div>
                <span style={{ color: 'var(--gw-gray-2)' }}>programs: </span>
                <a href="mailto:hello@gentleweapons.com" style={{ color: config.accent }}>
                  hello@gentleweapons.com
                </a>
              </div>
              <div>
                <span style={{ color: 'var(--gw-gray-2)' }}>careers: </span>
                <a href="mailto:hiring@gentleweapons.com" style={{ color: config.accent }}>
                  hiring@gentleweapons.com
                </a>
              </div>
              <div>
                <span style={{ color: 'var(--gw-gray-2)' }}>press: </span>
                <span style={{ color: 'var(--gw-bone)' }}>BY INTRODUCTION</span>
              </div>
            </div>
          </div>

          <div id="careers" style={{ borderTop: '1px solid var(--gw-gray-1)', paddingTop: 18, scrollMarginTop: 80 }}>
            <Kicker>&gt; JOIN_US</Kicker>
            <p style={{ marginTop: 12, fontSize: 13, color: 'var(--gw-gray-3)', lineHeight: 1.7 }}>
              We are hiring mission-driven production engineers, kernel and firmware specialists, and
              network software engineers. If you have shipped Linux at scale, we want to hear from
              you.
            </p>
            <div style={{ marginTop: 12 }}>
              <BracketLink href="mailto:hiring@gentleweapons.com">hiring@gentleweapons.com</BracketLink>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--gw-gray-1)', paddingTop: 18 }}>
            <Kicker>&gt; NOTICE</Kicker>
            <p style={{ marginTop: 12, fontSize: 12.5, color: 'var(--gw-gray-2)', lineHeight: 1.7 }}>
              This page is a public overview prepared for {config.clientName}. Technical
              specifications, deployment references, and performance data are shared under NDA with
              qualified program partners.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}

export function SiteFooter({ config }: { config: ClientConfig }) {
  return (
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
        <span>
          Gentle Systems, Inc. · Mesa, AZ ·{' '}
          <a href="tel:+16502692245" style={{ color: 'var(--gw-gray-3)' }}>
            650-269-2245
          </a>
        </span>
      </div>
      <div style={{ marginTop: 10, fontSize: 10, letterSpacing: '0.2em', color: config.accent }}>
        PREPARED FOR {config.clientName.toUpperCase()}
      </div>
    </footer>
  )
}
