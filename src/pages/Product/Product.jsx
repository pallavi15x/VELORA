import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { products } from '../../data/products'
import { useCart } from '../../context/CartContext'
import './Product.css'

function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const product = products.find(p => p.id === id)
  const [selectedSize, setSelectedSize] = useState(null)

  if (!product) {
    return (
      <section className="product-detail">
        <p className="product-not-found">Product not found.</p>
        <Link to="/shop" className="product-back">← BACK TO SHOP</Link>
      </section>
    )
  }

  function handleAddToCart() {
    addToCart(product, selectedSize ?? product.sizes[0])
    navigate('/cart')
  }

  return (
    <section className="product-detail">
      <Link to="/shop" className="product-back">← BACK TO SHOP</Link>
      <div className="product-layout">
        <div className="product-image-wrap">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <p className="product-category">{product.category.toUpperCase()}</p>
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">${product.price.toLocaleString()}</p>
          <p className="product-desc">{product.description}</p>
          <p className="product-sizes-label">SELECT SIZE</p>
          <div className="product-sizes">
            {product.sizes.map(size => (
              <button
                key={size}
                className={`size-btn${selectedSize === size ? ' selected' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>
      </div>
    </section>
  )
}

export default Product
