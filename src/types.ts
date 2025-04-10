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
  name: string;
  icon: string;
  type: "bridge" | "swap" | "dex" | "defi" | "perps" | "nft" | "lending" | "CLOB" | "betting";
  link?: string;
  desc?: string;
}

export interface IToken {
  address: string;
  chainId: number;
  symbol: string;
  decimals: number;
  name: string;
  icon: string;
  isNative?: boolean;
  color?: string;
  x?: number;
  y?: number;
  price?: string;
  volume_24h?: string;
  price_7day?: string;
  price_change_percent_24h?: string;
}
