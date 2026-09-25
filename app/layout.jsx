import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import SiteShell from '@/components/SiteShell'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  title: {
    template: '%s | Xpert Tech Solutions',
    default: 'Xpert Tech Solutions — Professional IT Support & Computer Repairs',
  },
  description: 'Xpert Tech Solutions — Professional IT Support, Computer Repairs & Web Design serving Brisbane, Gold Coast & Northern NSW. From $89/hr. No callout fees. No fix, no fee.',
  metadataBase: new URL('https://xperttechsolutions.com.au'),
  openGraph: {
    siteName: 'Xpert Tech Solutions',
    url: 'https://xperttechsolutions.com.au',
    type: 'website',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@XpertTechSol',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
