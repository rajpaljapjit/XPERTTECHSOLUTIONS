'use client'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  FaBolt, FaPhone, FaComment, FaCircleCheck, FaShield, FaTag,
  FaHeart, FaUsers, FaAward, FaStar, FaIdCard, FaClipboardCheck,
  FaUserCheck, FaLock
} from 'react-icons/fa6'
import AnimateIn, { StaggerChildren } from './AnimateIn'
import ParticleField from './ParticleField'

const values = [
  { icon: FaComment, color: '#a78bfa', bg: 'rgba(124,58,237,0.12)', title: 'Plain English', body: 'We explain every step without tech jargon. You always know exactly what we are doing and why.' },
  { icon: FaBolt, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', title: 'Fast Response', body: 'We know tech problems are urgent. Same-day appointments and rapid remote sessions are our standard.' },
  { icon: FaCircleCheck, color: '#34d399', bg: 'rgba(52,211,153,0.12)', title: 'Job Done Right', body: 'We do not leave until the problem is resolved. We test everything before signing off on any job.' },
  { icon: FaShield, color: '#f87171', bg: 'rgba(239,68,68,0.12)', title: 'Trust and Safety', body: 'Every technician is background checked, ID-verified and rated by customers after each visit.' },
  { icon: FaTag, color: '#60a5fa', bg: 'rgba(37,99,235,0.14)', title: 'Fair Pricing', body: 'No callout fees, no hidden charges, no fix no fee. The hourly rate is the only thing you pay.' },
  { icon: FaHeart, color: '#f472b6', bg: 'rgba(236,72,153,0.12)', title: 'Care for People', body: 'We treat every customer like a neighbour. Patient, respectful and genuinely invested in your outcome.' },
]

const standards = [
  { icon: FaIdCard, title: 'Fully ID Verified', body: 'Jamie carries official photo ID to every home and business visit for your peace of mind.' },
  { icon: FaAward, title: 'Certified Skills', body: 'Industry certifications including CompTIA A+, CCNA, and Microsoft 365 — verifiable credentials you can trust.' },
  { icon: FaComment, title: 'Plain English Always', body: 'No jargon, no confusing terms. Every step is explained clearly so you always know what is happening.' },
  { icon: FaUserCheck, title: 'Background Checked', body: 'Full criminal background check completed. You can feel safe welcoming Jamie into your home or business.' },
  { icon: FaStar, title: 'Rated by Real Customers', body: 'Every job is rated by the customer. Consistency and quality are non-negotiable standards.' },
  { icon: FaLock, title: 'Fully Insured', body: 'Public liability and professional indemnity insurance in place on every visit.' },
]

const milestones = [
  { year: '2016', title: 'XTS Founded', body: 'Started as a one-person mobile IT operation in Brisbane, with a simple promise: honest, affordable tech help at your door.' },
  { year: '2018', title: 'Gold Coast Launch', body: 'Expanded service coverage to the Gold Coast, bringing same-day support to homes and businesses along the coast.' },
  { year: '2020', title: 'Remote Support Launch', body: 'Launched secure remote support sessions — helping customers across Northern NSW and beyond without a home visit.' },
  { year: '2022', title: 'Northern NSW Expansion', body: "Extended coverage to Tweed Heads, Byron Bay, Lismore and Ballina, serving 1,000's of satisfied customers." },
  { year: '2024', title: '4.9 Star Rating', body: 'Achieved a 4.9-star rating across Google, Facebook and Trustpilot. Every review earned the hard way.' },
  { year: '2026', title: "Trusted by 1,000's", body: "Now trusted by 1,000's of homes and businesses across Brisbane, Gold Coast and Northern NSW." },
]

export default function AboutClient() {
  return (
    <div>
      {/* Hero */}
      <section className="page-hero-bg dot-grid pt-36 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <ParticleField count={35} />
        <div className="orb-blue" style={{ width: 350, height: 350, top: '-5%', left: '10%', opacity: 0.4 }} />
        <div className="orb-purple" style={{ width: 300, height: 300, bottom: '10%', right: '5%', opacity: 0.3 }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <AnimateIn>
            <p className="section-label">About XTS</p>
            <h1 className="font-extrabold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-space)' }}>
              We Are the Tech Friends <span className="gradient-text">You Wish You Had</span>
            </h1>
            <p className="section-sub mx-auto text-center">
              Real people, genuine care, plain English. XTS was built for the customer who just wants their tech to work — without the jargon or the overcharge.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Story + stats */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <AnimateIn direction="right">
            <p className="section-label">Our Story</p>
            <h2 className="section-title">From a kitchen table to 1,000's of happy customers</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#94a3b8' }}>
              XTS Tech Support was founded by Jamie Rajpal after years of watching friends and family get overcharged and confused by tech companies that treated them like numbers. The vision was simple: what if tech support felt like asking a knowledgeable friend for help?
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#94a3b8' }}>
              XTS is a fully mobile service — no shopfront, no overhead, just Jamie arriving at your door ready to solve your tech problems. Serving Brisbane, Gold Coast and Northern NSW with the same care and honesty for every single job.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
              Proud to carry a 4.9-star rating across every major review platform — not because of chasing ratings, but because every customer deserves to finish a session feeling better about their technology.
            </p>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.15}>
            <div className="rounded-3xl p-8"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(37,99,235,0.08) 100%)', border: '1px solid rgba(124,58,237,0.2)' }}>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { value: "1,000's+", label: 'Happy Customers' },
                  { value: '4.9 ★', label: 'Star Rating' },
                  { value: '10 yrs', label: 'In Business' },
                  { value: '100%', label: 'Mobile Service' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-5 rounded-2xl"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(124,58,237,0.1)' }}>
                    <p className="text-4xl font-extrabold stat-num mb-1">{stat.value}</p>
                    <p className="text-xs font-medium" style={{ color: '#94a3b8' }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#0a0c1e' }}>
        <div className="absolute top-0 left-0 right-0 h-12 overflow-hidden" style={{ background: '#050816' }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 L1440,48 L0,48 Z" fill="#0a0c1e" />
          </svg>
        </div>
        <div className="orb-purple" style={{ width: 350, height: 350, top: '20%', right: '-5%', opacity: 0.2 }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <AnimateIn className="text-center mb-12">
            <p className="section-label">Our Values</p>
            <h2 className="section-title">What guides every job we do</h2>
          </AnimateIn>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((val) => (
              <div key={val.title} className="glass-card p-6">
                <div className="icon-box mb-4" style={{ background: val.bg }}>
                  <val.icon style={{ color: val.color }} />
                </div>
                <h3 className="font-bold text-white mb-2" style={{ fontFamily: 'var(--font-space)' }}>{val.title}</h3>
                <p className="text-sm" style={{ color: '#94a3b8', lineHeight: '1.7' }}>{val.body}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-full">
            <path d="M1440,0 L0,48 L1440,48 Z" fill="#050816" />
          </svg>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimateIn className="text-center mb-12">
            <p className="section-label">Your Technician</p>
            <h2 className="section-title">The person coming to your door</h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <div className="glass-card p-8"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(37,99,235,0.06) 100%)', border: '1px solid rgba(124,58,237,0.2)' }}>
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Avatar + name + areas */}
                <div className="flex flex-col items-center lg:items-start gap-4 flex-shrink-0">
                  <div className="w-28 h-28 rounded-2xl flex items-center justify-center text-4xl font-extrabold text-white"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', boxShadow: '0 0 40px rgba(124,58,237,0.45)' }}>
                    JR
                  </div>
                  <div className="text-center lg:text-left">
                    <h3 className="font-bold text-white text-xl" style={{ fontFamily: 'var(--font-space)' }}>Jamie Rajpal</h3>
                    <p className="text-sm font-semibold mt-0.5" style={{ color: '#f59e0b', fontFamily: 'var(--font-space)' }}>Founder &amp; Lead Technician</p>
                    <p className="text-xs mt-1" style={{ color: '#475569' }}>XTS Tech Support</p>
                  </div>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                    {['Brisbane', 'Gold Coast', 'Northern NSW'].map((area) => (
                      <span key={area} className="tag">{area}</span>
                    ))}
                  </div>
                </div>

                {/* Bio + qualifications */}
                <div className="flex-1">
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#94a3b8' }}>
                    Jamie Rajpal is the founder and lead technician behind XTS Tech Support. With a passion for technology and helping people, Jamie built this business from the ground up to bring expert, affordable IT support directly to homes and businesses across Brisbane, Gold Coast, and Northern New South Wales.
                  </p>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#94a3b8' }}>
                    Jamie holds a <strong className="text-white">Master's Degree in Information Technology from Griffith University</strong>, with a double major in Network &amp; Security and Hardware. Prior to that he earned a CCNA (Cisco Certified Network Associate) certification, Web Design certification, and a Hardware Technician certification.
                  </p>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: '#94a3b8' }}>
                    When you book with XTS Tech Support, you're getting Jamie himself — not a call centre, not a random contractor. Just one dedicated expert who takes pride in every single job.
                  </p>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#f59e0b', fontFamily: 'var(--font-space)' }}>Qualifications &amp; Certifications</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        'Master of Information Technology — Griffith University',
                        'Major: Network & Security',
                        'Major: Hardware',
                        'CCNA Certified (Cisco)',
                        'Web Design Certified',
                        'Hardware Technician Certified',
                      ].map((qual) => (
                        <div key={qual} className="flex items-start gap-2">
                          <FaCircleCheck className="text-xs mt-0.5 flex-shrink-0" style={{ color: '#a78bfa' }} />
                          <span className="text-xs" style={{ color: '#cbd5e1', lineHeight: '1.5' }}>{qual}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Technician standards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#0a0c1e' }}>
        <div className="absolute top-0 left-0 right-0 h-12 overflow-hidden" style={{ background: '#050816' }}>
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0 L1440,48 L0,48 Z" fill="#0a0c1e" />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <AnimateIn className="text-center mb-12">
            <p className="section-label">Our Standards</p>
            <h2 className="section-title">Why you can trust Jamie in your home</h2>
          </AnimateIn>
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {standards.map((std) => (
              <div key={std.title} className="feature-row glass-card p-5">
                <div className="icon-box flex-shrink-0"
                  style={{ background: 'rgba(124,58,237,0.12)', width: 44, height: 44, borderRadius: 12 }}>
                  <std.icon style={{ color: '#a78bfa' }} className="text-sm" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1" style={{ fontFamily: 'var(--font-space)' }}>{std.title}</h3>
                  <p className="text-xs" style={{ color: '#94a3b8', lineHeight: '1.6' }}>{std.body}</p>
                </div>
              </div>
            ))}
          </StaggerChildren>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 overflow-hidden">
          <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full h-full">
            <path d="M1440,0 L0,48 L1440,48 Z" fill="#050816" />
          </svg>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <AnimateIn className="text-center mb-14">
            <p className="section-label">Our Journey</p>
            <h2 className="section-title">10 years of growth</h2>
          </AnimateIn>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5"
              style={{ background: 'linear-gradient(180deg, rgba(124,58,237,0.5), rgba(37,99,235,0.2))', marginLeft: '-1px' }} />

            <div className="space-y-8">
              {milestones.map((ms, i) => (
                <AnimateIn key={ms.year} delay={i * 0.08} direction="right">
                  <div className="flex gap-6 items-start">
                    <div className="timeline-dot text-white text-xs">{i + 1}</div>
                    <div className="glass-card p-5 flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="tag">{ms.year}</span>
                        <h3 className="font-bold text-white text-sm" style={{ fontFamily: 'var(--font-space)' }}>{ms.title}</h3>
                      </div>
                      <p className="text-sm" style={{ color: '#94a3b8', lineHeight: '1.6' }}>{ms.body}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <AnimateIn direction="zoom">
          <div className="max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden dot-grid"
            style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #1e3a8a 50%, #7c3aed 100%)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)' }} />
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <div className="relative z-10">
              <p className="section-label" style={{ color: '#fcd34d' }}>Trusted by 1,000's</p>
              <h2 className="text-3xl font-extrabold text-white mb-4" style={{ fontFamily: 'var(--font-space)' }}>
                Experience the XTS difference
              </h2>
              <p className="mb-8 max-w-md mx-auto" style={{ color: '#c4b5fd' }}>
                Book today and see why 1,000's of homes and businesses across Brisbane, Gold Coast and Northern NSW trust Jamie with their tech.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-white"><FaBolt /> Book a Technician</Link>
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
