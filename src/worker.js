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

async function sendEmail(env, to, subject, text, html) {
  if (!env.RESEND_API_KEY) return
  try {
    const body = {
      from: 'Xpert Tech Solutions <onboarding@resend.dev>',
      to: [to],
      subject,
      text,
    }
    if (html) body.html = html
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  } catch (e) {
    console.error('Email failed:', e)
  }
}

function rescheduleEmailHtml({ firstName, service, newDate, newTime, noteText, rescheduleLink }) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0b0f1e;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b0f1e;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#4c1d95,#1e3a8a);border-radius:16px 16px 0 0;padding:32px 36px;text-align:center;">
          <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#c4b5fd;">Xpert Tech Solutions</p>
          <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;">Appointment Reschedule</h1>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#111827;padding:32px 36px;">
          <p style="margin:0 0 16px;font-size:16px;color:#e2e8f0;">Hi <strong>${firstName}</strong>,</p>
          <p style="margin:0 0 20px;font-size:14px;color:#94a3b8;line-height:1.7;">
            Thank you for your booking with Xpert Tech Solutions. Unfortunately we are unable to accommodate your original appointment time for <strong style="color:#e2e8f0;">${service}</strong>.
          </p>
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#7c3aed;">We suggest:</p>

          <!-- Suggested time box -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td width="50%" style="padding:16px;background:#1e1b4b;border-radius:12px 0 0 12px;border:1px solid rgba(124,58,237,0.3);border-right:none;">
                <p style="margin:0 0 4px;font-size:11px;color:#7c3aed;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Date</p>
                <p style="margin:0;font-size:18px;font-weight:800;color:#ffffff;">${newDate}</p>
              </td>
              <td width="50%" style="padding:16px;background:#1e1b4b;border-radius:0 12px 12px 0;border:1px solid rgba(124,58,237,0.3);border-left:1px solid rgba(124,58,237,0.15);">
                <p style="margin:0 0 4px;font-size:11px;color:#7c3aed;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Time</p>
                <p style="margin:0;font-size:18px;font-weight:800;color:#ffffff;">${newTime}</p>
              </td>
            </tr>
          </table>

          ${noteText ? `<p style="margin:0 0 24px;font-size:14px;color:#94a3b8;line-height:1.7;padding:14px 16px;background:rgba(255,255,255,0.04);border-left:3px solid #7c3aed;border-radius:0 8px 8px 0;">${noteText}</p>` : ''}

          <p style="margin:0 0 24px;font-size:14px;color:#94a3b8;line-height:1.7;">
            Your details are already saved — just click the button below to confirm this new time, or choose a different one.
          </p>

          <!-- CTA Button -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            <tr><td align="center">
              <a href="${rescheduleLink}"
                style="display:inline-block;padding:16px 40px;background:linear-gradient(135deg,#7c3aed,#2563eb);color:#ffffff;text-decoration:none;font-size:16px;font-weight:800;border-radius:12px;letter-spacing:0.3px;">
                ✓ &nbsp; Confirm My New Appointment
              </a>
            </td></tr>
          </table>

          <p style="margin:0;font-size:13px;color:#475569;text-align:center;">
            If this time doesn't suit you, the page also lets you choose a different time.<br>
            Or call us: <a href="tel:0424424444" style="color:#7c3aed;text-decoration:none;">0424 424 444</a>
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0d1121;border-radius:0 0 16px 16px;padding:20px 36px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;font-size:12px;color:#334155;">Xpert Tech Solutions &nbsp;·&nbsp; 0424 424 444 &nbsp;·&nbsp; xperttechsolutions.com.au</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
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
      const id = url.pathname.split('/')[4]
      const { newDate, newTime, note } = await request.json()

      // Fetch the original booking so we can pre-fill the reschedule page
      const b = await env.DB.prepare('SELECT * FROM bookings WHERE id = ?').bind(id).first()
      if (!b) return json({ error: 'Booking not found' }, 404)

      // Build a pre-filled reschedule URL — customer only needs to confirm date/time
      const params = new URLSearchParams({
        fn: b.first_name,
        ln: b.last_name,
        ph: b.phone,
        em: b.email,
        ad: b.address,
        sb: b.suburb,
        sv: b.service,
        st: b.support_type,
        desc: b.description || '',
        date: newDate,
        time: newTime,
      })
      const rescheduleLink = `https://xperttechsolutions.com.au/reschedule?${params.toString()}`

      const noteText = note && note.trim() ? note.trim() : ''

      const plainText = `Hi ${b.first_name},\n\nWe'd like to reschedule your appointment for ${b.service}.\n\nSuggested Date: ${newDate}\nSuggested Time: ${newTime}\n${noteText ? `\n${noteText}\n` : ''}\nYour details are already saved. Click the link below to confirm:\n${rescheduleLink}\n\nOr call us: 0424 424 444\n\nXpert Tech Solutions`

      const html = rescheduleEmailHtml({
        firstName: b.first_name,
        service: b.service,
        newDate,
        newTime,
        noteText,
        rescheduleLink,
      })

      await sendEmail(env, b.email,
        'We\'d Like to Reschedule Your Appointment — Xpert Tech Solutions',
        plainText,
        html
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
