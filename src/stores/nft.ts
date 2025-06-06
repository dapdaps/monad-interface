import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useNftStore = create(
  persist(
    (set, get: any) => ({
      closeNFTModal: false,
      set: (params: any) => set(() => ({ ...params }))
    }),
    {
      name: "_nft",
      version: 0.1,
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
