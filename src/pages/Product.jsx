import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, FALLBACK_IMG } from '../data/products';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isWishlisted, addToast } = useApp();
  const product = products.find(p => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState('M');
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('details');
  const [mainImg, setMainImg] = useState(product?.image || FALLBACK_IMG);
  const [mainImgLoaded, setMainImgLoaded] = useState(false);
  const [mainImgError, setMainImgError] = useState(false);
  const [thumbLoaded, setThumbLoaded] = useState({});
  const [thumbErrors, setThumbErrors] = useState({});

  if (!product) return <div className="shop-empty"><p>Product not found</p><Link to="/shop" className="btn btn-primary">Back to Shop</Link></div>;

  const wishlisted = isWishlisted(product.id);
  const discount = Math.round(((product.original - product.price) / product.original) * 100);
  const savings = product.original - product.price;

  const related = products.filter(p => p.category === product.category && p.gender === product.gender && p.id !== product.id).slice(0, 4);
  const galleryImages = [product.image, ...related.slice(0, 3).map(r => r.image)];

  const handleAddCart = () => {
    addToCart(product, selectedSize, qty);
    addToast('✓ Added to cart!');
  };

  const handleHeart = () => {
    toggleWishlist(product);
    if (!wishlisted) addToast('♡ Saved to wishlist!', 'pink');
    else addToast('✕ Removed from wishlist', 'muted');
  };

  const handleMainImgLoad = (e) => {
    e.target.classList.add('loaded');
    setMainImgLoaded(true);
  };

  const handleMainImgError = (e) => {
    setMainImgError(true);
    setMainImgLoaded(true);
    e.target.src = FALLBACK_IMG;
    e.target.classList.add('loaded');
  };

  const displayMainImg = mainImgError ? FALLBACK_IMG : mainImg;

  const tabs = {
    details: `This ${product.name} is crafted from premium quality fabric with attention to every detail. Perfect for ${product.category === 'sarees' || product.category === 'kurtis' ? 'festive occasions and celebrations' : 'everyday wear and special outings'}. The design combines traditional aesthetics with modern sensibility.`,
    care: 'Hand wash or gentle machine wash in cold water. Do not bleach. Dry in shade. Iron on low heat. Store in a cool, dry place away from direct sunlight.',
    shipping: 'Free shipping on orders above ₹999. Standard delivery in 5-7 business days. Express delivery available at checkout for 2-3 business days. All orders are tracked and insured.',
  };

  return (
    <div className="page-enter">
      <div className="product-detail">
        <div className="detail-gallery">
          {!mainImgLoaded && <div className="img-skeleton" style={{ aspectRatio: '3/4', position: 'relative' }} />}
          <img
            src={displayMainImg}
            alt={product.name}
            loading="lazy"
            onLoad={handleMainImgLoad}
            onError={handleMainImgError}
            className={mainImgLoaded ? 'loaded' : ''}
            style={{ position: mainImgLoaded ? 'relative' : 'absolute', inset: 0 }}
          />
          <div className="detail-thumbs">
            {galleryImages.map((img, i) => {
              const thumbSrc = thumbErrors[i] ? FALLBACK_IMG : img;
              return (
                <div
                  key={i}
                  className={`detail-thumb${mainImg === img ? ' active' : ''}`}
                  onClick={() => { setMainImg(img); setMainImgLoaded(false); setMainImgError(false); }}
                >
                  {!thumbLoaded[i] && <div className="skeleton" style={{ width: '100%', height: '100%' }} />}
                  <img
                    src={thumbSrc}
                    alt=""
                    loading="lazy"
                    onError={(e) => { e.target.src = FALLBACK_IMG; setThumbErrors(p => ({ ...p, [i]: true })); setThumbLoaded(p => ({ ...p, [i]: true })); }}
                    onLoad={(e) => { e.target.classList.add('loaded'); setThumbLoaded(p => ({ ...p, [i]: true })); }}
                    style={{ opacity: thumbLoaded[i] ? 1 : 0, transition: 'opacity 0.3s' }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="detail-info">
          <div className="detail-category">{product.category}</div>
          <h1 className="detail-name">{product.name}</h1>
          <div className="detail-rating">★★★★☆</div>
          <div className="detail-price-row">
            <span className="price-current" style={{ fontSize: 28 }}>₹{product.price.toLocaleString()}</span>
            <span className="price-original" style={{ fontSize: 16 }}>₹{product.original.toLocaleString()}</span>
            <span className="detail-save">You save ₹{savings.toLocaleString()} ({discount}%)</span>
          </div>
          <p className="detail-desc">{product.desc}</p>
          <div className="size-selector">
            {SIZES.map(s => (
              <button key={s} className={`size-btn${selectedSize === s ? ' active' : ''}`} onClick={() => setSelectedSize(s)}>{s}</button>
            ))}
          </div>
          <div>
            <div className="qty-control">
              <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span className="qty-num">{qty}</span>
              <button className="qty-btn" onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>
          <div className="detail-actions">
            <button className="btn btn-primary" onClick={handleAddCart}>Add to Cart</button>
            <button className={`heart-btn${wishlisted ? ' active' : ''}`} onClick={handleHeart}>
              {wishlisted ? '♥' : '♡'}
            </button>
          </div>
          <div className="trust-badges">
            <span className="trust-badge">🚚 Free Shipping</span>
            <span className="trust-badge">🔄 30-Day Returns</span>
            <span className="trust-badge">🔒 Secure</span>
          </div>
          <div className="detail-tabs">
            <div className="tab-headers">
              {Object.keys(tabs).map(t => (
                <button key={t} className={`tab-header${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <div className="tab-content" key={activeTab}>{tabs[activeTab]}</div>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <div className="related-section">
          <h3>Related Products</h3>
          <div className="products-grid">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}
