import { create } from 'zustand';

type WalletInfoState = {
  walletInfo: { 
    tokens: any[];
    sumValue: string;
  };
  isLoading: boolean;
  isFresh?: number;
};

type WalletInfoStore = WalletInfoState & {
  set: (update: WalletInfoState) => void;
};

export const useWalletInfoStore = create<WalletInfoStore>((set) => ({
  walletInfo: {
    tokens: [],
    sumValue: '0',
  },
  isLoading: false,
  isFresh: 0,
  setFresh: (fresh: number) => set(() => ({ isFresh: fresh })),
  set: (params) => set(() => ({ ...params })),
}));
