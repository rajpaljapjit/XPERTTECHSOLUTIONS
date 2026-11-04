import BookingClient from '@/components/BookingClient'

export const metadata = {
  title: 'Book a Technician — Xpert Tech Solutions',
  description: 'Book an IT support technician online. Same-day availability across Brisbane, Gold Coast & Northern NSW. No callout fees.',
  openGraph: {
    title: 'Book a Technician | Xpert Tech Solutions',
    description: 'Book online or call 0424 424 444. Same-day availability.',
    url: 'https://xperttechsolutions.com.au/booking',
  },
}

export default function Page() {
  return <BookingClient />
}
