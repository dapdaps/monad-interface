import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useChatStore = create(
  // @ts-ignore
  persist(
    // @ts-ignore
    (set, get: any) => ({
      name: "",
      address: "",
      level: 0,
      role: "",
      users: {},
      set: (params: any) => set(() => ({ ...params }))
    }),
    {
      name: "_chat",
      version: 0.1,
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
