import { monadTestnet } from "viem/chains";

export const DEFAULT_CHAIN_ID =
  Number(process.env.NEXT_PUBLIC_CHAIN_ID) || monadTestnet.id;

export const IS_MAINNET = false;

export enum HTTP_CODE {
  OK = 200
}

export const DEFAULT_SWAP_DAPP = "izumi";
export const DEFAULT_LENDING_DAPP = "timeswap";
export const DEFAULT_STAKE_DAPP = "apriori";
