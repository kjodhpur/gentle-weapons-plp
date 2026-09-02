/**
 * Target contacts at the prospect companies in lib/clients.ts.
 *
 * Every person here is publicly named, with their title, in the company's own
 * funding announcement or leadership page (the `source` URL). Nobody was
 * scraped or guessed. Titles were checked in September 2026 and people move —
 * confirm on LinkedIn before sending anything.
 *
 * Only founders and C-level are listed, because those are the roles the
 * companies announce. The engineering leads who would actually evaluate a
 * platform layer are usually not public; OPEN_ROLES names the ones to find.
 */
export type Prospect = {
  name: string
  title: string
  /** Company as it would appear on the contact's profile. */
  company: string
  /** The client config this company resolves to. */
  clientSlug: string
  /** Where the name and title were publicly stated. */
  source: string
}

export const PROSPECTS: Prospect[] = [
  // Scout AI — $100M Series A, April 2026
  {
    name: 'Colby Adcock',
    title: 'Co-founder & CEO',
    company: 'Scout AI',
    clientSlug: 'scout-ai',
    source:
      'https://www.prnewswire.com/news-releases/scout-ai-raises-100m-series-a-to-build-the-ai-brain-for-unmanned-warfare-302756871.html',
  },
  {
    name: 'Collin Otis',
    title: 'Co-founder & CTO',
    company: 'Scout AI',
    clientSlug: 'scout-ai',
    source:
      'https://www.prnewswire.com/news-releases/scout-ai-raises-100m-series-a-to-build-the-ai-brain-for-unmanned-warfare-302756871.html',
  },

  // Vermeer — $10M Series A, October 2025
  {
    name: 'Brian Streem',
    title: 'Founder & CEO',
    company: 'Vermeer',
    clientSlug: 'vermeer',
    source:
      'https://dronelife.com/2025/10/23/vermeer-secures-10-million-series-a-to-advance-gps-free-drone-navigation-for-defense-and-dual-use-applications/',
  },
  {
    name: 'Suresh Kumar',
    title: 'CTO',
    company: 'Vermeer',
    clientSlug: 'vermeer',
    source:
      'https://dronelife.com/2025/10/23/vermeer-secures-10-million-series-a-to-advance-gps-free-drone-navigation-for-defense-and-dual-use-applications/',
  },

  // Blue Water Autonomy — $50M Series A, August 2025
  {
    name: 'Rylan Hamilton',
    title: 'Co-founder & CEO',
    company: 'Blue Water Autonomy',
    clientSlug: 'blue-water-autonomy',
    source:
      'https://www.prnewswire.com/news-releases/blue-water-autonomy-announces-50-million-series-a-led-by-gv-to-strengthen-us-maritime-power-with-autonomous-unmanned-ships-302538277.html',
  },
  {
    name: 'Scott Miller',
    title: 'Co-founder & CTO',
    company: 'Blue Water Autonomy',
    clientSlug: 'blue-water-autonomy',
    source:
      'https://www.prnewswire.com/news-releases/blue-water-autonomy-announces-50-million-series-a-led-by-gv-to-strengthen-us-maritime-power-with-autonomous-unmanned-ships-302538277.html',
  },
  {
    name: 'Austin Gray',
    title: 'Co-founder',
    company: 'Blue Water Autonomy',
    clientSlug: 'blue-water-autonomy',
    source:
      'https://www.prnewswire.com/news-releases/blue-water-autonomy-announces-50-million-series-a-led-by-gv-to-strengthen-us-maritime-power-with-autonomous-unmanned-ships-302538277.html',
  },

  // CX2 — $31M Series A, May 2025
  {
    name: 'Nathan Mintz',
    title: 'Co-founder & CEO',
    company: 'CX2',
    clientSlug: 'cx2',
    source: 'https://www.cx2.com/company',
  },
  {
    name: 'Lee Thompson',
    title: 'Co-founder · Head of Hardware',
    company: 'CX2',
    clientSlug: 'cx2',
    source: 'https://www.cx2.com/company',
  },
  {
    name: 'Mark Trefgarne',
    title: 'Co-founder & President',
    company: 'CX2',
    clientSlug: 'cx2',
    source: 'https://www.cx2.com/company',
  },

  // Picogrid — $45M Series A, May 2026
  {
    name: 'Zane Mountcastle',
    title: 'Co-founder & CEO',
    company: 'Picogrid',
    clientSlug: 'picogrid',
    source:
      'https://picogrid.com/newsroom/picogrid-raises-usd45m-series-a-to-build-the-open-integration-layer-for-modern-defense',
  },
  {
    name: 'Dan Chirita',
    title: 'Co-founder & CTO',
    company: 'Picogrid',
    clientSlug: 'picogrid',
    source:
      'https://picogrid.com/newsroom/picogrid-raises-usd45m-series-a-to-build-the-open-integration-layer-for-modern-defense',
  },
  {
    name: 'Martin Slosarik',
    title: 'Co-founder',
    company: 'Picogrid',
    clientSlug: 'picogrid',
    source:
      'https://picogrid.com/newsroom/picogrid-raises-usd45m-series-a-to-build-the-open-integration-layer-for-modern-defense',
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
