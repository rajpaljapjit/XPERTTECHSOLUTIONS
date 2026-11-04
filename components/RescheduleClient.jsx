'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaBolt, FaPhone, FaCircleCheck, FaSpinner, FaTriangleExclamation,
  FaCalendarDays, FaClock, FaUser, FaLocationDot, FaDesktop,
} from 'react-icons/fa6'
import AnimateIn from './AnimateIn'

const timeOptions = [
  '7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am',
  '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '3:30 pm',
  '4:00 pm', '4:30 pm', '5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm',
]

function ReadOnlyField({ icon: Icon, label, value, color = '#a78bfa' }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs" style={{ background: `${color}18` }}>
        <Icon style={{ color }} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#475569' }}>{label}</p>
        <p className="text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  )
}

function RescheduleForm() {
  const params = useSearchParams()

  const firstName  = params.get('fn') || ''
  const lastName   = params.get('ln') || ''
  const phone      = params.get('ph') || ''
  const email      = params.get('em') || ''
  const address    = params.get('ad') || ''
  const suburb     = params.get('sb') || ''
  const service    = params.get('sv') || ''
  const supportType = params.get('st') || 'home'
  const description = params.get('desc') || ''
  const suggestedDate = params.get('date') || ''
  const suggestedTime = params.get('time') || ''

  const [date, setDate] = useState(suggestedDate)
  const [time, setTime] = useState(suggestedTime)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [error, setError]           = useState(false)
  const [availability, setAvailability] = useState([])
  const [bookedSlots, setBookedSlots]   = useState([])

  useEffect(() => {
    fetch('/api/availability').then(r => r.json()).then(setAvailability).catch(() => {})
  }, [])

  // Fetch booked slots whenever date changes
  useEffect(() => {
    if (!date) { setBookedSlots([]); return }
    fetch(`/api/booked-slots?date=${date}`)
      .then(r => r.json())
      .then(setBookedSlots)
      .catch(() => setBookedSlots([]))
  }, [date])

  const isDateDisabled = (dateStr) => {
    if (!availability.length) return false
    const dayName = new Date(dateStr + 'T12:00:00').toLocaleDateString('en-AU', { weekday: 'long' })
    const day = availability.find(d => d.day_of_week === dayName)
    return day ? !day.is_available : true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(false)
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName, lastName, phone, email,
          address, suburb, service, supportType, description,
          preferredDate: date,
          preferredTime: time,
        }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        throw new Error('Failed')
      }
    } catch {
      setError(true)
    } finally {
      setSubmitting(false)
    }
  }

  // If no params at all, show a friendly error
  if (!firstName && !email) {
    return (
      <div className="text-center py-16">
        <p className="text-sm mb-4" style={{ color: '#94a3b8' }}>This link is invalid or has expired.</p>
        <a href="/booking" className="btn-primary"><FaCalendarDays /> Make a New Booking</a>
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl" style={{ background: 'rgba(34,197,94,0.15)' }}>
            <FaCircleCheck style={{ color: '#22c55e' }} />
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-space)' }}>Appointment Rescheduled!</h2>
          <p className="text-sm mb-2" style={{ color: '#94a3b8' }}>
            Your new appointment for <span className="text-white font-semibold">{service}</span> on{' '}
            <span className="text-white font-semibold">{date}</span> at{' '}
            <span className="text-white font-semibold">{time}</span> has been received.
          </p>
          <p className="text-sm mb-8" style={{ color: '#64748b' }}>We'll call to confirm shortly.</p>
          <a href="tel:0424424444" className="btn-primary"><FaPhone /> Call Us</a>
        </motion.div>
      ) : (
        <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Your details — read only */}
            <div className="lg:col-span-2">
              <div className="glass-card p-6" style={{ border: '1px solid rgba(124,58,237,0.18)' }}>
                <h2 className="font-bold text-white mb-1" style={{ fontFamily: 'var(--font-space)' }}>Your Details</h2>
                <p className="text-xs mb-4" style={{ color: '#475569' }}>These are pre-filled from your original booking.</p>
                <ReadOnlyField icon={FaUser}        label="Name"    value={`${firstName} ${lastName}`}  color="#a78bfa" />
                <ReadOnlyField icon={FaPhone}       label="Phone"   value={phone}                        color="#4ade80" />
                <ReadOnlyField icon={FaLocationDot} label="Address" value={address ? `${address}, ${suburb}` : suburb} color="#f59e0b" />
                <ReadOnlyField icon={FaDesktop}     label="Service" value={service}                      color="#60a5fa" />
                {description && (
                  <div className="mt-3 px-3 py-2.5 rounded-xl text-xs" style={{ color: '#64748b', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {description}
                  </div>
                )}
              </div>
            </div>

            {/* New time selection */}
            <div className="lg:col-span-3">
              <div className="glass-card p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.15)' }}>
                    <FaClock style={{ color: '#fcd34d' }} />
                  </div>
                  <div>
                    <h2 className="font-bold text-white text-lg" style={{ fontFamily: 'var(--font-space)' }}>Choose Your New Time</h2>
                    <p className="text-xs" style={{ color: '#64748b' }}>We've pre-filled our suggested time — change it if needed.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>New Date</label>
                      <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="form-input"
                        required
                      />
                      {date && isDateDisabled(date) && (
                        <p className="text-xs mt-1" style={{ color: '#f87171' }}>
                          We're not available on {new Date(date + 'T12:00:00').toLocaleDateString('en-AU', { weekday: 'long' })}s. Please choose another date.
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#64748b' }}>New Time</label>
                      <select value={time} onChange={e => setTime(e.target.value)} className="form-input" required>
                        <option value="">Select a time...</option>
                        {timeOptions
                          .filter(t => !bookedSlots.includes(t))
                          .map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {bookedSlots.length > 0 && (
                        <p className="text-xs mt-1" style={{ color: '#f59e0b' }}>
                          {bookedSlots.length} slot{bookedSlots.length > 1 ? 's' : ''} already booked on this date.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  {date && time && (
                    <div className="mb-6 p-4 rounded-xl" style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)' }}>
                      <p className="text-xs font-semibold mb-1" style={{ color: '#a78bfa' }}>Appointment Summary</p>
                      <p className="text-sm text-white">
                        <span className="font-bold">{service}</span> on <span className="font-bold">{date}</span> at <span className="font-bold">{time}</span>
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>{address}{suburb ? `, ${suburb}` : ''}</p>
                    </div>
                  )}

                  {error && (
                    <div className="mb-4 flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}>
                      <FaTriangleExclamation className="text-red-400 flex-shrink-0" />
                      <p className="text-sm text-red-300">Something went wrong. Please call us on <a href="tel:0424424444" className="font-bold underline">0424 424 444</a>.</p>
                    </div>
                  )}

                  <button type="submit" className="btn-primary w-full justify-center" disabled={submitting || !date || !time}>
                    {submitting
                      ? <><FaSpinner className="animate-spin" /> Confirming...</>
                      : <><FaBolt /> Confirm New Appointment</>
                    }
                  </button>
                  <p className="text-xs text-center mt-3" style={{ color: '#475569' }}>
                    We'll call to confirm once we receive your request.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function RescheduleClient() {
  return (
    <div>
      {/* Hero */}
      <section className="page-hero-bg dot-grid pt-36 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="orb-purple" style={{ width: 300, height: 300, top: '-10%', right: '10%', opacity: 0.3 }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <AnimateIn>
            <p className="section-label">Reschedule</p>
            <h1 className="font-extrabold mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-space)' }}>
              Update Your <span className="gradient-text">Appointment</span>
            </h1>
            <p className="section-sub mx-auto text-center">
              Your details are already here — just pick your new date and time.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Suspense fallback={<p className="text-center py-12 text-sm" style={{ color: '#475569' }}>Loading...</p>}>
            <RescheduleForm />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
