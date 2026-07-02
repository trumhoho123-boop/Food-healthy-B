import { create } from 'zustand';
import type { Product } from '../types/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  addToCart: (product, quantity) => set((state) => {
    const existingItem = state.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      return {
        cartItems: state.cartItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      };
    }
    return { cartItems: [...state.cartItems, { product, quantity }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cartItems: state.cartItems.filter(item => item.product.id !== productId)
  })),
  updateQuantity: (productId, quantity) => set((state) => ({
    cartItems: state.cartItems.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    )
  })),
  clearCart: () => set({ cartItems: [] }),
}));
