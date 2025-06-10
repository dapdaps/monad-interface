import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const use2048Store = create(
  persist(
    (set, get: any) => ({
      gameId: '',
      score: 0,
      set: (params: any) => set(() => ({ ...params }))
    }),
    {
      name: "_2048",
      version: 0.1,
      storage: createJSONStorage(() => localStorage)
    }
  )
);
