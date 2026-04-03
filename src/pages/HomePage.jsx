import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import brochurePdf from '../assets/Dortons Whisky Club Brochure.pdf'
import heroImage from '../assets/hero.png'
import balvenieImage from '../assets/balvenie.png'
import broraImage from '../assets/Brora.png'
import dalmoreImage from '../assets/dalmore.png'
import irishImage from '../assets/Irish.PNG'
import scotchWhiskyImage from '../assets/Scotch Whisky.PNG'
import scotchImage from '../assets/Scotch.PNG'
import whereBeganImage from '../assets/where it all began.PNG'

const stats = [
  {
    label: 'Rare whisky growth (10 years)',
    target: 582,
    format: (value) => `${value.toFixed(0)}%`,
  },
  {
    label: 'Average annual capital growth',
    target: 13.09,
    format: (value) => `${value.toFixed(2)}%`,
  },
  {
    label: 'Projected Irish market size by 2028',
    target: 7.5,
    format: (value) => `$${value.toFixed(1)}B`,
  },
]

const portfolio = [
  { name: 'Dalmore', image: dalmoreImage },
  { name: 'The Balvenie Whisky', image: balvenieImage },
  { name: 'Brora Whisky', image: broraImage },
]

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))
  const activePortfolioItem = portfolio[currentSlide]
  const visiblePortfolio = Array.from({ length: Math.min(3, portfolio.length) }, (_, index) => {
    return portfolio[(currentSlide + index) % portfolio.length]
  })

  useEffect(() => {
    const duration = 1400
    const start = performance.now()
    let frameId = null

    const animate = (currentTime) => {
      const elapsed = currentTime - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setAnimatedStats(stats.map((item) => item.target * eased))

      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }

    frameId = requestAnimationFrame(animate)

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])

  const goPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? portfolio.length - 1 : prev - 1))
  }

  const goNext = () => {
    setCurrentSlide((prev) => (prev === portfolio.length - 1 ? 0 : prev + 1))
  }

  return (
    <main>
      <section className="relative h-[100svh] min-h-[620px] border-b border-[#b79552]/30">
        <img src={heroImage} alt="Whisky cask hero" className="absolute inset-0 h-full w-full object-cover opacity-65" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/20 to-[#0a0707]/70"></div>
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col items-center justify-center px-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#d8bc79]">London&apos;s Independent Whisky Agency</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight text-white md:text-7xl">
            Strengthening Portfolios Through Strategic Whisky Investing
          </h1>
        </div>
      </section>

      <section className="border-b border-[#b79552]/30 bg-[#0d0b0b] py-8">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-[1.1fr_1fr] md:items-center">
          <img src={irishImage} alt="Independent whisky agency" className="h-[320px] w-full bg-[#0d0b0b] object-contain md:h-full md:min-h-[360px]" />
          <article className="border border-[#b79552]/40 bg-[#151010] p-5">
            <p className="text-xs uppercase tracking-[0.25em] text-[#d8bc79]">About Dortons Whisky Club</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">London&apos;s Independent Whisky Agency</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              We source and manage premium Scotch and Irish casks for investors seeking stable, long-term growth from a tangible luxury asset.
            </p>
            <a href={brochurePdf} download="Dortons Whisky Club Brochure.pdf" className="mt-4 inline-block rounded-sm bg-[#b79552] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black hover:bg-[#c7a964]">
              Download Brochure
            </a>
          </article>
        </div>
      </section>

      <section className="bg-[#f2f2f2] py-10 text-[#171111]">
        <div className="mx-auto grid max-w-6xl gap-4 px-6 md:grid-cols-3">
          {stats.map((item, index) => (
            <article key={item.label} className="border border-black/10 bg-white p-5 text-center">
              <p className="text-4xl font-semibold text-[#8e7138]">{item.format(animatedStats[index] ?? 0)}</p>
              <p className="mt-2 text-sm text-slate-700">{item.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f2f2f2] pb-12 text-[#171111]">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-[1.1fr_1fr]">
          <article>
            <h3 className="text-2xl font-semibold">More than an investment: a cask-backed strategy</h3>
            <p className="mt-3 text-slate-700">
              Our approach combines proven market performance, careful cask selection, and investor-first guidance so you can build a stronger portfolio with confidence.
            </p>
            <p className="mt-3 text-slate-700">
              As whisky matures, rarity increases and quality deepens, creating an attractive long-term dynamic for asset growth.
            </p>
          </article>
          <div className="space-y-4">
            <article className="grid grid-cols-[84px_1fr] gap-3 border border-black/10 bg-white p-3">
              <img src={whereBeganImage} alt="Market insights" className="h-20 w-full object-cover" />
              <div>
                <p className="text-sm font-semibold">Global demand continues to rise</p>
                <p className="mt-1 text-xs text-slate-600">Scotch and Irish whisky remain in strong demand across export markets.</p>
              </div>
            </article>
            <article className="grid grid-cols-[84px_1fr] gap-3 border border-black/10 bg-white p-3">
              <img src={scotchWhiskyImage} alt="Storage and insurance" className="h-20 w-full object-cover" />
              <div>
                <p className="text-sm font-semibold">Fully managed and insured storage</p>
                <p className="mt-1 text-xs text-slate-600">Casks are stored in bonded facilities with documented ownership.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#0b0808] py-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1fr_1.2fr] md:items-center">
          <article>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b79552]">The Dortons Core</p>
            <h3 className="mt-2 max-w-xl text-5xl leading-tight font-semibold text-white md:text-4xl">
              Our model is built around sustainable excellence
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              Gain a stronger understanding of this specialist market, including key facts, performance insights, and the long-term benefits of cask ownership. Discover how strategic whisky investing can support portfolio growth.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link to="/contact" className="rounded-sm border border-[#b79552] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#b79552]/10">
                Contact Us
              </Link>
            </div>
          </article>
          <img src={scotchImage} alt="Whisky cask barrels" className="h-[360px] w-full object-cover" />
        </div>
      </section>

      <section className="bg-[#f2f2f2] py-12 text-[#171111]">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9f8a5f]">Handpicked Quality</p>
          <h3 className="text-2xl font-semibold">Our Cask Collection</h3>
          <div className="mt-5 md:hidden">
            <article className="rounded-2xl border border-black/10 bg-[#f8f8f8] p-6 text-center">
              <img src={activePortfolioItem.image} alt={activePortfolioItem.name} className="mx-auto h-44 w-full object-contain" />
              <p className="mt-4 font-serif text-xl italic text-[#9f8a5f]">{activePortfolioItem.name}</p>
            </article>
          </div>
          <div className="mt-5 hidden gap-4 md:grid md:grid-cols-3">
            {visiblePortfolio.map((item) => (
              <article key={item.name} className="rounded-2xl border border-black/10 bg-[#f8f8f8] p-6 text-center">
                <img src={item.image} alt={item.name} className="mx-auto h-44 w-full object-contain" />
                <p className="mt-4 font-serif text-xl italic text-[#9f8a5f]">{item.name}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={goPrev}
              className="grid h-9 w-9 place-items-center rounded-full bg-[#b79552] text-base font-bold text-white hover:bg-[#a88640]"
              aria-label="Previous portfolio slide"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              className="grid h-9 w-9 place-items-center rounded-full bg-[#b79552] text-base font-bold text-white hover:bg-[#a88640]"
              aria-label="Next portfolio slide"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      <section className="relative border-y border-[#b79552]/30">
        <img src={heroImage} alt="Call to action" className="h-[260px] w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-black/45"></div>
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col items-center justify-center px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#d8bc79]">Start your whisky investment journey</p>
          <p className="mt-3 max-w-3xl text-lg text-white">
            Whether you&apos;re new to whisky investing or expanding an existing portfolio, our specialists are ready to guide your next move.
          </p>
          <Link to="/contact" className="mt-5 inline-block rounded-sm bg-[#b79552] px-5 py-2 text-xs font-semibold uppercase tracking-wider text-black hover:bg-[#c7a964]">
            Get In Touch
          </Link>
        </div>
      </section>
    </main>
  )
}

export default HomePage
