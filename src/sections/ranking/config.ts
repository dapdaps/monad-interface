export interface IMilitaryRank {
  icon: string;
  name: string;
  value: EMilitaryRank;
  minRP: number;
  maxRP: number;
}

export enum EMilitaryRank {
  Private = "private",
  Corporal = "corporal",
  Lieutenant = "lieutenant",
  Major = "major",
  Colonel = "colonel",
  General = "general",
}

export type TMilitaryRank = keyof typeof EMilitaryRank;

export const MilitaryRank: Record<EMilitaryRank, IMilitaryRank> = {
  [EMilitaryRank.Private]: {
    icon: "/images/wallet/ranking/rank-1.png",
    name: "Private",
    value: EMilitaryRank.Private,
    minRP: 0,
    maxRP: 50,
  },
  [EMilitaryRank.Corporal]: {
    icon: "/images/wallet/ranking/rank-2.png",
    name: "Corporal",
    value: EMilitaryRank.Corporal,
    minRP: 50,
    maxRP: 150,
  },
  [EMilitaryRank.Lieutenant]: {
    icon: "/images/wallet/ranking/rank-3.png",
    name: "Lieutenant",
    value: EMilitaryRank.Lieutenant,
    minRP: 150,
    maxRP: 250,
  },
  [EMilitaryRank.Major]: {
    icon: "/images/wallet/ranking/rank-4.png",
    name: "Major",
    value: EMilitaryRank.Major,
    minRP: 250,
    maxRP: 450,
  },
  [EMilitaryRank.Colonel]: {
    icon: "/images/wallet/ranking/rank-5.png",
    name: "Colonel",
    value: EMilitaryRank.Colonel,
    minRP: 450,
    maxRP: 650,
  },
  [EMilitaryRank.General]: {
    icon: "/images/wallet/ranking/rank-6.png",
    name: "General",
    value: EMilitaryRank.General,
    minRP: 650,
    maxRP: Infinity,
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
  },
  History: {
    title: "History",
    value: ERankingTabs.History,
  },
};

export enum EHistoryType {
  All = "",
  Swap = "Swap",
  Brige = "Brige",
  Game777 = "777",
  GameSpace = "space",
  GameGuessWho = "guessWho",
  GameChartVoyager = "chartVoyager",
}

export interface IHistoryType {
  label: string;
  value: EHistoryType;
  sort: number;
}

export const TypeOptions: Record<EHistoryType, IHistoryType> = {
  [EHistoryType.All]: {
    label: "All",
    value: EHistoryType.All,
    sort: 1,
  },
  [EHistoryType.Swap]: {
    label: "Swap",
    value: EHistoryType.Swap,
    sort: 2,
  },
  [EHistoryType.Brige]: {
    label: "Brige",
    value: EHistoryType.Brige,
    sort: 3,
  },
  [EHistoryType.Game777]: {
    label: "Lucky 777",
    value: EHistoryType.Game777,
    sort: 4,
  },
  [EHistoryType.GameSpace]: {
    label: "Space Invaders",
    value: EHistoryType.GameSpace,
    sort: 5,
  },
  [EHistoryType.GameGuessWho]: {
    label: "Guess Who",
    value: EHistoryType.GameGuessWho,
    sort: 6,
  },
  [EHistoryType.GameChartVoyager]: {
    label: "Chart Voyager",
    value: EHistoryType.GameChartVoyager,
    sort: 7,
  },
};
