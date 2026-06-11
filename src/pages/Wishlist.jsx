import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist } = useApp();
  const items = products.filter(p => wishlist.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="wishlist-page page-enter">
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">♥</div>
          <h1>Your wishlist is empty</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>Start adding items you love</p>
          <Link to="/shop" className="btn btn-primary" style={{ marginTop: 24 }}>Start Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page page-enter">
      <h1>Wishlist ({items.length})</h1>
      <div className="products-grid">
        {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </div>
  );
}
