export enum SpinCategory {
  Coin = "coin",
  Gem = "gem",
  Bear = "bear",
  Bee = "bee",
  Honey = "honey",
}

export const SPIN_CATEGORIES: Record<SpinCategory, any> = {
  [SpinCategory.Coin]: {
    code: "1",
    icon: "/images/lucky777/logo/madas.svg",
    value: SpinCategory.Coin,
    centerScale: 0.85,
    centerY: 7,
  },
  [SpinCategory.Gem]: {
    code: "2",
    icon: "/images/lucky777/logo/monad.svg",
    value: SpinCategory.Gem,
    centerScale: 0.85,
    centerY: 5,
  },
  [SpinCategory.Bear]: {
    code: "3",
    icon: "/images/lucky777/logo/molandak.svg",
    value: SpinCategory.Bear,
    centerScale: 0.85,
    centerY: 0,
  },
  [SpinCategory.Bee]: {
    code: "4",
    icon: "/images/lucky777/logo/moyaki.svg",
    value: SpinCategory.Bee,
    centerScale: 0.85,
    centerY: 7,
  },
  [SpinCategory.Honey]: {
    code: "5",
    icon: "/images/lucky777/logo/chog.svg",
    value: SpinCategory.Honey,
    centerScale: 0.85,
    centerY: 0,
  },
};

export enum SpinMultiplier {
  X1 = 1,
  X2 = 2,
  X5 = 5,
  X10 = 10,
  X50 = 50,
  X100 = 100,
  X500 = 500,
  X1000 = 1000,
  X5000 = 5000,
}

export interface SpinUserData {
  address: string;
  points_balance: number;
  spin_balance: number;
}

export interface SpinResultData {
  amount: number;
  bee: number;
  bee_level_amount: number;
  bee_level_reward_coins: number;
  category: SpinCategory;
  code: string;
  gem: number;
  spin: number;
}
