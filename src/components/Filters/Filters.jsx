import { categoryLabel } from '../../utils/format'
import './Filters.css'

function Filters({ filters, categories, onChange, onClear, hasActiveFilters }) {
  const handleInput = (e) => onChange(e.target.name, e.target.value)

  return (
    <section className="filters" aria-label="Filtros de productos">
      {/* Búsqueda de texto */}
      <div className="filters__search">
        <label htmlFor="search" className="sr-only">
          Buscar productos
        </label>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            fill="currentColor"
            d="M10 2a8 8 0 0 1 6.3 12.9l5.4 5.4-1.4 1.4-5.4-5.4A8 8 0 1 1 10 2Zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z"
          />
        </svg>
        <input
          id="search"
          name="search"
          type="search"
          placeholder="Buscar productos…"
          value={filters.search}
          onChange={handleInput}
          autoComplete="off"
        />
      </div>

      {/* Categorías como chips */}
      <div className="filters__group">
        <span className="filters__label" id="category-label">
          Categoría
        </span>
        <div className="filters__chips" role="radiogroup" aria-labelledby="category-label">
          <button
            type="button"
            role="radio"
            aria-checked={filters.category === ''}
            className={`chip ${filters.category === '' ? 'is-active' : ''}`}
            onClick={() => onChange('category', '')}
          >
            Todas
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="radio"
              aria-checked={filters.category === cat}
              className={`chip ${filters.category === cat ? 'is-active' : ''}`}
              onClick={() => onChange('category', cat)}
            >
              {categoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      <div className="filters__row">
        {/* Precio mínimo / máximo */}
        <div className="filters__group">
          <span className="filters__label">Precio (US$)</span>
          <div className="filters__price">
            <label className="sr-only" htmlFor="minPrice">
              Precio mínimo
            </label>
            <input
              id="minPrice"
              name="minPrice"
              type="number"
              min="0"
              inputMode="decimal"
              placeholder="Mín."
              value={filters.minPrice}
              onChange={handleInput}
            />
            <span aria-hidden="true">–</span>
            <label className="sr-only" htmlFor="maxPrice">
              Precio máximo
            </label>
            <input
              id="maxPrice"
              name="maxPrice"
              type="number"
              min="0"
              inputMode="decimal"
              placeholder="Máx."
              value={filters.maxPrice}
              onChange={handleInput}
            />
          </div>
        </div>

        {/* Orden */}
        <div className="filters__group">
          <label className="filters__label" htmlFor="sort">
            Ordenar por
          </label>
          <select id="sort" name="sort" value={filters.sort} onChange={handleInput}>
            <option value="">Relevancia</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="rating">Mejor puntuados</option>
          </select>
        </div>

        <button
          type="button"
          className="btn btn--outline filters__clear"
          onClick={onClear}
          disabled={!hasActiveFilters}
        >
          Limpiar filtros
        </button>
      </div>
    </section>
  )
}

export default Filters
