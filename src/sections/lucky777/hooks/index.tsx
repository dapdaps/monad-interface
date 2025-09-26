import { useDebounceFn, useRequest } from 'ahooks';
import { get, post } from '@/utils/http';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SpinResultData, SpinUserData } from '@/sections/lucky777/config';
import useToast from '@/hooks/use-toast';
import { useLuckyBeraStore } from '@/sections/lucky777/store';
import { useRequestByToken } from './use-request-by-token';
import { useAccount } from 'wagmi';


const ALL_PRIZES = [1, 2, 3, 4, 5, 25, 26];
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
  const [skrumpeys, setSkrumpeys] = useState<any>({});
  const [moana, setMoana] = useState<any>({});
  const [spikynads, setSpikynads] = useState<any>({});
  const [mop, setMop] = useState<any>({});
  const [mondies, setMondies] = useState<any>({});
  const [nns, setNns] = useState<any>({});
  const [baldnads, setBaldnads] = useState<any>({});
  const [owlsmonad, setOwlsmonad] = useState<any>({});
  const [octonads, setOctonads] = useState<any>({});
  const [monzilla, setMonzilla] = useState<any>({});
  const [bober, setBober] = useState<any>({});
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
    setSkrumpeys({
      total: 50,
      remaining: 0,
    });
    setMoana({
      total: 30,
      remaining: 0,
    });
    setSpikynads({
      total: 5,
      remaining: 0,
    });
    setMop({
      total: 50,
      remaining: 0,
    });
    setMondies({
      total: 100,
      remaining: 0,
    });
    setNns({
      total: 3,
      remaining: 0,
    });
    setBaldnads({
      total: 50,
      remaining: 0,
    });
    setOwlsmonad({
      total: 15,
      remaining: 0,
    });
    setOctonads({
      total: 5,
      remaining: 0,
    });
    setMonzilla({
      total: 30,
      remaining: 0,
    });
    setBober({
      total: 20,
      remaining: 0,
    });
    if (res.code !== 200) {
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
        if (item.category.toLowerCase() === 'skrumpeys') {
          setSkrumpeys(item);
        }
        if (item.category.toLowerCase() === 'moana') {
          setMoana(item);
        }
        if (item.category.toLowerCase() === 'spikynads') {
          setSpikynads(item);
        } 
        if (item.category.toLowerCase() === 'mop') {
          setMop(item);
        }
        if (item.category.toLowerCase() === 'mondies') {
          setMondies(item);
        }
        if (item.category.toLowerCase() === 'nns') {
          setNns(item);
        }
        if (item.category.toLowerCase() === 'baldnads') {
          setBaldnads(item);
        }
        if (item.category.toLowerCase() === 'owlsmonad') {
          setOwlsmonad(item);
        }
        if (item.category.toLowerCase() === 'octonads') {
          setOctonads(item);
        }
        if (item.category.toLowerCase() === 'monzilla') {
          setMonzilla(item);
        }
        if (item.category.toLowerCase() === 'bober') {
          setBober(item);
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
    if (skrumpeys.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 16);
    }
    if (moana.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 17);
    }

    if (spikynads.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 18);
    }
    
    if (mop.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 19);
    }
    if (mondies.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 20);
    }
    if (nns.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 21);
    }
    if (baldnads.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 22);
    }
    if (owlsmonad.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 23);
    }
    if (octonads.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 24);
    }
    if (monzilla.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 25);
    }
    if (bober.remaining === 0) {
      newPrizes = newPrizes.filter((item: any) => item !== 26);
    }

    prizes.current = newPrizes;
    setPrizeStatus(newPrizes);
  }, [chogStarrr, monadverse, monadoon, slmnd, monshape, coronad, deadnads, lamouch, overnads, llamao, skrumpeys, moana, spikynads, mop, mondies, nns, baldnads, owlsmonad, octonads, monzilla, bober]);


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
    skrumpeys,
    moana,
    spikynads,
    mop,
    mondies,
    nns,
    baldnads,
    owlsmonad,
    octonads,
    monzilla,
    bober,
    prizes,
    prizeStatus,
    isOpenSwitch,
    setIsOpenSwitch,
  };
}
