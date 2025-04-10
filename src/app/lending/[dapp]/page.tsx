"use client";

import dapps from '@/configs/lending';
import { DEFAULT_CHAIN_ID, DEFAULT_LENDING_DAPP } from '@/configs';
import { useParams } from 'next/navigation';
import LendingView from '@/sections/lending';
import { useMemo } from 'react';
import dAppData from '@/sections/lending/data';
import userData from '@/sections/lending/user-data';
import columns from '@/sections/lending/column';
import actions from '@/sections/lending/action';

const LendingDappPage = () => {
  const urlParams = useParams();

  const dapp = useMemo(() => {
    const config = dapps[urlParams.dapp as string] || dapps[DEFAULT_LENDING_DAPP];
    return {
      ...config.basic,
      ...config.networks[DEFAULT_CHAIN_ID],
      pathName: urlParams.dapp,
      loadData: dAppData[urlParams.dapp as string],
      loadUserData: userData[urlParams.dapp as string],
      loadColumns: columns[urlParams.dapp as string],
      onAction: actions[urlParams.dapp as string],
    };
  }, [urlParams.dapp]);

  return <LendingView dapp={dapp} />;
};

export default LendingDappPage;
