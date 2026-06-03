import { products } from '../../data/products'
import ProductCard from '../cards/ProductCard'
import './FeaturedProducts.css'

function FeaturedProducts() {
  const featured = products.filter(p => p.featured).slice(0, 4)

  return (
    <section className="featured">
      <div className="section-header">
        <p className="section-eyebrow">CURATED SELECTION</p>
        <h2 className="section-title">Featured Pieces</h2>
      </div>
      <div className="featured-grid">
        {featured.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedProducts
