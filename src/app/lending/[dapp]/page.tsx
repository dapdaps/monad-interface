"use client";

import dapps from '@/configs/lending';
import { DEFAULT_LENDING_DAPP } from '@/configs';
import { useParams } from 'next/navigation';
import LendingView from '@/sections/lending';

const LendingDappPage = () => {
  const urlParams = useParams();

  const dapp = dapps[urlParams.dapp as string] || dapps[DEFAULT_LENDING_DAPP];

  return <LendingView dapp={dapp} />;
};

export default LendingDappPage;
