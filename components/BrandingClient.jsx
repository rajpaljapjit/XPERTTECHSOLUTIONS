'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaBolt, FaPhone, FaCircleCheck, FaStar, FaPalette, FaGlobe,
  FaMobileScreen, FaEnvelope, FaArrowRight, FaChevronDown, FaChevronUp,
  FaFire, FaGem, FaRocket, FaUserTie, FaClock, FaInfinity,
  FaLocationDot, FaCalendarDays, FaTag, FaLayerGroup
} from 'react-icons/fa6'
import AnimateIn, { StaggerChildren } from './AnimateIn'
import ParticleField from './ParticleField'

/* ─── Packages ──────────────────────────────────────── */
const packages = [
  {
    icon: FaRocket,
    iconBg: 'rgba(37,99,235,0.15)',
    iconColor: '#60a5fa',
    title: 'Starter Brand Package',
    badge: 'Perfect for New Businesses',
    badgeBg: 'rgba(37,99,235,0.12)',
    badgeColor: '#60a5fa',
    price: 'From $499',
    popular: false,
    features: [
      'Custom Logo Design (3 concepts to choose from)',
      'Brand Colour Palette (your unique colour codes)',
      'Brand Font Selection',
      'Business Card Design',
      'Email Signature Design',
      'PNG, JPG & SVG logo files delivered',
      '2 rounds of revisions included',
    ],
    cta: 'Get Started',
    href: '/contact',
  },
  {
    icon: FaFire,
    iconBg: 'rgba(124,58,237,0.2)',
    iconColor: '#a78bfa',
    title: 'Business Brand Package',
    badge: 'Most Popular',
    badgeBg: 'linear-gradient(135deg, #7c3aed, #2563eb)',
    badgeColor: '#ffffff',
    price: 'From $999',
    popular: true,
    features: [
      'Everything in Starter Brand Package',
      'Professional Website (up to 5 pages)',
      'Mobile Responsive Design',
      'Contact Form Integration',
      'Google Maps Integration',
      'Basic SEO Setup',
      'Social Media Profile Setup (Facebook, Instagram, LinkedIn)',
      'Social Media Banner & Profile Image Design',
      'Domain & Hosting Advice',
      '3 rounds of revisions included',
    ],
    cta: 'Book This Package',
    href: '/contact',
  },
  {
    icon: FaGem,
    iconBg: 'rgba(245,158,11,0.15)',
    iconColor: '#f59e0b',
    title: 'Complete Brand Package',
    badge: 'Best Value — Everything Included',
    badgeBg: 'rgba(245,158,11,0.15)',
    badgeColor: '#f59e0b',
    price: 'From $1,999',
    popular: false,
    features: [
      'Everything in Business Brand Package',
      'Premium Custom Website (unlimited pages)',
      'Online Booking System Integration',
      'Google Business Profile Setup & Optimisation',
      'Flyer & Promotional Material Design',
      'Letterhead & Invoice Template Design',
      'Vehicle Signage Design (if applicable)',
      'Brand Style Guide Document',
      '3 months of free minor website updates',
      'Priority support from Jamie directly',
      'Unlimited revisions until you are 100% happy',
    ],
    cta: 'Get Everything',
    href: '/contact',
  },
]

/* ─── Add-ons ───────────────────────────────────────── */
const addons = [
  { label: 'Logo design only', price: 'from $199' },
  { label: 'Website only (5 pages)', price: 'from $599' },
  { label: 'Social media graphics pack', price: 'from $149' },
  { label: 'Business card design', price: 'from $99' },
  { label: 'Flyer / promotional design', price: 'from $129' },
  { label: 'Google Business Profile setup', price: 'from $149' },
  { label: 'SEO setup & optimisation', price: 'from $299' },
  { label: 'Brand refresh / redesign', price: 'from $399' },
]

/* ─── Why XTS ───────────────────────────────────────── */
const reasons = [
  'One person handles everything — no outsourcing',
  'Technical AND creative expertise in one',
  'Fast turnaround — most projects within 7 days',
  'Unlimited communication directly with Jamie',
  'We understand tech businesses and local businesses',
  'Affordable prices — no agency markup',
  'Brisbane, Gold Coast & Northern NSW based',
]

/* ─── Placeholder reviews — REPLACE WITH REAL REVIEWS WHEN AVAILABLE ── */
const placeholderReviews = [
  {
    name: 'Alex T.',
    location: 'Brisbane',
    // REPLACE WITH REAL REVIEW WHEN AVAILABLE
    text: 'Jamie designed our logo and website in under a week. The branding looks incredibly professional and our customers always compliment it. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Melissa R.',
    location: 'Gold Coast',
    // REPLACE WITH REAL REVIEW WHEN AVAILABLE
    text: 'We went with the Complete Brand Package and could not be happier. One person handled everything — logo, website, social media. Saved us so much time and money.',
    rating: 5,
  },
  {
    name: 'Daniel K.',
    location: 'Northern NSW',
    // REPLACE WITH REAL REVIEW WHEN AVAILABLE
    text: 'The Business Brand Package was exactly what we needed to launch. Jamie was responsive, creative and delivered everything fast. 10 out of 10.',
    rating: 5,
  },
]

export default function BrandingClient() {
  return (
    <div>

      {/* ═══ HERO ═══ */}
      <section className="page-hero-bg dot-grid pt-36 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <ParticleField count={40} />
        <div className="orb-purple" style={{ width: 400, height: 400, top: '-10%', left: '5%', opacity: 0.4 }} />
        <div className="orb-gold"   style={{ width: 300, height: 300, bottom: '0%', right: '10%', opacity: 0.25 }} />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <AnimateIn>
            {/* New service badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.28)' }}>
              <FaFire style={{ color: '#f59e0b' }} className="text-xs" />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#f59e0b', fontFamily: 'var(--font-space)' }}>
                New Service
              </span>
            </div>

            <p className="section-label">Branding & Web Design</p>
            <h1 className="font-extrabold mb-4" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontFamily: 'var(--font-space)' }}>
              Complete Branding &amp; Web Design{' '}
              <span className="gradient-text">Packages</span>
            </h1>
            <p className="section-sub mx-auto text-center mb-6">
              Everything you need to launch your business — designed professionally, delivered fast.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn-primary"><FaCalendarDays /> Book Free Consultation</Link>
              <a href="tel:0424424444" className="btn-ghost"><FaPhone /> 0424 424 444</a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ INTRO ═══ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimateIn direction="zoom">
            <div className="glass-card p-8 sm:p-10 text-center"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.07) 0%, rgba(37,99,235,0.05) 100%)', border: '1px solid rgba(124,58,237,0.18)' }}>
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', boxShadow: '0 0 24px rgba(124,58,237,0.4)' }}>
                  <FaPalette className="text-white text-lg" />
                </div>
              </div>
              <p className="text-base leading-relaxed mb-4" style={{ color: '#94a3b8' }}>
                At XTS Tech Support, we don't just fix computers — <strong className="text-white">we build brands.</strong> Whether you're starting a new business or refreshing an existing one, Jamie Rajpal brings the same technical expertise and attention to detail to your brand as he does to every IT job.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#94a3b8' }}>
                From your logo to your website to your full brand identity — <strong className="text-white">we handle it all under one roof,</strong> so everything looks consistent, professional, and uniquely yours.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ PRICING CARDS ═══ */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#080d1f' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)' }} />
        <div className="orb-purple" style={{ width: 350, height: 350, top: '-10%', right: '-5%', opacity: 0.2 }} />

        <div className="max-w-6xl mx-auto relative z-10 pt-6 pb-6">
          <AnimateIn className="text-center mb-12">
            <p className="section-label">Packages</p>
            <h2 className="section-title">Choose Your Package</h2>
            <p className="section-sub mx-auto text-center">All packages include direct communication with Jamie — no middlemen, no outsourcing.</p>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {packages.map((pkg, i) => (
              <AnimateIn key={pkg.title} delay={i * 0.1} direction="up">
                <div className={`pricing-card h-full flex flex-col ${pkg.popular ? 'pricing-popular' : ''}`}
                  style={pkg.popular ? { border: '1px solid rgba(124,58,237,0.45)', boxShadow: '0 8px 50px rgba(0,0,0,0.4), 0 0 60px rgba(124,58,237,0.15)' } : {}}>

                  {/* Badge */}
                  {pkg.popular ? (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold"
                      style={{ background: pkg.badgeBg, color: pkg.badgeColor, boxShadow: '0 4px 20px rgba(124,58,237,0.5)' }}>
                      {pkg.badge}
                    </div>
                  ) : (
                    <div className="inline-flex self-start px-3 py-1 rounded-full text-xs font-semibold mb-4"
                      style={{ background: pkg.badgeBg, color: pkg.badgeColor, border: `1px solid ${pkg.badgeColor}44` }}>
                      {pkg.badge}
                    </div>
                  )}

                  {/* Icon + title */}
                  <div className="flex items-center gap-3 mb-4 mt-2">
                    <div className="icon-box" style={{ background: pkg.iconBg }}>
                      <pkg.icon style={{ color: pkg.iconColor }} />
                    </div>
                    <h3 className="font-bold text-white text-base leading-snug" style={{ fontFamily: 'var(--font-space)' }}>{pkg.title}</h3>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-white" style={{ fontFamily: 'var(--font-space)' }}>{pkg.price}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm" style={{ color: '#cbd5e1' }}>
                        <FaCircleCheck className="text-xs mt-0.5 flex-shrink-0" style={{ color: pkg.popular ? '#a78bfa' : '#60a5fa' }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={pkg.href} className={pkg.popular ? 'btn-primary justify-center' : 'btn-ghost justify-center'}>
                    {pkg.cta} <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.35), transparent)' }} />
      </section>

      {/* ═══ ADD-ONS ═══ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimateIn className="text-center mb-10">
            <p className="section-label">À La Carte</p>
            <h2 className="section-title">Need Something Specific?</h2>
            <p className="section-sub mx-auto text-center">We also offer individual services — pick exactly what you need.</p>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <div className="glass-card p-6 sm:p-8"
              style={{ border: '1px solid rgba(245,158,11,0.18)', background: 'linear-gradient(135deg, rgba(245,158,11,0.05) 0%, rgba(124,58,237,0.04) 100%)' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addons.map((addon) => (
                  <div key={addon.label} className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-2.5">
                      <FaTag className="text-xs flex-shrink-0" style={{ color: '#f59e0b' }} />
                      <span className="text-sm text-white">{addon.label}</span>
                    </div>
                    <span className="text-sm font-bold flex-shrink-0" style={{ color: '#f59e0b', fontFamily: 'var(--font-space)' }}>{addon.price}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center mt-5" style={{ color: '#475569' }}>
                All prices are starting points — exact quote provided after a free consultation.
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══ WHY CHOOSE XTS ═══ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#080d1f' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)' }} />
        <div className="orb-blue" style={{ width: 300, height: 300, bottom: '-10%', left: '-5%', opacity: 0.2 }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimateIn direction="right">
              <p className="section-label">Why XTS</p>
              <h2 className="section-title">Why choose XTS for your branding?</h2>
              <p className="text-sm mb-6" style={{ color: '#94a3b8', lineHeight: '1.7' }}>
                No agency overhead. No junior designers. Just Jamie — bringing full-stack creative and technical skills directly to your brand.
              </p>
              <div className="space-y-3">
                {reasons.map((reason) => (
                  <div key={reason} className="flex items-start gap-3">
                    <FaCircleCheck className="text-sm mt-0.5 flex-shrink-0" style={{ color: '#a78bfa' }} />
                    <span className="text-sm" style={{ color: '#cbd5e1' }}>{reason}</span>
                  </div>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn direction="left" delay={0.1}>
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '7', suffix: ' days', label: 'Avg. turnaround', color: '#a78bfa' },
                  { value: '$0', suffix: '', label: 'Consultation fee', color: '#f59e0b' },
                  { value: '1', suffix: '', label: 'Person. No outsourcing', color: '#60a5fa' },
                  { value: '∞', suffix: '', label: 'Revisions (Complete pkg)', color: '#34d399' },
                ].map((stat) => (
                  <div key={stat.label} className="glass-card p-5 text-center"
                    style={{ border: `1px solid ${stat.color}22` }}>
                    <p className="font-extrabold mb-1" style={{ color: stat.color, fontFamily: 'var(--font-space)', fontSize: '2rem' }}>
                      {stat.value}{stat.suffix}
                    </p>
                    <p className="text-xs" style={{ color: '#64748b' }}>{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Founder note */}
              <div className="mt-4 p-4 rounded-2xl"
                style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.18)' }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>JR</div>
                  <div>
                    <p className="text-sm font-bold text-white" style={{ fontFamily: 'var(--font-space)' }}>Jamie Rajpal</p>
                    <p className="text-xs" style={{ color: '#475569' }}>Founder — XTS Tech Support</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>
                  "I handle every branding project personally — from the first concept call to the final file delivery. Your brand gets the same dedication I give every IT job."
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.35), transparent)' }} />
      </section>

      {/* ═══ REVIEWS — PLACEHOLDER ═══ */}
      {/* ⚠️  REPLACE WITH REAL REVIEWS WHEN AVAILABLE  ⚠️  */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <AnimateIn className="text-center mb-10">
            <p className="section-label">Reviews</p>
            <h2 className="section-title">What clients say</h2>
            {/* ── REMOVE THIS NOTICE WHEN REAL REVIEWS ARE ADDED ── */}
            <p className="text-xs mt-2" style={{ color: '#334155' }}>
              [Placeholder reviews — replace with real customer testimonials]
            </p>
          </AnimateIn>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {placeholderReviews.map((review) => (
              /* ── REPLACE THIS CARD WITH A REAL REVIEW ── */
              <div key={review.name} className="review-card relative">
                {/* Placeholder watermark — remove with real reviews */}
                <div className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded"
                  style={{ background: 'rgba(245,158,11,0.1)', color: '#d97706', border: '1px solid rgba(245,158,11,0.2)', fontFamily: 'var(--font-space)' }}>
                  placeholder
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(review.rating)].map((_, i) => <FaStar key={i} className="text-yellow-400 text-sm" />)}
                </div>
                <p className="text-sm mb-4 leading-relaxed" style={{ color: '#cbd5e1' }}>"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-space)' }}>{review.name}</p>
                    <p className="text-xs" style={{ color: '#475569' }}>{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <AnimateIn direction="zoom">
          <div className="max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden dot-grid"
            style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #1e3a8a 50%, #7c3aed 100%)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)' }} />
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.35) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.4) 0%, transparent 70%)', filter: 'blur(40px)' }} />

            <div className="relative z-10">
              <p className="section-label" style={{ color: '#fcd34d' }}>Free Consultation</p>
              <h2 className="text-3xl font-extrabold text-white mb-4" style={{ fontFamily: 'var(--font-space)' }}>
                Ready to Build Your Brand?
              </h2>
              <p className="mb-8 max-w-md mx-auto" style={{ color: '#c4b5fd' }}>
                Contact Jamie today for a free 15-minute brand consultation. No obligation, no hard sell — just honest advice.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-gold">
                  <FaCalendarDays /> 📅 Book Free Consultation
                </Link>
                <a href="tel:0424424444" className="btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'white' }}>
                  <FaPhone /> 📞 Call Jamie Direct
                </a>
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>

    </div>
  )
}
