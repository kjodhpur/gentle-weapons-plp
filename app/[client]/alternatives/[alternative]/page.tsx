import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { AlternativePage } from '@/components/subpage'
import type { AlternativeKey } from '@/lib/clients'
import { ALTERNATIVES, clients, getClient } from '@/lib/clients'

export const dynamicParams = false

const alternativeKeys = Object.keys(ALTERNATIVES) as AlternativeKey[]

export function generateStaticParams() {
  return clients.flatMap((c) =>
    alternativeKeys.map((alternative) => ({ client: c.slug, alternative })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ client: string; alternative: string }>
}): Promise<Metadata> {
  const { client, alternative } = await params
  const config = getClient(client)
  const entry = ALTERNATIVES[alternative as AlternativeKey]
  if (!config || !entry) return {}

  return {
    title: `${entry.vs} for ${config.clientName} | Gentle Weapons`,
    description: entry.counter,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ client: string; alternative: string }>
}) {
  const { client, alternative } = await params
  const config = getClient(client)
  const entry = ALTERNATIVES[alternative as AlternativeKey]
  if (!config || !entry) notFound()

  return <AlternativePage config={config} alternative={entry} />
}
