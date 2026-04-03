import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import dotenv from 'dotenv'
import sgMail from '@sendgrid/mail'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: join(__dirname, '.env') })

/** Trim and strip wrapping quotes — fixes common .env paste mistakes. */
function normalizeSendGridApiKey(raw) {
  if (raw == null || typeof raw !== 'string') return ''
  let s = raw.trim()
  if (
    (s.startsWith('"') && s.endsWith('"')) ||
    (s.startsWith("'") && s.endsWith("'"))
  ) {
    s = s.slice(1, -1).trim()
  }
  return s
}

const sendGridApiKey = normalizeSendGridApiKey(process.env.SENDGRID_API_KEY)

/** Real SendGrid keys start with `SG.` and are ~69 chars; placeholders like `true` or `your_key` fail with 401. */
function sendGridKeyLooksValid(key) {
  return typeof key === 'string' && key.startsWith('SG.') && key.length >= 40
}

const app = express()
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ ok: true })
})

const logMailEnvOnce = () => {
  const hasKey = Boolean(sendGridApiKey)
  const keyOk = sendGridKeyLooksValid(sendGridApiKey)
  const hasFrom = Boolean(process.env.SENDGRID_FROM_EMAIL?.trim())
  const hasTo = Boolean(
    process.env.MAIL_TO?.trim() || process.env.SENDGRID_FROM_EMAIL?.trim()
  )
  console.log(
    `[mail] env: SENDGRID_API_KEY=${hasKey} key_format_ok=${keyOk} SENDGRID_FROM_EMAIL=${hasFrom} MAIL_TO=${hasTo}`
  )
  if (hasKey && !keyOk) {
    console.error(
      '[mail] SENDGRID_API_KEY must be the full secret from SendGrid (starts with SG., ~69 chars). It cannot be "true", a placeholder, or truncated. Fix server/.env and restart.'
    )
  }
}

logMailEnvOnce()

if (sendGridKeyLooksValid(sendGridApiKey)) {
  sgMail.setApiKey(sendGridApiKey)
}

const escapeHtml = (unsafe = '') =>
  String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

/** Avoid invalid replyTo — SendGrid rejects the whole send if reply-to is malformed. */
function looksLikeEmail(s) {
  return typeof s === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim())
}

app.post('/api/contact', async (req, res) => {
  try {
    const { fullName, email, phone, message } = req.body || {}
    const fn = String(fullName ?? '').trim()
    const em = String(email ?? '').trim()
    const ph = String(phone ?? '').trim()
    const msg = String(message ?? '').trim()

    const fromEmail = process.env.SENDGRID_FROM_EMAIL?.trim()
    const mailTo = process.env.MAIL_TO?.trim() || fromEmail

    if (!sendGridKeyLooksValid(sendGridApiKey) || !fromEmail || !mailTo) {
      console.error(
        '[mail] missing or invalid SENDGRID_API_KEY, or missing SENDGRID_FROM_EMAIL / MAIL_TO in server/.env'
      )
      return res.status(500).json({ ok: false, error: 'Email is not configured on the server.' })
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

    const msgPayload = {
      to: mailTo,
      from: {
        email: fromEmail,
        name: 'Dortons Whisky Club',
      },
      subject,
      text: plainText,
      html,
    }
    if (em && looksLikeEmail(em)) {
      msgPayload.replyTo = { email: em.trim() }
    }

    await sgMail.send(msgPayload)

    return res.json({ ok: true })
  } catch (err) {
    const status = err?.response?.statusCode
    const body = err?.response?.body
    const code = err?.code || status
    const msg = err?.message || String(err)
    console.error('[mail] send failed:', code, body || msg)
    if (status === 401) {
      console.error(
        '[mail] SendGrid 401: invalid or revoked API key. Set SENDGRID_API_KEY in server/.env (https://app.sendgrid.com/settings/api_keys) and restart.'
      )
    } else if (status === 403) {
      console.error(
        '[mail] SendGrid 403: sender not allowed. Verify SENDGRID_FROM_EMAIL in SendGrid → Sender Authentication (single sender or domain DNS).'
      )
    } else if (status === 400) {
      console.error(
        '[mail] SendGrid 400: bad request — check MAIL_TO / from addresses and SendGrid activity log for details.'
      )
    }
    return res.status(503).json({ ok: false, error: 'Failed to send email.' })
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
