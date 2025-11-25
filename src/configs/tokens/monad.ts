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
  // lvusd: {
  //   address: "0xfd44b35139ae53fff7d8f2a9869c503d987f00d1",
  //   chainId: CHAIN_ID,
  //   symbol: "LVUSD",
  //   decimals: 6,
  //   name: "LVUSD",
  //   icon: "https://assets.dapdap.net/monad/lvusd.png"
  // },
  // subtc: {
  //   address: "0xe85411c030fb32a9d8b14bbbc6cb19417391f711",
  //   chainId: CHAIN_ID,
  //   symbol: "suBTC",
  //   decimals: 8,
  //   name: "suBTC",
  //   icon: "https://assets.dapdap.net/monad/subtc.png"
  // },
  // pufeth: {
  //   address: "0x37d6382b6889ccef8d6871a8b60e667115eddbcf",
  //   chainId: CHAIN_ID,
  //   symbol: "pufETH",
  //   decimals: 18,
  //   name: "pufETH",
  //   icon: "https://assets.dapdap.net/monad/pufeth.png"
  // },
  // pingu: {
  //   address: "0xa2426cd97583939e79cfc12ac6e9121e37d0904d",
  //   chainId: CHAIN_ID,
  //   symbol: "PINGU",
  //   decimals: 18,
  //   name: "PINGU",
  //   icon: "https://assets.dapdap.net/monad/pingu.png"
  // },
  // huhu: {
  //   address: "0xD8b8d868e994df5D4Ba8bD599eadBc21598a732E",
  //   chainId: CHAIN_ID,
  //   symbol: "HUHU",
  //   decimals: 18,
  //   name: "HUHU",
  //   icon: "https://assets.dapdap.net/monad/huhu.png"
  // }
}