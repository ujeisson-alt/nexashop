import './StarRating.css'

/**
 * Muestra 5 estrellas llenas / medias / vacías según el rating (0 a 5).
 */
function StarRating({ rate = 0, count, size = 'sm' }) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.min(Math.max(rate - i, 0), 1) // 0, parcial o 1
    return Math.round(fill * 100)
  })

  return (
    <div
      className={`star-rating star-rating--${size}`}
      aria-label={`Puntuación: ${rate.toFixed(1)} de 5${count ? `, ${count} opiniones` : ''}`}
      role="img"
    >
      <span className="star-rating__stars" aria-hidden="true">
        {stars.map((percent, i) => (
          <span key={i} className="star-rating__star">
            <span className="star-rating__fill" style={{ width: `${percent}%` }}>
              ★
            </span>
            ★
          </span>
        ))}
      </span>
      <span className="star-rating__value" aria-hidden="true">
        {rate.toFixed(1)}
        {count !== undefined && <span className="star-rating__count"> ({count})</span>}
      </span>
    </div>
  )
}

export default StarRating
