export interface IMilitaryRank {
  icon: string;
  name: string;
  value: number;
}

export enum EMilitaryRank {
  Private = 1,
  Corporal = 2,
  Lieutenant = 3,
  Major = 4,
  Colonel = 5,
  General = 6,
}

export type TMilitaryRank = keyof typeof EMilitaryRank;

export const MilitaryRank: Record<EMilitaryRank, IMilitaryRank> = {
  [EMilitaryRank.Private]: {
    icon: "/images/wallet/ranking/rank-1.png",
    name: "Private",
    value: EMilitaryRank.Private,
  },
  [EMilitaryRank.Corporal]: {
    icon: "/images/wallet/ranking/rank-2.png",
    name: "Corporal",
    value: EMilitaryRank.Corporal,
  },
  [EMilitaryRank.Lieutenant]: {
    icon: "/images/wallet/ranking/rank-3.png",
    name: "Lieutenant",
    value: EMilitaryRank.Lieutenant,
  },
  [EMilitaryRank.Major]: {
    icon: "/images/wallet/ranking/rank-4.png",
    name: "Major",
    value: EMilitaryRank.Major,
  },
  [EMilitaryRank.Colonel]: {
    icon: "/images/wallet/ranking/rank-5.png",
    name: "Colonel",
    value: EMilitaryRank.Colonel,
  },
  [EMilitaryRank.General]: {
    icon: "/images/wallet/ranking/rank-6.png",
    name: "General",
    value: EMilitaryRank.General,
  },
};

export enum ERankingTabs {
  Leaderboard = "leaderboard",
  EarnRP = "earn-rp",
  History = "history",
}

export interface IRankingTab {
  title: string;
  value: ERankingTabs;
  disabled?: boolean;
}
export type TRankingTab = keyof typeof ERankingTabs;

export const RankingTabs: Record<TRankingTab, IRankingTab> = {
  Leaderboard: {
    title: "Leaderboard",
    value: ERankingTabs.Leaderboard,
  },
  EarnRP: {
    title: "EarnRP",
    value: ERankingTabs.EarnRP,
    disabled: true,
  },
  History: {
    title: "History",
    value: ERankingTabs.History,
  },
};

export enum EHistoryType {
  All = "all",
  Swap = "swap",
  Brige = "brige",
  Arcade = "arcade",
}

export interface IHistoryType {
  label: string;
  value: EHistoryType;
}

export const TypeOptions: Record<EHistoryType, IHistoryType> = {
  [EHistoryType.All]: {
    label: "All",
    value: EHistoryType.All,
  },
  [EHistoryType.Swap]: {
    label: "Swap",
    value: EHistoryType.Swap,
  },
  [EHistoryType.Brige]: {
    label: "Brige",
    value: EHistoryType.Brige,
  },
  [EHistoryType.Arcade]: {
    label: "Arcade",
    value: EHistoryType.Arcade,
  },
};
