import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { GHOST_AVATARS } from "./config";

export const useSpaceInvadersStore = create(
  persist(
    (set) => ({
      ghostAvatar: GHOST_AVATARS[0],
      set: (params: any) => set(() => ({ ...params }))
    }),
    {
      name: "_NADSA_ARCADE_SPACE_INVADERS",
      version: 0.1,
      storage: createJSONStorage(() => localStorage)
    }
  )
);
