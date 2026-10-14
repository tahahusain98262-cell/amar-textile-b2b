import { Phone, MapPin, ArrowUpRight, ArrowUp, ExternalLink, ShieldCheck, Mail } from 'lucide-react'
import Logo from './Logo.jsx'
import { companyInfo, categories } from '../data/catalogue.js'

export default function Footer({ onOpenQuoteModal }) {
  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Top 8 categories for footer column
  const footerCategories = categories.slice(0, 8)
  const secondaryCategories = categories.slice(8, 16)

  return (
    <footer className="footer" id="contact">
      {/* Pre-footer quick trust strip */}
      <div className="footer-trust-strip">
        <div className="wrap trust-strip-inner">
          <div className="trust-col">
            <ShieldCheck size={20} className="trust-icon" />
            <div>
              <strong>Est. 1992 · Surat Mill Heritage</strong>
              <p>Direct manufacturer pricing & wholesale bulk lots</p>
            </div>
          </div>
          <div className="trust-col">
            <MapPin size={20} className="trust-icon" />
            <div>
              <strong>Shree Kuberji World Market</strong>
              <p>Near Bharat Cancer Hospital, Surat, Gujarat</p>
            </div>
          </div>
          <div className="trust-col">
            <Phone size={20} className="trust-icon" />
            <div>
              <strong>Direct Sales Helpline</strong>
              <p>{companyInfo.phoneDisplay} (Mr. Amar Sewani)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="wrap footer-main">
        <div className="footer-brand-col">
          <Logo light className="footer-logo" />
          <p className="footer-bio">
            Amar Textile is an eminent manufacturer, wholesaler, and OEM supplier of wedding mandap fabrics, readymade samiyana ceilings, parda sidewalls, chair covers, and decorative event textiles. Life Member of Southern Gujarat Chamber of Commerce.
          </p>

          <div className="footer-contact-items">
            <a href={companyInfo.phoneHref} className="footer-contact-link">
              <Phone size={16} />
              <span>{companyInfo.phoneDisplay}</span>
            </a>
            <div className="footer-address">
              <MapPin size={16} className="address-pin-icon" />
              <span>{companyInfo.address}</span>
            </div>
          </div>

          <div className="footer-brand-cta">
            <button
              type="button"
              className="button button-brass button-sm"
              onClick={() => onOpenQuoteModal && onOpenQuoteModal()}
            >
              Request Bulk Quote <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

        <div className="footer-nav-col">
          <h4 className="footer-heading">Product Collections</h4>
          <ul className="footer-links-list">
            {footerCategories.map((c) => (
              <li key={c.id}>
                <a href="#catalogue">{c.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-nav-col">
          <h4 className="footer-heading">More Fabrics & Setups</h4>
          <ul className="footer-links-list">
            {secondaryCategories.map((c) => (
              <li key={c.id}>
                <a href="#catalogue">{c.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-nav-col">
          <h4 className="footer-heading">Company & Legal</h4>
          <ul className="footer-links-list">
            <li><a href="#about">About Amar Textile</a></li>
            <li><a href="#capabilities">Mill Capabilities</a></li>
            <li><a href="#catalogue">Full Catalogue Search</a></li>
            <li>
              <a href={companyInfo.officialUrl} target="_blank" rel="noreferrer">
                Official Web Portal <ExternalLink size={13} />
              </a>
            </li>
            <li>
              <a href="https://www.amartextilesurat.com/company-profile.html" target="_blank" rel="noreferrer">
                Verified Company Profile <ExternalLink size={13} />
              </a>
            </li>
            <li>
              <a href="https://www.amartextilesurat.com/contact-us.html" target="_blank" rel="noreferrer">
                Original Contact Page <ExternalLink size={13} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom wrap">
        <div className="footer-bottom-copy">
          <span>© {new Date().getFullYear()} Amar Textile (Surat). All Rights Reserved.</span>
          <span className="bottom-tagline">Tent Clothes Manufacturer · Life Member SGCCI</span>
        </div>
        <button
          type="button"
          className="back-to-top-btn"
          onClick={scrollToTop}
          aria-label="Back to top of page"
        >
          <span>Top</span>
          <ArrowUp size={15} />
        </button>
      </div>
    </footer>
  )
}