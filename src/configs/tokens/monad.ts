import type { Token } from "@/types";

const CHAIN_ID = 143;

export const monad: { [key: string]: Token } = {
  mon: {
    address: "native",
    isNative: true,
    chainId: CHAIN_ID,
    symbol: "MON",
    decimals: 18,
    name: "MON",
    icon: "/images/monad.svg",
    color: "#78350F"
  },
  usdc: {
    address: "0x754704Bc059F8C67012fEd69BC8A327a5aafb603",
    chainId: CHAIN_ID,
    symbol: "USDC",
    decimals: 6,
    name: "USD Coin",
    icon: "https://assets.dapdap.net/monad/usdc.png",
    color: "#78350F"
  },
  wmon: {
    address: "0x3bd359C1119dA7Da1D913D1C4D2B7c461115433A",
    chainId: CHAIN_ID,
    symbol: "WMON",
    decimals: 18,
    name: "Wrapped Monad",
    icon: "https://assets.dapdap.net/monad/wmon.png",
    color: "#78350F"
  },
  usdt0: {
    symbol: "USDT0",
    address: "0xe7cd86e13ac4309349f30b3435a9d337750fc82d",
    chainId: CHAIN_ID,
    decimals: 6,
    name: "Tether USD",
    icon: "https://assets.dapdap.net/monad/usdt.png"
  },
  ausd: {
    address: "0x00000000efe302beaa2b3e6e1b18d08d69a9012a",
    chainId: CHAIN_ID,
    symbol: "AUSD",
    decimals: 6,
    name: "AUSD",
    icon: "https://assets.dapdap.net/monad/ausd.png"
  },
  // drops: {
  //   address: "0x68b571f834c9853d2a7e8e364d28db52de47d46d",
  //   chainId: CHAIN_ID,
  //   symbol: "DROPS",
  //   decimals: 18,
  //   name: "DROPS",
  //   icon: "https://assets.dapdap.net/monad/drops.png"
  // },
  weth: {
    address: "0xee8c0e9f1bffb4eb878d8f15f368a02a35481242",
    chainId: CHAIN_ID,
    symbol: "WETH",
    decimals: 18,
    name: "Wrapped Ether",
    icon: "https://assets.dapdap.net/monad/weth.png"
  },
  sol: {
    address: "0xea17e5a9efebf1477db45082d67010e2245217f1",
    chainId: CHAIN_ID,
    symbol: "SOL",
    decimals: 18,
    name: "SOL",
    icon: "https://assets.dapdap.net/monad/wsol.png"
  },
  smon: {
    address: "0xa3227c5969757783154c60bf0bc1944180ed81b9",
    chainId: CHAIN_ID,
    symbol: "sMON",
    decimals: 18,
    name: "sMON",
    icon: "https://assets.dapdap.net/monad/smon.png"
  },
  gmon: {
    address: "0x8498312a6b3cbd158bf0c93abdcf29e6e4f55081",
    chainId: CHAIN_ID,
    symbol: "gMON",
    decimals: 18,
    name: "gMON",
    icon: "https://assets.dapdap.net/monad/gmon.png"
  },
  shmon: {
    address: "0x1b68626dca36c7fe922fd2d55e4f631d962de19c",
    chainId: CHAIN_ID,
    symbol: "shMON",
    decimals: 18,
    name: "shMON",
    icon: "https://assets.dapdap.net/monad/shmon.png"
  },
  aprmon: {
    address: "0x0c65a0bc65a5d819235b71f554d210d3f80e0852",
    chainId: CHAIN_ID,
    symbol: "aprMON",
    decimals: 18,
    name: "aPriori Monad LST",
    icon: "https://assets.dapdap.net/monad/aprmon.png"
  },
  wsteth: {
    address: "0x10Aeaf63194db8d453d4D85a06E5eFE1dd0b5417",
    chainId: CHAIN_ID,
    symbol: "wstETH",
    decimals: 18,
    name: "Wrapped liquid staked Ether 2.0",
    icon: "https://assets.dapdap.net/monad/wsteth.png"
  },
  wbtc: {
    address: "0x0555e30da8f98308edb960aa94c0db47230d2b9c",
    chainId: CHAIN_ID,
    symbol: "WBTC",
    decimals: 8,
    name: "Wrapped BTC",
    icon: "https://assets.dapdap.net/monad/wbtc.png"
  },
  gmonad: {
    address: "0x3ff60900b70db8d0bde4d4819f028673718c5d1b",
    chainId: CHAIN_ID,
    symbol: "GMONAD",
    decimals: 18,
    name: "Gmonad",
    icon: "https://assets.dapdap.net/monad/gmonad.jpg"
  },
  molandak: {
    address: "0xd32e9ddd968b18e8429f2d1da7efb2cc1f01d42d",
    chainId: CHAIN_ID,
    symbol: "MOLANDAK",
    decimals: 18,
    name: "molandak",
    icon: "https://assets.dapdap.net/monad/molandak.jpg"
  },
  monadp: {
    address: "0x25ac11cb986ca6910501803af5b4e41cf3ad9999",
    chainId: CHAIN_ID,
    symbol: "MonadP",
    decimals: 9,
    name: "MonadPrinter",
    icon: "https://assets.dapdap.net/monad/monad-printer.jpg"
  },
  chog: {
    address: "0x350035555e10d9afaf1566aaebfced5ba6c27777",
    chainId: CHAIN_ID,
    symbol: "CHOG",
    decimals: 18,
    name: "Chog",
    icon: "https://assets.dapdap.net/monad/Chog.jpg"
  },
  mcmon: {
    address: "0x1d4795a4670033f47f572b910553be0295077b51",
    chainId: CHAIN_ID,
    symbol: "mcMON",
    decimals: 18,
    name: "mcMON",
    icon: "https://assets.dapdap.net/monad/mcmon.png"
  },
  unit: {
    address: "0x788571e0e5067adea87e6ba22a2b738ffdf48888",
    chainId: CHAIN_ID,
    symbol: "UNIT",
    decimals: 18,
    name: "UNIT",
    icon: "https://assets.dapdap.net/monad/unit.png"
  },
  mvt: {
    address: "0x04f8c38ae80bcf690b947f60f62bda18145c3d67",
    chainId: CHAIN_ID,
    symbol: "MVT",
    decimals: 18,
    name: "Monad Vault",
    icon: "https://assets.dapdap.net/monad/mvt.png"
  },
  143: {
    address: "0x3842751a46d23b41a47e702473dff316e6237777",
    chainId: CHAIN_ID,
    symbol: "143",
    decimals: 18,
    name: "143",
    icon: "https://assets.dapdap.net/monad/143.png"
  },
  moncock: {
    address: "0x405b6330e213ded490240cbcdd64790806827777",
    chainId: CHAIN_ID,
    symbol: "moncock",
    decimals: 18,
    name: "moncock",
    icon: "https://assets.dapdap.net/monad/moncock.png"
  },
  mca: {
    address: "0xb5f73846a656232d5d251ab1048bca88d1507777",
    chainId: CHAIN_ID,
    symbol: "MCA",
    decimals: 18,
    name: "Chewy",
    icon: "https://assets.dapdap.net/monad/mca.png"
  },
  nadcoin: {
    address: "0xbc0b118ece1890e2fd9a747826d40e24fe8c7777",
    chainId: CHAIN_ID,
    symbol: "NADCOIN",
    decimals: 18,
    name: "Nadcoin",
    icon: "https://assets.dapdap.net/monad/nadcoin.png"
  },
  steve: {
    address: "0x4cf8668102bd9cd464450e19701f9dbc03fb7777",
    chainId: CHAIN_ID,
    symbol: "STEVE",
    decimals: 18,
    name: "Steve",
    icon: "https://assets.dapdap.net/monad/steve.png"
  },
  monic: {
    address: "0xbcd672aa5937120b039e18a86961ce54351e7777",
    chainId: CHAIN_ID,
    symbol: "MONIC",
    decimals: 18,
    name: "MONIC",
    icon: "https://assets.dapdap.net/monad/monic.png"
  },
  nads: {
    address: "0x39b9e06f226ff6d7500c870b82333aacbd2f7777",
    chainId: CHAIN_ID,
    symbol: "NADS",
    decimals: 18,
    name: "NADS",
    icon: "https://assets.dapdap.net/monad/nads.png"
  },
  gonad: {
    address: "0xa7b3f394b9aaba67f2543a8c1a0f753cc68d7777",
    chainId: CHAIN_ID,
    symbol: "GONAD",
    decimals: 18,
    name: "GONAD",
    icon: "https://assets.dapdap.net/monad/gonad.png"
  },
  lbj: {
    address: "0x9a17ad79acc180f911be1b89f6fd566597fd7777",
    chainId: CHAIN_ID,
    symbol: "LBJ",
    decimals: 18,
    name: "Lobster Butt Juice",
    icon: "https://assets.dapdap.net/monad/lbj.png"
  },
  monka: {
    address: "0xe6eddc07257c3bf8939b8af87acc54be94237777",
    chainId: CHAIN_ID,
    symbol: "MONKA",
    decimals: 18,
    name: "MONKA",
    icon: "https://assets.dapdap.net/monad/monka.png"
  },
  hogdog: {
    address: "0xc911ba7aee487f5145702c20c20a40d9e5b87777",
    chainId: CHAIN_ID,
    symbol: "HOGDOG",
    decimals: 18,
    name: "Hog Dog",
    icon: "https://assets.dapdap.net/monad/hogdog.png"
  },
  lemon: {
    address: "0x2C957534413f97D5b2A3E83a58Df60e550317777",
    chainId: CHAIN_ID,
    symbol: "LEMON",
    decimals: 18,
    name: "Lemonjak",
    icon: "https://assets.dapdap.net/monad/lemon.png"
  },
}