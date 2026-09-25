const priceFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

export const formatPrice = (value) => priceFormatter.format(value)

// FakeStoreAPI devuelve las categorías en inglés
const CATEGORY_LABELS = {
  electronics: 'Electrónica',
  jewelery: 'Joyería',
  "men's clothing": 'Ropa de hombre',
  "women's clothing": 'Ropa de mujer',
}

export const categoryLabel = (category) =>
  CATEGORY_LABELS[category] ??
  category.charAt(0).toUpperCase() + category.slice(1)
