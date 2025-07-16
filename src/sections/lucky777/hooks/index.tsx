import { useDebounceFn, useRequest } from 'ahooks';
import { get, post } from '@/utils/http';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SpinResultData, SpinUserData } from '@/sections/lucky777/config';
import useToast from '@/hooks/use-toast';
import { useLuckyBeraStore } from '@/sections/lucky777/store';
import { useRequestByToken } from './use-request-by-token';
import { usePrivyAuth } from '@/hooks/use-privy-auth';
import { useAccount } from 'wagmi';


const ALL_PRIZES = [1, 2, 3, 4, 5, 6, 7];
export function useLuckyBera() {
  const { fail } = useToast({ isGame: true });
  const { address } = useAccount();
  const { setLastSpinResult, lastSpinResult } = useLuckyBeraStore();
  const [multiple, setMultiple] = useState(1);
  const [chogStarrr, setChogStarrr] = useState<any>({});
  const [monadverse, setMonadverse] = useState<any>({});
  const prizes = useRef<any[]>([1, 2, 3, 4, 5, 6, 7]);


  const { run: getSpinUserData, data: spinUserData, loading: spinUserDataLoading } = useRequest<SpinUserData, any>(async () => {
    const res = await get("/game/user", {
      address: address,
    });

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

    // res.data.draw_code = '666';
    if (res.data.draw_codes.join('') === '666' || res.data.draw_codes.join('') === '777') {
      getWhitelist();
    }

    const codes: any[] = [];
    res.data.draw_codes.forEach((item: any) => {
      if (!prizes.current.includes(item)) {
        const randomIndex = Math.floor(Math.random() * prizes.current.length);
        codes.push(prizes.current[randomIndex]);
        return;
      }
     
      codes.push(item);
    }); 

    res.data.draw_codes = codes
    res.data.draw_code = codes.join('');

    reloadSpinData(res.data);
    return res.data;
  }, {
    manual: true,
  });

  const getWhitelist = useCallback(async () => {
    const res = await get("/game/777/reward/whitelist");

    if (res.code !== 200) {
      setChogStarrr({
        total: 50,
        remaining: 0,
      });
      setMonadverse({
        total: 69,
        remaining: 0,
      });
    } else if (res.data && Array.isArray(res.data)) {
      setChogStarrr(res.data.find((item: any) => item.category.toLowerCase() === 'chogstarrr'));
      setMonadverse(res.data.find((item: any) => item.category.toLowerCase() === 'monadverse'));
    }
  }, [])

  useEffect(() => {
    if (!address) return;
    getSpinUserData();
    getWhitelist();
  }, [address]);

  useEffect(() => {
    if (chogStarrr.remaining > 0) {
      prizes.current = ALL_PRIZES.filter((item: any) => item !== 6);
    }
    if (monadverse.remaining > 0) {
      prizes.current = ALL_PRIZES.filter((item: any) => item !== 7);
    }
  }, [chogStarrr, monadverse]);

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
    chogStarrr,
    monadverse,
  };
}
