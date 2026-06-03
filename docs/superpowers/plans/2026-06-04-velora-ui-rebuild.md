# Velora UI Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Velora luxury fashion e-commerce UI — 4 pages (Home, Shop, Product, Cart), black/gold aesthetic, fade-in animation, mock data, localStorage cart.

**Architecture:** React Context (CartContext) wraps the app for global cart state synced to localStorage. react-router-dom handles client-side routing across 4 pages. Each page composes focused section/card components. CSS custom properties define the design system — no CSS framework.

**Tech Stack:** React 19, Vite 8, react-router-dom v7, Google Fonts CDN (Cinzel / Playfair Display / Inter), plain CSS

> **Note:** No test runner installed. "Verify" steps use the running dev server (`npm run dev`) at `http://localhost:5173`.

---

## File Map

### Created
- `src/data/products.js`
- `src/context/CartContext.jsx`
- `src/components/layout/Navbar.css`
- `src/components/layout/Footer.css`
- `src/components/sections/Hero.css`
- `src/components/sections/FeaturedProducts.css`
- `src/components/sections/Categories.css`
- `src/components/cards/ProductCard.css`
- `src/pages/Shop/Shop.css`
- `src/pages/Product/Product.css`
- `src/pages/Cart/Cart.css`

### Modified
- `index.html` — page title + Google Fonts link tags
- `src/index.css` — design tokens, global reset, shared utilities, fadeIn keyframe
- `src/App.css` — layout wrapper only
- `src/App.jsx` — router + CartProvider + layout shell
- `src/components/layout/Navbar.jsx`
- `src/components/layout/Footer.jsx`
- `src/components/sections/Hero.jsx`
- `src/components/sections/FeaturedProducts.jsx`
- `src/components/sections/Categories.jsx`
- `src/components/cards/ProductCard.jsx`
- `src/pages/Home/Home.jsx`
- `src/pages/Shop/Shop.jsx`
- `src/pages/Product/Product.jsx`
- `src/pages/Cart/Cart.jsx`

---

## Task 1: Install react-router-dom

**Files:**
- Modify: `package.json` (auto-updated by npm)

- [ ] **Step 1: Install**

```powershell
npm install react-router-dom
```
Expected: `added X packages`, no errors.

- [ ] **Step 2: Verify**

```powershell
npm list react-router-dom
```
Expected: `react-router-dom@7.x.x`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install react-router-dom"
```

---

## Task 2: Google Fonts + page title in index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace index.html**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VELORA | Haute Couture &amp; Luxury Fashion</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Inter:wght@200;300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
  </head>
  <body style="margin: 0; background-color: #050505; overflow-x: hidden;">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "chore: Google Fonts and luxury page title in index.html"
```

---

## Task 3: Design system — index.css + App.css

**Files:**
- Modify: `src/index.css`
- Modify: `src/App.css`

- [ ] **Step 1: Replace src/index.css**

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

:root {
  --bg:           #050505;
  --bg-nav:       #111111;
  --gold:         #C9A84C;
  --gold-muted:   #8B6914;
  --gold-hover:   #d4b05a;
  --text-primary: #F5F0E8;
  --text-dim:     #6B6B6B;
  --font-display: 'Cinzel', serif;
  --font-serif:   'Playfair Display', serif;
  --font-sans:    'Inter', sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--text-primary);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: none; }
button { cursor: pointer; }
img { display: block; max-width: 100%; }

/* Shared section header utility — used by FeaturedProducts, Categories */
.section-header {
  text-align: center;
  margin-bottom: 56px;
}

.section-eyebrow {
  font-family: var(--font-display);
  font-size: 0.6rem;
  letter-spacing: 0.45em;
  color: var(--gold);
  margin-bottom: 12px;
}

.section-title {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 400;
  color: var(--text-primary);
}
```

- [ ] **Step 2: Replace src/App.css**

```css
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 100px;
  animation: fadeIn 1.2s ease both;
}
```

- [ ] **Step 3: Verify**

Dev server should show solid black background. Browser console: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/App.css
git commit -m "style: design tokens, global reset, fadeIn keyframe, section utilities"
```

---

## Task 4: Mock product data

**Files:**
- Create: `src/data/products.js`

- [ ] **Step 1: Create products.js**

```js
export const products = [
  {
    id: '1',
    name: 'Midnight Velvet Gown',
    category: 'Dresses',
    price: 2850,
    image: 'https://picsum.photos/seed/velora1/400/520',
    description: 'An exquisite floor-length gown in midnight velvet, draped to perfection for the modern couture woman.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: true,
  },
  {
    id: '2',
    name: 'Silk Éclat Dress',
    category: 'Dresses',
    price: 1980,
    image: 'https://picsum.photos/seed/velora2/400/520',
    description: 'A flowing silk dress with an ethereal finish, perfect for intimate gatherings and evening affairs.',
    sizes: ['XS', 'S', 'M', 'L'],
    featured: true,
  },
  {
    id: '3',
    name: 'Obsidian Column Gown',
    category: 'Dresses',
    price: 3400,
    image: 'https://picsum.photos/seed/velora3/400/520',
    description: 'Structured column silhouette in heavy obsidian crepe — a statement in restrained luxury.',
    sizes: ['S', 'M', 'L', 'XL'],
    featured: false,
  },
  {
    id: '4',
    name: 'Ivory Lace Atelier',
    category: 'Dresses',
    price: 2200,
    image: 'https://picsum.photos/seed/velora4/400/520',
    description: 'Hand-finished ivory lace with delicate embroidery details along the bodice and hem.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
  },
  {
    id: '5',
    name: 'Gold Chain Minaudière',
    category: 'Accessories',
    price: 890,
    image: 'https://picsum.photos/seed/velora5/400/520',
    description: 'An evening clutch with hand-linked gold chains — a timeless companion for gala evenings.',
    sizes: ['One Size'],
    featured: true,
  },
  {
    id: '6',
    name: 'Cashmere Silk Scarf',
    category: 'Accessories',
    price: 450,
    image: 'https://picsum.photos/seed/velora6/400/520',
    description: 'Woven from pure cashmere and silk, printed with our signature house motif.',
    sizes: ['One Size'],
    featured: false,
  },
  {
    id: '7',
    name: 'Baroque Pearl Collar',
    category: 'Accessories',
    price: 1250,
    image: 'https://picsum.photos/seed/velora7/400/520',
    description: 'Freshwater baroque pearls on an 18k gold-fill collar setting, each pearl hand-selected.',
    sizes: ['One Size'],
    featured: false,
  },
  {
    id: '8',
    name: 'Velvet Evening Bag',
    category: 'Accessories',
    price: 720,
    image: 'https://picsum.photos/seed/velora8/400/520',
    description: 'Structured midnight velvet clutch with a faceted gold clasp closure.',
    sizes: ['One Size'],
    featured: true,
  },
  {
    id: '9',
    name: 'Noir Cashmere Coat',
    category: 'Outerwear',
    price: 4200,
    image: 'https://picsum.photos/seed/velora9/400/520',
    description: 'Double-faced cashmere in a refined noir finish, cut with an effortless drape.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: true,
  },
  {
    id: '10',
    name: 'Velvet Opera Cape',
    category: 'Outerwear',
    price: 3100,
    image: 'https://picsum.photos/seed/velora10/400/520',
    description: 'A sweeping opera-length cape in crushed velvet with a silk charmeuse lining.',
    sizes: ['S', 'M', 'L'],
    featured: false,
  },
  {
    id: '11',
    name: 'Tailored Gold Blazer',
    category: 'Outerwear',
    price: 2600,
    image: 'https://picsum.photos/seed/velora11/400/520',
    description: 'Structured blazer in antique gold jacquard, fully lined in duchess satin.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    featured: false,
  },
  {
    id: '12',
    name: 'Ivory Brocade Jacket',
    category: 'Outerwear',
    price: 2950,
    image: 'https://picsum.photos/seed/velora12/400/520',
    description: 'A brocade jacket woven with floral motifs in ivory and champagne thread, fully lined.',
    sizes: ['S', 'M', 'L', 'XL'],
    featured: false,
  },
]
```

- [ ] **Step 2: Commit**

```bash
git add src/data/products.js
git commit -m "feat: mock product data — 12 products across 3 categories"
```

---

## Task 5: CartContext

**Files:**
- Modify: `src/context/CartContext.jsx`

- [ ] **Step 1: Write CartContext.jsx**

```jsx
import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(
        i => i.id === action.product.id && i.size === action.size
      )
      if (existing) {
        return state.map(i =>
          i.id === action.product.id && i.size === action.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...state, { ...action.product, size: action.size, quantity: 1 }]
    }
    case 'REMOVE':
      return state.filter(i => !(i.id === action.id && i.size === action.size))
    case 'UPDATE_QTY':
      if (action.qty <= 0) {
        return state.filter(i => !(i.id === action.id && i.size === action.size))
      }
      return state.map(i =>
        i.id === action.id && i.size === action.size
          ? { ...i, quantity: action.qty }
          : i
      )
    case 'CLEAR':
      return []
    default:
      return state
  }
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('velora-cart')) ?? []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, null, loadCart)

  useEffect(() => {
    localStorage.setItem('velora-cart', JSON.stringify(items))
  }, [items])

  const addToCart = (product, size) =>
    dispatch({ type: 'ADD', product, size })

  const removeFromCart = (id, size) =>
    dispatch({ type: 'REMOVE', id, size })

  const updateQuantity = (id, size, qty) =>
    dispatch({ type: 'UPDATE_QTY', id, size, qty })

  const clearCart = () => dispatch({ type: 'CLEAR' })

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const cartTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
```

- [ ] **Step 2: Commit**

```bash
git add src/context/CartContext.jsx
git commit -m "feat: CartContext with localStorage persistence"
```

---

## Task 6: App.jsx — router + layout shell

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace App.jsx**

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home/Home'
import Shop from './pages/Shop/Shop'
import Product from './pages/Product/Product'
import Cart from './pages/Cart/Cart'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
```

- [ ] **Step 2: Verify**

`http://localhost:5173` — black page, stub text from Navbar/Home/Footer. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: wire router, CartProvider, and layout shell in App.jsx"
```

---

## Task 7: Navbar

**Files:**
- Modify: `src/components/layout/Navbar.jsx`
- Create: `src/components/layout/Navbar.css`

- [ ] **Step 1: Create Navbar.css**

```css
.navbar {
  position: fixed;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 80px);
  max-width: 1200px;
  background: var(--bg-nav);
  border: 1px solid rgba(201, 168, 76, 0.15);
  border-radius: 12px;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  animation: fadeIn 0.8s ease both;
}

.navbar-logo {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.45em;
  color: var(--gold);
}

.navbar-links {
  display: flex;
  gap: 48px;
  list-style: none;
}

.navbar-links a {
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  color: var(--text-primary);
  transition: color 0.2s;
}

.navbar-links a:hover,
.navbar-links a.active {
  color: var(--gold);
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.navbar-icon-btn {
  background: none;
  border: none;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: color 0.2s;
}

.navbar-icon-btn:hover {
  color: var(--gold);
}

.cart-btn {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--gold);
  color: var(--bg);
  font-family: var(--font-sans);
  font-size: 0.6rem;
  font-weight: 700;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
```

- [ ] **Step 2: Write Navbar.jsx**

```jsx
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
```

- [ ] **Step 3: Verify**

`http://localhost:5173` — fixed pill navbar at top. Gold VELORA logo left, HOME/SHOP/CATEGORIES center, user+cart icons right. No console errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navbar.jsx src/components/layout/Navbar.css
git commit -m "feat: Navbar — fixed pill layout with routing and cart badge"
```

---

## Task 8: Hero section

**Files:**
- Modify: `src/components/sections/Hero.jsx`
- Create: `src/components/sections/Hero.css`

- [ ] **Step 1: Create Hero.css**

```css
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 120px 40px 120px;
  position: relative;
  margin-top: -100px;
}

.hero-eyebrow {
  font-family: var(--font-display);
  font-size: 0.62rem;
  letter-spacing: 0.55em;
  color: var(--gold);
  margin-bottom: 28px;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(5rem, 14vw, 12rem);
  font-weight: 900;
  letter-spacing: 0.08em;
  color: var(--gold);
  line-height: 1;
  margin-bottom: 28px;
}

.hero-divider {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 32px;
}

.hero-divider-line {
  width: 80px;
  height: 1px;
  background: var(--gold-muted);
}

.hero-divider-dot {
  color: var(--gold-muted);
  font-size: 0.5rem;
}

.hero-subtitle {
  font-family: var(--font-display);
  font-size: 0.8rem;
  letter-spacing: 0.45em;
  color: var(--text-primary);
  margin-bottom: 52px;
}

.hero-cta {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 0.68rem;
  letter-spacing: 0.3em;
  background: var(--gold);
  color: var(--bg);
  border: none;
  padding: 18px 52px;
  border-radius: 50px;
  font-weight: 600;
  transition: background 0.3s, box-shadow 0.3s;
}

.hero-cta:hover {
  background: var(--gold-hover);
  box-shadow: 0 0 40px rgba(201, 168, 76, 0.35);
}

.hero-locations {
  position: absolute;
  bottom: 48px;
  font-family: var(--font-display);
  font-size: 0.6rem;
  letter-spacing: 0.45em;
  color: var(--text-dim);
}
```

- [ ] **Step 2: Write Hero.jsx**

```jsx
import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <p className="hero-eyebrow">H A U T E &nbsp; C O U T U R E &nbsp; A T E L I E R</p>
      <h1 className="hero-title">VELORA</h1>
      <div className="hero-divider">
        <span className="hero-divider-line" />
        <span className="hero-divider-dot">•</span>
        <span className="hero-divider-line" />
      </div>
      <p className="hero-subtitle">L U X U R Y &nbsp; F A S H I O N &nbsp; R E D E F I N E D</p>
      <Link to="/shop" className="hero-cta">E X P L O R E &nbsp; C O L L E C T I O N</Link>
      <p className="hero-locations">P A R I S &nbsp; • &nbsp; M I L A N &nbsp; • &nbsp; T O K Y O</p>
    </section>
  )
}

export default Hero
```

- [ ] **Step 3: Verify**

`http://localhost:5173` — hero fills viewport, large gold VELORA title, gold divider with dot, subtitle, pill CTA button, PARIS•MILAN•TOKYO at bottom. Fade-in animation on load.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero.jsx src/components/sections/Hero.css
git commit -m "feat: Hero — full-viewport gold typography, divider, animated CTA"
```

---

## Task 9: ProductCard

**Files:**
- Modify: `src/components/cards/ProductCard.jsx`
- Create: `src/components/cards/ProductCard.css`

- [ ] **Step 1: Create ProductCard.css**

```css
.product-card {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  color: inherit;
}

.product-card-image-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  background: #0e0e0e;
  margin-bottom: 16px;
}

.product-card-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-card-image-wrap img {
  transform: scale(1.05);
}

.product-card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 24px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-card-overlay {
  opacity: 1;
}

.product-card-add-btn {
  font-family: var(--font-display);
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  background: var(--gold);
  color: var(--bg);
  border: none;
  padding: 12px 28px;
  border-radius: 50px;
  font-weight: 600;
  transition: background 0.2s;
}

.product-card-add-btn:hover {
  background: var(--gold-hover);
}

.product-card-category {
  font-family: var(--font-display);
  font-size: 0.55rem;
  letter-spacing: 0.3em;
  color: var(--gold);
  margin-bottom: 6px;
}

.product-card-name {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.product-card-price {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 300;
  color: var(--text-dim);
}
```

- [ ] **Step 2: Write ProductCard.jsx**

```jsx
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './ProductCard.css'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  function handleAddToCart(e) {
    e.preventDefault()
    addToCart(product, product.sizes[0])
  }

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-card-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        <div className="product-card-overlay">
          <button className="product-card-add-btn" onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>
      </div>
      <p className="product-card-category">{product.category.toUpperCase()}</p>
      <h3 className="product-card-name">{product.name}</h3>
      <p className="product-card-price">${product.price.toLocaleString()}</p>
    </Link>
  )
}

export default ProductCard
```

- [ ] **Step 3: Commit**

```bash
git add src/components/cards/ProductCard.jsx src/components/cards/ProductCard.css
git commit -m "feat: ProductCard — hover overlay, quick add-to-cart, image zoom"
```

---

## Task 10: FeaturedProducts + Categories sections

**Files:**
- Modify: `src/components/sections/FeaturedProducts.jsx`
- Create: `src/components/sections/FeaturedProducts.css`
- Modify: `src/components/sections/Categories.jsx`
- Create: `src/components/sections/Categories.css`

- [ ] **Step 1: Create FeaturedProducts.css**

```css
.featured {
  padding: 80px 80px;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

@media (max-width: 1024px) {
  .featured-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .featured { padding: 60px 24px; }
  .featured-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Write FeaturedProducts.jsx**

```jsx
import { products } from '../../data/products'
import ProductCard from '../cards/ProductCard'
import './FeaturedProducts.css'

function FeaturedProducts() {
  const featured = products.filter(p => p.featured)

  return (
    <section className="featured">
      <div className="section-header">
        <p className="section-eyebrow">CURATED SELECTION</p>
        <h2 className="section-title">Featured Pieces</h2>
      </div>
      <div className="featured-grid">
        {featured.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default FeaturedProducts
```

- [ ] **Step 3: Create Categories.css**

```css
.categories {
  padding: 80px 80px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 48px 24px;
  min-height: 280px;
  background: #0e0e0e;
  border: 1px solid rgba(201, 168, 76, 0.1);
  transition: border-color 0.3s;
}

.category-card:hover {
  border-color: rgba(201, 168, 76, 0.45);
}

.category-name {
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 0.4em;
  color: var(--text-primary);
  margin-bottom: 8px;
  transition: color 0.2s;
}

.category-card:hover .category-name {
  color: var(--gold);
}

.category-count {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--text-dim);
}

@media (max-width: 768px) {
  .categories { padding: 60px 24px; }
  .categories-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 4: Write Categories.jsx**

```jsx
import { Link } from 'react-router-dom'
import { products } from '../../data/products'
import './Categories.css'

const CATEGORY_LIST = ['Dresses', 'Accessories', 'Outerwear']

function Categories() {
  return (
    <section className="categories">
      <div className="section-header">
        <p className="section-eyebrow">EXPLORE BY</p>
        <h2 className="section-title">Collections</h2>
      </div>
      <div className="categories-grid">
        {CATEGORY_LIST.map(cat => {
          const count = products.filter(p => p.category === cat).length
          return (
            <Link key={cat} to={`/shop?category=${cat}`} className="category-card">
              <p className="category-name">{cat.toUpperCase()}</p>
              <p className="category-count">{count} pieces</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Categories
```

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/FeaturedProducts.jsx src/components/sections/FeaturedProducts.css src/components/sections/Categories.jsx src/components/sections/Categories.css
git commit -m "feat: FeaturedProducts and Categories sections"
```

---

## Task 11: Home page

**Files:**
- Modify: `src/pages/Home/Home.jsx`

- [ ] **Step 1: Wire sections**

```jsx
import Hero from '../../components/sections/Hero'
import FeaturedProducts from '../../components/sections/FeaturedProducts'
import Categories from '../../components/sections/Categories'

function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Categories />
    </>
  )
}

export default Home
```

- [ ] **Step 2: Verify**

`http://localhost:5173` — hero → scroll → 4 featured products in grid → 3 category cards. No console errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home/Home.jsx
git commit -m "feat: Home page — compose Hero, FeaturedProducts, Categories"
```

---

## Task 12: Shop page

**Files:**
- Modify: `src/pages/Shop/Shop.jsx`
- Create: `src/pages/Shop/Shop.css`

- [ ] **Step 1: Create Shop.css**

```css
.shop {
  padding: 60px 80px 100px;
}

.shop-header {
  text-align: center;
  margin-bottom: 48px;
}

.shop-label {
  font-family: var(--font-display);
  font-size: 0.65rem;
  letter-spacing: 0.45em;
  color: var(--gold);
  margin-bottom: 16px;
}

.shop-heading {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  font-weight: 400;
  color: var(--text-primary);
}

.shop-filters {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 48px;
  flex-wrap: wrap;
}

.filter-btn {
  font-family: var(--font-display);
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  padding: 10px 24px;
  border: 1px solid rgba(201, 168, 76, 0.25);
  background: transparent;
  color: var(--text-dim);
  border-radius: 50px;
  transition: all 0.2s;
}

.filter-btn:hover,
.filter-btn.active {
  border-color: var(--gold);
  color: var(--gold);
}

.shop-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px 32px;
}

@media (max-width: 1024px) {
  .shop-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .shop { padding: 40px 24px 80px; }
  .shop-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Write Shop.jsx**

```jsx
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '../../data/products'
import ProductCard from '../../components/cards/ProductCard'
import './Shop.css'

const CATEGORIES = ['All', 'Dresses', 'Accessories', 'Outerwear']

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [active, setActive] = useState('All')

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat && CATEGORIES.includes(cat)) setActive(cat)
    else setActive('All')
  }, [searchParams])

  function selectCategory(cat) {
    setActive(cat)
    setSearchParams(cat === 'All' ? {} : { category: cat })
  }

  const filtered = active === 'All'
    ? products
    : products.filter(p => p.category === active)

  return (
    <section className="shop">
      <div className="shop-header">
        <p className="shop-label">THE COLLECTION</p>
        <h1 className="shop-heading">All Pieces</h1>
      </div>
      <div className="shop-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filter-btn${active === cat ? ' active' : ''}`}
            onClick={() => selectCategory(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="shop-grid">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Shop
```

- [ ] **Step 3: Verify**

Navigate to `/shop` — 12 products in 3-column grid. Click "DRESSES" → 4 products. Click "ALL" → 12 products. Category links from Home's Categories section navigate here with filter pre-selected.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Shop/Shop.jsx src/pages/Shop/Shop.css
git commit -m "feat: Shop page with category filter and responsive product grid"
```

---

## Task 13: Product detail page

**Files:**
- Modify: `src/pages/Product/Product.jsx`
- Create: `src/pages/Product/Product.css`

- [ ] **Step 1: Create Product.css**

```css
.product-detail {
  padding: 60px 80px 100px;
  max-width: 1200px;
  margin: 0 auto;
}

.product-back {
  font-family: var(--font-display);
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  color: var(--text-dim);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 48px;
  transition: color 0.2s;
}

.product-back:hover { color: var(--gold); }

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}

.product-image-wrap {
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: #0e0e0e;
}

.product-image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info { padding-top: 24px; }

.product-category {
  font-family: var(--font-display);
  font-size: 0.6rem;
  letter-spacing: 0.4em;
  color: var(--gold);
  margin-bottom: 16px;
}

.product-name {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.product-price {
  font-family: var(--font-sans);
  font-size: 1.3rem;
  font-weight: 300;
  color: var(--text-dim);
  margin-bottom: 32px;
}

.product-desc {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.8;
  color: var(--text-dim);
  margin-bottom: 40px;
}

.product-sizes-label {
  font-family: var(--font-display);
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  color: var(--text-primary);
  margin-bottom: 14px;
}

.product-sizes {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.size-btn {
  font-family: var(--font-display);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  width: 48px;
  height: 48px;
  border: 1px solid rgba(201, 168, 76, 0.25);
  background: transparent;
  color: var(--text-dim);
  transition: all 0.2s;
}

.size-btn:hover,
.size-btn.selected {
  border-color: var(--gold);
  color: var(--gold);
}

.add-to-cart-btn {
  width: 100%;
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  background: var(--gold);
  color: var(--bg);
  border: none;
  padding: 20px;
  font-weight: 600;
  transition: background 0.3s, box-shadow 0.3s;
}

.add-to-cart-btn:hover {
  background: var(--gold-hover);
  box-shadow: 0 0 40px rgba(201, 168, 76, 0.3);
}

.product-not-found {
  text-align: center;
  padding: 80px 0;
  color: var(--text-dim);
  font-family: var(--font-sans);
}

@media (max-width: 768px) {
  .product-detail { padding: 40px 24px 80px; }
  .product-layout { grid-template-columns: 1fr; gap: 40px; }
}
```

- [ ] **Step 2: Write Product.jsx**

```jsx
import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { products } from '../../data/products'
import { useCart } from '../../context/CartContext'
import './Product.css'

function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const product = products.find(p => p.id === id)
  const [selectedSize, setSelectedSize] = useState(null)

  if (!product) {
    return (
      <section className="product-detail">
        <p className="product-not-found">Product not found.</p>
        <Link to="/shop" className="product-back">← BACK TO SHOP</Link>
      </section>
    )
  }

  function handleAddToCart() {
    addToCart(product, selectedSize ?? product.sizes[0])
    navigate('/cart')
  }

  return (
    <section className="product-detail">
      <Link to="/shop" className="product-back">← BACK TO SHOP</Link>
      <div className="product-layout">
        <div className="product-image-wrap">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <p className="product-category">{product.category.toUpperCase()}</p>
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">${product.price.toLocaleString()}</p>
          <p className="product-desc">{product.description}</p>
          <p className="product-sizes-label">SELECT SIZE</p>
          <div className="product-sizes">
            {product.sizes.map(size => (
              <button
                key={size}
                className={`size-btn${selectedSize === size ? ' selected' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>
      </div>
    </section>
  )
}

export default Product
```

- [ ] **Step 3: Verify**

Click a product from home or shop → `/product/:id` shows image, name, price, description, size buttons. Select a size → it highlights. "ADD TO CART" → redirects to `/cart`. Navbar badge increments.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Product/Product.jsx src/pages/Product/Product.css
git commit -m "feat: Product detail page — size selector, add-to-cart, redirect to cart"
```

---

## Task 14: Cart page

**Files:**
- Modify: `src/pages/Cart/Cart.jsx`
- Create: `src/pages/Cart/Cart.css`

- [ ] **Step 1: Create Cart.css**

```css
.cart {
  padding: 60px 80px 100px;
  max-width: 1000px;
  margin: 0 auto;
}

.cart-label {
  font-family: var(--font-display);
  font-size: 0.65rem;
  letter-spacing: 0.45em;
  color: var(--gold);
  margin-bottom: 16px;
}

.cart-heading {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 48px;
}

.cart-empty {
  text-align: center;
  padding: 80px 0;
}

.cart-empty-msg {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--text-dim);
  margin-bottom: 32px;
}

.cart-empty-link {
  font-family: var(--font-display);
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  color: var(--gold);
  border-bottom: 1px solid var(--gold-muted);
  padding-bottom: 2px;
}

.cart-items {
  list-style: none;
  margin-bottom: 48px;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 24px;
  align-items: center;
  padding: 24px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.cart-item-image {
  width: 100px;
  height: 125px;
  object-fit: cover;
  background: #0e0e0e;
}

.cart-item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cart-item-name {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 400;
  color: var(--text-primary);
}

.cart-item-meta {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--text-dim);
}

.cart-item-price {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 300;
  color: var(--text-dim);
  margin-top: 8px;
}

.cart-item-controls {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.qty-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  border: 1px solid rgba(201, 168, 76, 0.2);
  padding: 6px 12px;
}

.qty-btn {
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1rem;
  line-height: 1;
  padding: 0 4px;
  transition: color 0.2s;
}

.qty-btn:hover { color: var(--gold); }

.qty-value {
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  color: var(--text-primary);
  min-width: 20px;
  text-align: center;
}

.remove-btn {
  background: none;
  border: none;
  font-family: var(--font-display);
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  color: var(--text-dim);
  transition: color 0.2s;
}

.remove-btn:hover { color: #c0392b; }

.cart-summary {
  border-top: 1px solid rgba(201, 168, 76, 0.15);
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
}

.cart-total-row {
  display: flex;
  gap: 48px;
  align-items: center;
}

.cart-total-label {
  font-family: var(--font-display);
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  color: var(--text-dim);
}

.cart-total-value {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  color: var(--text-primary);
}

.checkout-btn {
  font-family: var(--font-display);
  font-size: 0.68rem;
  letter-spacing: 0.3em;
  background: var(--gold);
  color: var(--bg);
  border: none;
  padding: 18px 64px;
  font-weight: 600;
  transition: background 0.3s, box-shadow 0.3s;
}

.checkout-btn:hover {
  background: var(--gold-hover);
  box-shadow: 0 0 40px rgba(201, 168, 76, 0.3);
}

.continue-link {
  font-family: var(--font-display);
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  color: var(--text-dim);
  transition: color 0.2s;
}

.continue-link:hover { color: var(--gold); }

@media (max-width: 640px) {
  .cart { padding: 40px 24px 80px; }
  .cart-item { grid-template-columns: 80px 1fr; }
  .cart-item-controls { flex-direction: row; align-items: center; }
}
```

- [ ] **Step 2: Write Cart.jsx**

```jsx
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './Cart.css'

function Cart() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart()

  if (items.length === 0) {
    return (
      <section className="cart">
        <p className="cart-label">YOUR CART</p>
        <h1 className="cart-heading">Shopping Cart</h1>
        <div className="cart-empty">
          <p className="cart-empty-msg">Your cart is empty.</p>
          <Link to="/shop" className="cart-empty-link">CONTINUE SHOPPING</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="cart">
      <p className="cart-label">YOUR CART</p>
      <h1 className="cart-heading">Shopping Cart</h1>
      <ul className="cart-items">
        {items.map(item => (
          <li key={`${item.id}-${item.size}`} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-info">
              <p className="cart-item-name">{item.name}</p>
              <p className="cart-item-meta">{item.category} · Size: {item.size}</p>
              <p className="cart-item-price">${(item.price * item.quantity).toLocaleString()}</p>
            </div>
            <div className="cart-item-controls">
              <div className="qty-controls">
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                >−</button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                >+</button>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id, item.size)}
              >REMOVE</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <div className="cart-total-row">
          <span className="cart-total-label">TOTAL</span>
          <span className="cart-total-value">${cartTotal.toLocaleString()}</span>
        </div>
        <button className="checkout-btn">CHECKOUT</button>
        <Link to="/shop" className="continue-link">← CONTINUE SHOPPING</Link>
      </div>
    </section>
  )
}

export default Cart
```

- [ ] **Step 3: Verify**

Add 2 products. Go to `/cart`. See items with image, name, size, qty controls, line price. +/− buttons update qty. Remove button removes item. Total updates. Navbar badge reflects count. Refresh page → cart persists from localStorage.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Cart/Cart.jsx src/pages/Cart/Cart.css
git commit -m "feat: Cart page — qty controls, remove, total, localStorage persistence"
```

---

## Task 15: Footer

**Files:**
- Modify: `src/components/layout/Footer.jsx`
- Create: `src/components/layout/Footer.css`

- [ ] **Step 1: Create Footer.css**

```css
.footer {
  border-top: 1px solid rgba(201, 168, 76, 0.1);
  padding: 60px 80px;
  text-align: center;
}

.footer-logo {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5em;
  color: var(--gold);
  margin-bottom: 32px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 40px;
  list-style: none;
  margin-bottom: 40px;
}

.footer-links a {
  font-family: var(--font-display);
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  color: var(--text-dim);
  transition: color 0.2s;
}

.footer-links a:hover { color: var(--gold); }

.footer-copy {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--text-dim);
  font-weight: 300;
}

@media (max-width: 640px) {
  .footer { padding: 48px 24px; }
  .footer-links { flex-direction: column; gap: 20px; }
}
```

- [ ] **Step 2: Write Footer.jsx**

```jsx
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
```

- [ ] **Step 3: Verify**

Footer appears on all pages. Gold VELORA wordmark, nav links, copyright. Category links navigate to filtered shop. No console errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Footer.jsx src/components/layout/Footer.css
git commit -m "feat: Footer — logo, navigation, copyright"
```

---

## Self-Review

**Spec coverage:**
- ✅ react-router-dom routing (/, /shop, /product/:id, /cart) — Tasks 1, 6
- ✅ Google Fonts (Cinzel, Playfair Display, Inter) — Task 2
- ✅ Design tokens (colors, fonts, CSS vars) — Task 3
- ✅ fadeIn animation on page load — Task 3 (App.css `main-content`)
- ✅ 12 mock products, 3 categories, featured flag — Task 4
- ✅ CartContext: addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal — Task 5
- ✅ localStorage persistence — Task 5
- ✅ Navbar: logo, links, cart badge — Task 7
- ✅ Hero: eyebrow, VELORA title, divider, subtitle, CTA, locations — Task 8
- ✅ ProductCard: image zoom, hover overlay, quick add — Task 9
- ✅ FeaturedProducts section — Task 10
- ✅ Categories section with count — Task 10
- ✅ Home page wires all sections — Task 11
- ✅ Shop page with filter tabs — Task 12
- ✅ Product detail: size selector, add-to-cart, redirect — Task 13
- ✅ Cart: qty controls, remove, total, empty state — Task 14
- ✅ Footer — Task 15

**Name consistency:**
- `addToCart(product, size)` — Task 5 ✅, used Task 9 ✅, Task 13 ✅
- `removeFromCart(id, size)` — Task 5 ✅, used Task 14 ✅
- `updateQuantity(id, size, qty)` — Task 5 ✅, used Task 14 ✅
- `cartCount` / `cartTotal` — Task 5 ✅, used Task 7 ✅, Task 14 ✅
- `products` (named export) — Task 4 ✅, imported Task 10 ✅, 11 ✅, 12 ✅, 13 ✅
- `.section-header / .section-eyebrow / .section-title` — defined in `index.css` Task 3 ✅, used Task 10 ✅, 11 ✅

**No placeholders found.**
