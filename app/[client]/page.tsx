import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import {
  Company,
  Competitor,
  Contact,
  Deployment,
  Doctrine,
  Hero,
  Products,
  SiteFooter,
} from '@/components/sections'
import { SiteNav } from '@/components/site-nav'
import type { ClientConfig, SectionKey } from '@/lib/clients'
import { clients, getClient } from '@/lib/clients'

/** One rendered body section: a stable key plus the component to render. */
type BodySection = {
  key: string
  Component: (props: { config: ClientConfig; counter: string }) => React.ReactElement | null
}

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

  // Body sections in the client's declared order, with the competitor
  // comparison slotted in directly after the products section when set.
  const body = config.sectionOrder.flatMap<BodySection>((key) => {
    const entry: BodySection[] = [{ key, Component: SECTION_COMPONENTS[key] }]
    if (key === 'products' && config.competitor) {
      entry.push({ key: 'alternative', Component: Competitor })
    }
    return entry
  })
  // Hero plus body plus contact, zero-padded to match the § NN / NN form.
  const total = String(body.length + 2).padStart(2, '0')

  return (
    <>
      <div className="noise" aria-hidden />
      <SiteNav config={config} />
      <main>
        <Hero config={config} />
        {body.map(({ key, Component }, i) => {
          // Hero is § 01 and contact is last, so the body runs from § 02.
          const counter = `§ ${String(i + 2).padStart(2, '0')} / ${total}`
          return <Component key={key} config={config} counter={counter} />
        })}
        <Contact config={config} counter={`§ ${total} / ${total}`} />
      </main>
      <SiteFooter config={config} />
    </>
  )
}
