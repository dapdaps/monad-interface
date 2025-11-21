import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface NftStore {
  closeNFTModal: boolean;
  isFollowNADSA: boolean;
  set: (params: any) => void;
  isWelcomeOpen: boolean;
  setWelcomeOpen: (isWelcomeOpen: boolean) => void;
}

export const useNftStore = create(
  persist<NftStore>(
    (set, get: any) => ({
      closeNFTModal: false,
      isFollowNADSA: false,
      isWelcomeOpen: false,
      set: (params: any) => set(() => ({ ...params })),
      setWelcomeOpen: (isWelcomeOpen: boolean) => set(() => ({ isWelcomeOpen }))
    }),
    {
      name: "_nft",
      version: 0.1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        return ({
          closeNFTModal: state.closeNFTModal,
          isFollowNADSA: state.isFollowNADSA,
        } as any);
      }
    }
  )
);
