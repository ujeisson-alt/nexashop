import './SkeletonCard.css'

// Placeholder animado mientras cargan los productos
function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-card__image" />
      <div className="skeleton-card__body">
        <div className="skeleton skeleton-card__line skeleton-card__line--sm" />
        <div className="skeleton skeleton-card__line" />
        <div className="skeleton skeleton-card__line skeleton-card__line--md" />
        <div className="skeleton skeleton-card__button" />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="product-grid" role="status" aria-label="Cargando productos">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
      <span className="sr-only">Cargando productos…</span>
    </div>
  )
}

export default SkeletonCard
