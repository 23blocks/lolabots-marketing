import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const SITE_URL = 'https://lolabots.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Lolabots — Practical AI agents you actually use',
    template: '%s · Lolabots',
  },
  description:
    'Lolabots builds practical AI tools for people, not engineering teams. Pick a specialist, paste one command, and your agent goes to work.',
  applicationName: 'Lolabots',
  authors: [{ name: '23blocks' }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Lolabots',
    title: 'Lolabots — Practical AI agents you actually use',
    description:
      'Lolabots builds practical AI tools for people, not engineering teams. Pick a specialist, paste one command, and your agent goes to work.',
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lolabots — Practical AI agents you actually use',
    description:
      'Pick a specialist, paste one command, your agent goes to work. No CLI, no MCP, no Docker.',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
}

export const viewport: Viewport = {
  themeColor: '#F5F0EA',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
