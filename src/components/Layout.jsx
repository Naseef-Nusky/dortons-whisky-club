import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import logoImage from '../assets/logo.png'

function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname === '/about') {
      document.title = 'About Us | Dortons Whisky Partners'
      return
    }
    if (location.pathname === '/contact') {
      document.title = 'Contact Us | Dortons Whisky Partners'
      return
    }
    document.title = 'Home | Dortons Whisky Partners'
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-[#0a0707] text-slate-100">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-[#b79552]/30 bg-black/30 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="hidden items-center md:grid md:grid-cols-[1fr_auto_1fr]">
            <nav className="flex items-center gap-6 text-sm font-medium text-slate-100">
              <NavLink to="/" end className="hover:text-[#d8bc79]">Home</NavLink>
              <NavLink to="/about" className="hover:text-[#d8bc79]">About Us</NavLink>
            </nav>

            <img src={logoImage} alt="Dortons Whisky Club" className="h-14 w-auto brightness-0 invert" />

            <nav className="flex items-center justify-end gap-6 text-sm font-medium text-slate-100">
              <NavLink to="/contact" className="rounded-sm bg-[#b79552] px-4 py-2 font-semibold text-black hover:bg-[#c7a964]">
                Contact us
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center justify-between md:hidden">
            <img src={logoImage} alt="Dortons Whisky Club" className="h-11 w-auto brightness-0 invert" />
            <div className="flex items-center gap-2">
              <NavLink to="/" end className="px-2 py-1 text-xs text-slate-100">Home</NavLink>
              <NavLink to="/about" className="px-2 py-1 text-xs text-slate-100">About</NavLink>
              <NavLink to="/contact" className="rounded-sm bg-[#b79552] px-3 py-1 text-xs font-semibold text-black">Contact</NavLink>
            </div>
          </div>
        </div>
      </header>

      <Outlet />

      <footer className="border-t border-[#b79552]/30 bg-[#0a0707]">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
            <div>
              <img src={logoImage} alt="Dortons Whisky Club logo" className="h-11 w-auto brightness-0 invert" />
              <p className="mt-4 max-w-xs text-sm text-slate-300">
                Dortons Whisky Partners offers premium cask sourcing, insured storage, and long-term investor guidance.
              </p>
              <p className="mt-3 max-w-xs text-sm text-slate-300">
                A specialist whisky investment team delivering transparent and professional support.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white">Main Menu</h4>
              <ul className="mt-3 space-y-1 text-sm text-slate-300">
                <li><NavLink to="/" className="hover:text-[#d8bc79]">Home</NavLink></li>
                <li><NavLink to="/about" className="hover:text-[#d8bc79]">About Us</NavLink></li>
                <li><NavLink to="/contact" className="hover:text-[#d8bc79]">Contact Us</NavLink></li>
                <li><NavLink to="/contact" className="hover:text-[#d8bc79]">FAQs</NavLink></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white">Contact Us</h4>
              <div className="mt-3 space-y-1 text-sm text-slate-300">
                <p>+44 7787 081 537</p>
                <p>info@dortonswhiskyclub.com</p>
                <p>Trident House, 54-56 Victoria St, St Albans AL1 3HZ</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
