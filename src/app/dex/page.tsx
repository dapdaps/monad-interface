"use client";

import SwapView from "@/sections/swap";
import { useSearchParams } from "next/navigation";
import dapps from "@/configs/swap";
import { DEFAULT_SWAP_DAPP, DEFAULT_CHAIN_ID } from "@/configs";
import { useMemo } from "react";
import useDexTokens from "@/hooks/use-dex-tokens";

export default function SwapPage() {
  const params = useSearchParams();
  const dappName = params.get("dapp");

  const dapp = dapps[dappName as string] || dapps[DEFAULT_SWAP_DAPP];
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
