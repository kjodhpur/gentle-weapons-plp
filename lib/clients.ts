/**
 * Content model for personalized Gentle Weapons landing pages.
 *
 * Shared, factual product data lives in PRODUCTS and PROBLEMS — every client
 * page draws from the same source of truth. Per-prospect personalization is
 * expressed entirely in ClientConfig: URL, accent color, co-branded logo,
 * section order, which product leads, and the CTA.
 */

export type ProductKey = 'gwos' | 'poolnet' | 'poolboy'
export type ProblemKey = 'os-sidequests' | 'links-degrade' | 'model-delivery'
export type SectionKey = 'doctrine' | 'products' | 'deployment' | 'company'

export type Product = {
  key: ProductKey
  name: string
  /** Category pill, e.g. "PLATFORM · LINUX" */
  category: string
  readiness: string
  headline: string
  body: string
  capabilities: string[]
  guides: { label: string; href: string }[]
}

export const PRODUCTS: Record<ProductKey, Product> = {
  gwos: {
    key: 'gwos',
    name: 'GWOS',
    category: 'PLATFORM · LINUX',
    readiness: 'READINESS: TRL-4',
    headline: 'A Linux distribution purpose-built to run AI workloads in production.',
    body: 'Takes the NVIDIA Jetson family from developer kit to fielded, attestable compute — immutable rootfs, A/B updates, signed OTA, and a kernel you can actually pin.',
    capabilities: [
      'Immutable, attested rootfs · A/B partitions · atomic rollback',
      'Pinned CUDA / TensorRT / cuDNN stack · kernel locked versioning',
      'Signed OTA with delta updates over low-bandwidth links',
      'TPM-backed boot, secure-element device identity, SBOM per image',
      'FIPS 140-3 cryptographic track, CMMC L2 alignment roadmap',
    ],
    guides: [
      { label: 'platform', href: 'https://gentleweapons.com/platform/gwos' },
      { label: 'secure boot', href: 'https://gentleweapons.com/secure-boot' },
      { label: 'immutable linux', href: 'https://gentleweapons.com/immutable-linux' },
      { label: 'signed ota', href: 'https://gentleweapons.com/signed-ota' },
      {
        label: 'deploy software to jetson',
        href: 'https://gentleweapons.com/deploy-software-to-jetson',
      },
    ],
  },
  poolnet: {
    key: 'poolnet',
    name: 'Poolnet',
    category: 'NETWORK · EDGE_MESH',
    readiness: 'READINESS: TRL-4',
    headline: 'An edge-first private mesh. Self-forming, encrypted, egress-optional.',
    body: 'What an autonomy fleet talks over when LTE is jammed, satcom is degraded, and the nearest server is three valleys away. Forms itself, heals itself, needs no horizon.',
    capabilities: [
      'Quantum-safe encrypted links · per-node keypairs · short-lived certs',
      'Partition-tolerant · continues operating without backhaul',
      'Policy-driven egress · optionally tethered to cloud',
      'Operator-in-the-loop ACLs · audit trail · time-boxed access',
    ],
    guides: [
      { label: 'platform', href: 'https://gentleweapons.com/platform/poolnet' },
      { label: 'mesh network', href: 'https://gentleweapons.com/mesh-network' },
    ],
  },
  poolboy: {
    key: 'poolboy',
    name: 'Poolboy',
    category: 'DEPLOYMENT · CONTROL_PLANE',
    readiness: 'READINESS: TRL-4',
    headline: 'A deployment system for next-gen AI workloads on autonomous platforms.',
    body: 'Modern devops for shipping models and binaries to robots, UAS, and ground vehicles already in test and field deployment — with a rollback plan that works when the link does not.',
    capabilities: [
      'Fleet-scale rollouts · canary / wave / region targeting',
      'Cryptographically signed, per-node acknowledged deploys',
      'Atomic rollback to last-known-good on telemetry breach',
      'Bandwidth-aware · resumable · works over intermittent links',
      'Human-authorized go/no-go gates · multi-operator control',
    ],
    guides: [
      { label: 'platform', href: 'https://gentleweapons.com/platform/poolboy' },
      { label: 'fleet management', href: 'https://gentleweapons.com/fleet-management' },
      { label: 'signed ota', href: 'https://gentleweapons.com/signed-ota' },
    ],
  },
}

export type Problem = {
  key: ProblemKey
  label: string
  title: string
  body: string
}

export const PROBLEMS: Record<ProblemKey, Problem> = {
  'os-sidequests': {
    key: 'os-sidequests',
    label: 'PROBLEM_01 — OBSERVED',
    title: 'OS sidequests suck.',
    body: 'Model weights are easy. The platform underneath is where programs die — kernel drift, CUDA breakage, unsigned updates, no rollback.',
  },
  'links-degrade': {
    key: 'links-degrade',
    label: 'PROBLEM_02 — OBSERVED',
    title: 'Links degrade. Missions do not pause.',
    body: 'EW, jamming, tethered ops, LEO gaps. Cloud-trained autonomy has no path home. The mesh has to form and heal itself, securely, without a horizon.',
  },
  'model-delivery': {
    key: 'model-delivery',
    label: 'PROBLEM_03 — OBSERVED',
    title: 'Getting models onto field systems is the hard part.',
    body: 'Shipping AI to 200 robots is not a kubectl apply. It is firmware, weights, sensors, calibration, radios, OTA, and a rollback plan that holds under contact.',
  },
}

/** Accent options, matching the production palette. */
export const ACCENTS = {
  phosphor: '#00ff88',
  cyan: '#00e5ff',
  amber: '#ffb000',
} as const

export type ClientConfig = {
  /** Distinct URL: the page renders at /<slug>. */
  slug: string
  clientName: string
  /** Sits under the co-branded lockup, e.g. "UAS AUTONOMY". */
  clientDescriptor: string
  /** Accent color driving pills, [ OK ] rows, and card offsets. */
  accent: string
  /** Optional client logo under /public; falls back to a text lockup. */
  clientLogoSrc?: string

  hero: {
    rev: string
    headlineTop: string
    headlineBottom: string
    lede: string
    bullets: string[]
    /** Highlighted closing fragment on the last bullet. */
    flag: string
  }

  /** CTA label, e.g. Request_Brief / Request_Access / Request_Full_Spec. */
  ctaLabel: string
  /** Order of the main sections down the page. */
  sectionOrder: SectionKey[]
  /** Which product leads the systems manifest. */
  productOrder: ProductKey[]
  /** Which problems lead the doctrine section. */
  problemOrder: ProblemKey[]
  /** Ticker items under the hero. */
  marquee: string[]
}

export const clients: ClientConfig[] = [
  {
    slug: 'vantage-aero',
    clientName: 'Vantage Aeronautics',
    clientDescriptor: 'UAS AUTONOMY',
    accent: ACCENTS.phosphor,
    hero: {
      rev: 'REV 2026.05',
      headlineTop: 'Your autonomy stack',
      headlineBottom: 'ships or it does not.',
      lede: 'Hardened edge compute for UAS teams moving from flight test to fielded aircraft.',
      bullets: [
        'GWOS turns Jetson developer kits into attestable, fielded compute.',
        'Signed OTA and atomic rollback for airframes you cannot recover by hand.',
        'Built for teams on the path to a program of record.',
      ],
      flag: '[ CONTACT FOR BRIEFING ]',
    },
    ctaLabel: 'Request_Access',
    sectionOrder: ['products', 'doctrine', 'deployment', 'company'],
    productOrder: ['gwos', 'poolboy', 'poolnet'],
    problemOrder: ['os-sidequests', 'model-delivery', 'links-degrade'],
    marquee: [
      '// NVIDIA JETSON ORIN',
      'UAS_READY',
      'SIGNED_OTA',
      'ATOMIC_ROLLBACK',
      'SBOM / FIPS 140-3 TRACK',
      'FLIGHT_TEST → FIELDED',
    ],
  },
  {
    slug: 'ironline-defense',
    clientName: 'Ironline Defense Systems',
    clientDescriptor: 'GROUND VEHICLE PRIME',
    accent: ACCENTS.amber,
    hero: {
      rev: 'REV 2026.05',
      headlineTop: 'One control plane',
      headlineBottom: 'for the whole fleet.',
      lede: 'Fleet-scale software deployment for ground vehicle programs already in the field.',
      bullets: [
        'Poolboy ships models and binaries to vehicles in test and deployment.',
        'Canary, wave, and region targeting with per-node cryptographic acknowledgement.',
        'Two-operator gates and audit trails your program office will ask for.',
      ],
      flag: '[ CONTACT FOR BRIEFING ]',
    },
    ctaLabel: 'Request_Full_Spec',
    sectionOrder: ['deployment', 'products', 'doctrine', 'company'],
    productOrder: ['poolboy', 'gwos', 'poolnet'],
    problemOrder: ['model-delivery', 'os-sidequests', 'links-degrade'],
    marquee: [
      '// GROUND COMBAT VEHICLE',
      'FLEET_SCALE_ROLLOUT',
      'CANARY → WAVE → FLEET',
      'LKG_ROLLBACK · NO-BRICK',
      'CMMC L2 ROADMAP',
      'TWO-OPERATOR GATES',
    ],
  },
  {
    slug: 'meridian-isr',
    clientName: 'Meridian ISR',
    clientDescriptor: 'ISR INTEGRATOR',
    accent: ACCENTS.cyan,
    hero: {
      rev: 'REV 2026.05',
      headlineTop: 'The link will drop.',
      headlineBottom: 'The mission will not.',
      lede: 'Partition-tolerant mesh networking for ISR collection in contested spectrum.',
      bullets: [
        'Poolnet self-forms and heals without backhaul, egress optional.',
        'Quantum-safe encrypted links with short-lived per-node certificates.',
        'Designed for disconnected, degraded, intermittent, and limited operations.',
      ],
      flag: '[ CONTACT FOR BRIEFING ]',
    },
    ctaLabel: 'Request_Brief',
    sectionOrder: ['doctrine', 'products', 'deployment', 'company'],
    productOrder: ['poolnet', 'gwos', 'poolboy'],
    problemOrder: ['links-degrade', 'model-delivery', 'os-sidequests'],
    marquee: [
      '// CONTESTED SPECTRUM',
      'DDIL_READY',
      'EW / JAMMING TOLERANT',
      'SELF-FORMING MESH',
      'EGRESS_OPTIONAL',
      'ITAR_AWARE_SUPPLY_CHAIN',
    ],
  },
]

export function getClient(slug: string): ClientConfig | undefined {
  return clients.find((c) => c.slug === slug)
}
