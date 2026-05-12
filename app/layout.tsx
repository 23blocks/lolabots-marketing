import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { GTM_ID } from '@/lib/gtm'

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
      {/* GTM (F-001) — shared container with factory, with site:'marketing'
          auto-attached via lib/gtm.ts trackEvent. afterInteractive matches
          factory's loading strategy so Lighthouse doesn't regress. */}
      <Script
        id="gtm"
        strategy="afterInteractive"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      <body className="min-h-screen flex flex-col font-sans">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
