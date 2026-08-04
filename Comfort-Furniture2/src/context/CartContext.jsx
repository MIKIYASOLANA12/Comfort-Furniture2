import { createContext, useContext, useReducer, useCallback } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        item => item.id === action.payload.id &&
          item.woodFinish === action.payload.woodFinish &&
          item.legFinish === action.payload.legFinish
      );
      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + 1,
        };
        return { ...state, items: newItems };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((_, i) => i !== action.payload) };
    case 'UPDATE_QUANTITY': {
      const newItems = [...state.items];
      newItems[action.payload.index] = {
        ...newItems[action.payload.index],
        quantity: Math.max(0, action.payload.quantity),
      };
      return { ...state, items: newItems.filter(item => item.quantity > 0) };
    }
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = useCallback((product, woodFinish, legFinish, price) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...product, woodFinish, legFinish, finalPrice: price },
    });
  }, []);

  const removeItem = useCallback((index) => {
    dispatch({ type: 'REMOVE_ITEM', payload: index });
  }, []);

  const updateQuantity = useCallback((index, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { index, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
