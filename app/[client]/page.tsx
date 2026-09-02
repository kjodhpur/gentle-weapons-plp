import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Company, Contact, Deployment, Doctrine, Hero, Products, SiteFooter } from '@/components/sections'
import { SiteNav } from '@/components/site-nav'
import type { SectionKey } from '@/lib/clients'
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

const SECTION_COMPONENTS: Record<
  SectionKey,
  typeof Doctrine | typeof Products | typeof Deployment | typeof Company
> = {
  doctrine: Doctrine,
  products: Products,
  deployment: Deployment,
  company: Company,
}

export default async function ClientLandingPage({
  params,
}: {
  params: Promise<{ client: string }>
}) {
  const { client } = await params
  const config = getClient(client)
  if (!config) notFound()

  return (
    <>
      <div className="noise" aria-hidden />
      <SiteNav config={config} />
      <main>
        <Hero config={config} />
        {config.sectionOrder.map((key, i) => {
          const SectionComponent = SECTION_COMPONENTS[key]
          // Hero is § 01 and contact is § 06, so ordered sections run 02–05.
          const counter = `§ ${String(i + 2).padStart(2, '0')} / 06`
          return <SectionComponent key={key} config={config} counter={counter} />
        })}
        <Contact config={config} counter="§ 06 / 06" />
      </main>
      <SiteFooter config={config} />
    </>
  )
}
