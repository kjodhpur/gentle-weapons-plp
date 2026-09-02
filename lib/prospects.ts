/**
 * Sample prospect contacts used to demonstrate lead routing on the index.
 *
 * These are invented demo personas attached to the invented sample companies
 * in lib/clients.ts — not real people and not scraped from anywhere. Replace
 * them with a real prospect list when the routing is wired to a live source.
 */
export type Prospect = {
  name: string
  title: string
  /** Company as it would appear on the contact's profile. */
  company: string
  /** The client config this company resolves to. */
  clientSlug: string
}

export const PROSPECTS: Prospect[] = [
  {
    name: 'John White',
    title: 'Chief Technology Officer',
    company: 'Ironline Defense Systems',
    clientSlug: 'ironline-defense',
  },
  {
    name: 'Dana Reyes',
    title: 'VP Engineering',
    company: 'Ironline Defense Systems',
    clientSlug: 'ironline-defense',
  },
  {
    name: 'Marcus Hale',
    title: 'Program Manager, Ground Combat Vehicles',
    company: 'Ironline Defense Systems',
    clientSlug: 'ironline-defense',
  },
  {
    name: 'Priya Raman',
    title: 'VP Autonomy',
    company: 'Vantage Aeronautics',
    clientSlug: 'vantage-aero',
  },
  {
    name: 'Alex Chen',
    title: 'Director of Flight Software',
    company: 'Vantage Aeronautics',
    clientSlug: 'vantage-aero',
  },
  {
    name: 'Sam Okafor',
    title: 'Head of Platform Engineering',
    company: 'Vantage Aeronautics',
    clientSlug: 'vantage-aero',
  },
  {
    name: 'Elena Vasquez',
    title: 'Chief Engineer',
    company: 'Meridian ISR',
    clientSlug: 'meridian-isr',
  },
  {
    name: 'Tom Bradley',
    title: 'Director, Collection Systems',
    company: 'Meridian ISR',
    clientSlug: 'meridian-isr',
  },
  {
    name: 'Nadia Osman',
    title: 'Principal Network Architect',
    company: 'Meridian ISR',
    clientSlug: 'meridian-isr',
  },
]

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
