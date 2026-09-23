import ServicesClient from '@/components/ServicesClient'

export const metadata = {
  title: 'IT Services — Computer Repairs, Virus Removal, Wi-Fi Setup & More',
  description: 'Full range of IT support services: computer repairs, virus removal, Wi-Fi setup, data recovery, remote support & more. Serving Brisbane, Gold Coast & Northern NSW.',
  openGraph: {
    title: 'IT Services | Xpert Tech Solutions',
    description: 'Computer repairs, virus removal, Wi-Fi setup, data recovery and more. From $89/hr.',
    url: 'https://xperttechsolutions.com.au/services',
  },
}

export default function Page() {
  return <ServicesClient />
}
