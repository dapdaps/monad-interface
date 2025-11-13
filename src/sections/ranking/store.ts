import { create } from 'zustand';
import { EMilitaryRank, ERankingTabs } from './config';

export interface IRankListPage {
  page: number;
  pageSize: number;
  pageTotal: number;
  total: number;
  tier: EMilitaryRank;
}

interface IRankingStore {
  currentTab: ERankingTabs;
  setCurrentTab: (tab: ERankingTabs) => void;
  topUsers: any[];
  setTopUsers: (users: any[]) => void;
  userRank: any;
  setUserRank: (rank: any) => void;
  rankList: any[];
  setRankList: (list: any[]) => void;
  rankListPage: IRankListPage;
  setRankListPage: (page: Partial<IRankListPage>) => void;
  userRankSwitch: boolean;
  setUserRankSwitch: (value: boolean) => void;
}

export const useRankingStore = create<IRankingStore>((set) => ({
  currentTab: ERankingTabs.Leaderboard,
  setCurrentTab: (tab) => set({ currentTab: tab }),
  topUsers: [],
  setTopUsers: (users) => set({ topUsers: users }),
  userRank: {},
  setUserRank: (rank) => set({ userRank: rank }),
  rankList: [],
  setRankList: (list) => set({ rankList: list }),
  rankListPage: {
    page: 1,
    pageSize: 10,
    pageTotal: 0,
    total: 0,
    tier: EMilitaryRank.General,
  },
  setRankListPage: (page) => set((state) => {
    return {
      ...state,
      rankListPage: {
        ...state.rankListPage,
        ...page,
      },
    };
  }),
  userRankSwitch: false,
  setUserRankSwitch: (value) => set({ userRankSwitch: value }),
}));

