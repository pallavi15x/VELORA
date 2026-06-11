import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { theme, toggleTheme, cartCount, wishlistCount } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const links = [
    { to: '/', label: 'Home', icon: '⌂' },
    { to: '/shop', label: 'Shop', icon: '🛍' },
    { to: '/shop?gender=women', label: 'Women', icon: '👗' },
    { to: '/shop?gender=men', label: 'Men', icon: '👔' },
    { to: '/cart', label: 'Cart', icon: '🛒' },
    { to: '/wishlist', label: 'Wish', icon: '♥' },
    { to: '/contact', label: 'Contact', icon: '✉' },
    { to: '/queries', label: 'FAQ', icon: '?' },
  ];

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="nav-logo">
          <span className="nav-logo-icon">✦</span>
          <span className="nav-logo-text">VELORA</span>
        </Link>

        <div className="nav-links">
          {links.map((l, i) => (
            <Link
              key={l.label}
              to={l.to}
              className={`nav-link ${location.pathname === l.to ? 'active' : ''}`}
              onMouseEnter={() => setActiveHover(i)}
              onMouseLeave={() => setActiveHover(null)}
            >
              <span className="nav-link-bg" />
              <span className="nav-link-icon">{l.icon}</span>
              <span className="nav-link-text">{l.label}</span>
              <span className="nav-link-underline" />
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <Link to="/wishlist" className="nav-action-btn wishlist-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {wishlistCount > 0 && <span className="nav-badge">{wishlistCount}</span>}
          </Link>

          <Link to="/cart" className="nav-action-btn cart-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
          </Link>

          <button className="theme-toggle-btn" onClick={toggleTheme}>
            <span className="theme-icon sun">☀</span>
            <span className="theme-icon moon">☾</span>
            <span className="theme-toggle-bg" />
          </button>

          <button className="hamburger" onClick={() => setMobileOpen(true)}>
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`}>
        <div className="mobile-menu-bg" />
        <button className="mobile-close" onClick={() => setMobileOpen(false)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="mobile-menu-content">
          <div className="mobile-logo">VELORA</div>
          <div className="mobile-links">
            {links.map((l, i) => (
              <Link
                key={l.label}
                to={l.to}
                className="mobile-link"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className="mobile-link-icon">{l.icon}</span>
                <span>{l.label}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
          <button className="mobile-theme-btn" onClick={toggleTheme}>
            <span>{theme === 'dark' ? '☀' : '☾'}</span>
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>
    </>
  );
}

