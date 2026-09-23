import HomeClient from '@/components/HomeClient'

export const metadata = {
  title: 'Same Day IT Help at Home and Work | Xpert Tech Solutions',
  description: 'Xpert Tech Solutions — Professional IT Support, Computer Repairs & Web Design serving Brisbane, Gold Coast & Northern NSW. From $89/hr. No callout fees. No fix, no fee.',
  openGraph: {
    title: 'Xpert Tech Solutions — Same Day IT Help',
    description: 'Professional IT Support, Computer Repairs & Web Design. From $89/hr. No callout fees. No fix, no fee.',
    url: 'https://xperttechsolutions.com.au',
  },
}

export default function Page() {
  return <HomeClient />
}
