import AboutClient from '@/components/AboutClient'

export const metadata = {
  title: 'About Us — Local Tech Experts You Can Trust',
  description: 'Meet the team behind Xpert Tech Solutions. Local technicians with years of experience serving Brisbane, Gold Coast & Northern NSW. Honest, friendly, reliable.',
  openGraph: {
    title: 'About Us | Xpert Tech Solutions',
    description: 'Local tech experts serving Brisbane, Gold Coast & Northern NSW.',
    url: 'https://xperttechsolutions.com.au/about',
  },
}

export default function Page() {
  return <AboutClient />
}
