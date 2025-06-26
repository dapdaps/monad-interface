import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const use2048Store = create(
  persist(
    (set, get: any) => ({
      gameId: '',
      score: 0,
      users: {},
      updateUser: (user: string, score: number, gameId: string) => {
        const users = get().users;
        users[user] = {
          score,
          gameId
        }
        set({ users });
      },
      getUses: (user: string) => {
        const users = get().users;
        return users[user]
      },
      set: (params: any) => set(() => ({ ...params }))
    }),
    {
      name: "_2048",
      version: 0.2,
      storage: createJSONStorage(() => localStorage)
    }
  )
);
