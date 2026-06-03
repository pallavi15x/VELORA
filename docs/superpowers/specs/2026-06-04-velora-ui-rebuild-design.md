# Velora UI Rebuild — Design Spec

**Date:** 2026-06-04  
**Status:** Approved

## Goal

Rebuild full Velora luxury fashion e-commerce UI from scratch, matching the existing deployed design (black/gold aesthetic). All 4 pages. No backend — mock data only.

---

## Stack

- React 19 + Vite 8 (existing)
- `react-router-dom` v7 — client-side routing
- React Context API — cart state management
- `localStorage` — cart persistence across refresh
- Plain CSS with custom properties — no CSS framework
- Google Fonts CDN — Cinzel, Playfair Display, Inter

---

## Design System

### Colors (CSS custom properties)

```css
--bg:           #050505;   /* near-black background */
--bg-nav:       #111111;   /* navbar pill */
--gold:         #C9A84C;   /* primary gold — headings, buttons, logo */
--gold-muted:   #8B6914;   /* dividers, accents */
--text-primary: #F5F0E8;   /* body text */
--text-dim:     #6B6B6B;   /* secondary labels */
```

### Typography

| Font | Usage |
|------|-------|
| Cinzel | VELORA logo, hero title, nav links, section labels |
| Playfair Display | Subheadings, product names, italic accents |
| Inter | Body copy, prices, buttons, UI labels |

All uppercase labels use `letter-spacing: 0.3–0.5em`. Generous whitespace throughout.

### Animation

- Page load: full-page fade in (`opacity: 0 → 1`, `1.2s ease`)
- Navbar items: stagger fade in on load
- Button hover: gold glow / brightness lift

---

## Routing

| Path | Page |
|------|------|
| `/` | Home |
| `/shop` | Shop |
| `/product/:id` | Product detail |
| `/cart` | Cart |

`App.jsx` wraps all routes in `CartProvider` and renders `<Navbar>` + `<Outlet>` + `<Footer>`.

---

## Cart Context (`src/context/CartContext.jsx`)

State shape:
```js
{ items: [{ product, quantity, selectedSize }] }
```

Actions:
- `addToCart(product, size)` — add or increment
- `removeFromCart(id)` — remove item
- `updateQuantity(id, qty)` — set quantity (0 = remove)
- `clearCart()` — empty cart
- `cartCount` — total item count (for navbar badge)
- `cartTotal` — total price

Persistence: sync full `items` array to `localStorage` on every state change. Load from `localStorage` on init.

---

## Mock Data (`src/data/products.js`)

12 products across 3 categories:

- **Dresses** (4): evening gowns, cocktail dresses
- **Accessories** (4): handbags, scarves, jewelry
- **Outerwear** (4): coats, capes, blazers

Product shape:
```js
{
  id: string,
  name: string,
  category: 'Dresses' | 'Accessories' | 'Outerwear',
  price: number,          // USD
  image: string,          // placeholder URL (picsum.photos)
  description: string,
  sizes: string[],        // ['XS','S','M','L','XL'] or ['One Size']
  featured: boolean,      // shown on Home page
}
```

---

## Components

### Navbar
- Left: VELORA wordmark (Cinzel, gold, spaced)
- Center: HOME / SHOP / CATEGORIES nav links
- Right: user icon + cart icon with item count badge
- Style: dark pill on near-black bg, subtle border

### Hero (Home page)
- Full-viewport-height section
- Top label: "HAUTE COUTURE ATELIER" (small, spaced, gold)
- Main title: "VELORA" (Cinzel, massive)
- Gold divider line with center dot
- Subtitle: "LUXURY FASHION REDEFINED" (spaced caps)
- CTA: "EXPLORE COLLECTION" pill button (gold bg, dark text)
- Bottom strip: "PARIS • MILAN • TOKYO"

### FeaturedProducts (Home page)
- Section heading + 4 featured products in grid
- Uses `ProductCard`

### Categories (Home page)
- 3 category cards: Dresses, Accessories, Outerwear
- Click → navigates to `/shop?category=X`

### ProductCard
- Product image, name, category label, price
- "Add to Cart" on hover
- Click → navigates to `/product/:id`

### Shop page
- Category filter tabs (All / Dresses / Accessories / Outerwear)
- Responsive product grid (3 cols desktop, 2 tablet, 1 mobile)
- Uses `ProductCard`

### Product page
- Large image, name, price, description
- Size selector
- "ADD TO CART" button
- "BACK TO SHOP" link

### Cart page
- List of cart items: image, name, size, qty controls, line price
- Remove button per item
- Order summary: subtotal, total
- "CHECKOUT" button (placeholder, no action)
- "CONTINUE SHOPPING" link

### Footer
- VELORA wordmark centered
- Navigation links
- Copyright line

---

## File Structure

```
src/
├── context/
│   └── CartContext.jsx
├── data/
│   └── products.js
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── FeaturedProducts.jsx
│   │   └── Categories.jsx
│   └── cards/
│       └── ProductCard.jsx
├── pages/
│   ├── Home/Home.jsx
│   ├── Shop/Shop.jsx
│   ├── Product/Product.jsx
│   └── Cart/Cart.jsx
├── App.jsx           # router + layout wrapper
├── App.css           # reset + global layout
└── index.css         # CSS custom properties + fonts
```

---

## Out of Scope

- Authentication / user accounts
- Real payment / checkout flow
- Backend API
- TypeScript migration
- Mobile-specific hamburger menu (responsive grid only)
