import ContactClient from '@/components/ContactClient'

export const metadata = {
  title: 'Contact Us — Book a Technician Today',
  description: 'Book an IT support technician online or call 0424 424 444. Same-day availability across Brisbane, Gold Coast & Northern NSW. No callout fees.',
  openGraph: {
    title: 'Contact Us | Xpert Tech Solutions',
    description: 'Book online or call 0424 424 444. Same-day availability.',
    url: 'https://xperttechsolutions.com.au/contact',
  },
}

export default function Page() {
  return <ContactClient />
}
