import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '../../data/products'
import ProductCard from '../../components/cards/ProductCard'
import './Shop.css'

const CATEGORIES = ['All', 'Dresses', 'Accessories', 'Outerwear']

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [active, setActive] = useState('All')

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat && CATEGORIES.includes(cat)) setActive(cat)
    else setActive('All')
  }, [searchParams])

  function selectCategory(cat) {
    setActive(cat)
    setSearchParams(cat === 'All' ? {} : { category: cat })
  }

  const filtered = active === 'All'
    ? products
    : products.filter(p => p.category === active)

  return (
    <section className="shop">
      <div className="shop-header">
        <p className="shop-label">THE COLLECTION</p>
        <h1 className="shop-heading">All Pieces</h1>
      </div>
      <div className="shop-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filter-btn${active === cat ? ' active' : ''}`}
            onClick={() => selectCategory(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="shop-grid">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Shop