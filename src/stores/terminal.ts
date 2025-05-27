import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useTerminalStore = create(
  persist(
    (set) => ({
      remainSeconds: 5,
      postTime: Date.now(),
      set: (params: any) => set(() => ({ ...params }))
    }),
    {
      name: "_terminal",
      version: 0.11,
      storage: createJSONStorage(() => localStorage)
    }
  )
);
