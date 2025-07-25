"use client";

import dapps from '@/configs/stake';
import { DEFAULT_CHAIN_ID, DEFAULT_STAKE_DAPP } from "@/configs";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import StakeView from '@/sections/stake';

export default function SwapPage() {
  const urlParams = useParams();

  const dapp = useMemo(() => {
    const config = dapps[urlParams.dapp as string] || dapps[DEFAULT_STAKE_DAPP];
    return {
      ...config.basic,
      ...config.networks[DEFAULT_CHAIN_ID],
    };
  }, [urlParams.dapp]);

  return (
    <StakeView dapp={dapp} />
  );
}
