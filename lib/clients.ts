export type FeatureKey =
  | 'everyday-carry'
  | 'non-lethal-by-design'
  | 'instant-ready-access'
  | 'field-tested-durability'
  | 'training-included'
  | 'compliance-ready'

export type Feature = {
  key: FeatureKey
  title: string
  description: string
}

// Master feature copy. Individual clients don't rewrite this text — they
// just reorder which features lead, via `featureOrder` below.
export const FEATURES: Record<FeatureKey, Feature> = {
  'everyday-carry': {
    key: 'everyday-carry',
    title: 'Built for everyday carry',
    description:
      'Compact and discreet enough to clip to a bag, belt, or keyring without adding bulk to a daily routine.',
  },
  'non-lethal-by-design': {
    key: 'non-lethal-by-design',
    title: 'Non-lethal by design',
    description:
      'Engineered to create distance and stop a threat without the lasting harm — or liability — of lethal force.',
  },
  'instant-ready-access': {
    key: 'instant-ready-access',
    title: 'Instant, one-handed access',
    description:
      'No safety catch to fumble and no two-handed grip required — one motion from pocket to protection.',
  },
  'field-tested-durability': {
    key: 'field-tested-durability',
    title: 'Field-tested durability',
    description:
      'Built to survive drops, weather, and daily wear, tested well past the bar for typical consumer safety gear.',
  },
  'training-included': {
    key: 'training-included',
    title: 'Training included',
    description:
      'Every order ships with a quick-start guide and video walkthrough, so people are confident before they ever need it.',
  },
  'compliance-ready': {
    key: 'compliance-ready',
    title: 'Compliance-ready',
    description:
      'No permit required in most jurisdictions — ships with the state-by-state documentation your legal team will ask for.',
  },
}

export type ClientTheme = {
  primary: string
  primaryForeground: string
  accent: string
  accentForeground: string
  background: string
  foreground: string
}

export type ClientConfig = {
  slug: string
  clientName: string
  /** Placeholder wordmark text until a real logo file is supplied. */
  logoText: string
  /** Optional path under /public to a real logo image, once supplied. */
  logoSrc?: string
  productName: string
  tagline: string
  heroHeadline: string
  heroSubheadline: string
  featureOrder: FeatureKey[]
  cta: { label: string; href: string }
  theme: ClientTheme
}

export const clients: ClientConfig[] = [
  {
    slug: 'summit-outfitters',
    clientName: 'Summit Outfitters',
    logoText: 'Summit Outfitters',
    productName: 'GW Field Guard',
    tagline: 'Personal safety for the trail and the daily carry.',
    heroHeadline: 'Gear your customers already trust — now with Field Guard on the shelf.',
    heroSubheadline:
      'A wholesale line built for outdoor retail: rugged, EDC-ready, and backed by training material your staff can hand across the counter.',
    featureOrder: [
      'field-tested-durability',
      'everyday-carry',
      'instant-ready-access',
      'non-lethal-by-design',
      'training-included',
      'compliance-ready',
    ],
    cta: { label: 'Book a wholesale call', href: '#contact' },
    theme: {
      primary: 'oklch(0.42 0.09 145)',
      primaryForeground: 'oklch(0.98 0 0)',
      accent: 'oklch(0.88 0.06 145)',
      accentForeground: 'oklch(0.25 0.06 145)',
      background: 'oklch(0.99 0.005 145)',
      foreground: 'oklch(0.18 0.02 145)',
    },
  },
  {
    slug: 'blue-ridge-campus-safety',
    clientName: 'Blue Ridge University',
    logoText: 'Blue Ridge Campus Safety',
    productName: 'GW CampusGuard',
    tagline: 'A safety program students actually carry.',
    heroHeadline: 'A campus safety program students will actually use.',
    heroSubheadline:
      'CampusGuard pairs a non-lethal, easy-to-carry device with training your safety office can roll out in a single orientation session.',
    featureOrder: [
      'training-included',
      'compliance-ready',
      'non-lethal-by-design',
      'instant-ready-access',
      'everyday-carry',
      'field-tested-durability',
    ],
    cta: { label: 'Schedule a campus demo', href: '#contact' },
    theme: {
      primary: 'oklch(0.4 0.14 260)',
      primaryForeground: 'oklch(0.98 0 0)',
      accent: 'oklch(0.9 0.05 260)',
      accentForeground: 'oklch(0.28 0.08 260)',
      background: 'oklch(0.99 0.005 260)',
      foreground: 'oklch(0.18 0.02 260)',
    },
  },
  {
    slug: 'north-loop-rideshare',
    clientName: 'North Loop Rideshare',
    logoText: 'North Loop Rideshare',
    productName: 'GW DriverShield',
    tagline: 'Protection built for every shift.',
    heroHeadline: 'Give every driver a reason to feel safer on shift.',
    heroSubheadline:
      'DriverShield fits in a cupholder or door pocket and is ready in one motion — a fleet safety benefit drivers will actually notice.',
    featureOrder: [
      'instant-ready-access',
      'non-lethal-by-design',
      'everyday-carry',
      'field-tested-durability',
      'compliance-ready',
      'training-included',
    ],
    cta: { label: 'Start a fleet pilot', href: '#contact' },
    theme: {
      primary: 'oklch(0.55 0.19 40)',
      primaryForeground: 'oklch(0.98 0 0)',
      accent: 'oklch(0.92 0.07 60)',
      accentForeground: 'oklch(0.3 0.1 40)',
      background: 'oklch(0.99 0.008 60)',
      foreground: 'oklch(0.18 0.02 40)',
    },
  },
]

export function getClient(slug: string): ClientConfig | undefined {
  return clients.find((c) => c.slug === slug)
}

export function orderedFeatures(config: ClientConfig): Feature[] {
  return config.featureOrder.map((key) => FEATURES[key])
}
