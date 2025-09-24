import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get: any) => ({
      user: {},
      accessToken: {
        access_token: "",
        refresh_access_token: "",
        token_type: "bearer"
      },
      accessTokenLoading: false,
      loading: false,
      closeNFTModal: false,
      inviteTimestamp: {
        quest_round_time: 0,
        quest_start_time: 0,
      },
      nativeBalance: "0",
      set: (params: any) => set(() => ({ ...params }))
    }),
    {
      name: "_user",
      version: 0.1,
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);
