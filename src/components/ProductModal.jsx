import { useEffect } from 'react'
import { X, Phone, MessageSquareQuote, MapPin, Building2, ShieldCheck } from 'lucide-react'
import { companyInfo } from '../data/catalogue.js'

export default function ProductModal({ product, onClose, onEnquire }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!product) return null

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-product-title">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close product modal"
        >
          <X size={20} />
        </button>

        <div className="modal-grid">
          <div className="modal-image-col">
            <img
              src={product.image}
              alt={product.title}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = '/images/fabric-fallback.svg'
              }}
              className="modal-product-img"
            />
            <div className="modal-caption-badge">
              <span className="eyebrow-dot" /> Verified Original Catalogue Asset
            </div>
          </div>

          <div className="modal-details-col">
            <span className="eyebrow">{product.category}</span>
            <h2 id="modal-product-title" className="modal-title">{product.title}</h2>

            <div className="modal-specs-list">
              <div className="modal-spec-row">
                <span className="spec-label"><Building2 size={15} /> Manufacturer:</span>
                <span className="spec-val">Amar Textile (Est. 1992)</span>
              </div>
              <div className="modal-spec-row">
                <span className="spec-label"><MapPin size={15} /> Mill Location:</span>
                <span className="spec-val">Surat, Gujarat, India</span>
              </div>
              <div className="modal-spec-row">
                <span className="spec-label"><ShieldCheck size={15} /> Supply Grade:</span>
                <span className="spec-val">Wholesale Commercial / Bulk Rolls</span>
              </div>
            </div>

            <p className="modal-description">
              Manufactured with high-standard tension and clean finishing. Supplied directly from Shree Kuberji World Market, Surat for decorators, banquet halls, and pandal contractors.
            </p>

            <div className="modal-cta-box">
              <button
                type="button"
                className="button button-brass modal-enquire-btn"
                onClick={() => {
                  onClose()
                  if (onEnquire) onEnquire(product)
                }}
              >
                <MessageSquareQuote size={17} />
                <span>Request Wholesale Quotation</span>
              </button>

              <a
                href={companyInfo.phoneHref}
                className="button button-outline modal-call-btn"
              >
                <Phone size={16} />
                <span>Call {companyInfo.phoneDisplay}</span>
              </a>
            </div>

            <p className="modal-disclaimer">
              * To get current lot rates and meterage availability, enquire directly with Mr. Amar Sewani.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
