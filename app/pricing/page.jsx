import PricingClient from '@/components/PricingClient'

export const metadata = {
  title: 'Pricing — No Callout Fees, No Fix No Fee, From $89/hr',
  description: 'Transparent, honest IT support pricing. From $89/hr with no callout fees and a no fix, no fee guarantee. One-off jobs and ongoing support plans available.',
  openGraph: {
    title: 'Pricing | Xpert Tech Solutions',
    description: 'No callout fees. No fix, no fee. From $89/hr. See all service prices.',
    url: 'https://xperttechsolutions.com.au/pricing',
  },
}

export default function Page() {
  return <PricingClient />
}
