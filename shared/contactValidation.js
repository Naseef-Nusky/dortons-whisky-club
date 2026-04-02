/**
 * Contact form rules: all fields required, simple checks.
 * Used by the React app and the Express `/api/contact` handler.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContactPayload(raw) {
  const errors = {}

  const fullName = String(raw?.fullName ?? '').trim()
  const email = String(raw?.email ?? '').trim().toLowerCase()
  const phone = String(raw?.phone ?? '').trim()
  const message = String(raw?.message ?? '').trim()

  if (!fullName) {
    errors.fullName = 'This field is required.'
  } else if (fullName.length > 120) {
    errors.fullName = 'Name is too long.'
  }

  if (!email) {
    errors.email = 'This field is required.'
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'Enter a valid email.'
  } else if (email.length > 254) {
    errors.email = 'Email is too long.'
  }

  const digitsOnly = phone.replace(/\D/g, '')
  if (!phone) {
    errors.phone = 'This field is required.'
  } else if (digitsOnly.length < 7) {
    errors.phone = 'Enter a valid phone number.'
  } else if (digitsOnly.length > 15) {
    errors.phone = 'Phone number is too long.'
  }

  if (!message) {
    errors.message = 'This field is required.'
  } else if (message.length > 5000) {
    errors.message = 'Message is too long (max 5000 characters).'
  }

  const ok = Object.keys(errors).length === 0
  return {
    ok,
    errors,
    values: { fullName, email, phone, message },
  }
}
