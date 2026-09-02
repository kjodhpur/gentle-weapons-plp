import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PlatformPage } from '@/components/subpage'
import type { ProductKey } from '@/lib/clients'
import { clients, getClient, PRODUCTS } from '@/lib/clients'

export const dynamicParams = false

const productKeys = Object.keys(PRODUCTS) as ProductKey[]

export function generateStaticParams() {
  return clients.flatMap((c) => productKeys.map((product) => ({ client: c.slug, product })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ client: string; product: string }>
}): Promise<Metadata> {
  const { client, product } = await params
  const config = getClient(client)
  const entry = PRODUCTS[product as ProductKey]
  if (!config || !entry) return {}

  return {
    title: `${entry.name} for ${config.clientName} | Gentle Weapons`,
    description: entry.headline,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ client: string; product: string }>
}) {
  const { client, product } = await params
  const config = getClient(client)
  const entry = PRODUCTS[product as ProductKey]
  if (!config || !entry) notFound()

  return <PlatformPage config={config} product={entry} />
}
