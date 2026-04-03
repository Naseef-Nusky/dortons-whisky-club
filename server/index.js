import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import dns from 'node:dns'
import express from 'express'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

// Prefer IPv4 when resolving hostnames (many cloud VMs have no usable IPv6 route to Google SMTP).
dns.setDefaultResultOrder('ipv4first')

/** Force IPv4 for SMTP — avoids ENETUNREACH on smtp.gmail.com IPv6 (2a00:1450:...) on some hosts. */
function smtpLookupIPv4(hostname, _options, callback) {
  dns.lookup(hostname, { family: 4 }, callback)
}

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '.env') })

const app = express()
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ ok: true })
})

const escapeHtml = (unsafe = '') =>
  String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

function createMailer() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
    return null
  }

  // Corporate proxies / SSL inspection can inject a cert Node does not trust → "self-signed certificate in chain".
  // Dev-only escape hatch: set SMTP_TLS_INSECURE=true in server/.env (never in production).
  const tlsInsecure = process.env.SMTP_TLS_INSECURE === 'true' || process.env.SMTP_TLS_INSECURE === '1'
  if (tlsInsecure) {
    console.warn('[mail] SMTP_TLS_INSECURE is enabled — TLS certificate verification is disabled (dev/troubleshooting only).')
  }

  // Explicit host + port 587 (STARTTLS). `lookup` forces IPv4 so Gmail is reachable when IPv6 is down.
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    lookup: smtpLookupIPv4,
    connectionTimeout: 60_000,
    greetingTimeout: 30_000,
    socketTimeout: 60_000,
    auth: {
      user,
      pass,
    },
    tls: {
      minVersion: 'TLSv1.2',
      ...(tlsInsecure ? { rejectUnauthorized: false } : {}),
    },
  })
}

app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body || {}
    const fn = String(fullName ?? '').trim()
    const em = String(email ?? '').trim()
    const ph = String(phone ?? '').trim()
    const msg = String(message ?? '').trim()

    const mailTo = process.env.MAIL_TO || process.env.GMAIL_USER
    const transporter = createMailer()

    if (!transporter || !mailTo) {
      return res.status(500).json({ ok: false, error: 'Gmail SMTP is not configured on the server.' })
    }

    const subject = `Whisky Cask Enquiry - ${fn}`
    const plainText = [
      `New enquiry received:`,
      ``,
      `Name: ${fn}`,
      `Email: ${em}`,
      `Phone: ${ph}`,
      ``,
      `Message:`,
      `${msg}`,
    ].join('\n')

    const safeFullName = escapeHtml(fn)
    const safeEmail = escapeHtml(em)
    const safePhone = escapeHtml(ph)
    const safeMessage = escapeHtml(msg)

    const html = `
      <p><strong>New enquiry received</strong></p>
      <ul>
        <li><strong>Name:</strong> ${safeFullName}</li>
        <li><strong>Email:</strong> ${safeEmail}</li>
        <li><strong>Phone:</strong> ${safePhone}</li>
      </ul>
      <p><strong>Message:</strong><br/>${safeMessage}</p>
    `

    await transporter.sendMail({
      from: `"Dortons Whisky Club" <${process.env.GMAIL_USER}>`,
      to: mailTo,
      ...(em ? { replyTo: em } : {}),
      subject,
      text: plainText,
      html,
    })

    return res.json({ ok: true })
  } catch (err) {
    console.error('Gmail SMTP error:', err)
    return res.status(500).json({ ok: false, error: 'Failed to send email.' })
  }
})

const distPath = join(__dirname, '../dist')
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distPath))
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next()
    if (req.path.startsWith('/api')) return next()
    res.sendFile(join(distPath, 'index.html'), (err) => {
      if (err) next(err)
    })
  })
}

const port = process.env.PORT || 3001
app.listen(port, () => {
  const mode = process.env.NODE_ENV === 'production' ? 'production (API + static)' : 'dev API'
  console.log(`Server (${mode}) on http://localhost:${port}`)
})
