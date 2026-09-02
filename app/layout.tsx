import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gentle Weapons',
  description: 'Personalized landing pages for Gentle Weapons prospective clients.',
  generator: 'v0.app',
  // Scalable monogram derived from the wordmark. The production site's own
  // /assets/favicon.svg and /assets/apple-touch-icon.png are the assets to
  // swap in here once they're pulled off the live domain.
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  // These pages name real prospect companies and people. They are meant to
  // be sent as links, not discovered — keep them out of search indexes.
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
