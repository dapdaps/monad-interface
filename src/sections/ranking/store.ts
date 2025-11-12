import { create } from 'zustand';
import { ERankingTabs } from './config';

interface IRankingStore {
  currentTab: ERankingTabs;
  setCurrentTab: (tab: ERankingTabs) => void;
}

export const useRankingStore = create<IRankingStore>((set) => ({
  currentTab: ERankingTabs.Leaderboard,
  setCurrentTab: (tab: ERankingTabs) => set({ currentTab: tab }),
}));

