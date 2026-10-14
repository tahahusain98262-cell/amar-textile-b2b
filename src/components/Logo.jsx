import { useState } from 'react'

export default function Logo({ light = false, className = '' }) {
  const [imageError, setImageError] = useState(false)

  return (
    <a
      className={`brand ${light ? 'brand-light' : ''} ${className}`}
      href="#home"
      aria-label="Amar Textile - Tent Clothes Manufacturer, Surat"
    >
      <div className="brand-logo-frame">
        {!imageError ? (
          <img
            src="/images/amar-textile-logo.jpg"
            alt="Amar Textile Official Logo"
            className="brand-logo-img"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="brand-mark" aria-hidden="true">A</span>
        )}
      </div>
      <div className="brand-copy">
        <span className="brand-title">AMAR TEXTILE</span>
        <span className="brand-tagline">TENT CLOTHES MANUFACTURER · SURAT</span>
      </div>
    </a>
  )
}