'use client'
import Link from 'next/link'
import Image from 'next/image'
import { FaBolt, FaPhone, FaEnvelope, FaClock, FaLocationDot, FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from 'react-icons/fa6'

const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'Computer Repairs', href: '/services' },
      { label: 'Virus Removal', href: '/services' },
      { label: 'Wi-Fi Setup', href: '/services' },
      { label: 'Data Recovery', href: '/services' },
      { label: 'Remote Support', href: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Contact', href: '/contact' },
      { label: 'Book Online', href: '/contact' },
    ],
  },
]

const socials = [
  { Icon: FaFacebookF, href: '#', label: 'Facebook' },
  { Icon: FaInstagram, href: '#', label: 'Instagram' },
  { Icon: FaXTwitter, href: '#', label: 'X' },
  { Icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#030610', borderTop: '1px solid rgba(124,58,237,0.12)' }}>
      {/* Top gradient line */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.5), rgba(37,99,235,0.5), transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-5">
              <Image
                src="/logo.png"
                alt="XTS Tech Support"
                width={130}
                height={44}
                className="h-32 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              Fast, friendly IT support for homes and businesses. Same-day service, 7 days a week, no callout fees.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} className="footer-social-icon">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-semibold text-sm mb-4" style={{ fontFamily: 'var(--font-space)' }}>{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-purple-300 transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4" style={{ fontFamily: 'var(--font-space)' }}>Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaPhone className="text-purple-400 text-sm mt-0.5 flex-shrink-0" />
                <a href="tel:0424424444" className="text-sm text-slate-400 hover:text-white transition-colors">
                  0424 424 444
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-purple-400 text-sm mt-0.5 flex-shrink-0" />
                <a href="mailto:xperttechsolutions@mail.com" className="text-sm text-slate-400 hover:text-white transition-colors break-all">
                  xperttechsolutions@mail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaClock className="text-purple-400 text-sm mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400">Mon - Sun, 7am - 9pm</span>
              </li>
              <li className="flex items-start gap-3">
                <FaLocationDot className="text-gold-500 text-sm mt-0.5 flex-shrink-0" style={{ color: '#f59e0b' }} />
                <span className="text-sm text-slate-400">Brisbane · Gold Coast · Northern NSW</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Service areas strip */}
        <div className="mt-10 pt-6 pb-4" style={{ borderTop: '1px solid rgba(124,58,237,0.1)' }}>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-2 flex-shrink-0">
              <FaLocationDot className="text-xs" style={{ color: '#f59e0b' }} />
              <span className="text-xs font-semibold text-white" style={{ fontFamily: 'var(--font-space)' }}>Service Areas:</span>
            </div>
            <p className="text-xs text-slate-500 text-center sm:text-left">
              Brisbane &nbsp;|&nbsp; Gold Coast &nbsp;|&nbsp; Tweed Heads &nbsp;|&nbsp; Byron Bay &nbsp;|&nbsp; Lismore &nbsp;|&nbsp; Ballina &nbsp;|&nbsp; Northern NSW
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-4 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} XTS Tech Support. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
