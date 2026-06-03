import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import './Categories.css'

const U = (id) =>
  `https://images.unsplash.com/photo-${id}?w=600&h=400&fit=crop&auto=format&q=80`

const CATEGORY_LIST = [
  { name: 'Dresses',     image: U('1515886657613-9f3515b0c78f') },
  { name: 'Accessories', image: U('1553062407-98eeb64c6a62') },
  { name: 'Outerwear',   image: U('1551232864-3f0890e1776c') },
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
              <img
                src={image}
                alt={name}
                className="category-card-img"
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
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
