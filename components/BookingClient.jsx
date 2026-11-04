'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaBolt, FaPhone, FaEnvelope,
  FaCircleCheck, FaChevronDown, FaChevronUp, FaSpinner,
  FaTriangleExclamation, FaCalendarDays,
} from 'react-icons/fa6'
import AnimateIn from './AnimateIn'

const faqs = [
  { q: 'How quickly can a technician arrive?', a: 'For same-day appointments booked before noon, we typically arrive that afternoon. For urgent issues we also offer priority bookings — call us directly.' },
  { q: 'What should I do before the technician arrives?', a: 'Nothing special required. If possible, have the device powered on and reproduce the problem if you can. Make a list of any issues you have noticed.' },
  { q: 'Can I get a quote before booking?', a: 'Yes. Call or message us with a description of the problem and we can give you an estimated time and cost before you commit to anything.' },
  { q: 'What areas do you service?', a: 'We service Brisbane, Gold Coast, Tweed Heads, Byron Bay, Lismore, Ballina and surrounding areas across South East Queensland and Northern NSW. Remote support is available Australia-wide.' },
  { q: 'Do I need to be home during the visit?', a: 'Yes, an adult (18+) must be present throughout the visit. For business appointments the site contact can be any nominated staff member.' },
  { q: 'What if my problem comes back after the visit?', a: 'Call us. If the same issue recurs within 7 days of the original fix, we will return to resolve it at no additional charge.' },
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

const steps = [
  { num: '1', title: 'Book Online',      body: 'Fill in the form or call us. Takes under 60 seconds.' },
  { num: '2', title: 'Confirm & Quote',  body: 'We call to confirm the appointment and give an estimate.' },
  { num: '3', title: 'Tech Arrives',     body: 'A screened technician arrives at the agreed time.' },
  { num: '4', title: 'Problem Solved',   body: 'We fix it, test it, explain it — and you pay only when happy.' },
]

function useForm(initial) {
  const [form, setForm] = useState(initial)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }
  return [form, handleChange, setForm]
}

function generateTimeSlots(startTime, endTime) {
  const slots = []
  const [startH] = startTime.split(':').map(Number)
  const [endH]   = endTime.split(':').map(Number)
  for (let h = startH; h < endH; h++) {
    const label = h < 12 ? `${h}:00 am` : h === 12 ? '12:00 pm' : `${h - 12}:00 pm`
    slots.push(label)
  }
  return slots
}

const timeOptions = [
  '7:00 am - 9:00 am',
  '9:00 am - 11:00 am',
  '11:00 am - 1:00 pm',
  '1:00 pm - 3:00 pm',
  '3:00 pm - 5:00 pm',
  '5:00 pm - 7:00 pm',
  '7:00 pm - 9:00 pm',
]

export default function BookingClient() {
  const [openFaq, setOpenFaq] = useState(null)
  const [availability, setAvailability] = useState([])
  const [supportType, setSupportType] = useState('home')
  const [bookForm, bookChange] = useForm({
    firstName: '', lastName: '', phone: '', email: '',
    address: '', suburb: '', service: '',
    preferredDate: '', preferredTime: '', description: '',
  })
  const [bookSubmitting, setBookSubmitting] = useState(false)
  const [bookSubmitted, setBookSubmitted] = useState(false)
  const [bookError, setBookError] = useState(false)
  const [bookedSlots, setBookedSlots] = useState([])

  useEffect(() => {
    fetch('/api/availability')
      .then(r => r.json())
      .then(setAvailability)
      .catch(() => {})
  }, [])

  const fetchBookedSlots = (dateStr) => {
    if (!dateStr) { setBookedSlots([]); return }
    fetch(`/api/booked-slots?date=${dateStr}`)
      .then(r => r.json())
      .then(setBookedSlots)
      .catch(() => setBookedSlots([]))
  }

  const getAvailableDay = (dateStr) => {
    if (!dateStr || !availability.length) return null
    const dayName = new Date(dateStr + 'T12:00:00').toLocaleDateString('en-AU', { weekday: 'long' })
    return availability.find(d => d.day_of_week === dayName && d.is_available)
  }

  const isDateDisabled = (dateStr) => {
    if (!availability.length) return false
    const dayName = new Date(dateStr + 'T12:00:00').toLocaleDateString('en-AU', { weekday: 'long' })
    const day = availability.find(d => d.day_of_week === dayName)
    return day ? !day.is_available : true
  }

  const handleBookSubmit = async (e) => {
    e.preventDefault()
    setBookSubmitting(true)
    setBookError(false)
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...bookForm, supportType }),
      })
      if (res.ok) {
        setBookSubmitted(true)
      } else {
        throw new Error('Failed')
      }
    } catch {
      setBookError(true)
    } finally {
      setBookSubmitting(false)
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
            <p className="section-label">Book Online</p>
            <h1 className="font-extrabold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-space)' }}>
              Book a <span className="gradient-text">Technician</span>
            </h1>
            <p className="section-sub mx-auto text-center">
              Fill in the form below and we'll call to confirm within the hour. No callout fees.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Booking form */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">

          <AnimateIn direction="up" delay={0.1}>
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.15)' }}>
                  <FaCalendarDays style={{ color: '#a78bfa' }} />
                </div>
                <div>
                  <h2 className="font-bold text-white text-lg" style={{ fontFamily: 'var(--font-space)' }}>Book a Technician</h2>
                  <p className="text-xs" style={{ color: '#64748b' }}>We'll call to confirm within the hour.</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {bookSubmitted ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center py-10">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl" style={{ background: 'rgba(34,197,94,0.15)' }}>
                      <FaCircleCheck style={{ color: '#22c55e' }} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Booking Request Received!</h3>
                    <p className="text-sm mb-6" style={{ color: '#94a3b8' }}>We will call you within the hour to confirm and provide an estimate.</p>
                    <a href="tel:0424424444" className="btn-primary"><FaPhone /> Call Us Now</a>
                  </motion.div>
                ) : (
                  <motion.form key="book-form" onSubmit={handleBookSubmit}>
                    {/* Support type */}
                    <div className="flex gap-2 mb-4">
                      {[{ value: 'home', label: 'Home Visit' }, { value: 'remote', label: 'Remote Session' }, { value: 'unsure', label: 'Not Sure' }].map((opt) => (
                        <button key={opt.value} type="button" onClick={() => setSupportType(opt.value)}
                          className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all"
                          style={{
                            background: supportType === opt.value ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.04)',
                            border: `1.5px solid ${supportType === opt.value ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.1)'}`,
                            color: supportType === opt.value ? '#c4b5fd' : '#64748b',
                            fontFamily: 'var(--font-space)',
                          }}>
                          {opt.label}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>First Name</label>
                        <input name="firstName" value={bookForm.firstName} onChange={bookChange} className="form-input" placeholder="Jane" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Last Name</label>
                        <input name="lastName" value={bookForm.lastName} onChange={bookChange} className="form-input" placeholder="Smith" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Phone</label>
                        <input name="phone" type="tel" value={bookForm.phone} onChange={bookChange} className="form-input" placeholder="04xx xxx xxx" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Email</label>
                        <input name="email" type="email" value={bookForm.email} onChange={bookChange} className="form-input" placeholder="you@email.com" required />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Street Address</label>
                      <input name="address" value={bookForm.address} onChange={bookChange} className="form-input" placeholder="123 Example St" required />
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Suburb</label>
                      <input name="suburb" value={bookForm.suburb} onChange={bookChange} className="form-input" placeholder="Your suburb" required />
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Service Needed</label>
                      <select name="service" value={bookForm.service} onChange={bookChange} className="form-input" required>
                        <option value="">Select a service...</option>
                        {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Preferred Date</label>
                        <input name="preferredDate" type="date" value={bookForm.preferredDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={e => { bookChange(e); fetchBookedSlots(e.target.value) }}
                          className="form-input" required />
                        {bookForm.preferredDate && isDateDisabled(bookForm.preferredDate) && (
                          <p className="text-xs mt-1" style={{ color: '#f87171' }}>
                            We're not available on {new Date(bookForm.preferredDate + 'T12:00:00').toLocaleDateString('en-AU', { weekday: 'long' })}s. Please choose another date.
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Preferred Time</label>
                        <select name="preferredTime" value={bookForm.preferredTime} onChange={bookChange} className="form-input" required>
                          <option value="">Select a time...</option>
                          {(() => {
                            const avDay = getAvailableDay(bookForm.preferredDate)
                            const slots = avDay
                              ? generateTimeSlots(avDay.start_time, avDay.end_time)
                              : timeOptions
                            const available = slots.filter(t => !bookedSlots.includes(t))
                            if (available.length === 0 && slots.length > 0) {
                              return <option disabled value="">No times available on this date</option>
                            }
                            return available.map(t => <option key={t} value={t}>{t}</option>)
                          })()}
                        </select>
                        {getAvailableDay(bookForm.preferredDate) && (
                          <p className="text-xs mt-1" style={{ color: '#4ade80' }}>
                            Available {getAvailableDay(bookForm.preferredDate).start_time} – {getAvailableDay(bookForm.preferredDate).end_time}
                          </p>
                        )}
                        {bookedSlots.length > 0 && (
                          <p className="text-xs mt-1" style={{ color: '#f59e0b' }}>
                            {bookedSlots.length} slot{bookedSlots.length > 1 ? 's' : ''} already booked on this date.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>Describe Your Problem (optional)</label>
                      <textarea name="description" value={bookForm.description} onChange={bookChange} className="form-input" rows={3}
                        placeholder="Tell us what's happening — as much or as little as you like..."
                        style={{ resize: 'vertical', minHeight: 80 }} />
                    </div>

                    {bookError && (
                      <div className="mb-4 flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}>
                        <FaTriangleExclamation className="text-red-400 flex-shrink-0" />
                        <p className="text-sm text-red-300">Something went wrong. Please call us on <a href="tel:0424424444" className="font-bold underline">0424 424 444</a>.</p>
                      </div>
                    )}

                    <button type="submit" className="btn-primary w-full justify-center" disabled={bookSubmitting}>
                      {bookSubmitting ? <><FaSpinner className="animate-spin" /> Sending...</> : <><FaBolt /> Confirm Booking Request</>}
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
                  <div className="timeline-dot mx-auto mb-4 text-white text-base" style={{ width: 52, height: 52 }}>{step.num}</div>
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
                  <button className="faq-btn" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{faq.q}</span>
                    {openFaq === i
                      ? <FaChevronUp className="text-green-400 flex-shrink-0 text-sm" />
                      : <FaChevronDown className="text-slate-500 flex-shrink-0 text-sm" />}
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div key="answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} style={{ overflow: 'hidden' }}>
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
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,255,255,0.07) 0%, transparent 70%)' }} />
            <div className="relative z-10">
              <p className="section-label" style={{ color: '#fcd34d' }}>Prefer to talk first?</p>
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
