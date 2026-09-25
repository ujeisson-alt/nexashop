import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import RelatedProducts from '../components/RelatedProducts/RelatedProducts'
import StarRating from '../components/StarRating/StarRating'
import { useCart } from '../context/CartContext'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { useProduct } from '../hooks/useProducts'
import { categoryLabel, formatPrice } from '../utils/format'
import './ProductDetail.css'

function DetailSkeleton() {
  return (
    <div className="detail" aria-hidden="true">
      <div className="skeleton detail__image-wrapper" />
      <div className="detail__info">
        <div className="skeleton" style={{ height: 14, width: '30%' }} />
        <div className="skeleton" style={{ height: 32, width: '90%' }} />
        <div className="skeleton" style={{ height: 20, width: '40%' }} />
        <div className="skeleton" style={{ height: 36, width: '35%' }} />
        <div className="skeleton" style={{ height: 96 }} />
      </div>
    </div>
  )
}

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { product, loading, error, retry } = useProduct(id)
  const { addToCart, getItemQuantity } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useDocumentTitle(product?.title ?? (loading ? 'Cargando…' : 'Producto'))

  useEffect(() => {
    if (!added) return
    const timer = setTimeout(() => setAdded(false), 2000)
    return () => clearTimeout(timer)
  }, [added])

  if (loading) return <DetailSkeleton />

  if (error || !product) {
    return (
      <div className="state-box" role="alert">
        <span className="state-box__icon" aria-hidden="true">📦</span>
        <p className="state-box__title">
          {error ? 'No pudimos cargar el producto' : 'Producto no encontrado'}
        </p>
        <p>{error ?? 'El producto que buscás no existe o fue eliminado.'}</p>
        <div style={{ display: 'flex', gap: 8 }}>
          {error && (
            <button type="button" className="btn btn--outline" onClick={retry}>
              Reintentar
            </button>
          )}
          <Link to="/" className="btn btn--primary">
            Volver a la tienda
          </Link>
        </div>
      </div>
    )
  }

  const inCart = getItemQuantity(product.id)

  const handleAdd = () => {
    addToCart(product, quantity)
    setAdded(true)
    setQuantity(1)
  }

  return (
    <>
      <nav className="breadcrumb" aria-label="Ruta de navegación">
        <ol>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to={`/?categoria=${encodeURIComponent(product.category)}`}>
              {categoryLabel(product.category)}
            </Link>
          </li>
          <li aria-current="page">
            <span>{product.title}</span>
          </li>
        </ol>
      </nav>

      <article className="detail">
        <div className="detail__image-wrapper">
          <img src={product.image} alt={product.title} className="detail__image" />
        </div>

        <div className="detail__info">
          <span className="detail__category">{categoryLabel(product.category)}</span>
          <h1 className="detail__title">{product.title}</h1>
          <StarRating rate={product.rating.rate} count={product.rating.count} size="lg" />
          <p className="detail__price">{formatPrice(product.price)}</p>
          <p className="detail__description">{product.description}</p>

          <div className="detail__buy">
            <div className="qty" role="group" aria-label="Cantidad">
              <button
                type="button"
                className="qty__btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <span className="qty__value" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                className="qty__btn"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className={`btn btn--primary detail__add ${added ? 'is-added' : ''}`}
              onClick={handleAdd}
            >
              {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
            </button>
          </div>

          {inCart > 0 && (
            <p className="detail__in-cart">
              Tenés {inCart} {inCart === 1 ? 'unidad' : 'unidades'} en el carrito ·{' '}
              <button type="button" className="link-btn" onClick={() => navigate('/carrito')}>
                Ver carrito
              </button>
            </p>
          )}

          <ul className="detail__perks">
            <li>🚚 Envío gratis en compras mayores a US$ 100</li>
            <li>↩️ 30 días para cambios y devoluciones</li>
            <li>🔒 Compra protegida</li>
          </ul>
        </div>
      </article>

      <RelatedProducts category={product.category} currentId={product.id} />
    </>
  )
}

// key={id}: al navegar a otro producto (ej: desde relacionados) el componente
// se monta de nuevo y la cantidad vuelve a 1 sin necesidad de efectos extra.
function ProductDetailPage() {
  const { id } = useParams()
  return <ProductDetail key={id} />
}

export default ProductDetailPage
