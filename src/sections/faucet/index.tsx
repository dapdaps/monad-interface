"use client";

import FaucetCard from '@/sections/faucet/components/card';
import FaucetCardTitle from '@/sections/faucet/components/card/title';
import FaucetCheckIn from '@/sections/faucet/components/check-in';
import FaucetContextProvider from '@/sections/faucet/context';
import useIsMobile from '@/hooks/use-isMobile';
import Mobile from './mobile';
import Laptop from './laptop';
import { useAccount } from 'wagmi';

const FaucetView = () => {
  const isMobile = useIsMobile()
  const { address } = useAccount()
  
  return (
    <FaucetContextProvider>
      {
        isMobile ? <Mobile /> : <Laptop key={address} />
      }
    </FaucetContextProvider>
  );
};

export default FaucetView;
