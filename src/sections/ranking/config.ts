export interface IMilitaryRank {
  icon: string;
  name: string;
  value: number;
}

export enum EMilitaryRank {
  Private = "Private",
  Corporal = "Corporal",
  Lieutenant = "Lieutenant",
  Major = "Major",
  Colonel = "Colonel",
  General = "General",
}

export const MilitaryRank: Record<EMilitaryRank, IMilitaryRank> = {
  [EMilitaryRank.Private]: {
    icon: "/images/wallet/ranking/rank-1.png",
    name: "Private",
    value: 1,
  },
  [EMilitaryRank.Corporal]: {
    icon: "/images/wallet/ranking/rank-2.png",
    name: "Corporal",
    value: 2,
  },
  [EMilitaryRank.Lieutenant]: {
    icon: "/images/wallet/ranking/rank-3.png",
    name: "Lieutenant",
    value: 3,
  },
  [EMilitaryRank.Major]: {
    icon: "/images/wallet/ranking/rank-4.png",
    name: "Major",
    value: 4,
  },
  [EMilitaryRank.Colonel]: {
    icon: "/images/wallet/ranking/rank-5.png",
    name: "Colonel",
    value: 5,
  },
  [EMilitaryRank.General]: {
    icon: "/images/wallet/ranking/rank-6.png",
    name: "General",
    value: 6,
  },
};
