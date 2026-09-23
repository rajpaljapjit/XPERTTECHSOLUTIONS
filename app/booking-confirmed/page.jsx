import Link from 'next/link'
import { FaBolt, FaPhone, FaCircleCheck, FaCalendarDays } from 'react-icons/fa6'

export const metadata = {
  title: 'Booking Confirmed | XTS Tech Support',
  robots: 'noindex',
}

export default function BookingConfirmedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
      style={{ background: '#050816' }}>
      {/* Background orbs */}
      <div className="orb-purple" style={{ width: 400, height: 400, top: '10%', left: '-5%', opacity: 0.4 }} />
      <div className="orb-blue" style={{ width: 350, height: 350, bottom: '10%', right: '-5%', opacity: 0.3 }} />
      <div className="orb-gold" style={{ width: 250, height: 250, top: '40%', right: '20%', opacity: 0.2 }} />

      <div className="max-w-lg w-full text-center relative z-10">
        <div className="glass-card p-10"
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(37,99,235,0.07) 100%)', border: '1px solid rgba(124,58,237,0.25)' }}>
          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', boxShadow: '0 0 40px rgba(124,58,237,0.5)' }}>
            🎉
          </div>

          <h1 className="text-3xl font-extrabold text-white mb-3" style={{ fontFamily: 'var(--font-space)' }}>
            Booking Confirmed!
          </h1>
          <p className="mb-2" style={{ color: '#94a3b8' }}>
            Thanks for choosing <strong className="text-white">XTS Tech Support</strong>.
          </p>
          <p className="mb-6" style={{ color: '#94a3b8' }}>
            Jamie will send you a confirmation SMS shortly. You'll also receive a confirmation email to the address you provided.
          </p>

          {/* What happens next */}
          <div className="rounded-2xl p-5 mb-6 text-left space-y-3"
            style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.18)' }}>
            <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#f59e0b', fontFamily: 'var(--font-space)' }}>
              What Happens Next
            </p>
            {[
              'Jamie reviews your booking details',
              'You receive a confirmation SMS within 2 hours',
              'Jamie arrives at the agreed time — ready to fix it',
              'Pay only when you are 100% happy',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <FaCircleCheck className="text-sm mt-0.5 flex-shrink-0" style={{ color: '#a78bfa' }} />
                <span className="text-sm" style={{ color: '#cbd5e1' }}>{step}</span>
              </div>
            ))}
          </div>

          {/* Availability reminder */}
          <div className="rounded-xl p-4 mb-6 text-sm"
            style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.18)' }}>
            <p className="font-semibold text-white mb-1">📅 Available Times</p>
            <p style={{ color: '#94a3b8' }}>Mon · Tue · Wed · Sat · Sun — 10:00 AM to 3:00 PM</p>
            <p className="mt-1 text-xs" style={{ color: '#64748b' }}>⚠️ All other times are currently booked out. For urgent after-hours assistance, please call us directly.</p>
          </div>

          {/* Urgent contact */}
          <div className="rounded-xl p-4 mb-8"
            style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.18)' }}>
            <p className="text-sm font-medium text-white mb-1">Need to reach us urgently?</p>
            <a href="tel:0424424444" className="text-2xl font-extrabold" style={{ color: '#f59e0b', fontFamily: 'var(--font-space)' }}>
              0424 424 444
            </a>
          </div>

          <Link href="/" className="btn-primary w-full justify-center">
            <FaBolt /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
