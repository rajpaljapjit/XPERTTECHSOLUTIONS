'use client'

/*
 * ─── SECRET ADMIN DASHBOARD ───────────────────────────────────────────────────
 * This page is NOT linked anywhere on the website.
 * Bookmark it directly: yourwebsite.com/admin
 *
 * ─── CALENDLY API SETUP ───────────────────────────────────────────────────────
 * To connect real booking data from Calendly:
 *
 * 1. Log in to Calendly → Integrations → API & Webhooks
 * 2. Generate a Personal Access Token
 * 3. Create a Vercel serverless function at: /api/bookings
 *    - Fetch from: https://api.calendly.com/scheduled_events
 *    - Headers: { Authorization: `Bearer YOUR_TOKEN` }
 *    - Filter by: status=active, min_start_time=today 00:00, max_start_time=today 23:59
 * 4. Replace the DEMO_DATA below with a fetch() call to /api/bookings
 *
 * ─── FORMSPREE ENQUIRIES ──────────────────────────────────────────────────────
 * To view form submissions:
 * - Log in to formspree.io → your form → Submissions tab
 * - Or set up a Zapier/Webhook to push new submissions here
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from 'react'
import { FaBolt, FaEye, FaEyeSlash, FaRotateRight, FaCalendarCheck, FaEnvelope, FaPhone, FaLocationDot, FaClock, FaCircleCheck, FaTriangleExclamation, FaLock } from 'react-icons/fa6'

const ADMIN_PASSWORD = 'XTS2024admin'
// ⚠️ Change this password — go to components/AdminDashboard.jsx line above

// ─── DEMO DATA (replace with Calendly API fetch) ──────────────────────────────
const DEMO_TODAY = [
  { time: '10:00 AM', name: 'Sarah Mitchell', service: 'Laptop Repair', suburb: 'Broadbeach QLD', phone: '0412 xxx xxx', status: 'Confirmed', type: 'Home Visit' },
  { time: '1:30 PM', name: 'Robert Chen', service: 'Wi-Fi Setup', suburb: 'New Farm QLD', phone: '0423 xxx xxx', status: 'Confirmed', type: 'Home Visit' },
]
const DEMO_WEEK = [
  { date: 'Mon', time: '10:00 AM', name: 'Emma Watson', service: 'Virus Removal', suburb: 'Surfers Paradise QLD', status: 'Confirmed' },
  { date: 'Tue', time: '11:30 AM', name: 'David Park', service: 'Email Setup', suburb: 'Coolangatta QLD', status: 'Confirmed' },
  { date: 'Wed', time: '2:00 PM', name: 'Linda Ross', service: 'Data Recovery', suburb: 'Byron Bay NSW', status: 'Pending' },
  { date: 'Sat', time: '10:00 AM', name: 'Michael T.', service: 'Computer Repair', suburb: 'Tweed Heads NSW', status: 'Confirmed' },
  { date: 'Sun', time: '1:00 PM', name: 'Julie K.', service: 'Remote Support', suburb: 'Brisbane QLD', status: 'Confirmed' },
]
const DEMO_ENQUIRIES = [
  { time: 'Today 8:45 AM', name: 'Michael Thompson', email: 'm.thompson@email.com', service: 'Printer Setup', message: 'Wireless printer not connecting to my Wi-Fi. Need help ASAP.', status: 'New' },
  { time: 'Yesterday 4:20 PM', name: 'Julie Kerr', email: 'j.kerr@email.com', service: 'Virus Removal', message: 'Laptop is running very slow, possible virus. Kids use it for school.', status: 'New' },
  { time: 'Yesterday 11:00 AM', name: 'Tony Bowen', email: 't.bowen@biz.com.au', service: 'Remote Hands', message: 'We need on-site support in Gold Coast for router swap. Business enquiry.', status: 'Replied' },
]
// ─────────────────────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const styles = {
    Confirmed: { bg: 'rgba(22,163,74,0.15)', border: 'rgba(22,163,74,0.3)', color: '#4ade80' },
    Pending:   { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.3)', color: '#fcd34d' },
    New:       { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.3)', color: '#93c5fd' },
    Replied:   { bg: 'rgba(100,116,139,0.15)', border: 'rgba(100,116,139,0.3)', color: '#94a3b8' },
  }
  const s = styles[status] || styles.Pending
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}>
      {status}
    </span>
  )
}

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(null)

  useEffect(() => {
    if (sessionStorage.getItem('xts_admin') === 'true') setAuthed(true)
    setLastRefresh(new Date().toLocaleTimeString('en-AU'))
  }, [])

  const login = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('xts_admin', 'true')
      setAuthed(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  const refresh = () => {
    setLastRefresh(new Date().toLocaleTimeString('en-AU'))
    // TODO: re-fetch from Calendly API here
  }

  const today = new Date()
  const todayStr = today.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const dayName = today.toLocaleDateString('en-AU', { weekday: 'long' })
  const isWorkDay = ['Monday', 'Tuesday', 'Wednesday', 'Saturday', 'Sunday'].includes(dayName)

  if (!authed) {
    return (
      <div className="min-h-screen hero-bg dot-grid flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'linear-gradient(135deg, #15803d, #d97706)' }}>
              <FaLock className="text-white text-xl" />
            </div>
            <h1 className="font-extrabold text-white text-xl mb-1">Admin Dashboard</h1>
            <p className="text-sm mb-6" style={{ color: '#64748b' }}>XTS Tech Support — Private Access</p>
            <form onSubmit={login}>
              <div className="relative mb-4">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="Enter admin password"
                  className="form-input pr-12"
                  autoFocus
                />
                <button type="button" onClick={() => setShowPw((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                  {showPw ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {error && <p className="text-red-400 text-xs mb-3">Incorrect password. Try again.</p>}
              <button type="submit" className="btn-primary w-full justify-center">
                <FaLock /> Enter Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: '#0f172a' }}>
      {/* Header */}
      <div className="sticky top-0 z-40 px-4 py-4" style={{ background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #15803d, #d97706)' }}>
              <FaBolt className="text-white text-sm" />
            </div>
            <div>
              <span className="font-extrabold text-white text-sm">XTS Admin</span>
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(22,163,74,0.15)', color: '#4ade80', border: '1px solid rgba(22,163,74,0.2)' }}>Private</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {lastRefresh && <span className="text-xs" style={{ color: '#475569' }}>Refreshed {lastRefresh}</span>}
            <button onClick={refresh} className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg transition-colors" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}>
              <FaRotateRight /> Refresh
            </button>
            <button onClick={() => { sessionStorage.removeItem('xts_admin'); setAuthed(false) }} className="text-xs font-medium" style={{ color: '#475569' }}>
              Log out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

        {/* Date + day status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#f59e0b' }}>Today</p>
            <h1 className="text-2xl font-extrabold text-white">{todayStr}</h1>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold ${isWorkDay ? 'text-green-400' : 'text-red-400'}`}
            style={{ background: isWorkDay ? 'rgba(22,163,74,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${isWorkDay ? 'rgba(22,163,74,0.25)' : 'rgba(239,68,68,0.25)'}` }}>
            {isWorkDay ? <FaCircleCheck /> : <FaTriangleExclamation />}
            {isWorkDay ? `${dayName} — Work Day ✓` : `${dayName} — Booked Out (Day Off)`}
          </div>
        </div>

        {/* Availability reminder */}
        <div className="glass-card p-5" style={{ borderColor: 'rgba(245,158,11,0.2)' }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#f59e0b' }}>📅 Calendly Availability Settings — Remember to Configure</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="p-3 rounded-xl" style={{ background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.15)' }}>
              <p className="font-semibold text-white text-xs mb-1">✅ Work Days</p>
              <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Mon · Tue · Wed · Sat · Sun</p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
              <p className="font-semibold text-white text-xs mb-1">🚫 Days Off</p>
              <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Thu &amp; Fri — show as "Booked Out"</p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.15)' }}>
              <p className="font-semibold text-white text-xs mb-1">🕐 Hours</p>
              <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>10:00 AM – 3:00 PM only</p>
            </div>
            <div className="p-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
              <p className="font-semibold text-white text-xs mb-1">⚠️ Outside Hours</p>
              <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Show as "Booked Out" — NOT "Unavailable"</p>
            </div>
          </div>
          <p className="text-xs mt-3" style={{ color: '#475569' }}>
            In Calendly: Settings → Availability → set the above hours, then under "When unavailable" use custom text: <strong className="text-slate-400">"Booked Out"</strong>
          </p>
        </div>

        {/* Today's bookings */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FaCalendarCheck style={{ color: '#f59e0b' }} />
            <h2 className="font-bold text-white">Today's Bookings</h2>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.25)' }}>{DEMO_TODAY.length}</span>
            <span className="text-xs ml-auto" style={{ color: '#475569' }}>⚠️ Demo data — connect Calendly API to see real bookings</span>
          </div>
          <div className="space-y-3">
            {DEMO_TODAY.map((b, i) => (
              <div key={i} className="glass-card p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-extrabold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #15803d, #d97706)' }}>
                    {b.time.replace(' ', '').replace(':', '').slice(0, 4)}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{b.name}</p>
                    <p className="text-xs" style={{ color: '#64748b' }}>{b.service} · {b.suburb}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs font-medium" style={{ color: '#94a3b8' }}>{b.time}</span>
                  <StatusBadge status={b.status} />
                  <a href={`tel:${b.phone.replace(/\s/g, '')}`} className="text-xs text-green-400 hover:text-green-300">
                    <FaPhone />
                  </a>
                </div>
              </div>
            ))}
            {DEMO_TODAY.length === 0 && (
              <p className="text-sm py-6 text-center" style={{ color: '#475569' }}>No bookings today.</p>
            )}
          </div>
        </div>

        {/* This week's bookings */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FaClock style={{ color: '#16a34a' }} />
            <h2 className="font-bold text-white">This Week's Bookings</h2>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(22,163,74,0.15)', color: '#4ade80', border: '1px solid rgba(22,163,74,0.25)' }}>{DEMO_WEEK.length}</span>
          </div>
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Day', 'Time', 'Customer', 'Service', 'Location', 'Status'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: '#475569' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEMO_WEEK.map((b, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td className="px-4 py-3 font-semibold" style={{ color: '#f59e0b' }}>{b.date}</td>
                    <td className="px-4 py-3 text-white">{b.time}</td>
                    <td className="px-4 py-3 font-medium text-white">{b.name}</td>
                    <td className="px-4 py-3" style={{ color: '#94a3b8' }}>{b.service}</td>
                    <td className="px-4 py-3" style={{ color: '#64748b' }}>{b.suburb}</td>
                    <td className="px-4 py-3"><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending enquiries */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FaEnvelope style={{ color: '#8b5cf6' }} />
            <h2 className="font-bold text-white">All Pending Enquiries</h2>
            <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(139,92,246,0.15)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.25)' }}>{DEMO_ENQUIRIES.filter((e) => e.status === 'New').length} new</span>
          </div>
          <div className="space-y-3">
            {DEMO_ENQUIRIES.map((e, i) => (
              <div key={i} className="glass-card p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-semibold text-white">{e.name} <span className="text-xs font-normal ml-1" style={{ color: '#64748b' }}>— {e.service}</span></p>
                    <a href={`mailto:${e.email}`} className="text-xs" style={{ color: '#94a3b8' }}>{e.email}</a>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs" style={{ color: '#475569' }}>{e.time}</span>
                    <StatusBadge status={e.status} />
                  </div>
                </div>
                <p className="text-sm p-3 rounded-lg" style={{ color: '#94a3b8', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  "{e.message}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Calendly API setup guide */}
        <div className="glass-card p-6" style={{ borderColor: 'rgba(22,163,74,0.15)' }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#4ade80' }}>🔌 How to Connect Real Booking Data (Calendly API)</p>
          <div className="space-y-3 text-sm" style={{ color: '#94a3b8' }}>
            {[
              { n: '1', t: 'Get your API key', b: 'Log in to Calendly → Integrations → API & Webhooks → Personal Access Tokens → Generate Token' },
              { n: '2', t: 'Create a serverless function', b: 'Create /app/api/bookings/route.js in this project. Fetch from https://api.calendly.com/scheduled_events with your Bearer token.' },
              { n: '3', t: 'Filter by date', b: 'Use query params: min_start_time=2026-01-01T00:00:00Z&max_start_time=2026-01-07T23:59:59Z to get this week\'s bookings.' },
              { n: '4', t: 'Replace demo data', b: 'In this file (AdminDashboard.jsx), replace DEMO_TODAY and DEMO_WEEK with your API fetch results in a useEffect.' },
              { n: '5', t: 'Set up webhook (optional)', b: 'In Calendly → Webhooks, add a webhook URL pointing to your site so bookings appear here in real-time.' },
            ].map((step) => (
              <div key={step.n} className="flex gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(22,163,74,0.2)', color: '#4ade80' }}>{step.n}</span>
                <div>
                  <span className="font-semibold text-white">{step.t} — </span>{step.b}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-center pb-8" style={{ color: '#1e293b' }}>
          XTS Admin — Not linked publicly. Change password in components/AdminDashboard.jsx
        </p>
      </div>
    </div>
  )
}
