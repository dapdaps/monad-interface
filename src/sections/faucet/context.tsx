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

export const FaucetContext = createContext<Partial<IFaucetContext>>({});

function FaucetContextProvider({ children }: { children: ReactNode; }) {
  const toast = useToast();
  const { account, accountWithAk } = useCustomAccount();
  const {
    playing: checkinPlaying,
    play: checkinPlay,
  } = useAudioPlay();

  const today = dayjs().utc();

  const [checkInPending, setCheckInPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkedList, setCheckedList] = useState<ICheckedItem[]>([]);
  const [checkinList, setCheckinList] = useState<ICheckinItem[]>([]);

  const [collectedMON, checkinDays, collectedToday] = useMemo(() => {
    return [
      checkedList?.reduce?.((acc, cur) => Big(acc).plus(cur.reward_amount), Big(0)) || Big(0),
      checkedList?.length || 0,
      checkedList?.some(item => item.checkin_date === today.startOf('day').valueOf())
    ];
  }, [checkedList, today]);

  const handleCheckIn = async () => {
    if (checkInPending) return;
    setCheckInPending(true);
    try {
      const res = await post('/checkin', {});
      if (res.code !== HTTP_CODE.OK) {
        toast.fail({
          title: 'Check-in failed!',
          text: res?.message ?? '',
        });
        setCheckInPending(false);
        return;
      }
      toast.success({
        title: 'Check-in successful!',
      });
      await getCheckedList({ isAfterCheckin: true });
    } catch (err: any) {
      console.log("Failed to check in: %o", err);
      toast.fail({
        title: 'Check-in failed!',
        text: err?.message ?? '',
      });
    }
    setCheckInPending(false);
  };

  const getCheckedList = async (params?: { isAfterCheckin?: boolean; }) => {
    const { isAfterCheckin } = params || {};

    setLoading(true);
    try {
      const res = await get('https://test-api-monad.dapdap.net/api/checkin/list', {});
      if (res.code !== HTTP_CODE.OK) {
        setLoading(false);
        console.log("Failed to get check-in list: %o", res.message);
        return;
      }
      const _list = res.data || [];
      _list.forEach((item: ICheckedItem) => {
        item.checkin_date = item.checkin_date > 0 ? dayjs.utc(item.checkin_date * 1000).startOf("day").valueOf() : 0;
      });
      setCheckedList(_list);
      if (isAfterCheckin) {
        checkinPlay("/audios/checkin.mp3");
      }
    } catch (err: any) {
      console.log("Failed to get check-in list: %o", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!accountWithAk) return;
    getCheckedList();
  }, [account, accountWithAk]);

  useEffect(() => {
    setCheckinList(getUntilCurrentMonthCheckinList(checkedList));
  }, [checkedList]);

  return (
    <FaucetContext.Provider
      value={{
        checkInPending,
        handleCheckIn,
        loading,
        checkedList,
        today,
        collectedMON,
        checkinDays,
        collectedToday,
        checkinList,
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
