"use client";

import dapps from "@/configs/lending";
import { DEFAULT_CHAIN_ID, DEFAULT_LENDING_DAPP } from "@/configs";
import { useSearchParams } from "next/navigation";
import LendingView from "@/sections/lending";
import { useMemo } from "react";
import dAppData from "@/sections/lending/data";
import userData from "@/sections/lending/user-data";
import columns from "@/sections/lending/column";
import actions from "@/sections/lending/action";

const LendingDappPage = () => {
  const params = useSearchParams();
  const dappName = params.get("dapp");

  const dapp = useMemo(() => {
    const config = dapps[dappName as string] || dapps[DEFAULT_LENDING_DAPP];
    return {
      ...config.basic,
      ...config.networks[DEFAULT_CHAIN_ID],
      pathName: dappName,
      loadData: dAppData[dappName as string],
      loadUserData: userData[dappName as string],
      loadColumns: columns[dappName as string],
      onAction: actions[dappName as string]
    };
  }, [dappName]);

  return <LendingView dapp={dapp} />;
};

export default LendingDappPage;
