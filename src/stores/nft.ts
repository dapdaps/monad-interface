import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface NftStore {
  closeNFTModal: boolean;
  isFollowNADSA: boolean;
  set: (params: any) => void;
  isWelcomeOpen: boolean;
  setWelcomeOpen: (isWelcomeOpen: boolean) => void;
  welcomeDownloadMap: Record<string, { key: string; loading: boolean; opened: boolean; timestamp: number; }>;
  setWelcomeDownloadMap: (key: string, downloadMap: any) => void;
  welcomeDownloaded?: boolean;
  setWelcomeDownloaded: (welcomeDownloaded: boolean) => void;
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
      setWelcomeDownloadMap: (key, downloadMap) => set((state) => {
        const next = { ...state.welcomeDownloadMap };
        next[key] = downloadMap;
        return {
          ...state,
          welcomeDownloadMap: next,
        };
      }),
      welcomeDownloaded: false,
      setWelcomeDownloaded: (welcomeDownloaded: boolean) => set(() => ({ welcomeDownloaded })),
    }),
    {
      name: "_nft",
      version: 0.2,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        return ({
          closeNFTModal: state.closeNFTModal,
          isFollowNADSA: state.isFollowNADSA,
          downloadMap: state.welcomeDownloadMap,
          welcomeDownloaded: state.welcomeDownloaded,
        } as any);
      }
    }
  )
);
