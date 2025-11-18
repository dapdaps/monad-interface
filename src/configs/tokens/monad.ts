import type { Token } from "@/types";

const CHAIN_ID = 143;

export const monad: { [key: string]: Token } = {
  monad: {
    address: "native",
    isNative: true,
    chainId: CHAIN_ID,
    symbol: "MONAD",
    decimals: 18,
    name: "MONAD",
    icon: "/assets/tokens/monad.svg",
    color: "#78350F"
  },
  usdc: {
    address: "0x754704Bc059F8C67012fEd69BC8A327a5aafb603",
    chainId: CHAIN_ID,
    symbol: "USDC",
    decimals: 6,
    name: "USD Coin",
    icon: "/assets/tokens/usdc.png",
    color: "#78350F"
  },
}