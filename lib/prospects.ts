/**
 * Target contacts at the prospect companies in lib/clients.ts.
 *
 * Every person here is publicly named, with their title, in the company's own
 * funding announcement or leadership page (the `source` URL). Nobody was
 * scraped or guessed. Titles were checked in September 2026 and people move —
 * confirm on LinkedIn before sending anything.
 *
 * `linkedin` is a profile URL only when it was found as a linkedin.com result
 * for that exact person and company (`linkedinVerified: true`). Otherwise it
 * is a LinkedIn people search for the name + company — a guessed profile slug
 * would send a prospect's link to a stranger, so none are guessed.
 *
 * Only founders and C-level are listed, because those are the roles the
 * companies announce. The engineering leads who would actually evaluate a
 * platform layer are usually not public; OPEN_ROLES names the ones to find.
 */
import type { Role } from '@/lib/clients'

export type Prospect = {
  name: string
  title: string
  /** Drives which hero variant that person's page shows. */
  role: Role
  /** Company as it would appear on the contact's profile. */
  company: string
  /** The client config this company resolves to. */
  clientSlug: string
  /** Where the name and title were publicly stated. */
  source: string
  /** Verified profile URL, or a LinkedIn people search when not verified. */
  linkedin: string
  linkedinVerified: boolean
}

function linkedinSearch(name: string, company: string): string {
  return `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`${name} ${company}`)}`
}

export const PROSPECTS: Prospect[] = [
  // Scout AI — $100M Series A, April 2026
  {
    name: 'Colby Adcock',
    role: 'executive',
    title: 'Co-founder & CEO',
    company: 'Scout AI',
    clientSlug: 'scout-ai',
    source:
      'https://www.prnewswire.com/news-releases/scout-ai-raises-100m-series-a-to-build-the-ai-brain-for-unmanned-warfare-302756871.html',
    linkedin: 'https://www.linkedin.com/in/colby-adcock-277ab42a',
    linkedinVerified: true,
  },
  {
    name: 'Collin Otis',
    role: 'technical',
    title: 'Co-founder & CTO',
    company: 'Scout AI',
    clientSlug: 'scout-ai',
    source:
      'https://www.prnewswire.com/news-releases/scout-ai-raises-100m-series-a-to-build-the-ai-brain-for-unmanned-warfare-302756871.html',
    linkedin: 'https://www.linkedin.com/in/collinotis/',
    linkedinVerified: true,
  },

  // Vermeer — $10M Series A, October 2025
  {
    name: 'Brian Streem',
    role: 'executive',
    title: 'Founder & CEO',
    company: 'Vermeer',
    clientSlug: 'vermeer',
    source:
      'https://dronelife.com/2025/10/23/vermeer-secures-10-million-series-a-to-advance-gps-free-drone-navigation-for-defense-and-dual-use-applications/',
    linkedin: 'https://www.linkedin.com/in/brianstreem/',
    linkedinVerified: true,
  },
  {
    name: 'Suresh Kumar',
    role: 'technical',
    title: 'CTO',
    company: 'Vermeer',
    clientSlug: 'vermeer',
    source:
      'https://dronelife.com/2025/10/23/vermeer-secures-10-million-series-a-to-advance-gps-free-drone-navigation-for-defense-and-dual-use-applications/',
    linkedin: 'https://www.linkedin.com/in/vsureshkumar/',
    linkedinVerified: true,
  },

  // Blue Water Autonomy — $50M Series A, August 2025
  {
    name: 'Rylan Hamilton',
    role: 'executive',
    title: 'Co-founder & CEO',
    company: 'Blue Water Autonomy',
    clientSlug: 'blue-water-autonomy',
    source:
      'https://www.prnewswire.com/news-releases/blue-water-autonomy-announces-50-million-series-a-led-by-gv-to-strengthen-us-maritime-power-with-autonomous-unmanned-ships-302538277.html',
    linkedin: 'https://www.linkedin.com/in/rylanhamilton/',
    linkedinVerified: true,
  },
  {
    name: 'Scott Miller',
    role: 'technical',
    title: 'Co-founder & CTO',
    company: 'Blue Water Autonomy',
    clientSlug: 'blue-water-autonomy',
    source:
      'https://www.prnewswire.com/news-releases/blue-water-autonomy-announces-50-million-series-a-led-by-gv-to-strengthen-us-maritime-power-with-autonomous-unmanned-ships-302538277.html',
    linkedin: 'https://www.linkedin.com/in/scottnmiller/',
    linkedinVerified: true,
  },
  {
    name: 'Austin Gray',
    role: 'executive',
    title: 'Co-founder & Chief Strategy Officer',
    company: 'Blue Water Autonomy',
    clientSlug: 'blue-water-autonomy',
    source:
      'https://www.prnewswire.com/news-releases/blue-water-autonomy-announces-50-million-series-a-led-by-gv-to-strengthen-us-maritime-power-with-autonomous-unmanned-ships-302538277.html',
    linkedin: 'https://www.linkedin.com/in/austinelliottgray/',
    linkedinVerified: true,
  },

  // CX2 — $31M Series A, May 2025
  {
    name: 'Nathan Mintz',
    role: 'executive',
    title: 'Co-founder & CEO',
    company: 'CX2',
    clientSlug: 'cx2',
    source: 'https://www.cx2.com/company',
    linkedin: 'https://www.linkedin.com/in/nmintz/',
    linkedinVerified: true,
  },
  {
    name: 'Lee Thompson',
    role: 'technical',
    title: 'Co-founder · Head of Hardware',
    company: 'CX2',
    clientSlug: 'cx2',
    source: 'https://www.cx2.com/company',
    // Common name; no result could be tied to CX2 with confidence.
    linkedin: linkedinSearch('Lee Thompson', 'CX2'),
    linkedinVerified: false,
  },
  {
    name: 'Mark Trefgarne',
    role: 'executive',
    title: 'Co-founder & President',
    company: 'CX2',
    clientSlug: 'cx2',
    source: 'https://www.cx2.com/company',
    linkedin: 'https://www.linkedin.com/in/marktrefgarne/',
    linkedinVerified: true,
  },

  // Picogrid — $45M Series A, May 2026
  {
    name: 'Zane Mountcastle',
    role: 'executive',
    title: 'Co-founder & CEO',
    company: 'Picogrid',
    clientSlug: 'picogrid',
    source:
      'https://picogrid.com/newsroom/picogrid-raises-usd45m-series-a-to-build-the-open-integration-layer-for-modern-defense',
    linkedin: 'https://www.linkedin.com/in/zanemountcastle/',
    linkedinVerified: true,
  },
  {
    name: 'Dan Chirita',
    role: 'technical',
    title: 'Co-founder & CTO',
    company: 'Picogrid',
    clientSlug: 'picogrid',
    source:
      'https://picogrid.com/newsroom/picogrid-raises-usd45m-series-a-to-build-the-open-integration-layer-for-modern-defense',
    // The only candidate profile could not be confirmed as the Picogrid Dan Chirita.
    linkedin: linkedinSearch('Dan Chirita', 'Picogrid'),
    linkedinVerified: false,
  },
  {
    name: 'Martin Slosarik',
    role: 'executive',
    title: 'Co-founder',
    company: 'Picogrid',
    clientSlug: 'picogrid',
    source:
      'https://picogrid.com/newsroom/picogrid-raises-usd45m-series-a-to-build-the-open-integration-layer-for-modern-defense',
    linkedin: 'https://www.linkedin.com/in/slosarik/',
    linkedinVerified: true,
  },
]

/**
 * Roles worth finding at each company that are not publicly announced.
 * These are the people who evaluate an OS / OTA / mesh layer day to day.
 */
export const OPEN_ROLES: Record<string, string[]> = {
  'scout-ai': ['Head of Deployment / Fleet Ops', 'Embedded or Platform Lead'],
  vermeer: ['Embedded Systems Lead (NVIDIA)', 'Head of Field Operations'],
  'blue-water-autonomy': ['Vehicle Software Lead', 'Head of Fleet / Ops'],
  cx2: ['Embedded Software Lead', 'Director of Programs'],
  picogrid: ['Hardware Platform Lead', 'Head of Deployments'],
}

/** URL-safe slug for a person: "Colby Adcock" -> "colby-adcock". */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function prospectSlug(p: Prospect): string {
  return slugify(p.name)
}

/** Path of this person's own page. */
export function prospectPath(p: Prospect): string {
  return `/${p.clientSlug}/for/${prospectSlug(p)}`
}

export function getProspect(clientSlug: string, personSlug: string): Prospect | undefined {
  return PROSPECTS.find((p) => p.clientSlug === clientSlug && prospectSlug(p) === personSlug)
}

/** Initials for the avatar monogram. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function prospectsForClient(slug: string): Prospect[] {
  return PROSPECTS.filter((p) => p.clientSlug === slug)
}
