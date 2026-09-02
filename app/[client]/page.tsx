import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { LandingPage } from '@/components/landing-page'
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
    title: `${config.productName} for ${config.clientName} | Gentle Weapons`,
    description: config.heroSubheadline,
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

  return <LandingPage config={config} />
}
