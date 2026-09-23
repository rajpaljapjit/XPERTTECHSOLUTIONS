'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaBolt, FaPhone, FaCircleCheck, FaXmark, FaHouse, FaBriefcase,
  FaDesktop, FaCheck, FaChevronDown, FaChevronUp, FaStar, FaShield, FaTag
} from 'react-icons/fa6'
import AnimateIn from './AnimateIn'
import ParticleField from './ParticleField'

const faqs = [
  {
    q: 'Is there a callout fee?',
    a: 'No -- zero callout fees, ever. You only pay for the time the technician works on your device. We come to you at no extra cost.',
  },
  {
    q: 'What if you cannot fix my problem?',
    a: "You pay nothing. Our no fix, no fee guarantee means if we can't resolve your issue, there is no charge -- no exceptions.",
  },
  {
    q: 'How long does a typical job take?',
    a: 'Most home repairs are completed within one hour. We have a one-hour minimum charge. Complex jobs like data recovery may take longer -- we will always advise upfront.',
  },
  {
    q: 'Do you work on weekends and public holidays?',
    a: 'Yes -- we operate 7 days a week including all public holidays, from 7am to 9pm. Same rates apply on weekends with no surcharge.',
  },
  {
    q: 'Can you help me remotely?',
    a: 'Yes. Remote support starts at $89/hr. We connect securely via screen-sharing software and you can watch every action in real time. Sessions end the moment you ask.',
  },
  {
    q: 'Are there any hidden fees?',
    a: 'None, ever. The hourly rate is the only charge. No travel fee, no diagnostic fee, no parts markup, no after-hours surcharge.',
  },
  {
    q: 'How do I pay?',
    a: 'All major credit and debit cards, bank transfer, or cash. We only ask for payment once you are completely happy with the result.',
  },
]

const plans = [
  {
    icon: FaHouse,
    iconColor: '#34d399',
    iconBg: 'rgba(52,211,153,0.15)',
    title: 'Home Visit',
    subtitle: 'Perfect for home users',
    rate: '120',
    unit: '/hr',
    popular: false,
    features: [
      'Technician comes to you',
      'No callout fee',
      'No fix no fee',
      'All devices covered',
      'Standard rate: Mon–Wed, 10am–3pm',
      'Weekend & after-hours — contact for pricing',
    ],
    cta: 'Book Home Visit',
    ctaClass: 'btn-ghost',
    href: '/contact',
  },
  {
    icon: FaBriefcase,
    iconColor: '#ffffff',
    iconBg: 'rgba(124,58,237,0.25)',
    title: 'Business Visit',
    subtitle: 'For small to medium business',
    rate: '150',
    unit: '/hr',
    popular: true,
    features: [
      'Priority scheduling',
      'Network and server support',
      'Multi-device support',
      'No callout fee',
      'No fix no fee',
      'Invoicing available',
    ],
    cta: 'Book Business Visit',
    ctaClass: 'btn-primary',
    href: '/contact',
  },
  {
    icon: FaDesktop,
    iconColor: '#22d3ee',
    iconBg: 'rgba(6,182,212,0.15)',
    title: 'Remote Support',
    subtitle: 'Instant help from anywhere',
    rate: '89',
    unit: '/hr',
    popular: false,
    features: [
      'Connect in minutes',
      'Encrypted session',
      'You watch every action',
      'No fix no fee',
      'Software issues only',
      'Lower hourly rate',
    ],
    cta: 'Start Remote Session',
    ctaClass: 'btn-ghost',
    href: '/contact',
  },
]

export default function PricingClient() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div>
      {/* Hero */}
      <section className="page-hero-bg dot-grid pt-36 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <ParticleField count={35} />
        <div className="orb-purple" style={{ width: 350, height: 350, top: '-10%', left: '5%', opacity: 0.4 }} />
        <div className="orb-gold" style={{ width: 280, height: 280, bottom: '5%', right: '10%', opacity: 0.3 }} />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <AnimateIn>
            <p className="section-label">Pricing</p>
            <h1 className="font-extrabold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-space)' }}>
              Simple, <span className="gradient-text">Transparent Pricing</span>
            </h1>
            <p className="section-sub mx-auto text-center">
              Same-day service. No callout fees. No fix, no fee. From just $89/hr.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.15} className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { icon: FaCheck, text: '$0 Callout Fee' },
              { icon: FaCheck, text: 'No Fix No Fee' },
              { icon: FaCheck, text: 'Same-Day Available' },
              { icon: FaCheck, text: '7 Days a Week' },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.22)' }}>
                <badge.icon style={{ color: '#a78bfa' }} className="text-xs" />
                <span className="text-sm font-semibold" style={{ color: '#c4b5fd' }}>{badge.text}</span>
              </div>
            ))}
          </AnimateIn>
        </div>
      </section>

      {/* After-hours notice */}
      <section className="pb-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <AnimateIn>
            <div className="rounded-2xl p-5" style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.18)' }}>
              <p className="font-bold text-white text-sm mb-2">💡 Please Note — Special Rates Apply</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm" style={{ color: '#94a3b8' }}>
                <div className="flex items-start gap-2">
                  <span style={{ color: '#f59e0b' }}>•</span>
                  <span><strong className="text-white">Standard Rate</strong> applies Mon–Wed, 10am–3pm</span>
                </div>
                <div className="flex items-start gap-2">
                  <span style={{ color: '#f59e0b' }}>•</span>
                  <span><strong className="text-white">After-Hours Service</strong> — higher rates apply outside 10am–3pm</span>
                </div>
                <div className="flex items-start gap-2">
                  <span style={{ color: '#f59e0b' }}>•</span>
                  <span><strong className="text-white">Weekend (Sat &amp; Sun)</strong> — weekend rates apply. Contact us for a custom quote.</span>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <AnimateIn key={plan.title} delay={i * 0.1} direction="up">
                <div className={`pricing-card h-full ${plan.popular ? 'pricing-popular' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold"
                      style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white', boxShadow: '0 4px 20px rgba(124,58,237,0.5)' }}>
                      MOST POPULAR
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-5">
                    <div className="icon-box" style={{ background: plan.iconBg }}>
                      <plan.icon style={{ color: plan.iconColor }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base" style={{ fontFamily: 'var(--font-space)' }}>{plan.title}</h3>
                      <p className="text-xs" style={{ color: '#475569' }}>{plan.subtitle}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-5xl font-extrabold text-white" style={{ fontFamily: 'var(--font-space)' }}>${plan.rate}</span>
                    <span className="text-lg font-medium" style={{ color: '#475569' }}>{plan.unit}</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feat) => (
                      <li key={feat} className="check-item">
                        <FaCircleCheck className="check-icon" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={plan.href} className={plan.ctaClass} style={{ justifyContent: 'center' }}>
                    {plan.cta}
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Business package banner */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <div className="max-w-5xl mx-auto glass-card rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="icon-box" style={{ background: 'rgba(124,58,237,0.15)', width: 56, height: 56, borderRadius: 16, fontSize: '1.4rem' }}>
                <FaBriefcase style={{ color: '#a78bfa' }} />
              </div>
              <div>
                <h3 className="font-bold text-white" style={{ fontFamily: 'var(--font-space)' }}>Business IT Package</h3>
                <p className="text-sm" style={{ color: '#94a3b8' }}>Monthly retainer for ongoing IT management, priority support and regular maintenance visits. Custom pricing.</p>
              </div>
            </div>
            <Link href="/contact" className="btn-ghost flex-shrink-0"
              style={{ borderColor: 'rgba(124,58,237,0.35)', color: '#a78bfa' }}>
              Get Custom Quote <FaBolt className="text-xs" />
            </Link>
          </div>
        </AnimateIn>
      </section>

      {/* Guarantee cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: FaShield, color: '#34d399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)', title: 'No Fix No Fee', body: 'If we cannot resolve your issue, you will not be charged a single cent.' },
            { icon: FaTag, color: '#a78bfa', bg: 'rgba(124,58,237,0.1)', border: 'rgba(124,58,237,0.2)', title: '$0 Callout Fee', body: 'We travel to you at no extra cost. Pay only for the time we work.' },
            { icon: FaBolt, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', title: 'Same-Day Available', body: 'Book before noon and we aim to have a technician with you that same afternoon.' },
          ].map((g) => (
            <AnimateIn key={g.title} direction="zoom">
              <div className="glass-card p-6 text-center" style={{ borderColor: g.border }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl" style={{ background: g.bg }}>
                  <g.icon style={{ color: g.color }} />
                </div>
                <h3 className="font-bold text-white mb-2" style={{ fontFamily: 'var(--font-space)' }}>{g.title}</h3>
                <p className="text-sm" style={{ color: '#94a3b8', lineHeight: '1.6' }}>{g.body}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#0a0c1e' }}>
        <div className="absolute top-0 left-0 right-0 h-12 overflow-hidden" style={{ background: '#050816' }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 L1440,48 L0,48 Z" fill="#0a0c1e" />
          </svg>
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <AnimateIn className="text-center mb-10">
            <p className="section-label">FAQ</p>
            <h2 className="section-title">Pricing Questions Answered</h2>
          </AnimateIn>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <AnimateIn key={i} delay={i * 0.05}>
                <div className="faq-item">
                  <button
                    className="faq-btn"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    {openFaq === i
                      ? <FaChevronUp style={{ color: '#a78bfa' }} className="flex-shrink-0 text-sm" />
                      : <FaChevronDown className="text-slate-500 flex-shrink-0 text-sm" />
                    }
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-full">
            <path d="M1440,0 L0,48 L1440,48 Z" fill="#050816" />
          </svg>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <AnimateIn direction="zoom">
          <div className="max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden dot-grid"
            style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #1e3a8a 50%, #7c3aed 100%)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)' }} />
            <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <div className="relative z-10">
              <p className="section-label" style={{ color: '#fcd34d' }}>Ready?</p>
              <h2 className="text-3xl font-extrabold text-white mb-4" style={{ fontFamily: 'var(--font-space)' }}>
                Book your technician today
              </h2>
              <p className="mb-8 max-w-md mx-auto" style={{ color: '#c4b5fd' }}>
                No obligation. We quote before we start and only charge when you are 100% satisfied.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-white"><FaBolt /> Book Online</Link>
                <a href="tel:0424424444" className="btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'white' }}>
                  <FaPhone /> 0424 424 444
                </a>
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>
    </div>
  )
}
