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
    icon: "/assets/tokens/usdc.png",
    color: "#78350F"
  },
  wmon: {
    address: "0x3bd359C1119dA7Da1D913D1C4D2B7c461115433A",
    chainId: CHAIN_ID,
    symbol: "WMON",
    decimals: 18,
    name: "Wrapped Monad",
    icon: "/assets/tokens/wmon.png",
    color: "#78350F"
  },
}