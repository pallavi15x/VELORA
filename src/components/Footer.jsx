import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="nav-logo">VELORA</div>
          <p className="footer-tagline">Discover fashion that defines you. Curated styles, premium quality, delivered to your doorstep.</p>
          <div className="social-row">
            {['𝕏', 'f', '◉', 'pin'].map((s, i) => (
              <div key={i} className="social-icon">{s}</div>
            ))}
          </div>
        </div>
        <div>
          <div className="footer-heading">Collections</div>
          <Link to="/shop?gender=women&category=sarees" className="footer-link">Sarees</Link>
          <Link to="/shop?gender=women&category=kurtis" className="footer-link">Kurtis</Link>
          <Link to="/shop?gender=women&category=party" className="footer-link">Party Wear</Link>
          <Link to="/shop?gender=men&category=shirts" className="footer-link">Men Shirts</Link>
          <Link to="/shop?gender=men&category=tshirts" className="footer-link">Men T-Shirts</Link>
        </div>
        <div>
          <div className="footer-heading">Company</div>
          <span className="footer-link">About Us</span>
          <span className="footer-link">Careers</span>
          <span className="footer-link">Press</span>
          <span className="footer-link">Sustainability</span>
        </div>
        <div>
          <div className="footer-heading">Help</div>
          <Link to="/contact" className="footer-link">Contact Us</Link>
          <Link to="/queries" className="footer-link">FAQs</Link>
          <span className="footer-link">Shipping Info</span>
          <span className="footer-link">Returns Policy</span>
        </div>
        <div>
          <div className="footer-heading">Newsletter</div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>Get 10% off your first order + weekly style updates.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input className="newsletter-input" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
            <button type="submit" className="newsletter-btn">→</button>
          </form>
          {subscribed && <div className="newsletter-success">✓ Subscribed! Check your inbox for 10% off.</div>}
        </div>
      </div>
      <div className="trust-bar">
        <span className="trust-bar-item">🔒 SSL Secured</span>
        <span className="trust-bar-item">🚚 Free Delivery ₹999+</span>
        <span className="trust-bar-item">🔄 30-Day Returns</span>
        <span className="trust-bar-item">💳 Secure Payments</span>
        <span className="trust-bar-item">👥 10,000+ Customers</span>
      </div>
      <div className="footer-bottom">
        <span>© 2025 VELORA. All rights reserved.</span>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
