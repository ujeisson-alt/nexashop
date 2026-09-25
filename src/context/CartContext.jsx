/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

const STORAGE_KEY = 'nexashop-cart'

const CartContext = createContext(null)

// --- Acciones -------------------------------------------------------------
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const CLEAR_CART = 'CLEAR_CART'

// --- Reducer: única fuente de verdad del carrito --------------------------
function cartReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM: {
      const { product, quantity } = action.payload
      const existing = state.find((item) => item.id === product.id)

      if (existing) {
        return state.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      // Guardamos solo los datos necesarios para no inflar localStorage
      const { id, title, price, image, category } = product
      return [...state, { id, title, price, image, category, quantity }]
    }

    case REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload.id)

    case UPDATE_QUANTITY: {
      const { id, quantity } = action.payload
      // Si la cantidad llega a 0, el item se elimina
      if (quantity <= 0) return state.filter((item) => item.id !== id)
      return state.map((item) => (item.id === id ? { ...item, quantity } : item))
    }

    case CLEAR_CART:
      return []

    default:
      return state
  }
}

// Lee el carrito guardado al iniciar la app (lazy initializer)
function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const parsed = saved ? JSON.parse(saved) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadCart)

  // Persistencia: cada cambio del carrito se guarda en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Modo incógnito o storage lleno: el carrito sigue funcionando en memoria
    }
  }, [items])

  const value = useMemo(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )

    return {
      items,
      totalItems,
      totalPrice,
      addToCart: (product, quantity = 1) =>
        dispatch({ type: ADD_ITEM, payload: { product, quantity } }),
      removeFromCart: (id) => dispatch({ type: REMOVE_ITEM, payload: { id } }),
      updateQuantity: (id, quantity) =>
        dispatch({ type: UPDATE_QUANTITY, payload: { id, quantity } }),
      clearCart: () => dispatch({ type: CLEAR_CART }),
      getItemQuantity: (id) =>
        items.find((item) => item.id === id)?.quantity ?? 0,
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Hook para consumir el carrito desde cualquier componente
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de un <CartProvider>')
  }
  return context
}
