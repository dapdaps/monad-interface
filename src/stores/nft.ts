import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface NftStore {
  closeNFTModal: boolean;
  isFollowNADSA: boolean;
  set: (params: any) => void;
  isWelcomeOpen: boolean;
  setWelcomeOpen: (isWelcomeOpen: boolean) => void;
  welcomeDownloadMap: Record<string, Record<string, { key: string; loading: boolean; opened: boolean; timestamp: number; }>>;
  setWelcomeDownloadMap: (address: string, key: string, downloadMap: any) => void;
  getWelcomeDownloadMap: (address: string) => Record<string, { key: string; loading: boolean; opened: boolean; timestamp: number; }>;
  welcomeDownloaded?: Record<string, boolean>;
  setWelcomeDownloaded: (address: string, welcomeDownloaded: boolean) => void;
  getWelcomeDownloaded: (address: string) => boolean;
}

export const useNftStore = create(
  persist<NftStore>(
    (set, get: any) => ({
      closeNFTModal: false,
      isFollowNADSA: false,
      isWelcomeOpen: false,
      set: (params: any) => set(() => ({ ...params })),
      setWelcomeOpen: (isWelcomeOpen: boolean) => set(() => ({ isWelcomeOpen })),
      welcomeDownloadMap: {},
      setWelcomeDownloadMap: (address, key, downloadMap) => set((state) => {
        const next = { ...state.welcomeDownloadMap };
        const nextMap = {
          ...next[address || "DEFAULT"],
          [key]: downloadMap,
        };
        next[address || "DEFAULT"] = nextMap;
        next["DEFAULT"] = nextMap;
        return {
          ...state,
          welcomeDownloadMap: next,
        };
      }),
      getWelcomeDownloadMap: (address) => get().welcomeDownloadMap[address || "DEFAULT"] || {},
      welcomeDownloaded: {},
      setWelcomeDownloaded: (address, welcomeDownloaded) => set((state) => {
        const next = { ...state.welcomeDownloaded };
        next[address || "DEFAULT"] = welcomeDownloaded;
        next["DEFAULT"] = welcomeDownloaded;
        return {
          ...state,
          welcomeDownloaded: next,
        };
      }),
      getWelcomeDownloaded: (address) => get().welcomeDownloaded[address || "DEFAULT"] || false,
    }),
    {
      name: "_nft",
      version: 0.4,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        return ({
          closeNFTModal: state.closeNFTModal,
          isFollowNADSA: state.isFollowNADSA,
          welcomeDownloadMap: state.welcomeDownloadMap,
          welcomeDownloaded: state.welcomeDownloaded,
        } as any);
      }
    }
  )
);
