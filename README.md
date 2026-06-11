# Velora

E-commerce web app built with React + Vite.

## Stack

- **React 18** — UI
- **Vite 5** — dev server, bundler
- **ESLint** — linting
- **React Router DOM** — routing
- **Vanilla CSS** — styling & animations

## Project Structure

```text
src/
├── App.jsx                        # Root component handling routing and animated loader
├── index.css                      # Global styles, variables, and complex animations
├── main.jsx                       # Entry point
├── components/                    # Reusable UI elements
│   ├── FAQItem.jsx                # Collapsible FAQ accordion
│   ├── FAQSidebar.jsx             # Sidebar navigation for FAQ
│   ├── Footer.jsx                 # Global footer
│   ├── Navbar.jsx                 # Top navigation bar
│   ├── ProductCard.jsx            # Product display card
│   ├── ScrollToTop.jsx            # Route transition scroll handler
│   └── Toast.jsx                  # Notification system
├── context/
│   └── AppContext.jsx             # Global state (Cart, Wishlist, Theme)
├── data/
│   └── products.js                # Mock product database
└── pages/                         # Route-level components
    ├── Cart.jsx                   # Shopping cart page
    ├── Contact.jsx                # Contact us form page
    ├── Home.jsx                   # Landing page
    ├── Product.jsx                # Single product detail
    ├── Queries.jsx                # FAQ / Help page
    ├── Shop.jsx                   # All products listing with filters
    └── Wishlist.jsx               # Saved items page
```

## Dev Setup

```bash
npm install
npm run dev        # http://localhost:5174/VELORA/
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Status

Fully functional front-end implementation with routing, global state management, complex CSS animations, and a fully responsive layout.
