import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ClientSite } from '@/components/client-site'
import { clients, getClient } from '@/lib/clients'

export function generateStaticParams() {
  return clients.map((c) => ({ client: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ client: string }>
}): Promise<Metadata> {
  const { client } = await params
  const config = getClient(client)
  if (!config) return {}

  return {
    title: `Defense autonomy infrastructure for ${config.clientName} | Gentle Weapons`,
    description: config.hero.lede,
  }
}

export default async function ClientLandingPage({
  params,
}: {
  params: Promise<{ client: string }>
}) {
  const { client } = await params
  const config = getClient(client)
  if (!config) notFound()

  return <ClientSite config={config} />
}
