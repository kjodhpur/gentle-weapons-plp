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
import type { Prospect } from '@/lib/prospects'

/** One rendered body section: a stable key plus the component to render. */
type BodySection = {
  key: string
  Component: (props: { config: ClientConfig; counter: string }) => React.ReactElement | null
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

/**
 * The full personalized site for one client. With `person` set, the hero
 * addresses that contact and picks the lede and bullets for their role;
 * everything below the hero is the company page.
 */
export function ClientSite({ config, person }: { config: ClientConfig; person?: Prospect }) {
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
        <Hero config={config} person={person} />
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
