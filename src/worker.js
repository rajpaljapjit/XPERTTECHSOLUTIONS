const ADMIN_PASSWORD = 'Jamie2727**'
const NOTIFICATION_EMAIL = 'rajpaljapjit@gmail.com'

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

async function sendEmailNotification(env, subject, data) {
  if (!env.RESEND_API_KEY) return
  try {
    const text = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n')
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'XTS Bookings <onboarding@resend.dev>',
        to: [NOTIFICATION_EMAIL],
        subject,
        text,
      }),
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

        await sendEmailNotification(env, `New Booking — ${d.firstName} ${d.lastName}`, {
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

        await sendEmailNotification(env, `New Enquiry — ${d.firstName} ${d.lastName}`, {
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

    // ── GET /api/availability (public) ──────────────────────────
    if (url.pathname === '/api/availability' && request.method === 'GET') {
      const { results } = await env.DB.prepare(
        'SELECT * FROM availability ORDER BY CASE day_of_week WHEN "Monday" THEN 1 WHEN "Tuesday" THEN 2 WHEN "Wednesday" THEN 3 WHEN "Thursday" THEN 4 WHEN "Friday" THEN 5 WHEN "Saturday" THEN 6 WHEN "Sunday" THEN 7 END'
      ).all()
      return json(results)
    }

    // ── POST /api/admin/availability ────────────────────────────
    if (url.pathname === '/api/admin/availability' && request.method === 'POST') {
      if (!checkAdmin(request)) return json({ error: 'Unauthorized' }, 401)
      const days = await request.json()
      for (const day of days) {
        await env.DB.prepare(
          'UPDATE availability SET is_available = ?, start_time = ?, end_time = ? WHERE day_of_week = ?'
        ).bind(day.is_available ? 1 : 0, day.start_time, day.end_time, day.day_of_week).run()
      }
      return json({ ok: true })
    }

    // ── Static assets ───────────────────────────────────────────
    return env.ASSETS.fetch(request)
  },
}
