import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FloatingCallButton from '@/components/FloatingCallButton'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' })

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
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingCallButton />
      </body>
    </html>
  )
}
