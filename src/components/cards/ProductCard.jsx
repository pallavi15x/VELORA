import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './ProductCard.css'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  function handleAddToCart(e) {
    e.preventDefault()
    addToCart(product, product.sizes[0])
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={e => { e.currentTarget.style.display = 'none' }}
        />
        <div className="product-card-overlay">
          <button className="product-card-add-btn" onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>
      </div>
      <p className="product-card-category">{product.category.toUpperCase()}</p>
      <h3 className="product-card-name">{product.name}</h3>
      <p className="product-card-price">${product.price.toLocaleString()}</p>
    </Link>
  )
}

export default ProductCard
