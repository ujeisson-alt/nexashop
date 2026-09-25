import { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CartItem from '../components/CartItem/CartItem'
import ConfirmModal from '../components/ConfirmModal/ConfirmModal'
import { useCart } from '../context/CartContext'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { formatPrice } from '../utils/format'
import './CartPage.css'

const FREE_SHIPPING_FROM = 100
const SHIPPING_COST = 9.99

function CartPage() {
  useDocumentTitle('Carrito')
  const { items, totalItems, totalPrice, clearCart } = useCart()
  const [modal, setModal] = useState(null) // 'checkout' | 'clear' | null
  const navigate = useNavigate()

  const closeModal = useCallback(() => setModal(null), [])

  const shipping = totalPrice >= FREE_SHIPPING_FROM ? 0 : SHIPPING_COST
  const total = totalPrice + shipping
  const missingForFree = FREE_SHIPPING_FROM - totalPrice

  const handleCheckout = () => {
    clearCart()
    setModal(null)
    navigate('/', { state: { orderPlaced: true } })
  }

  const handleClear = () => {
    clearCart()
    setModal(null)
  }

  if (items.length === 0) {
    return (
      <>
        <h1 className="page-title">Tu carrito</h1>
        <div className="state-box">
          <span className="state-box__icon" aria-hidden="true">🛒</span>
          <p className="state-box__title">Tu carrito está vacío</p>
          <p>Todavía no agregaste productos. ¡Explorá el catálogo y encontrá algo que te guste!</p>
          <Link to="/" className="btn btn--primary">
            Ir a la tienda
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="cart__header">
        <h1 className="page-title">
          Tu carrito <span className="cart__count">({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span>
        </h1>
        <button type="button" className="btn btn--ghost" onClick={() => setModal('clear')}>
          Vaciar carrito
        </button>
      </div>

      <div className="cart">
        <section className="cart__items" aria-label="Productos en el carrito">
          <div className="cart__table-head" aria-hidden="true">
            <span>Producto</span>
            <span>Precio</span>
            <span>Cantidad</span>
            <span>Subtotal</span>
            <span />
          </div>
          <ul className="cart__list">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
          <Link to="/" className="btn btn--ghost cart__continue">
            ← Seguir comprando
          </Link>
        </section>

        <aside className="summary" aria-label="Resumen de compra">
          <h2 className="summary__title">Resumen</h2>
          <dl className="summary__rows">
            <div>
              <dt>Subtotal</dt>
              <dd>{formatPrice(totalPrice)}</dd>
            </div>
            <div>
              <dt>Envío</dt>
              <dd>{shipping === 0 ? <span className="summary__free">Gratis</span> : formatPrice(shipping)}</dd>
            </div>
            <div className="summary__total">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>

          {missingForFree > 0 && (
            <p className="summary__hint">
              Te faltan <strong>{formatPrice(missingForFree)}</strong> para tener envío gratis.
            </p>
          )}

          <button
            type="button"
            className="btn btn--primary btn--block summary__checkout"
            onClick={() => setModal('checkout')}
          >
            Finalizar compra
          </button>
          <p className="summary__secure">🔒 Pago simulado — no se realizan cobros reales</p>
        </aside>
      </div>

      <ConfirmModal
        open={modal === 'checkout'}
        title="¿Confirmar compra?"
        confirmText="Confirmar compra"
        onConfirm={handleCheckout}
        onCancel={closeModal}
      >
        Vas a comprar {totalItems} {totalItems === 1 ? 'producto' : 'productos'} por un total de{' '}
        <strong>{formatPrice(total)}</strong>.
      </ConfirmModal>

      <ConfirmModal
        open={modal === 'clear'}
        title="¿Vaciar el carrito?"
        confirmText="Sí, vaciar"
        onConfirm={handleClear}
        onCancel={closeModal}
      >
        Se van a eliminar todos los productos de tu carrito.
      </ConfirmModal>
    </>
  )
}

export default CartPage
