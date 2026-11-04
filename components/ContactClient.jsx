'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaBolt, FaPhone, FaEnvelope, FaClock, FaLocationDot, FaDesktop,
  FaCircleCheck, FaSpinner, FaTriangleExclamation, FaMessage,
} from 'react-icons/fa6'
import AnimateIn from './AnimateIn'

const contactItems = [
  { icon: FaPhone,       color: '#a78bfa', label: 'Phone',  value: '0424 424 444',                    href: 'tel:0424424444' },
  { icon: FaEnvelope,    color: '#60a5fa', label: 'Email',  value: 'xperttechsolutions@mail.com',     href: 'mailto:xperttechsolutions@mail.com' },
  { icon: FaClock,       color: '#34d399', label: 'Hours',  value: 'Mon - Sun, 7am - 9pm',            href: null },
  { icon: FaLocationDot, color: '#f59e0b', label: 'Area',   value: 'Brisbane · Gold Coast · Northern NSW', href: null },
  { icon: FaDesktop,     color: '#22d3ee', label: 'Remote', value: 'Available Australia-wide',        href: null },
]

function useForm(initial) {
  const [form, setForm] = useState(initial)
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }
  return [form, handleChange]
}

export default function ContactClient() {
  const [enqForm, enqChange] = useForm({
    firstName: '', lastName: '', phone: '', email: '', message: '',
  })
  const [enqSubmitting, setEnqSubmitting] = useState(false)
  const [enqSubmitted, setEnqSubmitted] = useState(false)
  const [enqError, setEnqError] = useState(false)

  const handleEnqSubmit = async (e) => {
    e.preventDefault()
    setEnqSubmitting(true)
    setEnqError(false)
    try {
      const res = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enqForm),
      })
      if (res.ok) {
        setEnqSubmitted(true)
      } else {
        throw new Error('Failed')
      }
    } catch {
      setEnqError(true)
    } finally {
      setEnqSubmitting(false)
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="page-hero-bg dot-grid pt-36 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="orb-purple" style={{ width: 320, height: 320, top: '-10%', right: '10%', opacity: 0.35 }} />
        <div className="orb-blue"   style={{ width: 260, height: 260, bottom: '0%', left: '5%',  opacity: 0.3 }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <AnimateIn>
            <p className="section-label">Get in Touch</p>
            <h1 className="font-extrabold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-space)' }}>
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="section-sub mx-auto text-center">
              Have a question or not sure where to start? Send us a message and we'll get back to you.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Main grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left: contact info */}
          <AnimateIn direction="right" className="lg:col-span-2">
            <div className="glass-card p-6 h-full" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.07) 0%, rgba(37,99,235,0.05) 100%)', border: '1px solid rgba(124,58,237,0.18)' }}>
              <h2 className="font-bold text-white text-lg mb-6" style={{ fontFamily: 'var(--font-space)' }}>Contact Details</h2>
              <div className="space-y-4 mb-8">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-sm" style={{ background: `${item.color}18` }}>
                      <item.icon style={{ color: item.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#475569' }}>{item.label}</p>
                      {item.href
                        ? <a href={item.href} className="text-sm font-medium text-white hover:text-green-400 transition-colors">{item.value}</a>
                        : <p className="text-sm font-medium text-white">{item.value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.15)' }}>
                <p className="text-xs font-semibold text-white mb-1">Ready to book?</p>
                <p className="text-xs mb-3" style={{ color: '#64748b' }}>If you'd like to schedule a technician visit, use our booking form instead.</p>
                <a href="/booking" className="btn-primary text-xs" style={{ padding: '8px 16px' }}>Book a Technician</a>
              </div>
            </div>
          </AnimateIn>

          {/* Right: enquiry form */}
          <AnimateIn direction="left" delay={0.1} className="lg:col-span-3">
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(96,165,250,0.15)' }}>
                  <FaMessage style={{ color: '#60a5fa' }} />
                </div>
                <div>
                  <h2 className="font-bold text-white text-lg" style={{ fontFamily: 'var(--font-space)' }}>Send Us a Message</h2>
                  <p className="text-xs" style={{ color: '#64748b' }}>We'll get back to you as soon as possible.</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {enqSubmitted ? (
                  <motion.div key="enq-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center py-10">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl" style={{ background: 'rgba(34,197,94,0.15)' }}>
                      <FaCircleCheck style={{ color: '#22c55e' }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-sm" style={{ color: '#94a3b8' }}>Thanks for getting in touch. We'll get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <motion.form key="enq-form" onSubmit={handleEnqSubmit}>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>First Name</label>
                        <input name="firstName" value={enqForm.firstName} onChange={enqChange} className="form-input" placeholder="Jane" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Last Name</label>
                        <input name="lastName" value={enqForm.lastName} onChange={enqChange} className="form-input" placeholder="Smith" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Phone</label>
                        <input name="phone" type="tel" value={enqForm.phone} onChange={enqChange} className="form-input" placeholder="04xx xxx xxx" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Email</label>
                        <input name="email" type="email" value={enqForm.email} onChange={enqChange} className="form-input" placeholder="you@email.com" required />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Your Message</label>
                      <textarea name="message" value={enqForm.message} onChange={enqChange} className="form-input" rows={5}
                        placeholder="What can we help you with?"
                        style={{ resize: 'vertical', minHeight: 120 }} required />
                    </div>

                    {enqError && (
                      <div className="mb-4 flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}>
                        <FaTriangleExclamation className="text-red-400 flex-shrink-0" />
                        <p className="text-sm text-red-300">Something went wrong. Please call us on <a href="tel:0424424444" className="font-bold underline">0424 424 444</a>.</p>
                      </div>
                    )}

                    <button type="submit" className="btn-primary w-full justify-center" disabled={enqSubmitting}>
                      {enqSubmitting ? <><FaSpinner className="animate-spin" /> Sending...</> : <><FaBolt /> Send Message</>}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <AnimateIn direction="zoom">
          <div className="max-w-4xl mx-auto rounded-3xl p-12 text-center relative overflow-hidden dot-grid"
            style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #1e3a8a 50%, #7c3aed 100%)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)' }} />
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
