import { useState, useEffect } from 'react'
import { X, Phone, Mail, CheckCircle2, Send, ArrowRight } from 'lucide-react'
import { companyInfo, categories } from '../data/catalogue.js'

export default function QuoteModal({ isOpen, onClose, initialProduct = null, initialCategory = null }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    category: '',
    productName: '',
    quantity: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false)
      setError('')
      setFormData({
        name: '',
        phone: '',
        city: '',
        category: initialCategory || (initialProduct ? initialProduct.category : 'Ceiling & Samiyana'),
        productName: initialProduct ? initialProduct.title : '',
        quantity: '',
        message: initialProduct
          ? `Hello Amar Textile, please provide the wholesale lot price and availability for: ${initialProduct.title}.`
          : 'Hello Amar Textile, I am looking for wholesale pricing for event-fabric rolls.'
      })
    }
  }, [isOpen, initialProduct, initialCategory])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      setError('Please provide your name.')
      return
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setError('Please provide a valid contact phone or mobile number.')
      return
    }

    setError('')
    setSubmitted(true)
  }

  // Construct mailto URI with prefilled details
  const emailSubject = encodeURIComponent(`B2B Wholesale Enquiry - ${formData.productName || formData.category || 'Amar Textile'}`)
  const emailBody = encodeURIComponent(
`Wholesale Enquiry for Amar Textile (Surat):
------------------------------------------------
Name: ${formData.name}
Phone / Mobile: ${formData.phone}
City / State: ${formData.city || 'Not specified'}
Product: ${formData.productName || 'General Category Enquiry'}
Category: ${formData.category}
Estimated Quantity: ${formData.quantity || 'Not specified'}

Requirement Details:
${formData.message}
------------------------------------------------
Origin: amartextilesurat.com B2B Portal`
  )
  const mailtoLink = `mailto:sales@amartextilesurat.com?subject=${emailSubject}&body=${emailBody}`

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="quote-modal-title">
      <div className="modal-container quote-modal-container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close quote modal"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div className="quote-modal-head">
              <span className="eyebrow">Direct Wholesale Quotation</span>
              <h2 id="quote-modal-title" className="quote-modal-heading">Request a Bulk Quote</h2>
              <p className="quote-modal-sub">
                Connect directly with Amar Textile Surat for mill pricing, minimum lot sizes, and pan-India dispatch.
              </p>
            </div>

            {error && <div className="form-error-banner" role="alert">{error}</div>}

            <form onSubmit={handleSubmit} className="quote-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quote-name">Your Name *</label>
                  <input
                    id="quote-name"
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma / Decor Studio"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quote-phone">Mobile / Phone Number *</label>
                  <input
                    id="quote-phone"
                    type="tel"
                    required
                    placeholder="e.g. 098XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quote-city">Your City & State</label>
                  <input
                    id="quote-city"
                    type="text"
                    placeholder="e.g. Surat, Ahmedabad, Jaipur, Delhi"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quote-category">Product Category</label>
                  <select
                    id="quote-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {formData.productName && (
                <div className="form-group selected-product-highlight">
                  <label htmlFor="quote-product-name">Selected Item</label>
                  <input
                    id="quote-product-name"
                    type="text"
                    readOnly
                    value={formData.productName}
                    className="readonly-product-input"
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="quote-qty">Estimated Quantity or Meterage</label>
                <input
                  id="quote-qty"
                  type="text"
                  placeholder="e.g. 200 Meters / 50 Sets / Full Roll"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="quote-notes">Specific Requirements / Color / Finish</label>
                <textarea
                  id="quote-notes"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="form-footer-actions">
                <button type="submit" className="button button-brass submit-quote-btn">
                  <span>Generate Quotation Request</span>
                  <ArrowRight size={16} />
                </button>
                <span className="form-note">
                  Direct dispatch from Shree Kuberji World Market, Surat.
                </span>
              </div>
            </form>
          </div>
        ) : (
          <div className="quote-success-panel">
            <div className="success-icon-wrap">
              <CheckCircle2 size={48} className="success-icon" />
            </div>
            <h3>Quotation Request Prepared!</h3>
            <p className="success-intro">
              Thank you, <strong>{formData.name}</strong>. Your enquiry details have been formulated. As an authentic textile manufacturer with direct sales, please choose your preferred instant channel below:
            </p>

            <div className="enquiry-summary-card">
              <div className="summary-line">
                <span>Product / Category:</span>
                <strong>{formData.productName || formData.category}</strong>
              </div>
              <div className="summary-line">
                <span>Contact Phone:</span>
                <strong>{formData.phone}</strong>
              </div>
              {formData.city && (
                <div className="summary-line">
                  <span>City / State:</span>
                  <strong>{formData.city}</strong>
                </div>
              )}
              {formData.quantity && (
                <div className="summary-line">
                  <span>Quantity:</span>
                  <strong>{formData.quantity}</strong>
                </div>
              )}
            </div>

            <div className="instant-channel-grid">
              <a href={companyInfo.phoneHref} className="channel-action-card channel-call">
                <div className="channel-icon">
                  <Phone size={22} />
                </div>
                <div className="channel-copy">
                  <span className="channel-title">Call Mr. Amar Sewani Directly</span>
                  <span className="channel-detail">{companyInfo.phoneDisplay} (Mon-Sat Wholesale Hours)</span>
                </div>
              </a>

              <a href={mailtoLink} className="channel-action-card channel-email">
                <div className="channel-icon">
                  <Mail size={22} />
                </div>
                <div className="channel-copy">
                  <span className="channel-title">Transmit via Email</span>
                  <span className="channel-detail">Opens with your enquiry prefilled</span>
                </div>
              </a>
            </div>

            <div className="success-footer-actions">
              <button
                type="button"
                className="button button-outline"
                onClick={() => setSubmitted(false)}
              >
                Modify Request
              </button>
              <button
                type="button"
                className="button button-dark"
                onClick={onClose}
              >
                Return to Catalogue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
