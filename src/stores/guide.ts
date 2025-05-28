import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type GuideStore = {
  visible: boolean;
  visited: Record<string, boolean>;
  setVisited: (account: string, visited: boolean) => void;
  getVisited: (account?: string) => boolean;
  setVisible: (visible: boolean) => void;
};

export const useGuideStore = create(
  persist<GuideStore>(
    (set, get) => ({
      visible: false,
      visited: {},
      setVisited: (account, visited) => {
        set((state) => ({
          visited: {
            ...state.visited,
            [account]: visited
          }
        }));
      },
      getVisited: (account) => {
        if (!account) return false;
        return get().visited[account] || false;
      },
      setVisible: (visible) => {
        set({ visible });
      },
    }),
    {
      name: "_NADSA_GUIDE_STORE",
      version: 0.1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ } as any)
    }
  )
);
