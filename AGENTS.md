# AGENTS.md — Velora Project Reference

Agent/AI context for working on this codebase.

## Project

Velora — e-commerce web app. React 19 + Vite 8. Early stage, scaffold only.

## Tech Stack

- React 19 (JSX, no TypeScript)
- Vite 8 (dev server + bundler)
- ESLint 10
- No router installed yet (react-router-dom not in package.json)
- No state management library yet
- No CSS framework — plain CSS files

## File Conventions

- Pages: `src/pages/<PageName>/<PageName>.jsx`
- Layout components: `src/components/layout/`
- Section components: `src/components/sections/`
- Card/item components: `src/components/cards/`
- Each component in its own file, default export, same name as file

## Current State (as of 2026-06-03)

All components are stubs returning a single `<div>` with placeholder text. Nothing is wired together — `App.jsx` still uses the default Vite template, not the page components.

### Pages (all stubs)
- `Home` — landing page
- `Shop` — product listing
- `Product` — single product detail
- `Cart` — shopping cart

### Components (all stubs)
- `Navbar`, `Footer` — layout
- `Hero`, `FeaturedProducts`, `Categories` — sections
- `ProductCard` — card

## Dev Commands

```bash
npm run dev       # Start dev server → http://localhost:5173
npm run build     # Production build → dist/
npm run preview   # Preview built app
npm run lint      # ESLint check
```

## Key Decisions / Constraints

- JSX (not TSX) — no TypeScript migration planned yet
- No routing configured — needs react-router-dom before pages can be linked
- App.jsx entry point not yet updated to use page components

## What To Build Next

1. Install react-router-dom, set up routes in App.jsx
2. Implement Navbar with nav links
3. Build Home page: wire Hero + FeaturedProducts + Categories sections
4. Build ProductCard with props (image, name, price, rating)
5. Build Shop page with product grid using ProductCard
6. Build Product detail page
7. Build Cart page with cart item list and totals
8. Add global state (Context API or Zustand) for cart
