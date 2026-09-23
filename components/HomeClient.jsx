'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  FaBolt, FaPhone, FaLaptop, FaShieldVirus, FaTabletScreenButton,
  FaMobileScreen, FaCloudArrowUp, FaWifi, FaEnvelope, FaUserLock,
  FaPrint, FaDesktop, FaStar, FaArrowRight, FaCircleCheck,
  FaShield, FaHeadset, FaClock, FaLocationDot, FaCalendarDays,
  FaServer, FaBuilding, FaChevronDown, FaPalette, FaFire, FaGlobe
} from 'react-icons/fa6'
import AnimateIn from './AnimateIn'
import ParticleField from './ParticleField'

/* ─── Data ─────────────────────────────────────────── */
const phrases = ['Computer Repairs', 'Virus Removal', 'Wi-Fi Setup', 'Data Recovery', 'Remote Support']

const services = [
  { icon: FaLaptop,            color: '#a78bfa', bg: 'rgba(124,58,237,0.14)', title: 'Computer Repairs',   desc: 'Hardware and software fixes for any PC or Mac. Same day.',         size: 'large' },
  { icon: FaShieldVirus,       color: '#f87171', bg: 'rgba(239,68,68,0.12)',  title: 'Virus Removal',      desc: 'Full malware removal and security hardening.',                    size: 'large' },
  { icon: FaWifi,              color: '#22d3ee', bg: 'rgba(6,182,212,0.12)',  title: 'Wi-Fi Setup',        desc: 'Fast, reliable coverage in every room.',                          size: 'medium' },
  { icon: FaCloudArrowUp,      color: '#34d399', bg: 'rgba(52,211,153,0.12)', title: 'Data Recovery',      desc: 'Recover lost photos, documents and drives.',                      size: 'medium' },
  { icon: FaDesktop,           color: '#818cf8', bg: 'rgba(99,102,241,0.12)', title: 'Remote Support',     desc: 'Instant help without a home visit.',                              size: 'medium' },
  { icon: FaMobileScreen,      color: '#f472b6', bg: 'rgba(236,72,153,0.12)', title: 'Phone Support',      desc: 'Setup & troubleshooting for smartphones.',                         size: 'small' },
  { icon: FaTabletScreenButton,color: '#60a5fa', bg: 'rgba(37,99,235,0.14)',  title: 'Tablet Repairs',     desc: 'iPads and Android tablets.',                                      size: 'small' },
  { icon: FaEnvelope,          color: '#fb923c', bg: 'rgba(249,115,22,0.12)', title: 'Email Setup',        desc: 'Every device, every account.',                                    size: 'small' },
  { icon: FaUserLock,          color: '#fbbf24', bg: 'rgba(234,179,8,0.12)',  title: 'Privacy & Security', desc: 'Lock down accounts and protect data.',                             size: 'small' },
  { icon: FaPrint,             color: '#2dd4bf', bg: 'rgba(20,184,166,0.12)', title: 'Printer Setup',      desc: 'Wireless install on all devices.',                                size: 'small' },
]

const reviews = [
  { name: 'Sarah M.',  location: 'Sydney',     text: 'The technician arrived within 2 hours, fixed my laptop and set up my home network. Absolutely brilliant service.', rating: 5 },
  { name: 'James T.',  location: 'Melbourne',  text: 'Had a nasty virus on my PC. They completely cleaned it and put proper security in place. Professional and fast.', rating: 5 },
  { name: 'Linda K.',  location: 'Brisbane',   text: 'Remote session sorted out my email issues in 30 minutes. So easy — I watched the whole thing on screen.', rating: 5 },
  { name: 'David R.',  location: 'Perth',      text: 'They recovered 5 years of family photos I thought were gone. Cannot thank them enough. Highly recommend.', rating: 5 },
  { name: 'Angela P.', location: 'Adelaide',   text: 'Helped set up our whole office — 6 computers, printers, everything networked perfectly. No hidden charges.', rating: 5 },
  { name: 'Michael C.',location: 'Gold Coast', text: 'Needed same-day help when my laptop died before a big presentation. They saved the day. Fast and knowledgeable.', rating: 5 },
]

const marqueeItems = [
  '✦ No Callout Fee', '✦ Same-Day Service', '✦ No Fix No Fee', '✦ 7 Days a Week',
  "✦ 1,000's Helped", '✦ 4.9 Star Rating', '✦ CCNA Certified', '✦ Fully Insured',
  '✦ Brisbane', '✦ Gold Coast', '✦ Northern NSW', '✦ Background Checked',
]

const steps = [
  { num: '01', title: 'Book in 60s', body: 'Fill in the form or call us. No lengthy sign-ups.' },
  { num: '02', title: 'We Confirm', body: 'Jamie calls to confirm and gives an upfront estimate.' },
  { num: '03', title: 'We Arrive', body: 'Screened technician at your door at the agreed time.' },
  { num: '04', title: 'Problem Solved', body: 'Fixed, tested, explained. Pay only when 100% happy.' },
]

/* ─── Counter ───────────────────────────────────────── */
function Counter({ end, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (1800 / 16)
    const timer = setInterval(() => {
      start = Math.min(start + step, end)
      setCount(Math.floor(start))
      if (start >= end) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end])
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

/* ─── Marquee ───────────────────────────────────────── */
function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems]
  return (
    <div className="overflow-hidden py-4" style={{ borderTop: '1px solid rgba(124,58,237,0.15)', borderBottom: '1px solid rgba(124,58,237,0.15)', background: 'rgba(124,58,237,0.04)' }}>
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="text-sm font-semibold flex-shrink-0" style={{ color: '#94a3b8', fontFamily: 'var(--font-space)' }}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ─── Bento service card ────────────────────────────── */
function ServiceCard({ svc, delay = 0 }) {
  const isLarge = svc.size === 'large'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative overflow-hidden rounded-2xl p-6 cursor-default group"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = svc.color + '55'
        e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${svc.color}18`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Subtle bg glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse 80% 80% at 50% 0%, ${svc.color}10 0%, transparent 70%)` }} />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: svc.bg }}>
            <svc.icon style={{ color: svc.color }} className="text-lg" />
          </div>
          <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity mt-1" style={{ color: svc.color }} />
        </div>
        <h3 className="font-bold text-white mb-1.5 leading-snug" style={{ fontFamily: 'var(--font-space)', fontSize: isLarge ? '1.05rem' : '0.9rem' }}>
          {svc.title}
        </h3>
        {(isLarge || svc.size === 'medium') && (
          <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{svc.desc}</p>
        )}
      </div>
    </motion.div>
  )
}

/* ─── Main component ────────────────────────────────── */
export default function HomeClient() {
  const [typed, setTyped] = useState('Computer Repairs')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(14)
  const [deleting, setDeleting] = useState(false)
  const [activeReview, setActiveReview] = useState(0)

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    const phrase = phrases[phraseIdx]
    const timer = setTimeout(() => {
      if (!deleting && charIdx < phrase.length) {
        setTyped(phrase.slice(0, charIdx + 1)); setCharIdx(c => c + 1)
      } else if (!deleting && charIdx === phrase.length) {
        setTimeout(() => setDeleting(true), 1800)
      } else if (deleting && charIdx > 0) {
        setTyped(phrase.slice(0, charIdx - 1)); setCharIdx(c => c - 1)
      } else {
        setDeleting(false); setPhraseIdx(i => (i + 1) % phrases.length)
      }
    }, deleting ? 40 : 90)
    return () => clearTimeout(timer)
  }, [charIdx, deleting, phraseIdx])

  // Auto-advance reviews
  useEffect(() => {
    const t = setInterval(() => setActiveReview(r => (r + 1) % reviews.length), 4500)
    return () => clearInterval(t)
  }, [])

  return (
    <div>

      {/* ═══════════════════════════════════════════════
          HERO — Full-screen centered, no split layout
      ═══════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ background: '#050816' }}>
        <ParticleField count={70} />

        {/* Orbs */}
        <div className="orb-purple" style={{ width: 600, height: 600, top: '-15%', left: '-10%', opacity: 0.55 }} />
        <div className="orb-blue"   style={{ width: 500, height: 500, bottom: '-10%', right: '-8%', opacity: 0.5 }} />
        <div className="orb-gold"   style={{ width: 300, height: 300, top: '30%', right: '15%', opacity: 0.25 }} />

        {/* Dot grid overlay */}
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8"
            style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.28)', backdropFilter: 'blur(16px)' }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: '#a78bfa', boxShadow: '0 0 10px #a78bfa', animation: 'glow-pulse 2s ease-in-out infinite' }} />
            <span className="text-sm font-semibold" style={{ color: '#c4b5fd', fontFamily: 'var(--font-space)' }}>
              Brisbane's Fastest Same-Day IT Support
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: 'var(--font-space)', lineHeight: 1.08, letterSpacing: '-0.02em' }}
            className="font-extrabold text-white mb-4"
          >
            <span style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', display: 'block' }}>Your Tech Fixed.</span>
            <span className="gradient-text" style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', display: 'block' }}>Today.</span>
          </motion.h1>

          {/* Typing subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg font-medium mb-2"
            style={{ color: '#64748b' }}
          >
            Expert help with{' '}
            <span style={{ color: '#a78bfa', fontWeight: 700 }}>
              {typed}
              <span className="inline-block w-0.5 h-5 ml-0.5 align-middle animate-pulse" style={{ background: '#a78bfa' }} />
            </span>
          </motion.p>

          {/* Business line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xs font-semibold mb-10 flex items-center justify-center gap-2"
            style={{ color: '#f59e0b', fontFamily: 'var(--font-space)' }}
          >
            <FaBuilding className="text-xs" />
            Businesses Australia-wide — on-site hands in Brisbane, Gold Coast &amp; Northern NSW
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center gap-4 mb-14"
          >
            <Link href="/contact" className="btn-primary" style={{ fontSize: '1rem', padding: '15px 32px' }}>
              <FaBolt /> Book a Technician
            </Link>
            {/* Replace YOUR_CALENDLY_USERNAME with your real Calendly username */}
            <a href="https://calendly.com/YOUR_CALENDLY_USERNAME" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ fontSize: '1rem', padding: '15px 32px' }}>
              <FaCalendarDays /> Pick a Time
            </a>
            <a href="tel:0424424444" className="btn-ghost" style={{ fontSize: '1rem', padding: '15px 32px' }}>
              <FaPhone /> 0424 424 444
            </a>
          </motion.div>

          {/* Mini trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {[
              { icon: FaCircleCheck, text: '$0 Callout Fee' },
              { icon: FaShield,      text: 'No Fix No Fee' },
              { icon: FaClock,       text: 'Same-Day Service' },
              { icon: FaHeadset,     text: '7 Days a Week' },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2">
                <b.icon className="text-sm" style={{ color: '#a78bfa' }} />
                <span className="text-xs font-semibold" style={{ color: '#64748b', fontFamily: 'var(--font-space)' }}>{b.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{ color: '#334155' }}
        >
          <span className="text-xs" style={{ fontFamily: 'var(--font-space)' }}>scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <FaChevronDown className="text-xs" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          MARQUEE STRIP
      ═══════════════════════════════════════════════ */}
      <Marquee />

      {/* ═══════════════════════════════════════════════
          STATS — 4 large animated numbers in a row
      ═══════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#050816' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              { end: 1000, suffix: '+', label: 'Happy Customers', pre: '' },
              { end: 49,   suffix: '',  label: 'Star Rating',     pre: '', special: '4.9 ★' },
              { end: 98,   suffix: '%', label: 'Satisfaction Rate', pre: '' },
              { end: 10,   suffix: '',  label: 'Years in Business', pre: '' },
            ].map((stat, i) => (
              <AnimateIn key={stat.label} delay={i * 0.1} direction="up">
                <div className="text-center py-8 px-4 relative"
                  style={{ borderRight: i < 3 ? '1px solid rgba(124,58,237,0.12)' : 'none' }}>
                  <p className="font-extrabold stat-num mb-2 leading-none"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-space)' }}>
                    {stat.special || <Counter end={stat.end} suffix={stat.suffix} prefix={stat.pre} />}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#475569', fontFamily: 'var(--font-space)' }}>
                    {stat.label}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
          <div className="mt-0" style={{ borderTop: '1px solid rgba(124,58,237,0.12)' }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BENTO SERVICES GRID
      ═══════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#080d1f' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)' }} />
        <div className="orb-purple" style={{ width: 400, height: 400, top: '-10%', right: '-5%', opacity: 0.2 }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <AnimateIn className="mb-12">
            <p className="section-label">What We Fix</p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="section-title mb-0">10 services.<br />One friendly expert.</h2>
              <Link href="/services" className="flex items-center gap-2 text-sm font-semibold flex-shrink-0 mb-1"
                style={{ color: '#a78bfa', fontFamily: 'var(--font-space)' }}>
                View all services <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </AnimateIn>

          {/* Bento grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {/* Row 1 — 2 large cards spanning 3 cols each */}
            {services.filter(s => s.size === 'large').map((svc, i) => (
              <div key={svc.title} className="col-span-2 md:col-span-2 lg:col-span-3">
                <ServiceCard svc={svc} delay={i * 0.08} />
              </div>
            ))}

            {/* Row 2 — 3 medium cards spanning 2 cols each */}
            {services.filter(s => s.size === 'medium').map((svc, i) => (
              <div key={svc.title} className="col-span-2 md:col-span-2 lg:col-span-2">
                <ServiceCard svc={svc} delay={0.16 + i * 0.07} />
              </div>
            ))}

            {/* Row 3 — 5 small cards in a single row */}
            {services.filter(s => s.size === 'small').map((svc, i) => (
              <div key={svc.title} className="col-span-1 lg:col-span-1" style={{ minWidth: 0 }}>
                <ServiceCard svc={svc} delay={0.37 + i * 0.06} />
              </div>
            ))}

            {/* Remote Hands promo card — full width */}
            <div className="col-span-2 md:col-span-4 lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.09) 0%, rgba(124,58,237,0.06) 100%)', border: '1px solid rgba(245,158,11,0.2)' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(245,158,11,0.14)' }}>
                  <FaServer style={{ color: '#f59e0b' }} className="text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-white text-sm" style={{ fontFamily: 'var(--font-space)' }}>Remote Hands &amp; On-Site Hardware Support</p>
                    <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24' }}>Business</span>
                  </div>
                  <p className="text-xs" style={{ color: '#94a3b8' }}>Your IT team remote — Jamie on-site in Brisbane, Gold Coast &amp; Northern NSW. Router installs, server hardware, cable runs &amp; more.</p>
                </div>
                <Link href="/services" className="flex items-center gap-2 text-sm font-bold flex-shrink-0" style={{ color: '#f59e0b', fontFamily: 'var(--font-space)' }}>
                  Learn more <FaArrowRight className="text-xs" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.35), transparent)' }} />
      </section>

      {/* ═══════════════════════════════════════════════
          HOW IT WORKS — horizontal numbered steps
      ═══════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#050816' }}>
        <div className="max-w-5xl mx-auto">
          <AnimateIn className="text-center mb-14">
            <p className="section-label">How It Works</p>
            <h2 className="section-title">Fixed in 4 steps</h2>
          </AnimateIn>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-px"
              style={{ background: 'linear-gradient(90deg, #7c3aed, #2563eb, #7c3aed)', opacity: 0.3 }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <AnimateIn key={step.num} delay={i * 0.1} direction="up">
                  <div className="text-center relative">
                    <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center relative z-10"
                      style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(37,99,235,0.2))', border: '1px solid rgba(124,58,237,0.3)' }}>
                      <span className="font-extrabold text-lg gradient-text-purple" style={{ fontFamily: 'var(--font-space)' }}>{step.num}</span>
                    </div>
                    <h3 className="font-bold text-white mb-2" style={{ fontFamily: 'var(--font-space)' }}>{step.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{step.body}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          REVIEWS — featured large quote + side grid
      ═══════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#080d1f' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)' }} />
        <div className="orb-blue" style={{ width: 350, height: 350, bottom: '-10%', left: '-5%', opacity: 0.25 }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <AnimateIn className="text-center mb-12">
            <p className="section-label">Reviews</p>
            <h2 className="section-title">What customers say</h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <FaStar key={i} className="text-yellow-400 text-sm" />)}
              </div>
              <span className="font-extrabold stat-num text-xl" style={{ fontFamily: 'var(--font-space)' }}>4.9</span>
              <span className="text-sm" style={{ color: '#475569' }}>average across all platforms</span>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: large featured review with auto-advance */}
            <AnimateIn direction="right">
              <div className="h-full rounded-3xl p-8 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(37,99,235,0.08) 100%)', border: '1px solid rgba(124,58,237,0.25)', minHeight: 280 }}>
                <div className="absolute top-6 right-6 text-6xl font-extrabold leading-none" style={{ color: 'rgba(124,58,237,0.15)', fontFamily: 'serif' }}>"</div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeReview}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10"
                  >
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, i) => <FaStar key={i} className="text-yellow-400 text-sm" />)}
                    </div>
                    <p className="text-base leading-relaxed text-white mb-6" style={{ fontStyle: 'italic' }}>
                      "{reviews[activeReview].text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
                        {reviews[activeReview].name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm" style={{ fontFamily: 'var(--font-space)' }}>{reviews[activeReview].name}</p>
                        <p className="text-xs" style={{ color: '#475569' }}>{reviews[activeReview].location}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Dots */}
                <div className="flex gap-1.5 mt-6">
                  {reviews.map((_, i) => (
                    <button key={i} onClick={() => setActiveReview(i)}
                      className="rounded-full transition-all duration-300"
                      style={{ width: i === activeReview ? 20 : 6, height: 6, background: i === activeReview ? '#a78bfa' : 'rgba(124,58,237,0.25)' }} />
                  ))}
                </div>
              </div>
            </AnimateIn>

            {/* Right: compact review grid */}
            <AnimateIn direction="left" delay={0.1}>
              <div className="grid grid-cols-1 gap-3 h-full">
                {reviews.slice(0, 3).map((review, i) => (
                  <motion.div
                    key={review.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                    className="rounded-xl p-4 flex items-start gap-3"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
                      {review.name[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-xs font-bold text-white" style={{ fontFamily: 'var(--font-space)' }}>{review.name}</span>
                        <span className="text-xs" style={{ color: '#334155' }}>— {review.location}</span>
                        <div className="flex gap-0.5 ml-auto flex-shrink-0">
                          {[...Array(5)].map((_, j) => <FaStar key={j} className="text-yellow-400 text-xs" />)}
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#64748b' }}>"{review.text}"</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.35), transparent)' }} />
      </section>

      {/* ═══════════════════════════════════════════════
          FOUNDER — full-width split panel
      ═══════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: '#050816' }}>
        <div className="max-w-5xl mx-auto">
          <AnimateIn direction="zoom">
            <div className="rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(124,58,237,0.2)' }}>
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Left panel — identity */}
                <div className="lg:col-span-2 p-8 flex flex-col items-center lg:items-start justify-center gap-4 text-center lg:text-left relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #1e3a8a 100%)' }}>
                  <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)', filter: 'blur(30px)' }} />
                  <div className="relative z-10">
                    <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-extrabold text-white mb-4 mx-auto lg:mx-0"
                      style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                      JR
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#fcd34d', fontFamily: 'var(--font-space)' }}>Who You're Booking</p>
                    <h3 className="font-extrabold text-white text-2xl mb-0.5" style={{ fontFamily: 'var(--font-space)' }}>Jamie Rajpal</h3>
                    <p className="text-sm font-medium mb-4" style={{ color: '#c4b5fd' }}>Founder &amp; Lead Technician</p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                      {['Brisbane', 'Gold Coast', 'Northern NSW'].map((a) => (
                        <span key={a} className="text-xs px-3 py-1 rounded-full"
                          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', color: 'white' }}>{a}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right panel — bio */}
                <div className="lg:col-span-3 p-8" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <p className="section-label mb-3">The person coming to your door</p>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: '#94a3b8' }}>
                    Master of IT (Griffith University) · CCNA Certified · Double major in Network &amp; Security and Hardware. When you book XTS, you get Jamie himself — not a call centre, not a random contractor.
                  </p>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: '#94a3b8' }}>
                    XTS is fully mobile — no shopfront, no overhead. Same care and honesty for every single job across Brisbane, Gold Coast and Northern NSW.
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {['MIT — Griffith University', 'CCNA Certified', 'Background Checked', 'Fully Insured'].map((q) => (
                      <div key={q} className="flex items-center gap-2">
                        <FaCircleCheck className="text-xs flex-shrink-0" style={{ color: '#a78bfa' }} />
                        <span className="text-xs" style={{ color: '#cbd5e1' }}>{q}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/about" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.875rem' }}>
                    Meet Jamie <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SERVICE AREAS — pill cloud
      ═══════════════════════════════════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#080d1f' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.35), transparent)' }} />
        <div className="orb-purple" style={{ width: 300, height: 300, top: '-20%', left: '30%', opacity: 0.15 }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <AnimateIn>
            <p className="section-label">Where We Work</p>
            <h2 className="text-2xl font-extrabold text-white mb-2" style={{ fontFamily: 'var(--font-space)' }}>
              Fully mobile — we come to you
            </h2>
            <p className="text-sm mb-8" style={{ color: '#64748b' }}>No shopfront. No callout fee. Same-day across South East Queensland &amp; Northern NSW.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Brisbane', 'Gold Coast', 'Tweed Heads', 'Byron Bay', 'Lismore', 'Ballina', 'Northern NSW'].map((area, i) => (
                <motion.div
                  key={area}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}
                >
                  <FaLocationDot style={{ color: '#f59e0b' }} className="text-xs" />
                  <span className="text-sm font-medium text-white" style={{ fontFamily: 'var(--font-space)' }}>{area}</span>
                </motion.div>
              ))}
            </div>
            <AnimateIn delay={0.4} className="mt-8">
              <Link href="/contact" className="btn-primary">
                <FaBolt /> Book in Your Area
              </Link>
            </AnimateIn>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.35), transparent)' }} />
      </section>

      {/* ═══════════════════════════════════════════════
          BRANDING TEASER
      ═══════════════════════════════════════════════ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#080d1f' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)' }} />
        <div className="orb-purple" style={{ width: 350, height: 350, top: '-20%', right: '-5%', opacity: 0.2 }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimateIn direction="zoom">
            <div className="rounded-3xl p-8 sm:p-10 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(37,99,235,0.07) 100%)', border: '1px solid rgba(124,58,237,0.25)' }}>
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)', filter: 'blur(40px)' }} />

              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Left */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
                    style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)' }}>
                    <FaFire style={{ color: '#f59e0b' }} className="text-xs" />
                    <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#f59e0b', fontFamily: 'var(--font-space)' }}>New Service</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-space)' }}>
                    Need a Logo or Website?
                  </h2>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#94a3b8' }}>
                    XTS now offers complete branding and web design packages — logo, website, social media and more. All handled personally by Jamie. Starting from $499.
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                    {['Logo Design', 'Website', 'Social Media', 'SEO', 'Brand Identity'].map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Right — mini package list */}
                <div className="flex-shrink-0 w-full lg:w-72 space-y-2.5">
                  {[
                    { label: 'Starter Brand Package', price: 'from $499', color: '#60a5fa' },
                    { label: 'Business Brand Package', price: 'from $999', color: '#a78bfa', popular: true },
                    { label: 'Complete Brand Package', price: 'from $1,999', color: '#f59e0b' },
                  ].map((pkg) => (
                    <div key={pkg.label} className="flex items-center justify-between px-4 py-3 rounded-xl"
                      style={{
                        background: pkg.popular ? 'rgba(124,58,237,0.12)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${pkg.popular ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.06)'}`,
                      }}>
                      <div className="flex items-center gap-2">
                        <FaCircleCheck className="text-xs" style={{ color: pkg.color }} />
                        <span className="text-xs font-medium text-white">{pkg.label}</span>
                      </div>
                      <span className="text-xs font-bold flex-shrink-0 ml-2" style={{ color: pkg.color, fontFamily: 'var(--font-space)' }}>{pkg.price}</span>
                    </div>
                  ))}
                  <Link href="/branding" className="btn-primary w-full justify-center mt-4" style={{ marginTop: 16 }}>
                    <FaPalette /> See All Packages
                  </Link>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.35), transparent)' }} />
      </section>

      {/* ═══════════════════════════════════════════════
          FINAL CTA — oversized centered
      ═══════════════════════════════════════════════ */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#050816' }}>
        <ParticleField count={30} />
        <div className="orb-purple" style={{ width: 500, height: 500, top: '-20%', left: '-10%', opacity: 0.4 }} />
        <div className="orb-blue"   style={{ width: 400, height: 400, bottom: '-20%', right: '-8%', opacity: 0.35 }} />
        <div className="orb-gold"   style={{ width: 250, height: 250, top: '30%', right: '20%', opacity: 0.2 }} />
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

        <AnimateIn direction="zoom" className="relative z-10 text-center max-w-3xl mx-auto">
          <p className="section-label" style={{ color: '#fcd34d' }}>Ready?</p>
          <h2 className="font-extrabold text-white mb-4"
            style={{ fontFamily: 'var(--font-space)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>
            Same-day tech help,<br />just a call away.
          </h2>
          <p className="text-base mb-10 max-w-md mx-auto" style={{ color: '#64748b' }}>
            No callout fees. No fix, no charge. Book online in 60 seconds.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary" style={{ fontSize: '1rem', padding: '15px 36px' }}>
              <FaBolt /> Book Online Now
            </Link>
            <a href="tel:0424424444" className="btn-ghost" style={{ fontSize: '1rem', padding: '15px 36px' }}>
              <FaPhone /> 0424 424 444
            </a>
          </div>
        </AnimateIn>
      </section>

    </div>
  )
}
