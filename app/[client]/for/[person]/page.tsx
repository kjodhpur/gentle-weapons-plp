import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ClientSite } from '@/components/client-site'
import { getClient } from '@/lib/clients'
import { getProspect, PROSPECTS, prospectSlug } from '@/lib/prospects'

// Only known contacts resolve here; an unknown name 404s.
export const dynamicParams = false

export function generateStaticParams() {
  return PROSPECTS.map((p) => ({ client: p.clientSlug, person: prospectSlug(p) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ client: string; person: string }>
}): Promise<Metadata> {
  const { client, person } = await params
  const config = getClient(client)
  const prospect = getProspect(client, person)
  if (!config || !prospect) return {}

  return {
    title: `For ${prospect.name} — ${config.clientName} | Gentle Weapons`,
    description: config.heroByRole[prospect.role].lede,
  }
}

export default async function PersonPage({
  params,
}: {
  params: Promise<{ client: string; person: string }>
}) {
  const { client, person } = await params
  const config = getClient(client)
  const prospect = getProspect(client, person)
  if (!config || !prospect) notFound()

  return <ClientSite config={config} person={prospect} />
}
