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

async function sendEmail(env, to, subject, text) {
  if (!env.RESEND_API_KEY) return
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Xpert Tech Solutions <onboarding@resend.dev>',
        to: [to],
        subject,
        text,
      }),
    })
  } catch (e) {
    console.error('Email failed:', e)
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

        // Notify admin
        await sendEmail(env, NOTIFICATION_EMAIL,
          `New Booking — ${d.firstName} ${d.lastName}`,
          `New booking received:\n\nName: ${d.firstName} ${d.lastName}\nPhone: ${d.phone}\nEmail: ${d.email}\nAddress: ${d.address}, ${d.suburb}\nService: ${d.service}\nDate: ${d.preferredDate}\nTime: ${d.preferredTime}\nType: ${d.supportType}\nNotes: ${d.description || 'None'}`
        )

        // Confirm receipt to customer
        await sendEmail(env, d.email,
          'Booking Request Received — Xpert Tech Solutions',
          `Hi ${d.firstName},\n\nThank you for booking with Xpert Tech Solutions!\n\nWe've received your request for:\n  Service: ${d.service}\n  Date: ${d.preferredDate}\n  Time: ${d.preferredTime}\n  Address: ${d.address}, ${d.suburb}\n\nOne of our team will call you within the hour to confirm your appointment and provide a quote.\n\nIf you need to reach us in the meantime, call us on 0424 424 444.\n\nWe look forward to helping you!\n\nXpert Tech Solutions\nPhone: 0424 424 444\nxperttechsolutions.com.au`
        )

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

        // Notify admin
        await sendEmail(env, NOTIFICATION_EMAIL,
          `New Enquiry — ${d.firstName} ${d.lastName}`,
          `New enquiry received:\n\nName: ${d.firstName} ${d.lastName}\nPhone: ${d.phone}\nEmail: ${d.email}\nMessage: ${d.message}`
        )

        // Confirm receipt to customer
        await sendEmail(env, d.email,
          'We\'ve Received Your Enquiry — Xpert Tech Solutions',
          `Hi ${d.firstName},\n\nThank you for getting in touch with Xpert Tech Solutions!\n\nWe've received your message and will get back to you as soon as possible.\n\nIf you need to speak with someone urgently, call us on 0424 424 444. We're available Monday to Sunday, 7am–9pm.\n\nXpert Tech Solutions\nPhone: 0424 424 444\nxperttechsolutions.com.au`
        )

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

    // ── POST /api/admin/bookings/:id/confirm ────────────────────
    // Confirms a booking and emails the customer
    if (/^\/api\/admin\/bookings\/\d+\/confirm$/.test(url.pathname) && request.method === 'POST') {
      if (!checkAdmin(request)) return json({ error: 'Unauthorized' }, 401)
      const id = url.pathname.split('/')[4]
      const { note } = await request.json()

      // Update status
      await env.DB.prepare('UPDATE bookings SET status = ? WHERE id = ?').bind('Confirmed', id).run()

      // Fetch booking to get customer details
      const booking = await env.DB.prepare('SELECT * FROM bookings WHERE id = ?').bind(id).first()

      if (booking && booking.email) {
        const noteText = note && note.trim()
          ? `\n\nMessage from our team:\n${note.trim()}`
          : ''

        await sendEmail(env, booking.email,
          'Your Booking is Confirmed — Xpert Tech Solutions',
          `Hi ${booking.first_name},\n\nGreat news! Your booking with Xpert Tech Solutions has been confirmed.\n\nBooking details:\n  Service: ${booking.service}\n  Date: ${booking.preferred_date}\n  Time: ${booking.preferred_time}\n  Address: ${booking.address}, ${booking.suburb}${noteText}\n\nIf you need to reschedule or have any questions, please call us on 0424 424 444.\n\nWe look forward to seeing you!\n\nXpert Tech Solutions\nPhone: 0424 424 444\nxperttechsolutions.com.au`
        )
      }

      return json({ ok: true })
    }

    // ── POST /api/admin/bookings/:id/suggest-time ───────────────
    // Emails customer a proposed new time with a "Book this time" button
    if (/^\/api\/admin\/bookings\/\d+\/suggest-time$/.test(url.pathname) && request.method === 'POST') {
      if (!checkAdmin(request)) return json({ error: 'Unauthorized' }, 401)
      const { email, firstName, service, newDate, newTime, note } = await request.json()

      const noteText = note && note.trim() ? `\n\n${note.trim()}\n` : ''
      const bookingLink = 'https://xperttechsolutions.com.au/booking'

      await sendEmail(env, email,
        'Appointment Reschedule Request — Xpert Tech Solutions',
        `Hi ${firstName},\n\nThank you for your booking with Xpert Tech Solutions.\n\nUnfortunately we are unable to accommodate your original time for ${service}. We'd like to suggest the following alternative:\n\n  Proposed Date: ${newDate}\n  Proposed Time: ${newTime}\n${noteText}\nIf this new time works for you, please click the link below to re-submit your booking with the updated details:\n\n  Book Now: ${bookingLink}\n\nIf you have any questions or need a different time, please call us on 0424 424 444.\n\nWe apologise for any inconvenience and look forward to helping you.\n\nXpert Tech Solutions\nPhone: 0424 424 444\nxperttechsolutions.com.au`
      )

      return json({ ok: true })
    }

    // ── PATCH /api/admin/bookings/:id ───────────────────────────
    if (/^\/api\/admin\/bookings\/\d+$/.test(url.pathname) && request.method === 'PATCH') {
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
