import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type GuideStore = {
  visible: boolean;
  visited: Record<string, number>;
  max: number;
  setVisitedIndex: (account: string, index: number) => void;
  getVisitedIndex: (account: string) => number;
  getVisited: (account?: string) => boolean;
  setVisible: (visible: boolean) => void;
};

export const useGuideStore = create(
  persist<GuideStore>(
    (set, get) => ({
      visible: false,
      visited: {},
      max: 3,
      setVisitedIndex: (account, index) => {
        set((state) => ({
          ...state,
          visited: {
            ...state.visited,
            [account]: index
          }
        }));
      },
      getVisitedIndex: (account) => get().visited[account] || 0,
      getVisited: (account) => {
        if (!account) return false;
        return (get().visited[account] || 0) >= 4;
      },
      setVisible: (visible) => {
        set({ visible });
      }
    }),
    {
      name: "_NADSA_GUIDE_STORE",
      version: 0.1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ visited: state.visited } as any)
    }
  )
);
