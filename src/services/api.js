// Capa de servicios: toda la comunicación con FakeStoreAPI vive acá.
// Los componentes nunca llaman a fetch directamente.
const BASE_URL = 'https://fakestoreapi.com'

// Cache en memoria para no repetir pedidos al navegar entre páginas
const cache = new Map()

async function request(endpoint) {
  if (cache.has(endpoint)) return cache.get(endpoint)

  const response = await fetch(`${BASE_URL}${endpoint}`)
  if (!response.ok) {
    throw new Error(`Error ${response.status}: no se pudo obtener ${endpoint}`)
  }

  // FakeStoreAPI devuelve cuerpo vacío si el producto no existe
  const text = await response.text()
  const data = text ? JSON.parse(text) : null

  cache.set(endpoint, data)
  return data
}

export const getProducts = () => request('/products')

export const getProductById = (id) => request(`/products/${id}`)

export const getCategories = () => request('/products/categories')

export const getProductsByCategory = (category) =>
  request(`/products/category/${encodeURIComponent(category)}`)

export const clearApiCache = () => cache.clear()
