import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useChatStore = create(
  // @ts-ignore
  persist(
    // @ts-ignore
    (set, get: any) => ({
      users: {},
      set: (params: any) => set(() => ({ ...params })),
      setUsers: (info: any) => {
        return set((prev: any) => ({ users: { ...prev.users, ...info } }));
      }
    }),
    {
      name: "_chat",
      version: 0.11,
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
