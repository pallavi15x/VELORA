# Velora

E-commerce web app built with React + Vite.

## Stack

- **React 19** — UI
- **Vite 8** — dev server, bundler
- **ESLint** — linting

## Project Structure

```
src/
├── App.jsx                        # Root component (currently default Vite template)
├── main.jsx                       # Entry point
├── components/
│   ├── cards/
│   │   └── ProductCard.jsx        # Product card component
│   └── layout/
│       ├── Navbar.jsx             # Top navigation
│       └── Footer.jsx             # Footer
├── sections/
│   ├── Hero.jsx                   # Hero/banner section
│   ├── FeaturedProducts.jsx       # Featured products grid
│   └── Categories.jsx             # Product categories
└── pages/
    ├── Home/Home.jsx              # Landing page
    ├── Shop/Shop.jsx              # All products listing
    ├── Product/Product.jsx        # Single product detail
    └── Cart/Cart.jsx              # Shopping cart
```

## Dev Setup

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Status

Early scaffold — all pages and components are stubs. UI implementation pending.
