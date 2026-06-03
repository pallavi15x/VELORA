import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-logo">V E L O R A</p>
      <ul className="footer-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/shop?category=Dresses">Dresses</Link></li>
        <li><Link to="/shop?category=Accessories">Accessories</Link></li>
        <li><Link to="/shop?category=Outerwear">Outerwear</Link></li>
      </ul>
      <p className="footer-copy">© {new Date().getFullYear()} Velora. All rights reserved.</p>
    </footer>
  )
}

export default Footer
