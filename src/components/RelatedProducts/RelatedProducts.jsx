import { useRelatedProducts } from '../../hooks/useProducts'
import ProductList from '../ProductList/ProductList'
import { SkeletonGrid } from '../SkeletonCard/SkeletonCard'
import './RelatedProducts.css'

function RelatedProducts({ category, currentId }) {
  const { related, loading, error } = useRelatedProducts(category, currentId, 4)

  if (error || (!loading && related.length === 0)) return null

  return (
    <section className="related" aria-labelledby="related-title">
      <h2 id="related-title" className="related__title">
        También te puede interesar
      </h2>
      {loading ? <SkeletonGrid count={4} /> : <ProductList products={related} />}
    </section>
  )
}

export default RelatedProducts
