'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  FaEye, FaEyeSlash, FaRotateRight, FaCalendarCheck, FaEnvelope,
  FaPhone, FaClock, FaCircleCheck, FaTriangleExclamation, FaLock,
  FaChartBar, FaGear, FaRightFromBracket, FaCalendarDays, FaInbox,
} from 'react-icons/fa6'

const ADMIN_PASSWORD = 'XTS2024admin'

const DEMO_TODAY = [
  { time: '10:00 AM', name: 'Sarah Mitchell', service: 'Laptop Repair', suburb: 'Broadbeach QLD', phone: '0412000001', status: 'Confirmed', type: 'Home Visit' },
  { time: '1:30 PM',  name: 'Robert Chen',    service: 'Wi-Fi Setup',   suburb: 'New Farm QLD',    phone: '0412000002', status: 'Confirmed', type: 'Home Visit' },
]
const DEMO_WEEK = [
  { date: 'Mon', time: '10:00 AM', name: 'Emma Watson',  service: 'Virus Removal',   suburb: 'Surfers Paradise QLD', status: 'Confirmed' },
  { date: 'Tue', time: '11:30 AM', name: 'David Park',   service: 'Email Setup',     suburb: 'Coolangatta QLD',      status: 'Confirmed' },
  { date: 'Wed', time: '2:00 PM',  name: 'Linda Ross',   service: 'Data Recovery',   suburb: 'Byron Bay NSW',        status: 'Pending'   },
  { date: 'Sat', time: '10:00 AM', name: 'Michael T.',   service: 'Computer Repair', suburb: 'Tweed Heads NSW',      status: 'Confirmed' },
  { date: 'Sun', time: '1:00 PM',  name: 'Julie K.',     service: 'Remote Support',  suburb: 'Brisbane QLD',         status: 'Confirmed' },
]
const DEMO_ENQUIRIES = [
  { time: 'Today 8:45 AM',      name: 'Michael Thompson', email: 'm.thompson@email.com', service: 'Printer Setup',  message: 'Wireless printer not connecting to my Wi-Fi. Need help ASAP.',                                  status: 'New'     },
  { time: 'Yesterday 4:20 PM',  name: 'Julie Kerr',       email: 'j.kerr@email.com',     service: 'Virus Removal',  message: 'Laptop is running very slow, possible virus. Kids use it for school.',                        status: 'New'     },
  { time: 'Yesterday 11:00 AM', name: 'Tony Bowen',       email: 't.bowen@biz.com.au',   service: 'Remote Hands',   message: 'We need on-site support in Gold Coast for router swap. Business enquiry.',                    status: 'Replied' },
]

const NAV_ITEMS = [
  { id: 'today',        label: "Today's Bookings",    icon: FaCalendarCheck },
  { id: 'week',         label: 'This Week',           icon: FaCalendarDays  },
  { id: 'enquiries',    label: 'Enquiries',           icon: FaInbox         },
  { id: 'availability', label: 'Availability',        icon: FaGear          },
  { id: 'stats',        label: 'Stats',               icon: FaChartBar      },
]

function Badge({ status }) {
  const map = {
    Confirmed: { bg: 'rgba(22,163,74,0.15)',   border: 'rgba(22,163,74,0.3)',   color: '#4ade80' },
    Pending:   { bg: 'rgba(245,158,11,0.15)',  border: 'rgba(245,158,11,0.3)',  color: '#fcd34d' },
    New:       { bg: 'rgba(59,130,246,0.15)',  border: 'rgba(59,130,246,0.3)',  color: '#93c5fd' },
    Replied:   { bg: 'rgba(100,116,139,0.15)', border: 'rgba(100,116,139,0.3)', color: '#94a3b8' },
  }
  const s = map[status] || map.Pending
  return (
    <span style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
      className="text-xs font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap">
      {status}
    </span>
  )
}

/* ── Login Screen ─────────────────────────────────────────────────── */
function LoginScreen({ onLogin }) {
  const [pw, setPw] = useState('')
  const [show, setShow] = useState(false)
  const [err, setErr] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { onLogin() } else { setErr(true) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#0b0f1e' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="Xpert Tech Solutions" width={180} height={60}
            className="h-14 w-auto object-contain mx-auto mb-6" />
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
            <FaLock className="text-white" />
          </div>
          <h1 className="text-xl font-extrabold text-white mb-1" style={{ fontFamily: 'var(--font-space)' }}>
            Admin Dashboard
          </h1>
          <p className="text-sm" style={{ color: '#475569' }}>Xpert Tech Solutions — Private Access</p>
        </div>

        <div className="rounded-2xl p-7" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <form onSubmit={submit}>
            <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#64748b' }}>
              Password
            </label>
            <div className="relative mb-4">
              <input
                type={show ? 'text' : 'password'}
                value={pw}
                onChange={(e) => { setPw(e.target.value); setErr(false) }}
                placeholder="Enter admin password"
                autoFocus
                className="w-full px-4 py-3 pr-12 rounded-xl text-white text-sm outline-none"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: err ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.1)',
                }}
              />
              <button type="button" onClick={() => setShow(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: '#475569' }}>
                {show ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {err && <p className="text-xs mb-3" style={{ color: '#f87171' }}>Incorrect password. Try again.</p>}
            <button type="submit"
              className="w-full py-3 rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

/* ── Today Section ────────────────────────────────────────────────── */
function TodaySection({ todayStr, dayName, isWorkDay }) {
  return (
    <div>
      {/* Date + status bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#f59e0b', fontFamily: 'var(--font-space)' }}>Today</p>
          <h2 className="text-2xl font-extrabold text-white" style={{ fontFamily: 'var(--font-space)' }}>{todayStr}</h2>
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
          style={{
            background: isWorkDay ? 'rgba(22,163,74,0.1)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${isWorkDay ? 'rgba(22,163,74,0.25)' : 'rgba(239,68,68,0.25)'}`,
            color: isWorkDay ? '#4ade80' : '#f87171',
          }}>
          {isWorkDay ? <FaCircleCheck /> : <FaTriangleExclamation />}
          {isWorkDay ? `${dayName} — Work Day` : `${dayName} — Day Off`}
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Bookings Today', value: DEMO_TODAY.length, color: '#f59e0b' },
          { label: 'This Week',      value: DEMO_WEEK.length,  color: '#4ade80' },
          { label: 'New Enquiries',  value: DEMO_ENQUIRIES.filter(e => e.status === 'New').length, color: '#93c5fd' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-center"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-3xl font-extrabold mb-1" style={{ color: s.color, fontFamily: 'var(--font-space)' }}>{s.value}</p>
            <p className="text-xs" style={{ color: '#64748b' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Today's bookings */}
      <div className="flex items-center gap-3 mb-4">
        <FaCalendarCheck style={{ color: '#f59e0b' }} />
        <h3 className="font-bold text-white">Today's Bookings</h3>
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.25)' }}>
          {DEMO_TODAY.length}
        </span>
        <span className="ml-auto text-xs" style={{ color: '#334155' }}>Demo data</span>
      </div>
      <div className="space-y-3">
        {DEMO_TODAY.map((b, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl p-4"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-4 flex-1">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-extrabold text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
                {b.time.split(' ')[0]}
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{b.name}</p>
                <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>{b.service} · {b.suburb}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium" style={{ color: '#94a3b8' }}>{b.time}</span>
              <Badge status={b.status} />
              <a href={`tel:${b.phone}`}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: 'rgba(22,163,74,0.12)', color: '#4ade80', border: '1px solid rgba(22,163,74,0.2)' }}>
                <FaPhone className="text-xs" />
              </a>
            </div>
          </div>
        ))}
        {DEMO_TODAY.length === 0 && (
          <p className="text-center py-10 text-sm" style={{ color: '#334155' }}>No bookings today.</p>
        )}
      </div>
    </div>
  )
}

/* ── Week Section ─────────────────────────────────────────────────── */
function WeekSection() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FaCalendarDays style={{ color: '#4ade80' }} />
        <h2 className="text-xl font-extrabold text-white" style={{ fontFamily: 'var(--font-space)' }}>This Week's Bookings</h2>
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: 'rgba(22,163,74,0.15)', color: '#4ade80', border: '1px solid rgba(22,163,74,0.25)' }}>
          {DEMO_WEEK.length}
        </span>
      </div>
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              {['Day', 'Time', 'Customer', 'Service', 'Location', 'Status'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider" style={{ color: '#334155' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEMO_WEEK.map((b, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.01)' }}>
                <td className="px-5 py-3.5 font-bold" style={{ color: '#f59e0b' }}>{b.date}</td>
                <td className="px-5 py-3.5 text-white">{b.time}</td>
                <td className="px-5 py-3.5 font-medium text-white">{b.name}</td>
                <td className="px-5 py-3.5" style={{ color: '#94a3b8' }}>{b.service}</td>
                <td className="px-5 py-3.5" style={{ color: '#64748b' }}>{b.suburb}</td>
                <td className="px-5 py-3.5"><Badge status={b.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ── Enquiries Section ────────────────────────────────────────────── */
function EnquiriesSection() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FaInbox style={{ color: '#93c5fd' }} />
        <h2 className="text-xl font-extrabold text-white" style={{ fontFamily: 'var(--font-space)' }}>Enquiries</h2>
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: 'rgba(59,130,246,0.15)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.25)' }}>
          {DEMO_ENQUIRIES.filter(e => e.status === 'New').length} new
        </span>
      </div>
      <div className="space-y-4">
        {DEMO_ENQUIRIES.map((e, i) => (
          <div key={i} className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${e.status === 'New' ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.07)'}` }}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <div>
                <p className="font-semibold text-white">
                  {e.name}
                  <span className="ml-2 text-xs font-normal" style={{ color: '#64748b' }}>— {e.service}</span>
                </p>
                <a href={`mailto:${e.email}`} className="text-xs hover:text-white transition-colors" style={{ color: '#94a3b8' }}>{e.email}</a>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs" style={{ color: '#334155' }}>{e.time}</span>
                <Badge status={e.status} />
              </div>
            </div>
            <p className="text-sm px-4 py-3 rounded-xl" style={{ color: '#94a3b8', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)' }}>
              "{e.message}"
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Availability Section ─────────────────────────────────────────── */
function AvailabilitySection() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FaGear style={{ color: '#f59e0b' }} />
        <h2 className="text-xl font-extrabold text-white" style={{ fontFamily: 'var(--font-space)' }}>Availability Settings</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="rounded-2xl p-5" style={{ background: 'rgba(22,163,74,0.06)', border: '1px solid rgba(22,163,74,0.18)' }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#4ade80' }}>Work Days</p>
          <div className="flex flex-wrap gap-2">
            {['Mon', 'Tue', 'Wed', 'Sat', 'Sun'].map(d => (
              <span key={d} className="px-3 py-1 rounded-lg text-sm font-semibold"
                style={{ background: 'rgba(22,163,74,0.15)', color: '#4ade80', border: '1px solid rgba(22,163,74,0.25)' }}>
                {d}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-5" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)' }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#f87171' }}>Days Off</p>
          <div className="flex flex-wrap gap-2">
            {['Thu', 'Fri'].map(d => (
              <span key={d} className="px-3 py-1 rounded-lg text-sm font-semibold"
                style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.25)' }}>
                {d}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#94a3b8' }}>Hours</p>
          <p className="text-lg font-bold text-white">10:00 AM – 3:00 PM</p>
        </div>
        <div className="rounded-2xl p-5" style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.18)' }}>
          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#f59e0b' }}>Outside Hours Shows As</p>
          <p className="text-lg font-bold text-white">"Booked Out"</p>
          <p className="text-xs mt-1" style={{ color: '#64748b' }}>Not "Unavailable"</p>
        </div>
      </div>
      <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#64748b' }}>How to update in Calendly</p>
        <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>
          Log in to <strong className="text-white">Calendly</strong> → Settings → Availability → set the hours above.<br />
          Under "When unavailable" use custom text: <strong className="text-white">"Booked Out"</strong>
        </p>
      </div>
    </div>
  )
}

/* ── Stats Section ────────────────────────────────────────────────── */
function StatsSection() {
  const stats = [
    { label: 'Total Bookings (Demo)',   value: DEMO_TODAY.length + DEMO_WEEK.length, color: '#a78bfa' },
    { label: 'Confirmed',               value: [...DEMO_TODAY, ...DEMO_WEEK].filter(b => b.status === 'Confirmed').length, color: '#4ade80' },
    { label: 'Pending',                 value: [...DEMO_TODAY, ...DEMO_WEEK].filter(b => b.status === 'Pending').length,   color: '#fcd34d' },
    { label: 'Total Enquiries',         value: DEMO_ENQUIRIES.length,                color: '#93c5fd' },
    { label: 'New Enquiries',           value: DEMO_ENQUIRIES.filter(e => e.status === 'New').length,    color: '#f87171' },
    { label: 'Replied Enquiries',       value: DEMO_ENQUIRIES.filter(e => e.status === 'Replied').length, color: '#94a3b8' },
  ]
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FaChartBar style={{ color: '#a78bfa' }} />
        <h2 className="text-xl font-extrabold text-white" style={{ fontFamily: 'var(--font-space)' }}>Stats</h2>
        <span className="text-xs" style={{ color: '#334155' }}>Demo data</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-4xl font-extrabold mb-2" style={{ color: s.color, fontFamily: 'var(--font-space)' }}>{s.value}</p>
            <p className="text-xs" style={{ color: '#64748b' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Main Dashboard ───────────────────────────────────────────────── */
export default function AdminDashboard() {
  const [authed, setAuthed]         = useState(false)
  const [activeSection, setActive]  = useState('today')
  const [lastRefresh, setRefresh]   = useState('')
  const [sidebarOpen, setSidebar]   = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('xts_admin') === 'true') setAuthed(true)
    setRefresh(new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' }))
  }, [])

  const login = () => {
    sessionStorage.setItem('xts_admin', 'true')
    setAuthed(true)
  }
  const logout = () => {
    sessionStorage.removeItem('xts_admin')
    setAuthed(false)
  }
  const refresh = () => {
    setRefresh(new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' }))
  }

  const today    = new Date()
  const todayStr = today.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const dayName  = today.toLocaleDateString('en-AU', { weekday: 'long' })
  const isWorkDay = ['Monday', 'Tuesday', 'Wednesday', 'Saturday', 'Sunday'].includes(dayName)

  if (!authed) return <LoginScreen onLogin={login} />

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0b0f1e', fontFamily: 'var(--font-inter)' }}>

      {/* ── Top Header Bar ── */}
      <header className="flex-shrink-0 flex items-center justify-between px-5 py-3 z-50"
        style={{ background: '#0f1425', borderBottom: '1px solid rgba(255,255,255,0.07)', height: 64 }}>

        {/* Left: Logo + title */}
        <div className="flex items-center gap-4">
          {/* Mobile sidebar toggle */}
          <button onClick={() => setSidebar(o => !o)}
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>
            <span className="text-lg">☰</span>
          </button>
          <Image src="/logo.png" alt="Xpert Tech Solutions" width={140} height={48}
            className="h-10 w-auto object-contain" />
          <div className="hidden sm:block w-px h-6" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <span className="hidden sm:block text-sm font-bold" style={{ color: '#94a3b8', fontFamily: 'var(--font-space)' }}>
            Admin Dashboard
          </span>
        </div>

        {/* Right: Refresh + Logout */}
        <div className="flex items-center gap-2">
          {lastRefresh && (
            <span className="hidden sm:block text-xs mr-2" style={{ color: '#334155' }}>
              Updated {lastRefresh}
            </span>
          )}
          <button onClick={refresh}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors hover:text-white"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', color: '#64748b' }}>
            <FaRotateRight className="text-xs" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button onClick={logout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors hover:text-white"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)', color: '#f87171' }}>
            <FaRightFromBracket className="text-xs" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      {/* ── Body: Sidebar + Content ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside
          className={`flex-shrink-0 flex flex-col transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} fixed lg:static inset-y-0 left-0 top-16 z-40 lg:z-auto`}
          style={{ width: 220, background: '#0d1121', borderRight: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>

          <nav className="flex flex-col gap-1 px-3">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
              const active = activeSection === id
              return (
                <button key={id}
                  onClick={() => { setActive(id); setSidebar(false) }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all w-full"
                  style={{
                    background: active ? 'rgba(124,58,237,0.15)' : 'transparent',
                    color:      active ? '#c4b5fd' : '#475569',
                    border:     active ? '1px solid rgba(124,58,237,0.25)' : '1px solid transparent',
                    fontFamily: 'var(--font-space)',
                  }}>
                  <Icon className="text-sm flex-shrink-0" />
                  {label}
                </button>
              )
            })}
          </nav>

          <div className="mt-auto px-4 pb-6">
            <div className="rounded-xl p-3 text-xs" style={{ background: 'rgba(255,255,255,0.02)', color: '#1e293b' }}>
              Private — not linked publicly
            </div>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 lg:hidden" style={{ background: 'rgba(0,0,0,0.6)' }}
            onClick={() => setSidebar(false)} />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-4xl">
            {activeSection === 'today'        && <TodaySection todayStr={todayStr} dayName={dayName} isWorkDay={isWorkDay} />}
            {activeSection === 'week'         && <WeekSection />}
            {activeSection === 'enquiries'    && <EnquiriesSection />}
            {activeSection === 'availability' && <AvailabilitySection />}
            {activeSection === 'stats'        && <StatsSection />}
          </div>
        </main>
      </div>
    </div>
  )
}
