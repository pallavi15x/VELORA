import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FALLBACK_IMG } from '../data/products';


export default function Cart() {
  const { cart, cartTotal, updateCartQty, removeFromCart } = useApp();
  const [removingKey, setRemovingKey] = useState(null);

  const shipping = cartTotal >= 999 ? 0 : 99;
  const total = cartTotal + shipping;
  const progress = Math.min((cartTotal / 999) * 100, 100);

  const handleRemove = (key) => {
    setRemovingKey(key);
    setTimeout(() => { removeFromCart(key); setRemovingKey(null); }, 400);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page page-enter">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛍</div>
          <h1>Your cart is empty</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Looks like you haven't added anything yet</p>
          <Link to="/shop" className="btn btn-primary" style={{ marginTop: 24 }}>Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page page-enter">
      <h1>Shopping Cart</h1>
      <div className="cart-layout">
        <div>
          {cart.map(item => (
            <div key={item.key} className={`cart-item${removingKey === item.key ? ' removing' : ''}`}>
              <div className="cart-item-img">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={e => { e.target.src = FALLBACK_IMG; e.target.classList.add('loaded'); }}
                  onLoad={e => e.target.classList.add('loaded')}
                />
              </div>
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cat">{item.category}</div>
                <span className="cart-item-size">Size: {item.size}</span>
                <div className="cart-item-actions">
                  <div className="qty-control">
                    <button className="qty-btn" onClick={() => updateCartQty(item.key, item.qty - 1)}>−</button>
                    <span className="qty-num">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateCartQty(item.key, item.qty + 1)}>+</button>
                  </div>
                  <button className="cart-remove" onClick={() => handleRemove(item.key)}>🗑</button>
                  <span className="cart-item-total">₹{(item.price * item.qty).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row muted"><span>Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
          <div className="summary-row muted"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
          <div className="shipping-bar">
            <div className="shipping-bar-label">
              {cartTotal >= 999 ? '✓ You qualify for free shipping!' : `₹${999 - cartTotal} more for free shipping`}
            </div>
            <div className="shipping-bar-track">
              <div className="shipping-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="summary-row total"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16, opacity: 0.7, cursor: 'not-allowed' }} title="Coming Soon">
            Proceed to Checkout — Coming Soon
          </button>
          <Link to="/shop" style={{ display: 'block', textAlign: 'center', marginTop: 12, color: 'var(--accent)', fontSize: 14 }}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
