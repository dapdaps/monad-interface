import { useDebounceFn, useRequest } from 'ahooks';
import { get, post } from '@/utils/http';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SpinResultData, SpinUserData } from '@/sections/lucky777/config';
import useToast from '@/hooks/use-toast';
import { useLuckyBeraStore } from '@/sections/lucky777/store';
import { useRequestByToken } from './use-request-by-token';
import { usePrivyAuth } from '@/hooks/use-privy-auth';
import { useAccount } from 'wagmi';


const ALL_PRIZES = [1, 2, 3, 4, 5, 13, 14, 15];
export function useLuckyBera() {
  const { fail } = useToast({ isGame: true });
  const { address } = useAccount();
  const { setLastSpinResult, lastSpinResult } = useLuckyBeraStore();
  const [multiple, setMultiple] = useState(1);
  const [chogStarrr, setChogStarrr] = useState<any>({});
  const [monadverse, setMonadverse] = useState<any>({});
  const [monadoon, setMonadoon] = useState<any>({});
  const [slmnd, setSlmnd] = useState<any>({});
  const [lamouch, setLaMouch] = useState<any>({});
  const [overnads, setOvernads] = useState<any>({});
  const [deadnads, setDeadnads] = useState<any>({});
  const [coronad, setCoronad] = useState<any>({});
  const [monshape, setMonshape] = useState<any>({});
  const [llamao, setLlamao] = useState<any>({});
  const prizes = useRef<any[]>(ALL_PRIZES);
  const [prizeStatus, setPrizeStatus] = useState(ALL_PRIZES)
  const [isOpenSwitch, setIsOpenSwitch] = useState(false);


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
    // getSpinUserData();
    console.log('reloadSpinData', lastSpinResult);
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
    if (res.data.draw_codes.join('') === '666' || res.data.draw_codes.join('') === '777' || res.data.draw_codes.join('') === '888' || res.data.draw_codes.join('') === '999') {
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

    setChogStarrr({
      total: 5,
      remaining: 0,
    });
    setMonadverse({
      total: 69,
      remaining: 0,
    });
    setMonadoon({
      total: 200,
      remaining: 0,
    });
    setSlmnd({
      total: 30,
      remaining: 0,
    });
    setLaMouch({
      total: 50,
      remaining: 0,
    });
    setOvernads({
      total: 50,
      remaining: 0,
    });
    setDeadnads({
      total: 50,
      remaining: 0,
    });
    setCoronad({
      total: 30,
      remaining: 0,
    });
    setMonshape({
      total: 10,
      remaining: 0,
    });
    setLlamao({
      total: 40,
      remaining: 0,
    });

    if (res.code !== 200) {
      // setChogStarrr({
      //   total: 50,
      //   remaining: 0,
      // });
      // setMonadverse({
      //   total: 69,
      //   remaining: 0,
      // });
      // setMonadoon({
      //   total: 200,
      //   remaining: 0,
      // });
      // setSlmnd({
      //   total: 30,
      //   remaining: 0,
      // });
      
    } else if (res.data && Array.isArray(res.data)) {

      res.data.forEach((item: any) => {
        if (item.category.toLowerCase() === 'chogstarrr') {
          setChogStarrr(item);
        }
        if (item.category.toLowerCase() === 'monadverse') {
          setMonadverse(item);
        }
        if (item.category.toLowerCase() === 'monadoon') {
          setMonadoon(item);
        }
        if (item.category.toLowerCase() === 'salmonads') {
          setSlmnd(item);
        }
        if (item.category.toLowerCase() === 'lamouch') {
          setLaMouch(item);
        }
        if (item.category.toLowerCase() === 'overnads') {
          setOvernads(item);
        }
        if (item.category.toLowerCase() === 'deadnads') {
          setDeadnads(item);
        }
        if (item.category.toLowerCase() === 'coronad') {
          setCoronad(item);
        }
        if (item.category.toLowerCase() === 'monshape') {
          setMonshape(item);
        }
        if (item.category.toLowerCase() === 'llamao') {
          setLlamao(item);
        }
        
      });
    }
  }, [])

  useEffect(() => {
    if (!address) return;
    getSpinUserData();
    getWhitelist();
  }, [address]);

  useEffect(() => {
    let newPrizes = [...ALL_PRIZES];

    if (chogStarrr.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 6);
    }
    if (monadverse.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 7);
    }
    if (monadoon.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 8);
    }
    if (slmnd.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 9);
    }
    if (lamouch.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 10);
    }
    if (overnads.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 11);
    }
    if (deadnads.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 12);
    }
    if (coronad.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 13);
    }
    if (monshape.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 14);
    }
    if (llamao.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 15);
    }

    prizes.current = newPrizes;
    setPrizeStatus(newPrizes);
  }, [chogStarrr, monadverse, monadoon, slmnd, monshape, coronad, deadnads, lamouch, overnads, llamao]);


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
    monadoon,
    slmnd,
    lamouch,
    overnads,
    deadnads,
    coronad,
    monshape,
    llamao,
    prizes,
    prizeStatus,
    isOpenSwitch,
    setIsOpenSwitch,
  };
}
