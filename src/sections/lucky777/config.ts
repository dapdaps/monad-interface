export enum SpinCategory {
  Coin = "coin",
  Gem = "gem",
  Bear = "bear",
  Bee = "bee",
  Honey = "honey",
  // Chogstarrr = "chogstarrr",
  // Monadverse = "monadverse",
  // Monadoon = "monadoon",
  // Slmnd = "slmnd",
  // LaMouch = "lamouch",
  // Overnads = "overnads",
  // Deadnads = "deadnads",
  // Coronad = "coronad",
  // Monshape = "monshape",
  // Llamao = "llamao",
  // Skrumpeys = "skrumpeys",
  // Moana = "moana",
  // Spikynads = "spikynads",
  // Mop = 'mop',
  // Mondies = 'mondies',
  Nns = 'nns',
  Baldnads = 'baldnads',
  Olwsmonad = 'olwsmonad',
}

export const SPIN_CATEGORIES: Record<SpinCategory, any> = {
  [SpinCategory.Coin]: {
    code: "1",
    icon: "/images/lucky777/logo/madas.svg",
    value: SpinCategory.Coin,
    centerScale: 1,
    centerY: 12,
  },
  [SpinCategory.Gem]: {
    code: "2",
    icon: "/images/lucky777/logo/monad.svg",
    value: SpinCategory.Gem,
    centerScale: 0.85,
    centerY: 0,
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
    centerScale: 1,
    centerY: 12,
  },
  [SpinCategory.Honey]: {
    code: "5",
    icon: "/images/lucky777/logo/chog.svg",
    value: SpinCategory.Honey,
    centerScale: 0.85,
    centerY: 0,
  },
  // [SpinCategory.Chogstarrr]: {
  //   code: "6",
  //   icon: "/images/lucky777/logo/chogstarrr.png",
  //   value: SpinCategory.Chogstarrr,
  //   centerScale: 1,
  //   centerY: 10,
  // },
  // [SpinCategory.Monadverse]: {
  //   code: "7",
  //   icon: "/images/lucky777/logo/monadverse.png",
  //   value: SpinCategory.Monadverse,
  //   centerScale: 0.9,
  //   centerY: -4,
  // },
  // [SpinCategory.Monadoon]: {
  //   code: "8",
  //   icon: "/images/lucky777/logo/monadoon.png",
  //   value: SpinCategory.Monadoon,
  //   centerScale: 1,
  //   centerY: 0,
  // },
  // [SpinCategory.Slmnd]: {
  //   code: "9",
  //   icon: "/images/lucky777/logo/slmnd.png",
  //   value: SpinCategory.Slmnd,
  //   centerScale: 0.9,
  //   centerY: 0,
  // },
  // [SpinCategory.LaMouch]: {
  //   code: "10",
  //   icon: "/images/lucky777/lamouch.png",
  //   value: SpinCategory.LaMouch,
  //   centerScale: 1,
  //   centerY: 0,
  // },
  // [SpinCategory.Overnads]: {
  //   code: "11",
  //   icon: "/images/lucky777/overnads.png",
  //   value: SpinCategory.Overnads,
  //   centerScale: 0.9,
  //   centerY: 0,
  // },
  // [SpinCategory.Deadnads]: {
  //   code: "12",
  //   icon: "/images/lucky777/logo/1/deadnads.png",
  //   value: SpinCategory.Deadnads,
  //   centerScale: 0.9,
  //   centerY: 0,
  // },
  // [SpinCategory.Coronad]: {
  //   code: "13",
  //   icon: "/images/lucky777/logo/coronad.png",
  //   value: SpinCategory.Coronad,
  //   centerScale: 1,
  //   centerY: 0,
  // },
  // [SpinCategory.Monshape]: {
  //   code: "14",
  //   icon: "/images/lucky777/logo/monshape.png",
  //   value: SpinCategory.Monshape,
  //   centerScale: 1,
  //   centerY: 0,
  // },
  // [SpinCategory.Llamao]: {
  //   code: "15",
  //   icon: "/images/lucky777/logo/liamao.png",
  //   value: SpinCategory.Llamao,
  //   centerScale: 1,
  //   centerY: 0,
  // },
  // [SpinCategory.Skrumpeys]: {
  //   code: "16",
  //   icon: "/images/lucky777/logo/skrumpeys.png",
  //   value: SpinCategory.Skrumpeys,
  //   centerScale: 1,
  //   centerY: 0,
  // },
  // [SpinCategory.Moana]: {
  //   code: "17",
  //   icon: "/images/lucky777/logo/moana.png",
  //   value: SpinCategory.Moana,
  //   centerScale: 1,
  //   centerY: 0,
  // },
  // [SpinCategory.Spikynads]: {
  //   code: "18",
  //   icon: "/images/lucky777/logo/spikynads.png",
  //   value: SpinCategory.Spikynads,
  //   centerScale: 0.65,
  //   centerY: 0,
  // },
  // [SpinCategory.Mop]: {
  //   code: "19",
  //   icon: "/images/lucky777/logo/mop.png",
  //   value: SpinCategory.Mop,
  //   centerScale: 0.8,
  //   centerY: 0,
  // },
  // [SpinCategory.Mondies]: {
  //   code: "20",
  //   icon: "/images/lucky777/logo/mondies.png",
  //   value: SpinCategory.Mondies,
  //   centerScale: 0.8,
  //   centerY: 0,
  // },
  [SpinCategory.Nns]: {
    code: "21",
    icon: "/images/lucky777/logo/nns.png",
    value: SpinCategory.Nns,
    centerScale: 0.8,
    centerY: 5,
  },
  [SpinCategory.Baldnads]: {
    code: "22",
    icon: "/images/lucky777/logo/baldnads.png",
    value: SpinCategory.Baldnads,
    centerScale: 0.8,
    centerY: -4,
  },
  [SpinCategory.Olwsmonad]: {
    code: "23",
    icon: "/images/lucky777/logo/olwsmonad.png",
    value: SpinCategory.Olwsmonad,
    centerScale: 0.8,
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
