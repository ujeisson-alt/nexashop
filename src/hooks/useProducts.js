import { useCallback, useEffect, useState } from 'react'
import {
  clearApiCache,
  getCategories,
  getProductById,
  getProducts,
  getProductsByCategory,
} from '../services/api'

/**
 * Hook genérico: ejecuta una función asíncrona y expone
 * { data, loading, error, retry }.
 */
function useAsync(asyncFn, deps) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let ignore = false // evita actualizar estado si el componente se desmontó
    setLoading(true)
    setError(null)

    asyncFn()
      .then((result) => {
        if (!ignore) setData(result)
      })
      .catch((err) => {
        if (!ignore) setError(err.message || 'Ocurrió un error inesperado')
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt])

  const retry = useCallback(() => {
    clearApiCache()
    setAttempt((n) => n + 1)
  }, [])

  return { data, loading, error, retry }
}

/** Lista completa de productos */
export function useProducts() {
  const { data, ...rest } = useAsync(getProducts, [])
  return { products: data ?? [], ...rest }
}

/** Un producto por ID */
export function useProduct(id) {
  const { data, ...rest } = useAsync(() => getProductById(id), [id])
  return { product: data, ...rest }
}

/** Categorías disponibles */
export function useCategories() {
  const { data, ...rest } = useAsync(getCategories, [])
  return { categories: data ?? [], ...rest }
}

/** Productos relacionados (misma categoría, sin el actual) */
export function useRelatedProducts(category, excludeId, limit = 4) {
  const { data, ...rest } = useAsync(
    () => (category ? getProductsByCategory(category) : Promise.resolve([])),
    [category],
  )
  const related = (data ?? [])
    .filter((p) => p.id !== Number(excludeId))
    .slice(0, limit)
  return { related, ...rest }
}
