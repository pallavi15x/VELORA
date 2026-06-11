import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products, categories, FALLBACK_IMG } from '../data/products';
import ProductCard from '../components/ProductCard';

const MARQUEE_TEXT = 'NEW ARRIVALS ✦ FREE SHIPPING ₹999+ ✦ SAREES ✦ KURTIS ✦ PARTY WEAR ✦ MEN\'S COLLECTION ✦ ';

function CategoryCard({ cat, onClick, index }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const displayImg = imgError ? FALLBACK_IMG : cat.image;

  return (
    <div className="category-card" onClick={onClick} style={{ '--delay': `${index * 0.08}s` }}>
      {!imgLoaded && <div className="img-skeleton" />}
      <img
        src={displayImg}
        alt={cat.name}
        loading="lazy"
        onError={() => { setImgError(true); setImgLoaded(true); }}
        onLoad={(e) => { e.target.classList.add('loaded'); setImgLoaded(true); }}
        className={imgLoaded ? 'loaded' : ''}
      />
      <div className="category-overlay" />
      <span className="category-badge">{cat.gender}</span>
      <div className="category-info">
        <div className="category-name">{cat.name}</div>
        <div className="category-count">{cat.count} items</div>
      </div>
      <span className="category-arrow">→</span>
      <div className="category-glow" />
    </div>
  );
}

function HeroImage() {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div className="hero-image-wrap">
      {!imgLoaded && <div className="img-skeleton" style={{ position: 'relative', aspectRatio: '3/4' }} />}
      <img
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=85"
        alt="Fashion"
        loading="eager"
        onLoad={(e) => { e.target.classList.add('loaded'); setImgLoaded(true); }}
        className={imgLoaded ? 'loaded' : ''}
        style={{ position: imgLoaded ? 'relative' : 'absolute', inset: 0 }}
      />
      <span className="hero-badge">New Arrivals 2025</span>
      <span className="hero-pill hero-pill-1">10K+ Customers</span>
      <span className="hero-pill hero-pill-2">Free Shipping</span>
      <span className="hero-pill hero-pill-3">Premium Quality</span>
    </div>
  );
}

function StatCounter({ value, label, delay }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const target = parseInt(value);
        let start = 0;
        const step = target / 40;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 30);
        return () => clearInterval(timer);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="stat-counter" style={{ '--delay': `${delay}s` }}>
      <div className="stat-value">{count}{value.includes('+') ? '+' : ''}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const fadeRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '50px' });
    fadeRefs.current.forEach(el => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addRef = (i) => (el) => { fadeRefs.current[i] = el; };

  const featured = products.filter(p => p.badge === 'Bestseller').slice(0, 4);
  const trending = products.filter(p => p.badge === 'Trending' || p.badge === 'Hot').slice(0, 4);

  return (
    <div className="home-page page-enter">
      <section className="hero">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-dots" />
        <div className="hero-grid-bg" />
        <div className="hero-shapes">
          <div className="hero-shape shape-1" />
          <div className="hero-shape shape-2" />
          <div className="hero-shape shape-3" />
        </div>
        <div className="hero-inner">
          <div className="hero-content">
            <span className="hero-tag">✨ Premium Fashion Store</span>
            <h1>Fashion That Moves With You</h1>
            <p>Discover the latest trends in ethnic wear, party outfits, and everyday fashion. Curated styles for every occasion.</p>
            <div className="hero-buttons">
              <Link to="/shop" className="btn btn-primary">
                <span>Shop Now</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/shop?gender=women" className="btn btn-outline">Explore Women</Link>
            </div>
            <div className="hero-stats">
              <StatCounter value="50" label="Brands" delay="0.1" />
              <StatCounter value="10" label="K+ Customers" delay="0.2" />
              <StatCounter value="500" label="Products" delay="0.3" />
            </div>
          </div>
          <HeroImage />
        </div>
        <div className="hero-scroll">
          <div className="scroll-indicator">
            <span />
          </div>
          <span>Scroll Down</span>
        </div>
      </section>

      <div className="marquee-strip">
        <div className="marquee-track">
          {MARQUEE_TEXT}{MARQUEE_TEXT}{MARQUEE_TEXT}
        </div>
      </div>

      <div className="features-bar fade-section" ref={addRef(0)}>
        <div className="feature-item">
          <div className="feature-icon-wrap">
            <div className="feature-icon">🚚</div>
          </div>
          <div className="feature-title">Free Shipping</div>
          <div className="feature-sub">Orders above ₹999</div>
        </div>
        <div className="feature-item">
          <div className="feature-icon-wrap">
            <div className="feature-icon">🔄</div>
          </div>
          <div className="feature-title">Easy Returns</div>
          <div className="feature-sub">30-day hassle-free</div>
        </div>
        <div className="feature-item">
          <div className="feature-icon-wrap">
            <div className="feature-icon">🔒</div>
          </div>
          <div className="feature-title">Secure Payments</div>
          <div className="feature-sub">100% safe checkout</div>
        </div>
        <div className="feature-item">
          <div className="feature-icon-wrap">
            <div className="feature-icon">💬</div>
          </div>
          <div className="feature-title">24/7 Support</div>
          <div className="feature-sub">Always here to help</div>
        </div>
      </div>

      <section className="section categories-section fade-section" ref={addRef(1)}>
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <Link to="/shop" className="section-link">View All →</Link>
        </div>
        <div className="categories-grid">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.slug + cat.gender}
              cat={cat}
              index={i}
              onClick={() => navigate(`/shop?gender=${cat.gender}&category=${cat.slug}`)}
            />
          ))}
        </div>
      </section>

      <section className="section products-section fade-section" ref={addRef(2)}>
        <div className="section-header">
          <h2 className="section-title">Bestsellers</h2>
          <Link to="/shop?badge=Bestseller" className="section-link">See More →</Link>
        </div>
        <div className="products-grid">
          {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      <section className="promo-banner fade-section" ref={addRef(3)}>
        <div className="promo-bg" />
        <div className="promo-content">
          <h3>Get 20% Off Your First Order</h3>
          <p>Sign up for our newsletter and receive exclusive deals</p>
          <Link to="/shop" className="btn btn-primary">Shop Now</Link>
        </div>
      </section>

      <section className="section products-section fade-section" ref={addRef(4)}>
        <div className="section-header">
          <h2 className="section-title">Trending Now</h2>
          <Link to="/shop?badge=Trending" className="section-link">See More →</Link>
        </div>
        <div className="products-grid">
          {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>
    </div>
  );
}
