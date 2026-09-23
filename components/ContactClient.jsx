'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaBolt, FaPhone, FaEnvelope, FaClock, FaLocationDot, FaDesktop,
  FaCircleCheck, FaChevronDown, FaChevronUp, FaSpinner, FaCalendarDays,
  FaTriangleExclamation
} from 'react-icons/fa6'
import AnimateIn from './AnimateIn'

/*
 * ─── FORMSPREE SETUP ──────────────────────────────────────────────────────────
 * 1. Sign up at https://formspree.io (free plan handles 50 submissions/month)
 * 2. Create a new form → copy your Form ID (looks like: xpzvwrqk)
 * 3. Replace YOUR_FORM_ID below with your real Form ID
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * ─── SMS NOTIFICATION OPTIONS ────────────────────────────────────────────────
 * ⭐ OPTION A — Calendly Standard Plan ($10/month) [RECOMMENDED for solo operators]
 *    - Built-in SMS notifications when someone books
 *    - No coding needed, just enable in Calendly settings
 *    - Sign up at: https://calendly.com
 *
 * OPTION B — Formspree + Zapier (Free)
 *    - Connect Formspree to Zapier → Zapier sends SMS via Twilio or your phone
 *    - Zapier free plan: 100 tasks/month
 *    - Setup: formspree.io → Integrations → Zapier → SMS action
 *
 * OPTION C — Twilio API (~$0.01/SMS)
 *    - Add a Twilio serverless function triggered on form submit
 *    - Requires a backend endpoint (Vercel function or similar)
 *    - Docs: https://www.twilio.com/docs/sms
 * ─────────────────────────────────────────────────────────────────────────────
 */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'
// ↑ Replace YOUR_FORM_ID after signing up at formspree.io

/*
 * ─── CALENDLY SETUP ───────────────────────────────────────────────────────────
 * 1. Sign up at https://calendly.com
 * 2. Set your available hours for "Home Visit" and "Remote Session" event types
 * 3. Replace YOUR_CALENDLY_USERNAME below with your Calendly username
 * ─────────────────────────────────────────────────────────────────────────────
 */
const CALENDLY_URL = 'https://calendly.com/YOUR_CALENDLY_USERNAME'
// ↑ Replace YOUR_CALENDLY_USERNAME after setting up Calendly

const faqs = [
  { q: 'How quickly can a technician arrive?', a: 'For same-day appointments booked before noon, we typically arrive that afternoon. For urgent issues we also offer priority bookings -- call us directly.' },
  { q: 'What should I do before the technician arrives?', a: 'Nothing special required. If possible, have the device powered on and reproduce the problem if you can. Make a list of any issues you have noticed.' },
  { q: 'Can I get a quote before booking?', a: 'Yes. Call or message us with a description of the problem and we can give you an estimated time and cost before you commit to anything.' },
  { q: 'What areas do you service?', a: 'We service Brisbane, Gold Coast, Tweed Heads, Byron Bay, Lismore, Ballina and surrounding areas across South East Queensland and Northern NSW. Remote support is available Australia-wide.' },
  { q: 'Do I need to be home during the visit?', a: 'Yes, an adult (18+) must be present throughout the visit. For business appointments the site contact can be any nominated staff member.' },
  { q: 'What if my problem comes back after the visit?', a: 'Call us. If the same issue recurs within 7 days of the original fix, we will return to resolve it at no additional charge.' },
]

const contactItems = [
  { icon: FaPhone, color: '#a78bfa', label: 'Phone', value: '0424 424 444', href: 'tel:0424424444' },
  { icon: FaEnvelope, color: '#60a5fa', label: 'Email', value: 'xperttechsolutions@mail.com', href: 'mailto:xperttechsolutions@mail.com' },
  { icon: FaClock, color: '#34d399', label: 'Hours', value: 'Mon - Sun, 7am - 9pm', href: null },
  { icon: FaLocationDot, color: '#f59e0b', label: 'Area', value: 'Brisbane · Gold Coast · Northern NSW', href: null },
  { icon: FaDesktop, color: '#22d3ee', label: 'Remote', value: 'Available Australia-wide', href: null },
]

const serviceOptions = [
  'Computer / Laptop Repair',
  'Virus and Malware Removal',
  'Wi-Fi and Internet Setup',
  'Email Setup and Support',
  'Printer / Scanner Setup',
  'Data Backup and Recovery',
  'Mobile Phone Support',
  'Tablet Repair',
  'Privacy and Security',
  'Remote IT Support',
  'Business IT Support',
  'Other - Describe Below',
]

const timeOptions = [
  '7:00 am - 9:00 am',
  '9:00 am - 11:00 am',
  '11:00 am - 1:00 pm',
  '1:00 pm - 3:00 pm',
  '3:00 pm - 5:00 pm',
  '5:00 pm - 7:00 pm',
  '7:00 pm - 9:00 pm',
]

const steps = [
  { num: '1', title: 'Book Online', body: 'Fill in the form or call us. Takes under 60 seconds.' },
  { num: '2', title: 'Confirm and Quote', body: 'We call to confirm the appointment and give an estimate.' },
  { num: '3', title: 'Tech Arrives', body: 'A screened technician arrives at the agreed time.' },
  { num: '4', title: 'Problem Solved', body: 'We fix it, test it, explain it -- and you pay only when happy.' },
]

export default function ContactClient() {
  const router = useRouter()
  const [supportType, setSupportType] = useState('home')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    suburb: '', service: '', date: '', time: '', description: '', newsletter: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(false)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          supportType,
          name: `${form.firstName} ${form.lastName}`,
          phone: form.phone,
          email: form.email,
          suburb: form.suburb,
          service: form.service,
          preferredDate: form.date,
          preferredTime: form.time,
          description: form.description,
          newsletter: form.newsletter,
        }),
      })
      if (res.ok) {
        router.push('/booking-confirmed')
      } else {
        throw new Error('Submission failed')
      }
    } catch {
      setSubmitting(false)
      setSubmitError(true)
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="page-hero-bg dot-grid pt-36 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="orb-purple" style={{ width: 320, height: 320, top: '-10%', right: '10%', opacity: 0.35 }} />
        <div className="orb-blue" style={{ width: 260, height: 260, bottom: '0%', left: '5%', opacity: 0.3 }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <AnimateIn>
            <p className="section-label">Contact Us</p>
            <h1 className="font-extrabold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-space)' }}>
              Book a <span className="gradient-text">Technician</span>
            </h1>
            <p className="section-sub mx-auto text-center">
              Fill in the form below, book via Calendly, or call us directly. No callout fees.
            </p>
            <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-4 px-5 py-3 rounded-2xl text-sm" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <div className="text-left">
                <p className="font-semibold text-white text-xs mb-0.5">📅 Available: Mon · Tue · Wed · Sat · Sun — 10:00 AM to 3:00 PM</p>
                <p className="text-xs" style={{ color: '#94a3b8' }}>Thu &amp; Fri are currently booked out. &nbsp;⚠️ All other times are currently booked out — for urgent after-hours help, please call us directly.</p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Main grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: contact info */}
          <AnimateIn direction="right" className="lg:col-span-2">
            <div className="glass-card p-6 h-full" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.07) 0%, rgba(37,99,235,0.05) 100%)', border: '1px solid rgba(124,58,237,0.18)' }}>
              <h2 className="font-bold text-white text-lg mb-6" style={{ fontFamily: 'var(--font-space)' }}>Get in Touch</h2>

              <div className="space-y-4 mb-8">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm" style={{ background: `${item.color}18` }}>
                      <item.icon style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#475569' }}>{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-medium text-white hover:text-green-400 transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-sm font-medium text-white">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: '$0', sublabel: 'Callout Fee', color: '#a78bfa' },
                  { label: '4.9', sublabel: 'Star Rating', color: '#f59e0b' },
                  { label: '7 days', sublabel: 'Per Week', color: '#34d399' },
                  { label: '1 hr', sublabel: 'Response Time', color: '#60a5fa' },
                ].map((stat) => (
                  <div key={stat.label} className="p-3 rounded-xl text-center" style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.15)' }}>
                    <p className="text-xl font-extrabold" style={{ color: stat.color }}>{stat.label}</p>
                    <p className="text-xs" style={{ color: '#64748b' }}>{stat.sublabel}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Right: booking form */}
          <AnimateIn direction="left" delay={0.1} className="lg:col-span-3">
            <div className="glass-card p-6">
              {/* Calendly CTA */}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm mb-5"
                style={{ borderRadius: 12 }}
              >
                <FaCalendarDays />
                📅 Book a Time That Suits You — Calendly
              </a>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <span className="text-xs font-medium" style={{ color: '#475569' }}>or fill in the form below</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
              </div>

              <h2 className="font-bold text-white text-lg mb-2" style={{ fontFamily: 'var(--font-space)' }}>Book Your Appointment</h2>
              <p className="text-sm mb-6" style={{ color: '#64748b' }}>Fill in your details and Jamie will confirm within the hour.</p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl" style={{ background: 'rgba(34,197,94,0.15)' }}>
                      <FaCircleCheck style={{ color: '#22c55e' }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Booking Request Received!</h3>
                    <p className="text-sm mb-6" style={{ color: '#94a3b8' }}>We will call you within the hour to confirm your appointment and provide an estimate.</p>
                    <a href="tel:0424424444" className="btn-primary">
                      <FaPhone /> Call Us Now
                    </a>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} id="bookingForm">
                    {/* Support type */}
                    <div className="flex gap-2 mb-5">
                      {[
                        { value: 'home', label: 'Home Visit' },
                        { value: 'remote', label: 'Remote Session' },
                        { value: 'unsure', label: 'Not Sure' },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setSupportType(opt.value)}
                          className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all"
                          style={{
                            background: supportType === opt.value ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.04)',
                            border: `1.5px solid ${supportType === opt.value ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.1)'}`,
                            color: supportType === opt.value ? '#c4b5fd' : '#64748b',
                            fontFamily: 'var(--font-space)',
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>First Name</label>
                        <input name="firstName" value={form.firstName} onChange={handleChange} className="form-input" placeholder="Jane" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Last Name</label>
                        <input name="lastName" value={form.lastName} onChange={handleChange} className="form-input" placeholder="Smith" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Phone</label>
                        <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="form-input" placeholder="04xx xxx xxx" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Email</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} className="form-input" placeholder="you@email.com" required />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Suburb</label>
                      <input name="suburb" value={form.suburb} onChange={handleChange} className="form-input" placeholder="Your suburb" required />
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Service Needed</label>
                      <select name="service" value={form.service} onChange={handleChange} className="form-input" required>
                        <option value="">Select a service...</option>
                        {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Preferred Date</label>
                        <input name="date" type="date" value={form.date} onChange={handleChange} className="form-input" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Preferred Time</label>
                        <select name="time" value={form.time} onChange={handleChange} className="form-input" required>
                          <option value="">Select a time...</option>
                          {timeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Describe Your Problem (optional)</label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="form-input"
                        rows={3}
                        placeholder="Tell us what's happening -- as much or as little as you like..."
                        style={{ resize: 'vertical', minHeight: 80 }}
                      />
                    </div>

                    <label className="flex items-start gap-3 mb-5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={form.newsletter}
                        onChange={handleChange}
                        className="mt-0.5 accent-green-600"
                      />
                      <span className="text-xs" style={{ color: '#94a3b8' }}>Send me occasional tips and special offers. No spam, unsubscribe any time.</span>
                    </label>

                    {submitError && (
                      <div className="mb-4 flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}>
                        <FaTriangleExclamation className="text-red-400 flex-shrink-0" />
                        <p className="text-sm text-red-300">Something went wrong. Please call us directly on <a href="tel:0424424444" className="font-bold underline">0424 424 444</a>.</p>
                      </div>
                    )}

                    <button type="submit" className="btn-primary w-full justify-center" disabled={submitting}>
                      {submitting ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          Sending Booking Request...
                        </>
                      ) : (
                        <>
                          <FaBolt /> Confirm Booking Request
                        </>
                      )}
                    </button>
                    <p className="text-xs text-center mt-3" style={{ color: '#475569' }}>No payment required. We call to confirm and quote before starting work.</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ background: '#0a0c1e' }}>
        <div className="max-w-5xl mx-auto">
          <AnimateIn className="text-center mb-12">
            <p className="section-label">How It Works</p>
            <h2 className="section-title">From booking to fixed in 4 steps</h2>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <AnimateIn key={step.num} delay={i * 0.1} direction="up">
                <div className="text-center">
                  <div className="timeline-dot mx-auto mb-4 text-white text-base" style={{ width: 52, height: 52 }}>
                    {step.num}
                  </div>
                  <h3 className="font-bold text-white text-sm mb-2" style={{ fontFamily: 'var(--font-space)' }}>{step.title}</h3>
                  <p className="text-xs" style={{ color: '#94a3b8', lineHeight: '1.65' }}>{step.body}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <AnimateIn className="text-center mb-10">
            <p className="section-label">FAQ</p>
            <h2 className="section-title">Booking Questions Answered</h2>
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
                      ? <FaChevronUp className="text-green-400 flex-shrink-0 text-sm" />
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
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <AnimateIn direction="zoom">
          <div className="max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden dot-grid"
            style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #1e3a8a 50%, #7c3aed 100%)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)' }} />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <div className="relative z-10">
              <p className="section-label" style={{ color: '#fcd34d' }}>Still have questions?</p>
              <h2 className="text-3xl font-extrabold text-white mb-4" style={{ fontFamily: 'var(--font-space)' }}>Just give us a call</h2>
              <p className="mb-8 max-w-md mx-auto" style={{ color: '#c4b5fd' }}>Our friendly team is available every day from 7am to 9pm. No scripts, no hold music — just real help.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="tel:0424424444" className="btn-white"><FaPhone /> 0424 424 444</a>
                <a href="mailto:xperttechsolutions@mail.com" className="btn-ghost" style={{ borderColor: 'rgba(255,255,255,0.25)', color: 'white' }}>
                  <FaEnvelope /> Email Us
                </a>
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>
    </div>
  )
}
