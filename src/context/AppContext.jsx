import { createContext, useContext, useReducer, useCallback } from 'react';

export const AppContext = createContext();

const initialState = {
  theme: localStorage.getItem('velora-theme') || 'dark',
  cart: JSON.parse(localStorage.getItem('velora-cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('velora-wishlist') || '[]'),
  toasts: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME': {
      const theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('velora-theme', theme);
      return { ...state, theme };
    }
    case 'ADD_TO_CART': {
      const { product, size, qty } = action.payload;
      const key = `${product.id}-${size}`;
      const existing = state.cart.find(i => i.key === key);
      let cart;
      if (existing) {
        cart = state.cart.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      } else {
        cart = [...state.cart, { key, id: product.id, name: product.name, price: product.price, image: product.image, category: product.category, size, qty }];
      }
      localStorage.setItem('velora-cart', JSON.stringify(cart));
      return { ...state, cart };
    }
    case 'UPDATE_CART_QTY': {
      const cart = state.cart.map(i => i.key === action.payload.key ? { ...i, qty: Math.max(1, action.payload.qty) } : i);
      localStorage.setItem('velora-cart', JSON.stringify(cart));
      return { ...state, cart };
    }
    case 'REMOVE_FROM_CART': {
      const cart = state.cart.filter(i => i.key !== action.payload.key);
      localStorage.setItem('velora-cart', JSON.stringify(cart));
      return { ...state, cart };
    }
    case 'TOGGLE_WISHLIST': {
      const pid = action.payload.id;
      const inList = state.wishlist.includes(pid);
      const wishlist = inList ? state.wishlist.filter(id => id !== pid) : [...state.wishlist, pid];
      localStorage.setItem('velora-wishlist', JSON.stringify(wishlist));
      return { ...state, wishlist };
    }
    case 'ADD_TOAST': {
      return { ...state, toasts: [...state.toasts, { id: Date.now(), ...action.payload }] };
    }
    case 'REMOVE_TOAST': {
      return { ...state, toasts: state.toasts.filter(t => t.id !== action.payload) };
    }
    default: return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleTheme = useCallback(() => dispatch({ type: 'TOGGLE_THEME' }), []);
  const addToCart = useCallback((product, size = 'M', qty = 1) => dispatch({ type: 'ADD_TO_CART', payload: { product, size, qty } }), []);
  const updateCartQty = useCallback((key, qty) => dispatch({ type: 'UPDATE_CART_QTY', payload: { key, qty } }), []);
  const removeFromCart = useCallback((key) => dispatch({ type: 'REMOVE_FROM_CART', payload: { key } }), []);
  const toggleWishlist = useCallback((product) => dispatch({ type: 'TOGGLE_WISHLIST', payload: product }), []);
  const addToast = useCallback((message, variant = 'accent') => {
    const id = Date.now();
    dispatch({ type: 'ADD_TOAST', payload: { message, variant } });
    setTimeout(() => dispatch({ type: 'REMOVE_TOAST', payload: id }), 3000);
  }, []);

  const cartCount = state.cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = state.cart.reduce((s, i) => s + i.price * i.qty, 0);
  const wishlistCount = state.wishlist.length;
  const isWishlisted = useCallback((id) => state.wishlist.includes(id), [state.wishlist]);

  return (
    <AppContext.Provider value={{
      theme: state.theme, toggleTheme,
      cart: state.cart, cartCount, cartTotal, addToCart, updateCartQty, removeFromCart,
      wishlist: state.wishlist, wishlistCount, toggleWishlist, isWishlisted,
      toasts: state.toasts, addToast, dispatch,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
