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
  type: "Bridge" | "Swap" | "Dex" | "Defi" | "Perps" | "NFT" | "Lending" | "CLOB" | "Betting" | "Gaming";
  link?: string;
  desc?: string;
  tvl?: string;
  volume24h?: string;
  liquidity?: string;
  disabled?: boolean;
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
