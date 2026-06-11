import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FALLBACK_IMG } from '../data/products';

export default function ProductCard({ product, index = 0 }) {
  const { toggleWishlist, isWishlisted, addToCart, addToast } = useApp();
  const [heartPulse, setHeartPulse] = useState(false);
  const [cartFlash, setCartFlash] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const wishlisted = isWishlisted(product.id);
  const discount = Math.round(((product.original - product.price) / product.original) * 100);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1, rootMargin: '50px' });
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleHeart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHeartPulse(true);
    toggleWishlist(product);
    setTimeout(() => setHeartPulse(false), 400);
    if (!wishlisted) addToast('♡ Saved to wishlist!', 'pink');
    else addToast('✕ Removed from wishlist', 'muted');
  };

  const handleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 'M', 1);
    setCartFlash(true);
    addToast('✓ Added to cart!');
    setTimeout(() => setCartFlash(false), 1200);
  };

  const handleImgLoad = (e) => {
    setImgLoaded(true);
    setImgError(false);
    e.target.classList.add('loaded');
  };

  const handleImgError = (e) => {
    setImgError(true);
    setImgLoaded(true);
    e.target.src = FALLBACK_IMG;
    e.target.classList.add('loaded');
  };

  const displayImg = imgError ? FALLBACK_IMG : product.image;

  return (
    <div
      ref={cardRef}
      className={`product-card card-enter${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <Link to={`/product/${product.id}`}>
        <div className="product-card-img">
          {!imgLoaded && <div className="img-skeleton" />}
          <img
            src={displayImg}
            alt={product.name}
            loading="lazy"
            onLoad={handleImgLoad}
            onError={handleImgError}
            className={imgLoaded ? 'loaded' : ''}
          />
          <span className="product-badge">{product.badge}</span>
          <button
            className={`product-heart${wishlisted ? ' active' : ''}${heartPulse ? ' pulse' : ''}`}
            onClick={handleHeart}
            aria-label="Toggle wishlist"
          >
            {wishlisted ? '♥' : '♡'}
          </button>
          <div className="product-actions">
            <button className={`add-cart-btn${cartFlash ? ' flash' : ''}`} onClick={handleCart}>
              {cartFlash ? '✓ Added!' : 'Add to Cart'}
            </button>
            <Link to={`/product/${product.id}`} className="quick-view-btn" onClick={e => e.stopPropagation()}>👁</Link>
          </div>
        </div>
        <div className="product-info">
          <div className="product-category">{product.category}</div>
          <div className="product-name">{product.name}</div>
          <div className="product-price">
            <span className="price-current">₹{product.price.toLocaleString()}</span>
            <span className="price-original">₹{product.original.toLocaleString()}</span>
            <span className="price-discount">{discount}% off</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
