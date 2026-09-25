import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { categoryLabel, formatPrice } from '../../utils/format'
import './CartItem.css'

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()
  const { id, title, price, image, category, quantity } = item

  return (
    <li className="cart-item">
      <Link to={`/producto/${id}`} className="cart-item__product">
        <img src={image} alt={title} loading="lazy" className="cart-item__image" />
        <div className="cart-item__info">
          <span className="cart-item__category">{categoryLabel(category)}</span>
          <span className="cart-item__title">{title}</span>
        </div>
      </Link>

      <span className="cart-item__price" data-label="Precio">
        {formatPrice(price)}
      </span>

      <div className="cart-item__qty" data-label="Cantidad">
        <div className="qty qty--sm" role="group" aria-label={`Cantidad de ${title}`}>
          <button
            type="button"
            className="qty__btn"
            onClick={() => updateQuantity(id, quantity - 1)}
            aria-label={quantity === 1 ? 'Quitar producto del carrito' : 'Disminuir cantidad'}
          >
            −
          </button>
          <span className="qty__value">{quantity}</span>
          <button
            type="button"
            className="qty__btn"
            onClick={() => updateQuantity(id, quantity + 1)}
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
      </div>

      <span className="cart-item__subtotal" data-label="Subtotal">
        {formatPrice(price * quantity)}
      </span>

      <button
        type="button"
        className="cart-item__remove"
        onClick={() => removeFromCart(id)}
        aria-label={`Eliminar ${title} del carrito`}
        title="Eliminar"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            fill="currentColor"
            d="M9 3h6l1 2h4v2H4V5h4l1-2Zm-3 6h12l-1 12H7L6 9Zm4 2v8h2v-8h-2Zm4 0v8h2v-8h-2Z"
          />
        </svg>
        <span className="cart-item__remove-text">Eliminar</span>
      </button>
    </li>
  )
}

export default memo(CartItem)
