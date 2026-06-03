import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import './Categories.css'

const CATEGORY_LIST = [
  { name: 'Dresses',     image: 'https://loremflickr.com/600/400/dress?lock=5' },
  { name: 'Accessories', image: 'https://loremflickr.com/600/400/handbag?lock=5' },
  { name: 'Outerwear',   image: 'https://loremflickr.com/600/400/coat?lock=5' },
]

function Categories() {
  return (
    <section className="categories">
      <div className="section-header">
        <p className="section-eyebrow">EXPLORE BY</p>
        <h2 className="section-title">Collections</h2>
      </div>
      <div className="categories-grid">
        {CATEGORY_LIST.map(({ name, image }) => {
          const count = products.filter(p => p.category === name).length
          return (
            <Link key={name} to={`/shop?category=${name}`} className="category-card">
              <img src={image} alt={name} className="category-card-img" />
              <div className="category-card-content">
                <p className="category-name">{name.toUpperCase()}</p>
                <p className="category-count">{count} pieces</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Categories
