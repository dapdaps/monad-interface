"use client";

import dapps from "@/configs/stake";
import { DEFAULT_CHAIN_ID, DEFAULT_STAKE_DAPP } from "@/configs";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import StakeView from "@/sections/stake";

export default function SwapPage() {
  const params = useSearchParams();
  const dappName = params.get("dapp");

  const dapp = useMemo(() => {
    const config = dapps[dappName as string] || dapps[DEFAULT_STAKE_DAPP];
    return {
      ...config.basic,
      ...config.networks[DEFAULT_CHAIN_ID]
    };
  }, [dappName]);

  return <StakeView dapp={dapp} />;
}
