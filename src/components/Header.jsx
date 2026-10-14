import { useState, useEffect } from 'react'
import { Menu, X, Phone, ArrowUpRight, ShieldCheck } from 'lucide-react'
import Logo from './Logo.jsx'
import { companyInfo } from '../data/catalogue.js'

export default function Header({ onOpenQuoteModal }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Collections', href: '#collections' },
    { label: 'Featured', href: '#featured' },
    { label: 'Catalogue', href: '#catalogue' },
    { label: 'About Amar', href: '#about' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Contact', href: '#contact' }
  ]

  const handleNavClick = (href) => {
    setOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
      {/* Topline Announcement Strip */}
      <div className="topline">
        <div className="topline-inner wrap">
          <div className="topline-left">
            <span className="topline-badge"><ShieldCheck size={13} /> Surat Mill OEM · Est. 1992</span>
            <span className="topline-sep">·</span>
            <span>Wholesale event-fabrics & samiyana ceilings direct supply</span>
          </div>
          <div className="topline-right">
            <span>Proprietor: {companyInfo.proprietor}</span>
            <span className="topline-sep">·</span>
            <a href={companyInfo.phoneHref} className="topline-phone">
              <Phone size={12} /> Call: {companyInfo.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="header-inner wrap">
        <Logo />

        <nav className={`nav ${open ? 'nav-open' : ''}`} aria-label="Main Navigation">
          <div className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <a href={companyInfo.phoneHref} className="button button-outline button-sm nav-phone-btn">
              <Phone size={14} />
              <span>{companyInfo.phoneDisplay}</span>
            </a>
            <button
              type="button"
              className="button button-brass button-sm"
              onClick={() => {
                setOpen(false)
                if (onOpenQuoteModal) onOpenQuoteModal()
              }}
            >
              <span>Request Quote</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}