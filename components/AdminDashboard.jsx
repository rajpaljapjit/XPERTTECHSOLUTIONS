'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import {
  FaEye, FaEyeSlash, FaRotateRight, FaCalendarCheck, FaEnvelope,
  FaPhone, FaCircleCheck, FaTriangleExclamation, FaLock,
  FaChartBar, FaGear, FaRightFromBracket, FaCalendarDays, FaInbox,
  FaCheck, FaPaperPlane, FaXmark,
} from 'react-icons/fa6'

const ADMIN_PASSWORD = 'Jamie2727**'

const NAV_ITEMS = [
  { id: 'today',        label: "Today's Bookings",  icon: FaCalendarCheck },
  { id: 'week',         label: 'All Bookings',      icon: FaCalendarDays  },
  { id: 'enquiries',    label: 'Enquiries',         icon: FaInbox         },
  { id: 'availability', label: 'Availability',      icon: FaGear          },
  { id: 'stats',        label: 'Stats',             icon: FaChartBar      },
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

function Empty({ message }) {
  return (
    <p className="text-center py-12 text-sm" style={{ color: '#334155' }}>{message}</p>
  )
}

/* ── Confirm Panel ────────────────────────────────────────────────── */
function ConfirmPanel({ booking, onConfirm, onClose }) {
  const defaultNote = `Hi ${booking.first_name}, your booking for ${booking.service} on ${booking.preferred_date} at ${booking.preferred_time} is confirmed. We'll see you then! If you need to reschedule, call us on 0424 424 444.`
  const [note, setNote] = useState(defaultNote)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSend = async () => {
    setSending(true)
    await onConfirm(booking.id, note)
    setSending(false)
    setSent(true)
    setTimeout(onClose, 1500)
  }

  return (
    <div className="mt-3 p-4 rounded-xl" style={{ background: 'rgba(22,163,74,0.06)', border: '1px solid rgba(22,163,74,0.2)' }}>
      {sent ? (
        <div className="flex items-center gap-2 text-sm" style={{ color: '#4ade80' }}>
          <FaCircleCheck /> Confirmation email sent to {booking.email}
        </div>
      ) : (
        <>
          <p className="text-xs font-semibold mb-2" style={{ color: '#64748b' }}>
            Confirmation email to: <span style={{ color: '#94a3b8' }}>{booking.email}</span>
          </p>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none mb-3"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', resize: 'vertical' }}
            placeholder="Add a note to the customer (optional)..."
          />
          <p className="text-xs mb-3" style={{ color: '#475569' }}>
            Need to suggest a different time? Edit the message above.
          </p>
          <div className="flex gap-2">
            <button onClick={handleSend} disabled={sending}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', opacity: sending ? 0.7 : 1 }}>
              <FaPaperPlane /> {sending ? 'Sending...' : 'Send Confirmation'}
            </button>
            <button onClick={onClose}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#64748b' }}>
              <FaXmark /> Cancel
            </button>
          </div>
        </>
      )}
    </div>
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
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0b0f1e' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="Xpert Tech Solutions" width={180} height={60} className="h-14 w-auto object-contain mx-auto mb-6" />
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
            <FaLock className="text-white" />
          </div>
          <h1 className="text-xl font-extrabold text-white mb-1" style={{ fontFamily: 'var(--font-space)' }}>Admin Dashboard</h1>
          <p className="text-sm" style={{ color: '#475569' }}>Xpert Tech Solutions — Private Access</p>
        </div>
        <div className="rounded-2xl p-7" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <form onSubmit={submit}>
            <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: '#64748b' }}>Password</label>
            <div className="relative mb-4">
              <input
                type={show ? 'text' : 'password'}
                value={pw}
                onChange={(e) => { setPw(e.target.value); setErr(false) }}
                placeholder="Enter admin password"
                autoFocus
                className="w-full px-4 py-3 pr-12 rounded-xl text-white text-sm outline-none"
                style={{ background: 'rgba(255,255,255,0.06)', border: err ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(255,255,255,0.1)' }}
              />
              <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#475569' }}>
                {show ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {err && <p className="text-xs mb-3" style={{ color: '#f87171' }}>Incorrect password. Try again.</p>}
            <button type="submit" className="w-full py-3 rounded-xl font-bold text-sm text-white transition-opacity hover:opacity-90"
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
function TodaySection({ bookings, enquiries, stats, onStatusChange, onConfirmBooking }) {
  const today = new Date().toISOString().split('T')[0]
  const todayBookings = bookings.filter(b => b.created_at && b.created_at.startsWith(today))
  const todayStr = new Date().toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const dayName  = new Date().toLocaleDateString('en-AU', { weekday: 'long' })
  const isWorkDay = ['Monday', 'Tuesday', 'Wednesday', 'Saturday', 'Sunday'].includes(dayName)
  const [confirmingId, setConfirmingId] = useState(null)

  return (
    <div>
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

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Bookings Today', value: stats.todayBookings ?? 0, color: '#f59e0b' },
          { label: 'Total Bookings', value: stats.totalBookings ?? 0, color: '#4ade80' },
          { label: 'New Enquiries',  value: enquiries.filter(e => e.status === 'New').length, color: '#93c5fd' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-3xl font-extrabold mb-1" style={{ color: s.color, fontFamily: 'var(--font-space)' }}>{s.value}</p>
            <p className="text-xs" style={{ color: '#64748b' }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-4">
        <FaCalendarCheck style={{ color: '#f59e0b' }} />
        <h3 className="font-bold text-white">Today's Bookings</h3>
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.25)' }}>
          {todayBookings.length}
        </span>
      </div>
      <div className="space-y-3">
        {todayBookings.length === 0
          ? <Empty message="No bookings today." />
          : todayBookings.map((b) => (
            <div key={b.id}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl p-4"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-extrabold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}>
                    {b.preferred_time ? b.preferred_time.split(':')[0] : '—'}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{b.first_name} {b.last_name}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>{b.service} · {b.suburb}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium" style={{ color: '#94a3b8' }}>{b.preferred_time || '—'}</span>
                  <Badge status={b.status} />
                  {b.phone && (
                    <a href={`tel:${b.phone}`} className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(22,163,74,0.12)', color: '#4ade80', border: '1px solid rgba(22,163,74,0.2)' }}>
                      <FaPhone className="text-xs" />
                    </a>
                  )}
                  {b.status !== 'Confirmed' && (
                    <button onClick={() => setConfirmingId(confirmingId === b.id ? null : b.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                      style={{ background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.25)', color: '#4ade80' }}>
                      <FaCheck /> Confirm
                    </button>
                  )}
                </div>
              </div>
              {confirmingId === b.id && (
                <ConfirmPanel
                  booking={b}
                  onConfirm={async (id, note) => { await onConfirmBooking(id, note); setConfirmingId(null) }}
                  onClose={() => setConfirmingId(null)}
                />
              )}
            </div>
          ))
        }
      </div>
    </div>
  )
}

/* ── All Bookings Section ─────────────────────────────────────────── */
function WeekSection({ bookings, onStatusChange, onConfirmBooking }) {
  const [confirmingId, setConfirmingId] = useState(null)

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FaCalendarDays style={{ color: '#4ade80' }} />
        <h2 className="text-xl font-extrabold text-white" style={{ fontFamily: 'var(--font-space)' }}>All Bookings</h2>
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: 'rgba(22,163,74,0.15)', color: '#4ade80', border: '1px solid rgba(22,163,74,0.25)' }}>
          {bookings.length}
        </span>
      </div>
      {bookings.length === 0
        ? <Empty message="No bookings yet." />
        : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id}>
                <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                    {/* Info */}
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1.5 text-xs">
                      <div>
                        <span style={{ color: '#475569' }}>Customer</span>
                        <p className="font-semibold text-white mt-0.5">{b.first_name} {b.last_name}</p>
                      </div>
                      <div>
                        <span style={{ color: '#475569' }}>Date</span>
                        <p className="text-white mt-0.5">{b.preferred_date || b.created_at?.split('T')[0]}</p>
                      </div>
                      <div>
                        <span style={{ color: '#475569' }}>Time</span>
                        <p className="text-white mt-0.5">{b.preferred_time || '—'}</p>
                      </div>
                      <div>
                        <span style={{ color: '#475569' }}>Service</span>
                        <p style={{ color: '#94a3b8' }} className="mt-0.5">{b.service}</p>
                      </div>
                      <div>
                        <span style={{ color: '#475569' }}>Location</span>
                        <p style={{ color: '#94a3b8' }} className="mt-0.5">{b.suburb}</p>
                      </div>
                      <div>
                        <span style={{ color: '#475569' }}>Type</span>
                        <p style={{ color: '#64748b' }} className="mt-0.5">{b.support_type}</p>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 flex-shrink-0">
                      <Badge status={b.status} />
                      <div className="flex items-center gap-2">
                        {b.phone && (
                          <a href={`tel:${b.phone}`} className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: 'rgba(22,163,74,0.12)', color: '#4ade80', border: '1px solid rgba(22,163,74,0.2)' }}>
                            <FaPhone className="text-xs" />
                          </a>
                        )}
                        {b.email && (
                          <a href={`mailto:${b.email}`} className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ background: 'rgba(96,165,250,0.12)', color: '#60a5fa', border: '1px solid rgba(96,165,250,0.2)' }}>
                            <FaEnvelope className="text-xs" />
                          </a>
                        )}
                        {b.status !== 'Confirmed' && (
                          <button onClick={() => setConfirmingId(confirmingId === b.id ? null : b.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                            style={{ background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.25)', color: '#4ade80' }}>
                            <FaCheck /> Confirm
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {b.description && (
                    <p className="mt-3 text-xs px-3 py-2 rounded-lg" style={{ color: '#64748b', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      {b.description}
                    </p>
                  )}
                </div>
                {confirmingId === b.id && (
                  <ConfirmPanel
                    booking={b}
                    onConfirm={async (id, note) => { await onConfirmBooking(id, note); setConfirmingId(null) }}
                    onClose={() => setConfirmingId(null)}
                  />
                )}
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}

/* ── Enquiries Section ────────────────────────────────────────────── */
function EnquiriesSection({ enquiries, onStatusChange }) {
  const newCount = enquiries.filter(e => e.status === 'New').length
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FaInbox style={{ color: '#93c5fd' }} />
        <h2 className="text-xl font-extrabold text-white" style={{ fontFamily: 'var(--font-space)' }}>Enquiries</h2>
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: 'rgba(59,130,246,0.15)', color: '#93c5fd', border: '1px solid rgba(59,130,246,0.25)' }}>
          {newCount} new
        </span>
      </div>
      {enquiries.length === 0
        ? <Empty message="No enquiries yet." />
        : (
          <div className="space-y-4">
            {enquiries.map((e) => (
              <div key={e.id} className="rounded-2xl p-5"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${e.status === 'New' ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.07)'}` }}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-semibold text-white">{e.first_name} {e.last_name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      {e.email && <a href={`mailto:${e.email}`} className="text-xs hover:text-white transition-colors" style={{ color: '#94a3b8' }}>{e.email}</a>}
                      {e.phone && <a href={`tel:${e.phone}`} className="text-xs hover:text-green-400 transition-colors" style={{ color: '#94a3b8' }}>{e.phone}</a>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs" style={{ color: '#334155' }}>{e.created_at?.split('T')[0]}</span>
                    <Badge status={e.status} />
                    <select value={e.status} onChange={(ev) => onStatusChange('enquiries', e.id, ev.target.value)}
                      className="text-xs rounded-lg px-2 py-1 outline-none"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>
                      <option>New</option>
                      <option>Replied</option>
                    </select>
                  </div>
                </div>
                <p className="text-sm px-4 py-3 rounded-xl" style={{ color: '#94a3b8', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  "{e.message}"
                </p>
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}

/* ── Availability Section ─────────────────────────────────────────── */
function AvailabilitySection() {
  const [days, setDays] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/availability')
      .then(r => r.json())
      .then(data => { setDays(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const update = (dayName, field, value) => {
    setDays(ds => ds.map(d => d.day_of_week === dayName ? { ...d, [field]: value } : d))
    setSaved(false)
  }

  const save = async () => {
    setSaving(true)
    try {
      await fetch('/api/admin/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Password': ADMIN_PASSWORD },
        body: JSON.stringify(days),
      })
      setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-center py-12 text-sm" style={{ color: '#475569' }}>Loading...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaGear style={{ color: '#f59e0b' }} />
          <h2 className="text-xl font-extrabold text-white" style={{ fontFamily: 'var(--font-space)' }}>Availability</h2>
        </div>
        <button onClick={save} disabled={saving}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all"
          style={{
            background: saved ? 'rgba(22,163,74,0.15)' : 'linear-gradient(135deg, #7c3aed, #2563eb)',
            color: saved ? '#4ade80' : 'white',
            border: saved ? '1px solid rgba(22,163,74,0.3)' : 'none',
            opacity: saving ? 0.7 : 1,
          }}>
          {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-3">
        {days.map(day => (
          <div key={day.day_of_week} className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl p-4"
            style={{
              background: day.is_available ? 'rgba(22,163,74,0.05)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${day.is_available ? 'rgba(22,163,74,0.2)' : 'rgba(255,255,255,0.06)'}`,
            }}>

            {/* Day toggle */}
            <div className="flex items-center gap-3 w-36 flex-shrink-0">
              <button type="button"
                onClick={() => update(day.day_of_week, 'is_available', day.is_available ? 0 : 1)}
                className="relative w-11 h-6 rounded-full transition-all flex-shrink-0"
                style={{ background: day.is_available ? '#22c55e' : 'rgba(255,255,255,0.1)' }}>
                <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all shadow"
                  style={{ left: day.is_available ? '22px' : '2px' }} />
              </button>
              <span className="text-sm font-semibold" style={{ color: day.is_available ? '#4ade80' : '#475569' }}>
                {day.day_of_week}
              </span>
            </div>

            {/* Time range */}
            {day.is_available ? (
              <div className="flex items-center gap-3">
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#64748b' }}>Start</label>
                  <input type="time" value={day.start_time}
                    onChange={e => update(day.day_of_week, 'start_time', e.target.value)}
                    className="px-3 py-1.5 rounded-lg text-sm text-white outline-none"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }} />
                </div>
                <span className="text-sm mt-4" style={{ color: '#475569' }}>to</span>
                <div>
                  <label className="block text-xs mb-1" style={{ color: '#64748b' }}>End</label>
                  <input type="time" value={day.end_time}
                    onChange={e => update(day.day_of_week, 'end_time', e.target.value)}
                    className="px-3 py-1.5 rounded-lg text-sm text-white outline-none"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }} />
                </div>
              </div>
            ) : (
              <span className="text-sm" style={{ color: '#334155' }}>Day off — not bookable</span>
            )}
          </div>
        ))}
      </div>
      <p className="text-xs mt-4" style={{ color: '#334155' }}>Changes take effect immediately on the booking form.</p>
    </div>
  )
}

/* ── Stats Section ────────────────────────────────────────────────── */
function StatsSection({ bookings, enquiries, stats }) {
  const confirmed = bookings.filter(b => b.status === 'Confirmed').length
  const pending   = bookings.filter(b => b.status === 'Pending').length
  const newEnq    = enquiries.filter(e => e.status === 'New').length
  const replied   = enquiries.filter(e => e.status === 'Replied').length

  const items = [
    { label: 'Total Bookings',   value: stats.totalBookings ?? bookings.length, color: '#a78bfa' },
    { label: 'Today\'s Bookings',value: stats.todayBookings ?? 0,               color: '#f59e0b' },
    { label: 'Confirmed',        value: confirmed,                               color: '#4ade80' },
    { label: 'Pending',          value: pending,                                 color: '#fcd34d' },
    { label: 'Total Enquiries',  value: stats.totalEnquiries ?? enquiries.length, color: '#93c5fd' },
    { label: 'New Enquiries',    value: newEnq,                                  color: '#f87171' },
    { label: 'Replied',          value: replied,                                 color: '#94a3b8' },
  ]
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <FaChartBar style={{ color: '#a78bfa' }} />
        <h2 className="text-xl font-extrabold text-white" style={{ fontFamily: 'var(--font-space)' }}>Stats</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map(s => (
          <div key={s.label} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
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
  const [authed, setAuthed]        = useState(false)
  const [activeSection, setActive] = useState('today')
  const [sidebarOpen, setSidebar]  = useState(false)
  const [lastRefresh, setRefresh]  = useState('')

  const [bookings,  setBookings]  = useState([])
  const [enquiries, setEnquiries] = useState([])
  const [stats,     setStats]     = useState({})
  const [loading,   setLoading]   = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('xts_admin') === 'true') setAuthed(true)
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)
    const headers = { 'X-Admin-Password': ADMIN_PASSWORD }
    try {
      const [bRes, eRes, sRes] = await Promise.all([
        fetch('/api/admin/bookings',  { headers }),
        fetch('/api/admin/enquiries', { headers }),
        fetch('/api/admin/stats',     { headers }),
      ])
      if (bRes.ok) setBookings(await bRes.json())
      if (eRes.ok) setEnquiries(await eRes.json())
      if (sRes.ok) setStats(await sRes.json())
    } catch (err) {
      console.error('Failed to fetch admin data:', err)
    } finally {
      setLoading(false)
      setRefresh(new Date().toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' }))
    }
  }, [])

  useEffect(() => {
    if (authed) fetchData()
  }, [authed, fetchData])

  const login = () => {
    sessionStorage.setItem('xts_admin', 'true')
    setAuthed(true)
  }
  const logout = () => {
    sessionStorage.removeItem('xts_admin')
    setAuthed(false)
  }

  const handleStatusChange = async (type, id, status) => {
    const headers = { 'X-Admin-Password': ADMIN_PASSWORD, 'Content-Type': 'application/json' }
    await fetch(`/api/admin/${type}/${id}`, { method: 'PATCH', headers, body: JSON.stringify({ status }) })
    if (type === 'bookings') {
      setBookings(bs => bs.map(b => b.id === id ? { ...b, status } : b))
    } else {
      setEnquiries(es => es.map(e => e.id === id ? { ...e, status } : e))
    }
  }

  const handleConfirmBooking = async (id, note) => {
    const headers = { 'X-Admin-Password': ADMIN_PASSWORD, 'Content-Type': 'application/json' }
    await fetch(`/api/admin/bookings/${id}/confirm`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ note }),
    })
    setBookings(bs => bs.map(b => b.id === id ? { ...b, status: 'Confirmed' } : b))
  }

  if (!authed) return <LoginScreen onLogin={login} />

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0b0f1e', fontFamily: 'var(--font-inter)' }}>

      {/* Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-5 py-3 z-50"
        style={{ background: '#0f1425', borderBottom: '1px solid rgba(255,255,255,0.07)', height: 64 }}>
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebar(o => !o)}
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>
            <span className="text-lg">☰</span>
          </button>
          <Image src="/logo.png" alt="Xpert Tech Solutions" width={140} height={48} className="h-10 w-auto object-contain" />
          <div className="hidden sm:block w-px h-6" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <span className="hidden sm:block text-sm font-bold" style={{ color: '#94a3b8', fontFamily: 'var(--font-space)' }}>Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          {lastRefresh && <span className="hidden sm:block text-xs mr-2" style={{ color: '#334155' }}>Updated {lastRefresh}</span>}
          <button onClick={fetchData}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors hover:text-white"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', color: loading ? '#7c3aed' : '#64748b' }}>
            <FaRotateRight className={`text-xs ${loading ? 'animate-spin' : ''}`} />
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

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className={`flex-shrink-0 flex flex-col transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} fixed lg:static inset-y-0 left-0 top-16 z-40 lg:z-auto`}
          style={{ width: 220, background: '#0d1121', borderRight: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>
          <nav className="flex flex-col gap-1 px-3">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
              const active = activeSection === id
              return (
                <button key={id} onClick={() => { setActive(id); setSidebar(false) }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all w-full"
                  style={{
                    background: active ? 'rgba(124,58,237,0.15)' : 'transparent',
                    border: active ? '1px solid rgba(124,58,237,0.25)' : '1px solid transparent',
                    color: active ? '#c4b5fd' : '#475569',
                  }}>
                  <Icon className="text-sm flex-shrink-0" />
                  {label}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {activeSection === 'today'        && <TodaySection    bookings={bookings} enquiries={enquiries} stats={stats} onStatusChange={handleStatusChange} onConfirmBooking={handleConfirmBooking} />}
            {activeSection === 'week'         && <WeekSection     bookings={bookings} onStatusChange={handleStatusChange} onConfirmBooking={handleConfirmBooking} />}
            {activeSection === 'enquiries'    && <EnquiriesSection enquiries={enquiries} onStatusChange={handleStatusChange} />}
            {activeSection === 'availability' && <AvailabilitySection />}
            {activeSection === 'stats'        && <StatsSection    bookings={bookings} enquiries={enquiries} stats={stats} />}
          </div>
        </main>
      </div>
    </div>
  )
}
