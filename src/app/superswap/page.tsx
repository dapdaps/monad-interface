"use client";

import SwapView from "@/sections/swap";
import dapps from "@/configs/swap";
import { DEFAULT_CHAIN_ID } from "@/configs";
import { useMemo } from "react";
import useDexTokens from "@/hooks/use-dex-tokens";

export default function SuperSwapPage() {
  const dappName = "superswap";

  const dapp = dapps[dappName as string];
  const tokens = useDexTokens(dapp);

  const dappConfig = useMemo(
    () => ({
      ...dapp,
      tokens: {
        [DEFAULT_CHAIN_ID]: tokens
      }
    }),
    [dapp, tokens]
  );

  return <SwapView dapp={dappConfig} />;
}
