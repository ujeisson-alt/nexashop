import { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { categoryLabel, formatPrice } from '../../utils/format'
import StarRating from '../StarRating/StarRating'
import './ProductCard.css'

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const { id, title, price, image, category, rating } = product

  // Feedback visual temporal al agregar
  useEffect(() => {
    if (!added) return
    const timer = setTimeout(() => setAdded(false), 1500)
    return () => clearTimeout(timer)
  }, [added])

  const handleAdd = () => {
    addToCart(product, 1)
    setAdded(true)
  }

  return (
    <article className="product-card">
      <Link to={`/producto/${id}`} className="product-card__link">
        <div className="product-card__image-wrapper">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="product-card__image"
          />
        </div>
        <div className="product-card__body">
          <span className="product-card__category">{categoryLabel(category)}</span>
          <h3 className="product-card__title">{title}</h3>
          {rating && <StarRating rate={rating.rate} count={rating.count} />}
          <p className="product-card__price">{formatPrice(price)}</p>
        </div>
      </Link>
      <div className="product-card__actions">
        <button
          type="button"
          className={`btn btn--primary btn--block ${added ? 'is-added' : ''}`}
          onClick={handleAdd}
          aria-label={`Agregar ${title} al carrito`}
        >
          {added ? '✓ ¡Agregado!' : 'Agregar al carrito'}
        </button>
      </div>
    </article>
  )
}

// React.memo: la card solo se vuelve a renderizar si cambia su producto
export default memo(ProductCard)
