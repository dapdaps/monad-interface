interface BasicCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

export interface Token {
  chainId: number;
  address: string;
  name?: string;
  symbol: string;
  icon: string;
  logoURI?: string;
  decimals: number;
  isNative?: boolean;
  priceKey?: string;
  usd?: string;
  color?: string;
  isMeme?: boolean;
}

export interface Chain {
  chainId: number;
  chainName: string;
  icon: string;
  nativeCurrency: BasicCurrency;
  rpcUrls: string[];
  blockExplorers: string;
}

export interface IDapp {
  name: string
  icon: string
  type: "bridge" | "swap" | "dex"
  link?: string
}