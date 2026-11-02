const ADMIN_PASSWORD = 'Jamie2727**'
const NOTIFICATION_EMAIL = 'xperttechsolutions@mail.com'
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mkjopbdb'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Password',
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function checkAdmin(request) {
  return request.headers.get('X-Admin-Password') === ADMIN_PASSWORD
}

async function sendEmailNotification(subject, data) {
  try {
    await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: subject, ...data }),
    })
  } catch (e) {
    console.error('Email notification failed:', e)
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    // ── POST /api/book ──────────────────────────────────────────
    if (url.pathname === '/api/book' && request.method === 'POST') {
      try {
        const d = await request.json()
        await env.DB.prepare(`
          INSERT INTO bookings (first_name, last_name, phone, email, address, suburb, service, preferred_date, preferred_time, support_type, description)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          d.firstName, d.lastName, d.phone, d.email,
          d.address || '', d.suburb || '', d.service || '',
          d.preferredDate || '', d.preferredTime || '',
          d.supportType || 'home', d.description || ''
        ).run()

        await sendEmailNotification(`New Booking — ${d.firstName} ${d.lastName}`, {
          name: `${d.firstName} ${d.lastName}`,
          phone: d.phone,
          email: d.email,
          address: `${d.address}, ${d.suburb}`,
          service: d.service,
          preferred_date: d.preferredDate,
          preferred_time: d.preferredTime,
          type: d.supportType,
          notes: d.description || 'None',
        })

        return json({ ok: true })
      } catch (err) {
        return json({ error: err.message }, 500)
      }
    }

    // ── POST /api/enquire ───────────────────────────────────────
    if (url.pathname === '/api/enquire' && request.method === 'POST') {
      try {
        const d = await request.json()
        await env.DB.prepare(`
          INSERT INTO enquiries (first_name, last_name, phone, email, message)
          VALUES (?, ?, ?, ?, ?)
        `).bind(d.firstName, d.lastName, d.phone, d.email, d.message || '').run()

        await sendEmailNotification(`New Enquiry — ${d.firstName} ${d.lastName}`, {
          name: `${d.firstName} ${d.lastName}`,
          phone: d.phone,
          email: d.email,
          message: d.message,
        })

        return json({ ok: true })
      } catch (err) {
        return json({ error: err.message }, 500)
      }
    }

    // ── GET /api/admin/bookings ─────────────────────────────────
    if (url.pathname === '/api/admin/bookings' && request.method === 'GET') {
      if (!checkAdmin(request)) return json({ error: 'Unauthorized' }, 401)
      const { results } = await env.DB.prepare(
        'SELECT * FROM bookings ORDER BY created_at DESC LIMIT 200'
      ).all()
      return json(results)
    }

    // ── GET /api/admin/enquiries ────────────────────────────────
    if (url.pathname === '/api/admin/enquiries' && request.method === 'GET') {
      if (!checkAdmin(request)) return json({ error: 'Unauthorized' }, 401)
      const { results } = await env.DB.prepare(
        'SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 200'
      ).all()
      return json(results)
    }

    // ── GET /api/admin/stats ────────────────────────────────────
    if (url.pathname === '/api/admin/stats' && request.method === 'GET') {
      if (!checkAdmin(request)) return json({ error: 'Unauthorized' }, 401)
      const today = new Date().toISOString().split('T')[0]
      const [total, todayCount, pending, enquiries] = await Promise.all([
        env.DB.prepare('SELECT COUNT(*) as c FROM bookings').first(),
        env.DB.prepare("SELECT COUNT(*) as c FROM bookings WHERE date(created_at) = ?").bind(today).first(),
        env.DB.prepare("SELECT COUNT(*) as c FROM bookings WHERE status = 'Pending'").first(),
        env.DB.prepare('SELECT COUNT(*) as c FROM enquiries').first(),
      ])
      return json({
        totalBookings: total.c,
        todayBookings: todayCount.c,
        pendingBookings: pending.c,
        totalEnquiries: enquiries.c,
      })
    }

    // ── PATCH /api/admin/bookings/:id ───────────────────────────
    if (url.pathname.startsWith('/api/admin/bookings/') && request.method === 'PATCH') {
      if (!checkAdmin(request)) return json({ error: 'Unauthorized' }, 401)
      const id = url.pathname.split('/').pop()
      const { status } = await request.json()
      await env.DB.prepare('UPDATE bookings SET status = ? WHERE id = ?').bind(status, id).run()
      return json({ ok: true })
    }

    // ── PATCH /api/admin/enquiries/:id ──────────────────────────
    if (url.pathname.startsWith('/api/admin/enquiries/') && request.method === 'PATCH') {
      if (!checkAdmin(request)) return json({ error: 'Unauthorized' }, 401)
      const id = url.pathname.split('/').pop()
      const { status } = await request.json()
      await env.DB.prepare('UPDATE enquiries SET status = ? WHERE id = ?').bind(status, id).run()
      return json({ ok: true })
    }

    // ── Static assets ───────────────────────────────────────────
    return env.ASSETS.fetch(request)
  },
}
