import { useState } from 'react'
import { Link } from 'react-router-dom'
import getInTouchImage from '../assets/getintouch.jpg'
import scotchImage from '../assets/Scotch.PNG'
import { validateContactPayload } from '../utils/contactFormValidation.js'

const faqs = [
  {
    q: 'Q1: Why choose Dortons Whisky Club?',
    a: [
      'Dortons Whisky Club offers a professional and personalised service that clients can rely on at every stage. Our main goal is to help clients understand the cask whisky market by sharing our expertise, insights, and data-driven analysis.',
      'We focus on building long-term relationships with our clients. Using reliable independent market data, we guide clients through selecting and purchasing casks, helping them build well-balanced, diverse portfolios that are both attractive and potentially profitable.',
    ],
  },
  {
    q: 'Q2: How do I decide which whisky to invest in?',
    a: [
      'As a client, you benefit from our industry knowledge, market experience, and network of trusted suppliers.',
      'With detailed independent analysis, we help you choose the most suitable whisky and casks based on your personal goals. We also recommend selecting casks from different distilleries to create a balanced and diversified portfolio.',
    ],
  },
  {
    q: 'Q3: What returns can I expect?',
    a: [
      'Independent and well-recognised sources suggest that the cask whisky market has delivered average returns of around 12-20% over the past decade.',
      'Reports such as the Knight Frank Wealth Report also highlight cask whisky as a top-performing asset, showing growth of up to 560% over the same period. However, returns may vary depending on market conditions.',
    ],
  },
  {
    q: 'Q4: Are there any additional costs?',
    a: [
      'There are no additional costs when investing with Dortons Whisky Club, as we cover storage and insurance for your cask(s).',
      'Extra charges may only apply if you request services such as regauging, re-racking, or sampling your cask.',
    ],
  },
  {
    q: 'Q5: What is the purchasing process?',
    a: [
      'One of our consultants will contact you to understand your knowledge of the market and your investment goals. This ensures our recommendations match your overall strategy.',
      'If you decide to proceed, we will help you select a suitable cask whisky with strong potential and steady demand. We may present a few options and check availability with our trade suppliers.',
      'Once confirmed, we will issue a Proforma Invoice via DocuSign. This will include full details such as the whisky brand, cask type, volume (OLA - Original Litres of Alcohol), strength (ABV - Alcohol by Volume), and the agreed purchase price.',
    ],
  },
]

function ContactPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const [submitStatus, setSubmitStatus] = useState('idle') // 'idle' | 'sending' | 'sent'
  const [submitError, setSubmitError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})

  const inputClass = (field) =>
    `w-full rounded border bg-[#0b0b0b] px-3 py-2 text-slate-200 ${
      fieldErrors[field] ? 'border-red-500 focus:border-red-400 focus:ring-red-400/30' : 'border-[#6f5830]'
    }`

  const clearFieldError = (field) => {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleEnquirySubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    setSubmitError(null)
    setFieldErrors({})

    const formData = new FormData(form)
    const payload = {
      fullName: String(formData.get('fullName') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      message: String(formData.get('message') || ''),
    }

    const validation = validateContactPayload(payload)
    if (!validation.ok) {
      setFieldErrors(validation.errors)
      return
    }

    setSubmitStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.values),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        if (data.errors && typeof data.errors === 'object') {
          setFieldErrors(data.errors)
        }
        setSubmitStatus('idle')
        setSubmitError(data.error || 'Sorry—your message could not be sent. Please try again.')
        return
      }

      form.reset()
      setSubmitStatus('sent')
      setTimeout(() => setSubmitStatus('idle'), 4000)
    } catch (err) {
      console.error(err)
      setSubmitStatus('idle')
      setSubmitError('Sorry—your message could not be sent. Please try again.')
    }
  }

  return (
    <main>
      <section className="relative border-b border-[#b79552]/30">
        <img src={getInTouchImage} alt="Get in touch hero" className="h-[440px] w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-black/42"></div>
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col items-center justify-center px-6 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-[#d8bc79]">Contact Us Today</p>
          <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">Get In Touch</h1>
        </div>
      </section>

      <section className="border-b border-[#b79552]/30 bg-[#0d0b0b] py-8">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 text-center md:grid-cols-3">
          <article className="text-slate-300">
            <div className="mx-auto mb-2 grid h-9 w-9 place-items-center rounded-full border border-[#b79552]/60 text-[#d8bc79]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.8 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6.3 6.3l1.3-1.3a2 2 0 0 1 2.1-.5c.8.4 1.7.7 2.6.8A2 2 0 0 1 22 16.9z" />
              </svg>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#d8bc79]">Phone Number</p>
            <p className="mt-2 text-sm">+44 7787 081 537</p>
          </article>
          <article className="text-slate-300">
            <div className="mx-auto mb-2 grid h-9 w-9 place-items-center rounded-full border border-[#b79552]/60 text-[#d8bc79]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#d8bc79]">Office Location</p>
            <p className="mt-2 text-sm">St Albans, Hertfordshire, UK</p>
          </article>
          <article className="text-slate-300">
            <div className="mx-auto mb-2 grid h-9 w-9 place-items-center rounded-full border border-[#b79552]/60 text-[#d8bc79]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 8 9 6 9-6" />
              </svg>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#d8bc79]">Email Address</p>
            <p className="mt-2 text-sm">info@dortonswhiskyclub.com</p>
          </article>
        </div>
      </section>

      <section className="bg-[#efefef] py-14">
        <div className="mx-auto grid max-w-6xl items-start gap-8 px-6 md:grid-cols-[1fr_1fr]">
          <article className="p-2 text-[#171111]">
            <h2 className="text-3xl font-semibold">Send Us a Message</h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Our team is ready to support your investment goals. Reach out today and speak with a specialist about suitable whisky cask opportunities.
            </p>
            <div className="mt-5 space-y-3 text-sm text-slate-700">
              <p className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#9f8a5f]" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.8 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6.3 6.3l1.3-1.3a2 2 0 0 1 2.1-.5c.8.4 1.7.7 2.6.8A2 2 0 0 1 22 16.9z" />
                </svg>
                +44 7787 081 537
              </p>
              <p className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#9f8a5f]" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 8 9 6 9-6" />
                </svg>
                info@dortonswhiskyclub.com
              </p>
              <p className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#9f8a5f]" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                Trident House, 54-56 Victoria St, St Albans AL1 3HZ
              </p>
            </div>
          </article>

          <article className="border border-black/20 bg-[#111111] p-6">
            <h2 className="text-2xl font-semibold text-white">Fill Out Our Enquiry Form</h2>
            <p className="mt-2 text-xs text-slate-500">All fields are required. We validate in your browser before sending.</p>
            <form className="mt-5 space-y-3" onSubmit={handleEnquirySubmit} noValidate>
              <div>
                <label htmlFor="contact-fullName" className="mb-1 block text-sm text-slate-400">
                  Full name <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-fullName"
                  name="fullName"
                  autoComplete="name"
                  maxLength={120}
                  aria-required="true"
                  aria-invalid={fieldErrors.fullName ? 'true' : 'false'}
                  aria-describedby={fieldErrors.fullName ? 'err-fullName' : undefined}
                  onChange={() => clearFieldError('fullName')}
                  className={inputClass('fullName')}
                  placeholder="Full name"
                />
                {fieldErrors.fullName && (
                  <p id="err-fullName" className="mt-1 text-xs text-red-400">
                    {fieldErrors.fullName}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1 block text-sm text-slate-400">
                  Email address <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  maxLength={254}
                  aria-required="true"
                  aria-invalid={fieldErrors.email ? 'true' : 'false'}
                  aria-describedby={fieldErrors.email ? 'err-email' : undefined}
                  onChange={() => clearFieldError('email')}
                  className={inputClass('email')}
                  placeholder="Email address"
                />
                {fieldErrors.email && (
                  <p id="err-email" className="mt-1 text-xs text-red-400">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-phone" className="mb-1 block text-sm text-slate-400">
                  Phone number <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  aria-required="true"
                  aria-invalid={fieldErrors.phone ? 'true' : 'false'}
                  aria-describedby={fieldErrors.phone ? 'err-phone' : undefined}
                  onChange={() => clearFieldError('phone')}
                  className={inputClass('phone')}
                  placeholder="e.g. +44 7787 081 537"
                />
                {fieldErrors.phone && (
                  <p id="err-phone" className="mt-1 text-xs text-red-400">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-1 block text-sm text-slate-400">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  maxLength={5000}
                  aria-required="true"
                  aria-invalid={fieldErrors.message ? 'true' : 'false'}
                  aria-describedby={fieldErrors.message ? 'err-message' : undefined}
                  onChange={() => clearFieldError('message')}
                  className={`${inputClass('message')} min-h-[6rem]`}
                  placeholder="How can we help you?"
                />
                {fieldErrors.message && (
                  <p id="err-message" className="mt-1 text-xs text-red-400">
                    {fieldErrors.message}
                  </p>
                )}
              </div>
              <button
                disabled={submitStatus === 'sending'}
                type="submit"
                className="w-full rounded bg-[#b79552] px-4 py-2 font-semibold text-black transition hover:bg-[#c7a964] disabled:opacity-70"
              >
                {submitStatus === 'sending' ? 'Sending...' : submitStatus === 'sent' ? 'Sent' : 'Submit'}
              </button>

              {submitError && <p className="text-sm text-red-300">{submitError}</p>}
              {submitStatus === 'sent' && <p className="text-sm text-[#d8bc79]">Thanks! We'll get back to you shortly.</p>}
            </form>
          </article>
        </div>
      </section>

      <section className="bg-[#f3f3f3] py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1fr_1fr]">
          <img src={scotchImage} alt="Contact specialist" className="h-[320px] w-full object-cover" />
          <article className="self-center">
            <h2 className="text-3xl font-semibold text-[#171111]">Get in touch with Dortons Whisky Club</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              We offer clear and practical support for first-time and experienced investors. Our team can help you choose casks that fit your strategy and long-term plans.
            </p>
            <div className="mt-4 space-y-2 text-sm text-slate-700">
              <p className="flex items-center gap-2 rounded border border-[#d3c7a6] bg-white px-3 py-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#9f8a5f]" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2 4 6v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V6l-8-4z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Expert market guidance for cask selection
              </p>
              <p className="flex items-center gap-2 rounded border border-[#d3c7a6] bg-white px-3 py-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#9f8a5f]" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 12h18" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
                Structured support from enquiry to portfolio growth
              </p>
              <p className="flex items-center gap-2 rounded border border-[#d3c7a6] bg-white px-3 py-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#9f8a5f]" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Transparent process with reliable communication
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <article>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-[#171111]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-2">
            {faqs.map((item, index) => (
              <article
                key={item.q}
                className={`border ${openFaqIndex === index ? 'border-[#b79552] bg-[#b79552] text-white' : 'border-black/10 bg-[#ececec] text-[#171111]'}`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex((prev) => (prev === index ? -1 : index))}
                  className="flex w-full items-center justify-between px-4 py-3 text-left"
                >
                  <h3 className="font-semibold">{item.q}</h3>
                  <span className="text-xl leading-none">{openFaqIndex === index ? '⌃' : '⌄'}</span>
                </button>
                {openFaqIndex === index && (
                  <div className="px-4 pb-4">
                    {item.a.map((paragraph) => (
                      <p key={paragraph} className="mt-2 text-sm text-white/95">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="border-y border-[#b79552]/30 bg-[#070505] py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
          <p className="max-w-3xl text-xl leading-tight text-white md:text-3xl">
            Speak with Dortons Whisky Club today
            <span className="mt-2 block text-lg italic text-slate-200 md:text-xl">and take your first step into whisky investing.</span>
          </p>
          <Link
            to="/contact"
            className="inline-block whitespace-nowrap rounded-sm bg-[#b79552] px-5 py-2.5 text-xs font-semibold text-black transition hover:bg-[#c7a964]"
          >
            Book a call with our team
          </Link>
        </div>
      </section>

    </main>
  )
}

export default ContactPage
