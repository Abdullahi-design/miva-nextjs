import { create } from 'zustand'
import {
    createJSONStorage,
    persist,
} from 'zustand/middleware'

export const useCart = create()(
    persist(
      (set) => ({
        items: [],
        addItem: (product) =>
          set((state) => {
            const existingItem = state.items.find(
              (item) => item.product._id === product._id
            );
  
            if (existingItem) {
              // If item already exists, update the quantity
              existingItem.quantity += 1;
              return { items: [...state.items] };
            } else {
              // If item doesn't exist, add a new entry
              return { items: [...state.items, { product, quantity: 1 }] };
            }
          }),
        removeItem: (_id) =>
          set((state) => ({
            items: state.items.filter(
              (item) => item.product._id !== _id
            ),
          })),
        clearCart: () => set({ items: [] }),
      }),
      {
        name: 'cart-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
);
  