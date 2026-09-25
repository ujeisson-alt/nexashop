import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Filters from '../components/Filters/Filters'
import ProductList from '../components/ProductList/ProductList'
import { SkeletonGrid } from '../components/SkeletonCard/SkeletonCard'
import { useCategories, useProducts } from '../hooks/useProducts'
import useDocumentTitle from '../hooks/useDocumentTitle'
import './Home.css'

const INITIAL_FILTERS = {
  search: '',
  category: '',
  minPrice: '',
  maxPrice: '',
  sort: '',
}

function Home() {
  useDocumentTitle('Tienda online')
  const { products, loading, error, retry } = useProducts()
  const { categories } = useCategories()
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [orderPlaced, setOrderPlaced] = useState(Boolean(location.state?.orderPlaced))

  // Limpiamos el state de la URL para que el aviso no reaparezca al recargar
  useEffect(() => {
    if (location.state?.orderPlaced) {
      navigate(location.pathname + location.search, { replace: true, state: null })
    }
  }, [location, navigate])

  // La categoría vive en la URL (?categoria=...) para poder compartirla
  // y para que el breadcrumb del detalle pueda linkear a una categoría.
  const category = searchParams.get('categoria') ?? ''
  const [otherFilters, setOtherFilters] = useState(INITIAL_FILTERS)
  const filters = { ...otherFilters, category }

  const handleChange = (name, value) => {
    if (name === 'category') {
      setSearchParams(value ? { categoria: value } : {}, { replace: true })
    } else {
      setOtherFilters((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleClear = () => {
    setOtherFilters(INITIAL_FILTERS)
    setSearchParams({}, { replace: true })
  }

  const hasActiveFilters = Object.keys(INITIAL_FILTERS).some(
    (key) => filters[key] !== INITIAL_FILTERS[key],
  )

  // Filtrado combinado: se recalcula solo cuando cambian productos o filtros
  const filteredProducts = useMemo(() => {
    const filters = { ...otherFilters, category }
    const term = filters.search.trim().toLowerCase()
    const min = filters.minPrice === '' ? 0 : Number(filters.minPrice)
    const max = filters.maxPrice === '' ? Infinity : Number(filters.maxPrice)

    const result = products.filter((p) => {
      const matchesSearch =
        !term ||
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
      const matchesCategory = !filters.category || p.category === filters.category
      const matchesPrice = p.price >= min && p.price <= max
      return matchesSearch && matchesCategory && matchesPrice
    })

    switch (filters.sort) {
      case 'price-asc':
        return [...result].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...result].sort((a, b) => b.price - a.price)
      case 'rating':
        return [...result].sort((a, b) => b.rating.rate - a.rating.rate)
      default:
        return result
    }
  }, [products, otherFilters, category])

  const invalidRange =
    filters.minPrice !== '' &&
    filters.maxPrice !== '' &&
    Number(filters.minPrice) > Number(filters.maxPrice)

  return (
    <>
      {orderPlaced && (
        <div className="home__success" role="status">
          <span>🎉 ¡Gracias por tu compra! Tu pedido fue confirmado.</span>
          <button type="button" aria-label="Cerrar aviso" onClick={() => setOrderPlaced(false)}>
            ✕
          </button>
        </div>
      )}

      <section className="hero">
        <div>
          <p className="hero__eyebrow">Nueva tienda online</p>
          <h1 className="hero__title">Todo lo que buscás, en un solo lugar</h1>
          <p className="hero__text">
            Electrónica, ropa y accesorios con envío a todo el país. Filtrá, compará y armá tu
            carrito en segundos.
          </p>
        </div>
      </section>

      <Filters
        filters={filters}
        categories={categories}
        onChange={handleChange}
        onClear={handleClear}
        hasActiveFilters={hasActiveFilters}
      />

      {invalidRange && (
        <p className="home__warning" role="alert">
          El precio mínimo es mayor que el máximo.
        </p>
      )}

      {loading && <SkeletonGrid />}

      {error && (
        <div className="state-box" role="alert">
          <span className="state-box__icon" aria-hidden="true">⚠️</span>
          <p className="state-box__title">No pudimos cargar los productos</p>
          <p>{error}. Revisá tu conexión e intentá de nuevo.</p>
          <button type="button" className="btn btn--primary" onClick={retry}>
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <p className="home__count" aria-live="polite">
            Mostrando <strong>{filteredProducts.length}</strong> de{' '}
            <strong>{products.length}</strong> productos
          </p>

          {filteredProducts.length > 0 ? (
            <ProductList products={filteredProducts} />
          ) : (
            <div className="state-box">
              <span className="state-box__icon" aria-hidden="true">🔍</span>
              <p className="state-box__title">No encontramos productos</p>
              <p>Probá con otra búsqueda o ajustá los filtros de categoría y precio.</p>
              <button type="button" className="btn btn--primary" onClick={handleClear}>
                Limpiar filtros
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default Home
