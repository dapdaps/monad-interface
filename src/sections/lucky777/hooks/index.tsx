import { useDebounceFn, useRequest } from 'ahooks';
import { get, post } from '@/utils/http';
import { useEffect, useState } from 'react';
import { SpinResultData, SpinUserData } from '@/sections/lucky777/config';
import useToast from '@/hooks/use-toast';
import { useLuckyBeraStore } from '@/sections/lucky777/store';
import { useRequestByToken } from './use-request-by-token';
import { usePrivyAuth } from '@/hooks/use-privy-auth';
import { useAccount } from 'wagmi';



export function useLuckyBera() {
  const { fail } = useToast({ isGame: true });
  const { address } = useAccount();
  const { setLastSpinResult, lastSpinResult } = useLuckyBeraStore();
  const [ multiple, setMultiple ] = useState(1);

  const { run: getSpinUserData, data: spinUserData, loading: spinUserDataLoading } = useRequest<SpinUserData, any>(async () => {
    const res = await get("/game/user", {
      address: address,
    });

    console.log('getSpinUserData:', res);

    if (res.code !== 200) {
      return {}; 
    }
    return res.data;

  }, {
    manual: true,
  });

  const { run: reloadSpinData } = useDebounceFn((lastSpinResult: any) => {
    getSpinUserData();
    setLastSpinResult(lastSpinResult);
  }, { wait: 5000 });

  const { runAsync: handleSpinResult, data: spinResultData, loading: spinResultDataLoading } = useRequestByToken<SpinResultData | boolean, any>(async () => {
    const res = await post("/game/draw", {
      spin: multiple,
    });
    if (res.code !== 200) {
      fail({ title: `Spin failed: ${res.message || res.data}` }, 'bottom-right');
      return false;
    }
    reloadSpinData(res.data);
    return res.data;
  }, {
    manual: true,
  });

  useEffect(() => {
    if (!address) return;
    getSpinUserData();
  }, [address]);

  return {
    spinUserData,
    spinUserDataLoading,
    handleSpinResult,
    getSpinUserData,
    spinResultData,
    spinResultDataLoading,
    lastSpinResult,
    multiple,
    setMultiple,
  };
}
