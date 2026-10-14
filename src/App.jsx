import { useState, useMemo } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  CheckCircle2,
  Phone,
  Search,
  Filter,
  Layers,
  MapPin,
  Building2,
  Clock,
  Sparkles,
  ShieldCheck,
  Send,
  SlidersHorizontal,
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import Header from './components/Header.jsx'
import ImageCard from './components/ImageCard.jsx'
import ProductModal from './components/ProductModal.jsx'
import QuoteModal from './components/QuoteModal.jsx'
import Footer from './components/Footer.jsx'
import { companyInfo, categories, allProducts, featuredProducts } from './data/catalogue.js'

export default function App() {
  // State for search and filtering
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeHeroBanner, setActiveHeroBanner] = useState(0)

  // State for modals
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [quoteModalOpen, setQuoteModalOpen] = useState(false)
  const [quotePrefillProduct, setQuotePrefillProduct] = useState(null)
  const [quotePrefillCategory, setQuotePrefillCategory] = useState(null)

  // On-page inquiry form state
  const [inlineForm, setInlineForm] = useState({
    name: '',
    phone: '',
    city: '',
    category: 'Ceiling & Samiyana',
    notes: ''
  })
  const [inlineSubmitted, setInlineSubmitted] = useState(false)

  const heroBanners = [
    { src: '/images/hero-banner-1.jpg', label: 'Grand Samiyana & Ceiling Designs' },
    { src: '/images/hero-banner-2.jpg', label: 'Mandap & Parda Sidewall Fabrics' },
    { src: '/images/hero-banner-3.jpg', label: 'Taiwan Printed & Lycra Textiles' },
    { src: '/images/hero-banner-4.jpg', label: 'Event Decoration & Banquet Setups' }
  ]

  // Filter products based on search and selected category
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase()
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Category counts
  const categoryListWithAll = useMemo(() => {
    const list = [{ title: 'All', count: allProducts.length }]
    categories.forEach((cat) => {
      const count = allProducts.filter((p) => p.category.toLowerCase() === cat.title.toLowerCase()).length
      list.push({ title: cat.title, count })
    })
    return list
  }, [])

  // Handlers
  const handleSelectCategoryFromShowcase = (categoryTitle) => {
    setSelectedCategory(categoryTitle)
    const el = document.getElementById('catalogue')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleEnquireProduct = (product) => {
    setQuotePrefillProduct(product)
    setQuotePrefillCategory(product.category)
    setQuoteModalOpen(true)
  }

  const handleOpenGeneralQuote = (category = null) => {
    setQuotePrefillProduct(null)
    setQuotePrefillCategory(category)
    setQuoteModalOpen(true)
  }

  const handleInlineFormSubmit = (e) => {
    e.preventDefault()
    if (!inlineForm.name || !inlineForm.phone) return
    setInlineSubmitted(true)
  }

  return (
    <div id="home" className="site-wrapper">
      <Header onOpenQuoteModal={() => handleOpenGeneralQuote()} />

      <main>
        {/* ===================== HERO SECTION ===================== */}
        <section className="hero wrap">
          <div className="hero-copy">
            <div className="eyebrow-chip">
              <span className="eyebrow-dot" />
              <span>Surat Mill OEM · Est. 1992 · Life Member SGCCI</span>
            </div>

            <h1 className="hero-heading">
              Fabric that elevates <br />
              <em>every celebration.</em>
            </h1>

            <p className="hero-lede">
              Amar Textile is a trusted direct manufacturer and wholesale distributor of premium Lycra, Taiwan prints, samiyana ceilings, parda backdrops, and complete event-decoration fabrics. Based in Surat, Gujarat.
            </p>

            <div className="hero-actions">
              <a className="button button-brass" href="#catalogue">
                <span>Explore Full Catalogue</span>
                <ArrowDown size={17} />
              </a>
              <button
                type="button"
                className="button button-outline"
                onClick={() => handleOpenGeneralQuote()}
              >
                <span>Request Bulk Quote</span>
                <ArrowUpRight size={17} />
              </button>
            </div>

            <div className="hero-proof-grid">
              <div className="proof-item">
                <CheckCircle2 size={16} className="proof-icon" />
                <span>Direct Mill Rates</span>
              </div>
              <div className="proof-item">
                <CheckCircle2 size={16} className="proof-icon" />
                <span>Ready Wholesale Stock</span>
              </div>
              <div className="proof-item">
                <CheckCircle2 size={16} className="proof-icon" />
                <span>Custom OEM Stitched Sets</span>
              </div>
              <div className="proof-item">
                <CheckCircle2 size={16} className="proof-icon" />
                <span>Pan-India Safe Dispatch</span>
              </div>
            </div>
          </div>

          <div className="hero-art">
            <div className="hero-image-wrapper">
              <img
                src={heroBanners[activeHeroBanner].src}
                alt={heroBanners[activeHeroBanner].label}
                fetchPriority="high"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = '/images/fabric-fallback.svg'
                }}
                className="hero-main-img"
              />
              <div className="hero-image-overlay" />
              <div className="hero-stamp">
                <span className="hero-stamp-brand">AMAR</span>
                <small className="hero-stamp-sub">SURAT TEXTILE MILL</small>
              </div>
              <div className="hero-caption">
                <span className="hero-caption-idx">0{activeHeroBanner + 1} / 04</span>
                <span className="hero-caption-txt">{heroBanners[activeHeroBanner].label}</span>
              </div>
            </div>

            {/* Thumbnail switcher */}
            <div className="hero-thumbs" role="tablist" aria-label="Hero banner carousel">
              {heroBanners.map((banner, idx) => (
                <button
                  key={banner.src}
                  type="button"
                  role="tab"
                  aria-selected={activeHeroBanner === idx}
                  aria-label={`View slide ${idx + 1}: ${banner.label}`}
                  className={`hero-thumb-btn ${activeHeroBanner === idx ? 'thumb-active' : ''}`}
                  onClick={() => setActiveHeroBanner(idx)}
                >
                  <img
                    src={banner.src}
                    alt=""
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = '/images/fabric-fallback.svg'
                    }}
                  />
                  <span>0{idx + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== INTRO BANNER ===================== */}
        <section className="intro-band">
          <div className="wrap intro-inner">
            <div className="intro-col-left">
              <span className="eyebrow">30+ Years of Textile Craft</span>
              <p className="intro-text">
                From intricate laser-cut samiyana ceilings and 4-way stretch lycra covers to vivid Taiwan prints, Amar Textile provides authentic decorator fabrics with consistent dye lots and durable stitchwork.
              </p>
            </div>
            <div className="intro-col-right">
              <a href="#collections" className="intro-action-link">
                <span>Browse 16 Core Categories</span>
                <ArrowDown size={17} />
              </a>
            </div>
          </div>
        </section>

        {/* ===================== 01: FEATURED CATEGORIES ===================== */}
        <section className="section wrap" id="collections">
          <div className="section-head">
            <div>
              <span className="eyebrow">01 — Core Collections</span>
              <h2>Collections for <em>every venue.</em></h2>
            </div>
            <p className="section-subtext">
              Verified product families from Amar Textile. Click any category to filter the interactive catalogue below.
            </p>
          </div>

          <div className="category-grid">
            {categories.map((item) => (
              <ImageCard
                key={item.id}
                item={item}
                onSelectCategory={handleSelectCategoryFromShowcase}
              />
            ))}
          </div>
        </section>

        {/* ===================== 02: SPOTLIGHT / BEST-SELLERS ===================== */}
        <section className="featured-section" id="featured">
          <div className="wrap section">
            <div className="section-head">
              <div>
                <span className="eyebrow">02 — Decorator Highlights</span>
                <h2>Designs that make <em>a lasting impression.</em></h2>
              </div>
              <p className="section-subtext">
                Leading wedding mandap setups, banquet table cloths, and velvet mirror textiles regularly supplied across India.
              </p>
            </div>

            <div className="product-grid">
              {featuredProducts.slice(0, 8).map((item) => (
                <ImageCard
                  key={item.id}
                  item={item}
                  product
                  onOpenProductModal={setSelectedProduct}
                  onEnquireProduct={handleEnquireProduct}
                />
              ))}
            </div>

            <div className="center-action">
              <a className="button button-brass" href="#catalogue">
                <span>View Complete Catalogue ({allProducts.length} Items)</span>
                <ArrowDown size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ===================== 03: INTERACTIVE FULL CATALOGUE ===================== */}
        <section className="catalogue-section wrap" id="catalogue">
          <div className="section-head">
            <div>
              <span className="eyebrow">03 — Searchable Catalogue</span>
              <h2>Explore the complete <em>Amar Textile range.</em></h2>
            </div>
            <p className="section-subtext">
              Filter by product family or search by keywords. Click any card to inspect high-resolution imagery and request quotation.
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="catalogue-controls">
            <div className="search-bar-wrap">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="catalogue-search-input"
                placeholder="Search ceilings, sidewall parda, lycra, prints, covers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search catalogue products"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="category-filter-bar" role="tablist" aria-label="Category filter">
              {categoryListWithAll.map((cat) => (
                <button
                  key={cat.title}
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory.toLowerCase() === cat.title.toLowerCase()}
                  className={`filter-pill ${
                    selectedCategory.toLowerCase() === cat.title.toLowerCase() ? 'pill-active' : ''
                  }`}
                  onClick={() => setSelectedCategory(cat.title)}
                >
                  <span>{cat.title}</span>
                  {cat.count > 0 && <span className="pill-count">{cat.count}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filter Status */}
          <div className="catalogue-status-bar">
            <span>
              Showing <strong>{filteredProducts.length}</strong> products
              {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
              {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
            </span>
            {(selectedCategory !== 'All' || searchQuery) && (
              <button
                type="button"
                className="reset-filters-btn"
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchQuery('')
                }}
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((item) => (
                <ImageCard
                  key={item.id}
                  item={item}
                  product
                  onOpenProductModal={setSelectedProduct}
                  onEnquireProduct={handleEnquireProduct}
                />
              ))}
            </div>
          ) : (
            <div className="catalogue-empty-state">
              <Layers size={40} className="empty-icon" />
              <h3>No matching products found</h3>
              <p>Try searching for a different fabric, or select another category above.</p>
              <button
                type="button"
                className="button button-dark"
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchQuery('')
                }}
              >
                View All Products
              </button>
            </div>
          )}
        </section>

        {/* ===================== 04: ABOUT AMAR TEXTILE ===================== */}
        <section className="about-section wrap" id="about">
          <div className="about-image-col">
            <div className="about-frame">
              <img
                src="/images/categories/ceiling-samiyana.jpg"
                alt="Amar Textile heritage manufacturing and samiyana stitching"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = '/images/fabric-fallback.svg'
                }}
              />
              <div className="about-badge">
                <span className="about-badge-year">1992</span>
                <span className="about-badge-label">ESTABLISHED IN SURAT</span>
              </div>
            </div>
          </div>

          <div className="about-copy-col">
            <span className="eyebrow">04 — Heritage & Profile</span>
            <h2>Three decades of <em>weaving excellence.</em></h2>
            <p className="about-paragraph">
              Amar Textile was established in 1992 in Surat, Gujarat by <strong>Mr. Amar Sewani</strong>. Over the last 30+ years, we have grown into an eminent manufacturer, wholesaler, and OEM partner for event decorators, shamiyana owners, mandap contractors, and fabric traders across India.
            </p>
            <p className="about-paragraph">
              We strictly adhere to high standards of colorfastness, durability, and smooth finishing. Proud to be a <strong>Life Member of Southern Gujarat Chamber of Commerce</strong>, Amar Textile maintains ready stock of our core portfolio for rapid wholesale fulfillment.
            </p>

            <div className="about-stats-grid">
              <div className="stat-card">
                <span className="stat-num">1992</span>
                <span className="stat-label">Year Founded</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">30+</span>
                <span className="stat-label">Years Heritage</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">16+</span>
                <span className="stat-label">Fabric Categories</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">OEM</span>
                <span className="stat-label">Direct Custom Mill</span>
              </div>
            </div>

            <div className="about-action-row">
              <a
                className="button button-brass"
                href="https://www.amartextilesurat.com/company-profile.html"
                target="_blank"
                rel="noreferrer"
              >
                <span>Read Official Company Profile</span>
                <ExternalLink size={15} />
              </a>
              <a href={companyInfo.phoneHref} className="text-link">
                <span>Speak with Mr. Amar Sewani</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ===================== 05: CAPABILITIES & CORE FABRICS ===================== */}
        <section className="capabilities-section" id="capabilities">
          <div className="wrap section">
            <div className="section-head">
              <div>
                <span className="eyebrow">05 — Manufacturing Capabilities</span>
                <h2>Engineered for <em>demanding event requirements.</em></h2>
              </div>
              <p className="section-subtext">
                Factual strengths confirmed directly on our production lines in Surat.
              </p>
            </div>

            <div className="capabilities-grid">
              <div className="capability-card">
                <div className="capability-icon-wrap">
                  <Sparkles size={24} />
                </div>
                <h3>Core Fabric Formats</h3>
                <p>
                  High-yield Lycra (22 & 26 Gauge), vivid Taiwan digital prints, heavy-weight Roto plain, foil metallics, and velvet mirror embroidery rolls.
                </p>
                <ul className="capability-list">
                  <li>Superior stretch recovery for chair covers</li>
                  <li>Deep saturated colors for festive lighting</li>
                  <li>Wrinkle-resistant drapery texture</li>
                </ul>
              </div>

              <div className="capability-card">
                <div className="capability-icon-wrap">
                  <Building2 size={24} />
                </div>
                <h3>Readymade Stitched Sets</h3>
                <p>
                  Complete readymade 15x15 Mandap cloth sets, 5x12 Samiyana ceiling coverings, circular banquet table drapes, and matching jhalar borders.
                </p>
                <ul className="capability-list">
                  <li>Reinforced border eyelets and cords</li>
                  <li>Standard and custom dimensions</li>
                  <li>Ready for immediate setup without onsite tailoring</li>
                </ul>
              </div>

              <div className="capability-card">
                <div className="capability-icon-wrap">
                  <ShieldCheck size={24} />
                </div>
                <h3>Bulk Wholesale Readiness</h3>
                <p>
                  Extensive ready stock stored at Shree Kuberji World Market, Surat. Capable of supporting immediate high-volume wedding season demands.
                </p>
                <ul className="capability-list">
                  <li>Direct manufacturer wholesale price points</li>
                  <li>Daily dispatches through transport logistics</li>
                  <li>Consistent dye lots across repeat orders</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 06: BULK QUOTATION & CONTACT ===================== */}
        <section className="quote-contact-section wrap" id="enquire">
          <div className="contact-grid">
            {/* Left: Contact Information & Location */}
            <div className="contact-info-panel">
              <span className="eyebrow">06 — Direct Connection</span>
              <h2>Start your wholesale requirement.</h2>
              <p className="contact-lede">
                Discuss volume discounts, fabric sample swatches, or custom dimensions directly with our sales desk in Surat.
              </p>

              <div className="contact-details-list">
                <div className="contact-detail-item">
                  <div className="detail-icon">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <span className="detail-label">Office & Showroom</span>
                    <p className="detail-value">{companyInfo.address}</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="detail-icon">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="detail-label">Direct Phone / Call</span>
                    <a href={companyInfo.phoneHref} className="detail-value phone-link">
                      {companyInfo.phoneDisplay}
                    </a>
                    <span className="detail-sub">Mr. Amar Sewani (Proprietor)</span>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="detail-icon">
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className="detail-label">Business Hours</span>
                    <p className="detail-value">Monday – Saturday: 10:00 AM – 8:00 PM</p>
                    <span className="detail-sub">Wholesale and commercial buyers welcome</span>
                  </div>
                </div>
              </div>

              <div className="contact-map-card">
                <div className="map-card-text">
                  <strong>Location Benchmark:</strong>
                  <p>Near Bharat Cancer Hospital, Saroli / Ring Road Textile Belt, Surat</p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    'Shree Kuberji World Market, Near Bharat Cancer Hospital, Surat, Gujarat 395010'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="map-action-link"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Right: Inline Inquiry Form */}
            <div className="contact-form-panel">
              {!inlineSubmitted ? (
                <form onSubmit={handleInlineFormSubmit} className="inline-quote-form">
                  <div className="form-header">
                    <h3>Request Wholesale Pricing</h3>
                    <p>Receive mill quotes and dispatch availability within 24 hours.</p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inline-name">Full Name / Business Name *</label>
                    <input
                      id="inline-name"
                      type="text"
                      required
                      placeholder="e.g. Anand Mandap Decorators"
                      value={inlineForm.name}
                      onChange={(e) => setInlineForm({ ...inlineForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="inline-phone">Phone / Mobile *</label>
                      <input
                        id="inline-phone"
                        type="tel"
                        required
                        placeholder="e.g. 098XXXXXXXX"
                        value={inlineForm.phone}
                        onChange={(e) => setInlineForm({ ...inlineForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inline-city">City & State</label>
                      <input
                        id="inline-city"
                        type="text"
                        placeholder="e.g. Surat, Jaipur, Pune"
                        value={inlineForm.city}
                        onChange={(e) => setInlineForm({ ...inlineForm, city: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inline-category">Primary Category of Interest</label>
                    <select
                      id="inline-category"
                      value={inlineForm.category}
                      onChange={(e) => setInlineForm({ ...inlineForm, category: e.target.value })}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="inline-notes">Estimated Quantity & Requirements</label>
                    <textarea
                      id="inline-notes"
                      rows={3}
                      placeholder="Specify meterage, colors, readymade set dimensions, or delivery timeline..."
                      value={inlineForm.notes}
                      onChange={(e) => setInlineForm({ ...inlineForm, notes: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="button button-brass submit-btn">
                    <span>Submit Wholesale Enquiry</span>
                    <Send size={16} />
                  </button>

                  <p className="form-disclaimer">
                    Direct enquiry routed to Amar Textile sales desk. No intermediaries.
                  </p>
                </form>
              ) : (
                <div className="inline-success-box">
                  <CheckCircle2 size={40} className="success-icon" />
                  <h3>Enquiry Ready for Confirmation!</h3>
                  <p>
                    Thank you, <strong>{inlineForm.name}</strong>. Your enquiry for <strong>{inlineForm.category}</strong> has been structured.
                  </p>
                  <div className="inline-channel-actions">
                    <a href={companyInfo.phoneHref} className="button button-brass">
                      <Phone size={16} />
                      <span>Call Amar Textile Now ({companyInfo.phoneDisplay})</span>
                    </a>
                    <a
                      href={`mailto:sales@amartextilesurat.com?subject=${encodeURIComponent(
                        `Wholesale Enquiry: ${inlineForm.category} - ${inlineForm.name}`
                      )}&body=${encodeURIComponent(
                        `Wholesale Enquiry:\nName: ${inlineForm.name}\nPhone: ${inlineForm.phone}\nCity: ${inlineForm.city}\nCategory: ${inlineForm.category}\nRequirements: ${inlineForm.notes}`
                      )}`}
                      className="button button-outline"
                    >
                      <span>Send via Email Client</span>
                    </a>
                  </div>
                  <button
                    type="button"
                    className="button-ghost new-enquiry-btn"
                    onClick={() => {
                      setInlineSubmitted(false)
                      setInlineForm({ name: '', phone: '', city: '', category: 'Ceiling & Samiyana', notes: '' })
                    }}
                  >
                    Submit another enquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenQuoteModal={() => handleOpenGeneralQuote()} />

      {/* ===================== MOBILE STICKY BOTTOM ACTIONS ===================== */}
      <div className="mobile-actions-bar">
        <a href={companyInfo.phoneHref} className="mobile-action-btn mobile-call-btn">
          <Phone size={18} />
          <span>Call Amar Textile</span>
        </a>
        <button
          type="button"
          className="mobile-action-btn mobile-quote-btn"
          onClick={() => handleOpenGeneralQuote()}
        >
          <ArrowUpRight size={18} />
          <span>Request Quote</span>
        </button>
      </div>

      {/* ===================== MODALS ===================== */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onEnquire={(prod) => {
            setSelectedProduct(null)
            handleEnquireProduct(prod)
          }}
        />
      )}

      {quoteModalOpen && (
        <QuoteModal
          isOpen={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)}
          initialProduct={quotePrefillProduct}
          initialCategory={quotePrefillCategory}
        />
      )}
    </div>
  )
}