import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useTwitterStore = create(
  persist(
    (set, get: any) => ({
      id: "",
      address: "",
      info: {},
      set: (params: any) => set(() => ({ ...params }))
    }),
    {
      name: "_twitter",
      version: 0.1,
      storage: createJSONStorage(() => localStorage)
    }
  )
);
