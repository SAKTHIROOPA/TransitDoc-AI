import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSearchStore = create(
  persist(
    (set, get) => ({
      recentSearches: [
        "Find maintenance reports for TN38AB4567",
        "Show accident reports from Erode depot",
        "Brake issues in last 3 months",
        "Invoices above ₹50,000"
      ],
      searchRequestCount: 142,

      addSearch: (query) => {
        if (!query || !query.trim()) return;
        const trimmed = query.trim();
        set((state) => {
          const filtered = state.recentSearches.filter((s) => s.toLowerCase() !== trimmed.toLowerCase());
          return {
            recentSearches: [trimmed, ...filtered].slice(0, 10),
            searchRequestCount: state.searchRequestCount + 1,
          };
        });
      },

      clearRecentSearches: () => {
        set({ recentSearches: [] });
      },

      incrementSearchCount: () => {
        set((state) => ({ searchRequestCount: state.searchRequestCount + 1 }));
      }
    }),
    {
      name: 'transitdoc-search-storage',
    }
  )
);
