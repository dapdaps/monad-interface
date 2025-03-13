import type { Token } from "@/types";
import { monadTestnet } from '@reown/appkit/networks';

const CHAIN_ID = monadTestnet.id;

export const monad: { [key: string]: Token } = {
  mon: {
    address: "native",
    isNative: true,
    chainId: CHAIN_ID,
    symbol: "MON",
    decimals: 18,
    name: "Testnet MON Token",
    icon: "/images/monad.svg",
    color: "#78350F"
  },
  dak: {
    address: "0x0f0bdebf0f83cd1ee3974779bcb7315f9808c714",
    chainId: CHAIN_ID,
    symbol: "Molandak",
    decimals: 18,
    name: "Testnet MON Token",
    icon: "/assets/tokens/dak.png",
    color: "#78350F"
  },
  yaki: {
    address: "0xfe140e1dce99be9f4f15d657cd9b7bf622270c50",
    chainId: CHAIN_ID,
    symbol: "YAKI",
    decimals: 18,
    name: "Moyaki",
    icon: "/assets/tokens/yaki.png",
    color: "#78350F"
  },

  chog: {
    address: "0xe0590015a873bf326bd645c3e1266d4db41c4e6b",
    chainId: CHAIN_ID,
    symbol: "CHOG",
    decimals: 18,
    name: "Chog",
    icon: "/assets/tokens/chog.png",
    color: "#78350F"
  },
  wmon: {
    address: "0x760afe86e5de5fa0ee542fc7b7b713e1c5425701",
    chainId: CHAIN_ID,
    symbol: "WMON",
    decimals: 18,
    name: "Wrapped Monad",
    icon: "/assets/tokens/yaki.png",
    color: "#78350F"
  },
  usdc: {
    address: "0xf817257fed379853cDe0fa4F97AB987181B1E5Ea",
    chainId: CHAIN_ID,
    symbol: "USDC",
    decimals: 6,
    name: "USD Coin",
    icon: "/assets/tokens/usdc.png",
    color: "#78350F"
  },
  usdt: {
    address: "0x88b8E2161DEDC77EF4ab7585569D2415a1C1055D",
    chainId: CHAIN_ID,
    symbol: "USDT",
    decimals: 6,
    name: "Tether USD",
    icon: "/assets/tokens/usdt.png",
    color: "#78350F"
  },
  weth: {
    address: "0xb5a30b0fdc5ea94a52fdc42e3e9760cb8449fb37",
    chainId: CHAIN_ID,
    symbol: "WETH",
    decimals: 18,
    name: "Wrapped ETH",
    icon: "/assets/tokens/weth.png",
    color: "#78350F"
  },
  wbtc: {
    address: "0xcf5a6076cfa32686c0Df13aBaDa2b40dec133F1d",
    chainId: CHAIN_ID,
    symbol: "WBTC",
    decimals: 8,
    name: "Wrapped BTC",
    icon: "/assets/tokens/wbtc.png",
    color: "#78350F"
  },
  wsol: {
    address: "0x5387C85A4965769f6B0Df430638a1388493486F1",
    chainId: CHAIN_ID,
    symbol: "WSOL",
    decimals: 9,
    name: "Wrapped SOL",
    icon: "/assets/tokens/wsol.avif",
    color: "#78350F"
  },
  dof: {
    address: "0x71292fAeD3bcC353207645F5b40d7836e566Bab7",
    chainId: CHAIN_ID,
    symbol: "DOF",
    decimals: 18,
    name: "Doge Face",
    icon: "",
    color: "#78350F"
  },
  b3m: {
    address: "0x276856DFEF72fA8b876Eb8Eb0Fe8b4B4778eC5E0",
    chainId: CHAIN_ID,
    symbol: "B3M",
    decimals: 18,
    name: "Baby3Monad",
    icon: "/assets/tokens/b3m.png",
    color: "#78350F"
  },
  dogfood: {
    address: "0xC188d44Ef48a7657697157Fd511B8f6Cc1a864D8",
    chainId: CHAIN_ID,
    symbol: "DOGFOOD",
    decimals: 18,
    name: "Anago's Dog Food",
    icon: "",
    color: "#78350F"
  },
};
