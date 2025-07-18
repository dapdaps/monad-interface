'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { ICheckedItem, ICheckinItem, IFaucetContext } from '@/sections/faucet/config';
import { get, post } from '@/utils/http';
import useToast from '@/hooks/use-toast';
import useCustomAccount from '@/hooks/use-account';
import dayjs from 'dayjs';
import { getUntilCurrentMonthCheckinList } from '@/sections/faucet/utils';
import Big from 'big.js';
import { HTTP_CODE } from '@/configs';
import useAudioPlay from '@/hooks/use-audio';
import { useBalance } from 'wagmi';
import { mainnet } from 'viem/chains';
import useCheckinInfo from './hooks/use-checkin-info';
import useCheckin from './hooks/use-checkin';
import useMultiNft from './hooks/useMultiNft';

export const FaucetContext = createContext<Partial<IFaucetContext>>({});

function FaucetContextProvider({ children }: { children: ReactNode; }) {
  const toast = useToast();
  const { account, accountWithAk } = useCustomAccount();
  const { multiNft, multiNftLoading, baseUri, NFT_ADDRESSES, getMultiNft, hasNft } = useMultiNft();

  const {
    loading: checkinInfoLoading,
    checkinInfo,
    handleQueryCheckIn
  } = useCheckinInfo()

  const {
    captchaLoading,
    captchaId,
    setCaptchaId,
    captchaSolution,
    setCaptchaSolution,
    errorMsg,
    setErrorMsg,
    checkinSuccess,
    setCheckinSuccess,
    handleCheckIn,
    handleGetCaptcha,
    hasEhereumMainnetBalanceBalance,
    isEthereumMainnetBalanceLoading,
    ethereumMainnetBalance,
    refetchEthereumMainnetBalance
  } = useCheckin({
    hasNft: hasNft,
    checkinInfo
  })

  

 
  
  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    if (checkinSuccess) {
      setCaptchaId("")
      handleQueryCheckIn()
    }
  }, [checkinSuccess])


  return (
    <FaucetContext.Provider
      value={{
        ethereumMainnetBalance,
        isEthereumMainnetBalanceLoading,
        hasEhereumMainnetBalanceBalance,
        checkinInfo,
        checkinInfoLoading,
        captchaLoading,
        captchaId,
        setCaptchaId,
        captchaSolution,
        setCaptchaSolution,

        errorMsg,
        setErrorMsg,
        checkinSuccess,
        setCheckinSuccess,

        showHistory,
        setShowHistory,
        handleCheckIn,
        handleGetCaptcha,
        multiNft, 
        multiNftLoading, 
        baseUri, 
        NFT_ADDRESSES, 
        getMultiNft, 
        hasNft,
        refetchEthereumMainnetBalance
      }}
    >
      {children}
    </FaucetContext.Provider>
  );
}

export default FaucetContextProvider;

export function useFaucetContext() {
  const context = useContext(FaucetContext);

  return context as IFaucetContext;
}
