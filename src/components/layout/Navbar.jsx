import { NavLink, Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './Navbar.css'

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}

function Navbar() {
  const { cartCount } = useCart()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">V E L O R A</Link>
      <ul className="navbar-links">
        <li><NavLink to="/" end>HOME</NavLink></li>
        <li><NavLink to="/shop">SHOP</NavLink></li>
        <li><NavLink to="/shop?category=all">CATEGORIES</NavLink></li>
      </ul>
      <div className="navbar-actions">
        <button className="navbar-icon-btn" aria-label="Account">
          <UserIcon />
        </button>
        <Link to="/cart" className="navbar-icon-btn cart-btn" aria-label="Cart">
          <CartIcon />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
