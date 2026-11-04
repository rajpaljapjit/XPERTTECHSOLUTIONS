import ContactClient from '@/components/ContactClient'

export const metadata = {
  title: 'Contact Us — Xpert Tech Solutions',
  description: 'Get in touch with Xpert Tech Solutions. Send us a message or call 0424 424 444. We\'re available Mon–Sun, 7am–9pm.',
  openGraph: {
    title: 'Contact Us | Xpert Tech Solutions',
    description: 'Send us a message or call 0424 424 444.',
    url: 'https://xperttechsolutions.com.au/contact',
  },
}

export default function Page() {
  return <ContactClient />
}
