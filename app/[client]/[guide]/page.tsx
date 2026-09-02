import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { GuidePage } from '@/components/subpage'
import { clients, getClient } from '@/lib/clients'
import type { GuideKey } from '@/lib/subpages'
import { GUIDES, guideKeys } from '@/lib/subpages'

// Only the known guide slugs resolve here; anything else 404s rather than
// being caught by this dynamic segment.
export const dynamicParams = false

export function generateStaticParams() {
  return clients.flatMap((c) => guideKeys.map((guide) => ({ client: c.slug, guide })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ client: string; guide: string }>
}): Promise<Metadata> {
  const { client, guide } = await params
  const config = getClient(client)
  const entry = GUIDES[guide as GuideKey]
  if (!config || !entry) return {}

  return {
    title: `${entry.title} for ${config.clientName} | Gentle Weapons`,
    description: entry.intro,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ client: string; guide: string }>
}) {
  const { client, guide } = await params
  const config = getClient(client)
  const entry = GUIDES[guide as GuideKey]
  if (!config || !entry) notFound()

  return <GuidePage config={config} guide={entry} />
}
