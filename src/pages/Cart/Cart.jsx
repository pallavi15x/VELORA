import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './Cart.css'

function Cart() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart()

  if (items.length === 0) {
    return (
      <section className="cart">
        <p className="cart-label">YOUR CART</p>
        <h1 className="cart-heading">Shopping Cart</h1>
        <div className="cart-empty">
          <p className="cart-empty-msg">Your cart is empty.</p>
          <Link to="/shop" className="cart-empty-link">CONTINUE SHOPPING</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="cart">
      <p className="cart-label">YOUR CART</p>
      <h1 className="cart-heading">Shopping Cart</h1>
      <ul className="cart-items">
        {items.map(item => (
          <li key={`${item.id}-${item.size}`} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-info">
              <p className="cart-item-name">{item.name}</p>
              <p className="cart-item-meta">{item.category} · Size: {item.size}</p>
              <p className="cart-item-price">${(item.price * item.quantity).toLocaleString()}</p>
            </div>
            <div className="cart-item-controls">
              <div className="qty-controls">
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                >−</button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                >+</button>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id, item.size)}
              >REMOVE</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <div className="cart-total-row">
          <span className="cart-total-label">TOTAL</span>
          <span className="cart-total-value">${cartTotal.toLocaleString()}</span>
        </div>
        <button className="checkout-btn">CHECKOUT</button>
        <Link to="/shop" className="continue-link">← CONTINUE SHOPPING</Link>
      </div>
    </section>
  )
}

export default Cart
