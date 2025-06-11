import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useTwitterStore = create(
  persist(
    (set, get: any) => ({
      id: "",
      address: "",
      code: "",
      info: {},
      bindInfo: {},
      isFollowNADSA: false,
      set: (params: any) => set(() => ({ ...params }))
    }),
    {
      name: "_twitter",
      version: 0.1,
      storage: createJSONStorage(() => localStorage)
    }
  )
);
