import Link from 'next/link'

import { clients } from '@/lib/clients'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex w-full max-w-2xl flex-col items-center gap-8 px-6 py-16 text-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight">Gentle Weapons</h1>
          <p className="max-w-md text-lg text-muted-foreground">
            Personalized landing pages, one per prospective client. Each URL below is a live
            example of the same template with its own colors, feature order, product name, and
            CTA.
          </p>
        </div>

        <ul className="flex w-full flex-col gap-3 text-left">
          {clients.map((client) => (
            <li key={client.slug}>
              <Link
                href={`/${client.slug}`}
                className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm transition-colors hover:bg-muted"
              >
                <span className="font-medium">{client.clientName}</span>
                <span className="text-muted-foreground">/{client.slug}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-xs text-muted-foreground">
          Add a new prospect by adding an entry to <code>lib/clients.ts</code> — its page appears
          automatically at <code>/&lt;slug&gt;</code>.
        </p>
      </main>
    </div>
  )
}
