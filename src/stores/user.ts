import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const EXPIRY_TIME = 24 * 60 * 60 * 1000;
const TIMESTAMP_KEY = "_user_timestamp";

const createExpirableStorage = () => {
  const baseStorage = window.localStorage as any;
  
  return {
    getItem: (name: string): string | null => {
      const timestamp = baseStorage.getItem(TIMESTAMP_KEY);
      const value = baseStorage.getItem(name);
      
      if (timestamp && value) {
        const storedTime = parseInt(timestamp, 10);
        if (Date.now() - storedTime > EXPIRY_TIME) {
          baseStorage.removeItem(name);
          baseStorage.removeItem(TIMESTAMP_KEY);
          return null;
        }
      }
      
      return value ? JSON.parse(value) : null;
    },
    setItem: (name: string, value: string): void => {
      baseStorage.setItem(name, JSON.stringify(value));
      baseStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
    },
    removeItem: (name: string): void => {
      baseStorage.removeItem(name);
      baseStorage.removeItem(TIMESTAMP_KEY);
    }
  };
};

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
      storage: createExpirableStorage() as any
    }
  )
);
