import type { Token } from "@/types";

const CHAIN_ID = 11155111;

export const sepolia: { [key: string]: Token } = {

  weth: {
    chainId: CHAIN_ID,
    address: "native",
    decimals: 18,
    symbol: "ETH",
    name: "Ether",
    icon: "/assets/tokens/eth.png",
    color: "#D2D2D2"
  },
}