import Link from 'next/link'

import { LogoMark } from '@/components/logo-mark'
import { Button } from '@/components/ui/button'
import type { ClientConfig } from '@/lib/clients'
import { orderedFeatures } from '@/lib/clients'

export function LandingPage({ config }: { config: ClientConfig }) {
  const features = orderedFeatures(config)

  const themeVars = {
    '--primary': config.theme.primary,
    '--primary-foreground': config.theme.primaryForeground,
    '--accent': config.theme.accent,
    '--accent-foreground': config.theme.accentForeground,
    '--background': config.theme.background,
    '--foreground': config.theme.foreground,
  } as React.CSSProperties

  return (
    <div style={themeVars} className="min-h-screen bg-background text-foreground">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <LogoMark text={config.logoText} src={config.logoSrc} />
        <span className="hidden text-sm text-muted-foreground sm:inline">
          Powered by Gentle Weapons
        </span>
      </header>

      <main>
        <section className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-6 py-16 sm:py-24">
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            {config.productName}
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            {config.heroHeadline}
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground text-pretty">
            {config.heroSubheadline}
          </p>
          <Button asChild size="lg" className="mt-2">
            <a href={config.cta.href}>{config.cta.label}</a>
          </Button>
        </section>

        <section className="border-y border-border bg-accent/30">
          <div className="mx-auto grid max-w-5xl gap-8 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.key} className="flex flex-col gap-2">
                <h2 className="text-base font-semibold">{feature.title}</h2>
                <p className="text-sm text-muted-foreground text-pretty">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <div className="rounded-2xl bg-primary px-8 py-12 text-center text-primary-foreground">
            <h2 className="text-2xl font-bold text-balance sm:text-3xl">
              Ready to bring {config.productName} to {config.clientName}?
            </h2>
            <p className="mt-3 text-primary-foreground/80 text-pretty">{config.tagline}</p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="mt-6 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <a href={config.cta.href}>{config.cta.label}</a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-5xl px-6 py-10 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span>
            &copy; {new Date().getFullYear()} Gentle Weapons. Prepared for {config.clientName}.
          </span>
          <Link href="/" className="hover:text-foreground">
            gentleweapons.com
          </Link>
        </div>
      </footer>
    </div>
  )
}
