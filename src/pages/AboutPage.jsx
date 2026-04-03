import irishImage from '../assets/Irish.PNG'
import investWhiskyImage from '../assets/invest whisky.PNG'
import scotchImage from '../assets/Scotch.PNG'
import brochurePdf from '../assets/Dortons Whisky Club Brochure.pdf'
import { Link } from 'react-router-dom'

function AboutPage() {
  return (
    <main>
      <section className="relative border-b border-[#b79552]/30">
        <img src={irishImage} alt="About hero background" className="h-[520px] w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col items-center justify-center px-6 text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-[#d8bc79]">About Dortons Whisky Club</p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">Dortons Whisky Club</h1>
          <p className="mt-3 text-sm text-slate-200">Known for transparent advice and dependable investor support</p>
        </div>
      </section>

      <section className="border-b border-[#b79552]/30 bg-[#0d0b0b] py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1fr_1.1fr] md:items-center">
          <article>
            <p className="text-xs uppercase tracking-[0.25em] text-[#d8bc79]">About Dortons Whisky Club</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">London&apos;s Independent Whisky Agency</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              At Dortons Whisky Club, investing in whisky goes beyond buying a product. We help clients secure premium casks from established distilleries in Scotland and Ireland.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Our specialists combine industry insight with practical guidance, helping you create a tangible portfolio with confidence and a long-term view.
            </p>
          </article>
          <img src={investWhiskyImage} alt="Whisky glass and cask" className="h-[340px] w-full bg-[#0d0b0b] object-contain md:h-[420px]" />
        </div>
      </section>

      <section className="bg-[#0d0b0b] py-12">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[#d8bc79]">Global Investment</p>
          <h3 className="mt-2 text-3xl font-semibold text-white">What Sets Us Apart</h3>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="border border-[#b79552]/30 bg-[#151010] p-5">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-full border border-[#b79552]/60 text-[#d8bc79]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 2 4 6v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V6l-8-4z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h4 className="font-semibold text-[#d8bc79]">A Client-First Approach</h4>
              <p className="mt-2 text-sm text-slate-300">Each recommendation is tailored to your goals, available capital, and time horizon.</p>
            </article>
            <article className="border border-[#b79552]/30 bg-[#151010] p-5">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-sm border border-[#b79552]/60 text-[#d8bc79]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 11.2 19a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.8 2.6a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6.3 6.3l1.3-1.3a2 2 0 0 1 2.1-.5c.8.4 1.7.7 2.6.8A2 2 0 0 1 22 16.9z" />
                </svg>
              </div>
              <h4 className="font-semibold text-[#d8bc79]">Reliable Support</h4>
              <p className="mt-2 text-sm text-slate-300">We support you through cask sourcing, ownership paperwork, and portfolio strategy.</p>
            </article>
            <article className="border border-[#b79552]/30 bg-[#151010] p-5">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-sm border border-[#b79552]/60 text-[#d8bc79]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M3 7h18" />
                  <path d="M5 7v10h14V7" />
                  <path d="M9 7V5a3 3 0 0 1 6 0v2" />
                  <path d="m10 13 2 2 2-2" />
                </svg>
              </div>
              <h4 className="font-semibold text-[#d8bc79]">Trusted distillery networks</h4>
              <p className="mt-2 text-sm text-slate-300">Our network gives clients access to high-quality casks from trusted producers.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#efefef] py-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1.1fr_1fr] md:items-center">
          <img src={scotchImage} alt="Whisky tasting glasses" className="h-[300px] w-full object-cover" />
          <article className="bg-white p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#9f8a5f]">Global Investment</p>
            <h3 className="mt-2 text-3xl font-semibold text-[#171111]">Why whisky? Why now?</h3>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              Whisky casks offer physical asset ownership, increasing rarity, and a track record of strong long-term demand. As the spirit matures, casks typically become rarer and more desirable.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-700">
              For investors seeking alternatives to traditional markets, cask ownership can be a resilient, asset-backed way to diversify a portfolio.
            </p>
            <a href={brochurePdf} download="Dortons Whisky Club Brochure.pdf" className="mt-5 inline-block rounded-sm bg-[#b79552] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black hover:bg-[#c7a964]">
              Download Brochure
            </a>
          </article>
        </div>
      </section>

      <section className="border-y border-[#b79552]/30 bg-[#070505] py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
          <p className="max-w-3xl text-xl leading-tight text-white md:text-3xl">
            Connect with Dortons Whisky Club today
            <span className="mt-2 block text-lg italic text-slate-200 md:text-xl">to begin your whisky investment journey.</span>
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

export default AboutPage
