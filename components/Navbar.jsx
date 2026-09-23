'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { FaBolt, FaBars, FaXmark, FaPhone } from 'react-icons/fa6'

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/branding', label: 'Branding & Web', badge: 'New' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  const navBg = useTransform(scrollY, [0, 80], ['rgba(5,8,22,0)', 'rgba(5,8,22,0.85)'])
  const navPy = useTransform(scrollY, [0, 80], [22, 12])
  const borderColor = useTransform(scrollY, [0, 80], ['rgba(124,58,237,0)', 'rgba(124,58,237,0.18)'])

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 30))
    return unsub
  }, [scrollY])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <motion.nav
      style={{ backgroundColor: navBg, borderColor }}
      className="fixed top-0 left-0 right-0 z-50 border-b"
    >
      <div style={{ backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none', WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none' }}>
        <motion.div
          style={{ paddingTop: navPy, paddingBottom: navPy }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.png"
              alt="XTS Tech Support"
              width={420}
              height={144}
              className="h-32 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5"
                style={{
                  color: pathname === link.href ? '#c4b5fd' : '#94a3b8',
                  background: pathname === link.href ? 'rgba(124,58,237,0.12)' : 'transparent',
                  fontFamily: 'var(--font-space)',
                }}
              >
                {link.label}
                {link.badge && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                    style={{ background: 'rgba(245,158,11,0.18)', color: '#f59e0b', fontSize: '0.6rem', letterSpacing: '0.05em' }}>
                    {link.badge}
                  </span>
                )}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: '#a78bfa' }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:0424424444" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors" style={{ fontFamily: 'var(--font-space)' }}>
              <FaPhone className="text-purple-400 text-xs" />
              0424 424 444
            </a>
            <Link href="/contact" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.875rem' }}>
              Book Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all"
            style={{ background: menuOpen ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaXmark /> : <FaBars />}
          </button>
        </motion.div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: 'rgba(5,8,22,0.97)', backdropFilter: 'blur(28px)', borderTop: '1px solid rgba(124,58,237,0.12)' }}
              className="overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2"
                    style={{
                      color: pathname === link.href ? '#c4b5fd' : '#94a3b8',
                      background: pathname === link.href ? 'rgba(124,58,237,0.12)' : 'transparent',
                      fontFamily: 'var(--font-space)',
                    }}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                        style={{ background: 'rgba(245,158,11,0.18)', color: '#f59e0b', fontSize: '0.6rem' }}>
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
                <div className="pt-3 pb-1 flex flex-col gap-2">
                  <a href="tel:0424424444" className="btn-ghost" style={{ justifyContent: 'center', padding: '12px 20px', fontSize: '0.875rem' }}>
                    <FaPhone /> 0424 424 444
                  </a>
                  <Link href="/contact" className="btn-primary" style={{ justifyContent: 'center', padding: '12px 20px', fontSize: '0.875rem' }}>
                    Book a Technician
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
