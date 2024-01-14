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
          return { items: [...state.items, { product }] }
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
)