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
    icon: "/assets/tokens/bera.svg",
    color: "#78350F"
  },
};
