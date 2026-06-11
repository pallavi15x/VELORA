import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const GENDERS = ['all', 'women', 'men'];

const ALL_CATS = {
  all: ['all', 'party', 'sarees', 'kurtis', 'tops', 'jeans', 'shirts', 'tshirts'],
  women: ['all', 'party', 'sarees', 'kurtis', 'tops', 'jeans'],
  men: ['all', 'party', 'jeans', 'shirts', 'tshirts'],
};

const CAT_LABELS = { all: 'All', party: 'Party Wear', sarees: 'Sarees', kurtis: 'Kurtis', tops: 'Tops', jeans: 'Jeans', shirts: 'Shirts', tshirts: 'T-Shirts' };

const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price ↑' },
  { value: 'price-desc', label: 'Price ↓' },
  { value: 'name', label: 'Name A-Z' },
  { value: 'discount', label: 'Best Discount' },
];

export default function Shop() {
  const [params] = useSearchParams();
  const initGender = params.get('gender') || 'all';
  const initCat = params.get('category') || 'all';
  const [gender, setGender] = useState(GENDERS.includes(initGender) ? initGender : 'all');
  const [category, setCategory] = useState(initCat);
  const [sort, setSort] = useState('featured');
  const [search, setSearch] = useState('');
  const [transitioning, setTransitioning] = useState(false);

  // Get available categories based on selected gender
  const availableCategories = ALL_CATS[gender] || ALL_CATS.all;

  // Reset category if it's not available for the selected gender
  useEffect(() => {
    if (!availableCategories.includes(category)) {
      setCategory('all');
    }
  }, [gender, availableCategories, category]);

  useEffect(() => {
    const g = params.get('gender');
    const c = params.get('category');
    if (g && GENDERS.includes(g)) setGender(g);
    if (c && ALL_CATS[g || 'all']?.includes(c)) setCategory(c);
  }, [params]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [gender, category]);

  const updateFilter = (setter, val) => {
    setTransitioning(true);
    setter(val);
    setTimeout(() => setTransitioning(false), 300);
  };

  const handleGenderChange = (newGender) => {
    setTransitioning(true);
    setGender(newGender);
    // Reset category to 'all' when changing gender
    setCategory('all');
    setTimeout(() => setTransitioning(false), 300);
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (gender !== 'all') list = list.filter(p => p.gender === gender);
    if (category !== 'all') list = list.filter(p => p.category === category);
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'name': list.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'discount': list.sort((a, b) => ((b.original - b.price) / b.original) - ((a.original - a.price) / a.original)); break;
      default: break;
    }
    return list;
  }, [gender, category, sort, search]);

  return (
    <div className="page-enter">
      <div className="shop-header">
        <h1>Shop {gender !== 'all' ? `- ${gender.charAt(0).toUpperCase() + gender.slice(1)}'s Collection` : ''}</h1>
        <span>{filtered.length} products</span>
      </div>
      <div className="shop-controls">
        <input
          className="search-input"
          placeholder="Search products..."
          value={search}
          onChange={e => { setSearch(e.target.value); }}
        />
        <div className="pill-group">
          {GENDERS.map(g => (
            <button key={g} className={`pill${gender === g ? ' active' : ''}`} onClick={() => handleGenderChange(g)}>
              {g === 'all' ? 'All' : g.charAt(0).toUpperCase() + g.slice(1)}
            </button>
          ))}
        </div>
        <div className="pill-group">
          {availableCategories.map(c => (
            <button key={c} className={`pill${category === c ? ' active' : ''}`} onClick={() => updateFilter(setCategory, c)}>
              {CAT_LABELS[c]}
            </button>
          ))}
        </div>
        <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
          {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>
      <div className="shop-grid" style={{ transition: 'opacity 0.3s', opacity: transitioning ? 0.3 : 1 }}>
        {filtered.length > 0 ? (
          <div className="products-grid">
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        ) : (
          <div className="shop-empty">
            <p>No products found</p>
            <button onClick={() => { setGender('all'); setCategory('all'); setSearch(''); }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
