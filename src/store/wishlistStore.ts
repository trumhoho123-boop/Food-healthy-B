import { create } from 'zustand';
import type { Product } from '../types/product';

interface WishlistState {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set) => ({
  wishlistItems: [],
  addToWishlist: (product) => set((state) => {
    if (state.wishlistItems.find(item => item.id === product.id)) {
      return state;
    }
    return { wishlistItems: [...state.wishlistItems, product] };
  }),
  removeFromWishlist: (productId) => set((state) => ({
    wishlistItems: state.wishlistItems.filter(item => item.id !== productId)
  })),
  clearWishlist: () => set({ wishlistItems: [] }),
}));