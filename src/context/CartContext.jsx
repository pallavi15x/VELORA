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
