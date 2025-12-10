import dayjs from "@/libs/day";

export const DEFAULT_CHAIN_ID = 143

export const IS_PRODUCTION = process.env.NEXT_PUBLIC_API === "https://api-monad.dapdap.net";

export const IS_MAINNET = false;

export enum HTTP_CODE {
  OK = 200
}

export const DEFAULT_SWAP_DAPP = "izumi";
export const DEFAULT_LENDING_DAPP = "timeswap";
export const DEFAULT_STAKE_DAPP = "apriori";

export const MONAD_TESTNET_START_DATE = dayjs.utc("2025-02-19 00:00:00");
