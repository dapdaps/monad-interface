'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { ICheckedItem, ICheckinItem, IFaucetContext } from '@/sections/faucet/config';
import { get, post } from '@/utils/http';
import useToast from '@/hooks/use-toast';
import useCustomAccount from '@/hooks/use-account';
import dayjs from 'dayjs';
import { getMonthlyCheckinList } from '@/sections/faucet/utils';
import Big from 'big.js';
import { HTTP_CODE } from '@/configs';

export const FaucetContext = createContext<Partial<IFaucetContext>>({});

function FaucetContextProvider({ children }: { children: ReactNode; }) {
  const toast = useToast();
  const { accountWithAk } = useCustomAccount();

  const [today] = useState<dayjs.Dayjs>(dayjs());
  const [checkInPending, setCheckInPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkedList, setCheckedList] = useState<ICheckedItem[]>([]);

  const [currentMonth, daysInCurrentMonth, currentMonthCheckinList] = useMemo<[number, number, ICheckinItem[]]>(() => {
    if (!today) {
      return [
        dayjs().month() + 1,
        dayjs().daysInMonth(),
        getMonthlyCheckinList(dayjs().month() + 1, checkedList)
      ];
    }
    return [
      today.month() + 1,
      today.daysInMonth(),
      getMonthlyCheckinList(today.month() + 1, checkedList)
    ];
  }, [today, checkedList]);

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
      await getCheckedList();
    } catch (err: any) {
      console.log("Failed to check in: %o", err);
      toast.fail({
        title: 'Check-in failed!',
        text: err?.message ?? '',
      });
    }
    setCheckInPending(false);
  };

  const getCheckedList = async () => {
    setLoading(true);
    try {
      const res = await get('/checkin/list', {});
      if (res.code !== HTTP_CODE.OK) {
        setLoading(false);
        console.log("Failed to get check-in list: %o", res.message);
        return;
      }
      const _list = res.data || [];
      _list.forEach((item: ICheckedItem) => {
        item.checkin_date = item.checkin_date > 0 ? dayjs(item.checkin_date * 1000).startOf("day").valueOf() : 0;
      });
      setCheckedList(_list);
    } catch (err: any) {
      console.log("Failed to get check-in list: %o", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!accountWithAk) return;
    getCheckedList();
  }, [accountWithAk]);

  return (
    <FaucetContext.Provider
      value={{
        checkInPending,
        handleCheckIn,
        loading,
        checkedList,
        today,
        currentMonth,
        daysInCurrentMonth,
        currentMonthCheckinList,
        collectedMON,
        checkinDays,
        collectedToday,
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
