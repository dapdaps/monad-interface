import type { Token } from "@/types";

const CHAIN_ID = 10143;

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
  weth: {
    chainId: CHAIN_ID,
    address: "0xB5a30b0FDc5EA94A52fDc42e3E9760Cb8449Fb37",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "/assets/tokens/weth.png",
    color: "#D2D2D2"
  },
}