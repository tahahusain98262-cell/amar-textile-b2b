import { ArrowUpRight, MessageSquareQuote, Eye } from 'lucide-react'

export default function ImageCard({
  item,
  product = false,
  onSelectCategory,
  onOpenProductModal,
  onEnquireProduct
}) {
  const handleImageError = (e) => {
    e.currentTarget.onerror = null
    e.currentTarget.src = '/images/fabric-fallback.svg'
  }

  if (product) {
    return (
      <article className="product-card">
        <div
          className="product-image-frame"
          role="button"
          tabIndex={0}
          onClick={() => onOpenProductModal && onOpenProductModal(item)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onOpenProductModal && onOpenProductModal(item)
            }
          }}
          aria-label={`View details of ${item.title}`}
        >
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            onError={handleImageError}
            className="product-card-img"
          />
          <div className="product-badge-overlay">
            <span className="product-category-tag">{item.category}</span>
          </div>
          <div className="product-hover-overlay">
            <span className="view-detail-pill">
              <Eye size={14} /> Quick View
            </span>
          </div>
        </div>

        <div className="product-content">
          <div className="product-meta">
            <span className="product-origin">{item.specs?.origin || 'Surat, Gujarat'}</span>
            <span className="product-supply-tag">{item.specs?.supplyType || 'Wholesale / Bulk'}</span>
          </div>

          <h3 className="product-title" title={item.title}>
            {item.title}
          </h3>

          <div className="product-actions">
            <button
              type="button"
              className="button-ghost product-view-btn"
              onClick={() => onOpenProductModal && onOpenProductModal(item)}
              aria-label={`View full details of ${item.title}`}
            >
              Details
            </button>
            <button
              type="button"
              className="button-brass-outline product-quote-btn"
              onClick={() => onEnquireProduct && onEnquireProduct(item)}
              aria-label={`Request quote for ${item.title}`}
            >
              <MessageSquareQuote size={14} />
              <span>Quote</span>
            </button>
          </div>
        </div>
      </article>
    )
  }

  // Category card
  return (
    <article
      className="category-card"
      role="button"
      tabIndex={0}
      onClick={() => onSelectCategory && onSelectCategory(item.title)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelectCategory && onSelectCategory(item.title)
        }
      }}
      aria-label={`Explore ${item.title} collection`}
    >
      <div className="category-image-frame">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          onError={handleImageError}
          className="category-card-img"
        />
        <div className="category-overlay-gradient" />
        {item.itemCount && (
          <span className="category-count-badge">{item.itemCount}</span>
        )}
      </div>

      <div className="category-content">
        <div className="category-text">
          <h3 className="category-title">{item.title}</h3>
          <p className="category-description">{item.description}</p>
        </div>
        <div className="category-action-link">
          <span>Browse range</span>
          <span className="round-arrow" aria-hidden="true">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </article>
  )
}