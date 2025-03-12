'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { ICheckedItem, ICheckinItem, IFaucetContext } from '@/sections/faucet/config';
import { post } from '@/utils/http';
import useToast from '@/hooks/use-toast';
import useCustomAccount from '@/hooks/use-account';
import dayjs from 'dayjs';
import { getMonthlyCheckinList } from '@/sections/faucet/utils';

export const FaucetContext = createContext<Partial<IFaucetContext>>({});

// FIXME Test data
const TestList: ICheckedItem[] = [
  {
    id: 1,
    address: '0x1234567890123456789012345678901234567890',
    checkin_date: 1711776000000, // 2024-03-30
    reward_amount: 100
  },
  {
    id: 2,
    address: '0xabcdef0123456789abcdef0123456789abcdef01',
    checkin_date: 1711689600000, // 2024-03-29
    reward_amount: 150
  },
  {
    id: 3,
    address: '0x9876543210987654321098765432109876543210',
    checkin_date: 1711603200000, // 2024-03-28
    reward_amount: 200
  },
  {
    id: 4,
    address: '0xfedbca9876543210fedbca9876543210fedbca98',
    checkin_date: 1711516800000, // 2024-03-27
    reward_amount: 120
  },
  {
    id: 5,
    address: '0x0123456789abcdef0123456789abcdef01234567',
    checkin_date: 1711430400000, // 2024-03-26
    reward_amount: 180
  }
];

function FaucetContextProvider({ children }: { children: ReactNode; }) {
  const toast = useToast();
  const { account } = useCustomAccount();

  const [today] = useState<dayjs.Dayjs>(dayjs());
  const [checkInPending, setCheckInPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkedList, setCheckedList] = useState<ICheckedItem[]>(TestList);

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

  const handleCheckIn = async () => {
    if (checkInPending) return;
    setCheckInPending(true);
    try {
      const res = await post('/checkin', {});
      if (res.code !== 0) {
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
      const res = await post('/checkin/list', {});
      if (res.code !== 0) {
        setLoading(false);
        console.log("Failed to get check-in list: %o", res.message);
        return;
      }
      const _list = res.data || [];
      setCheckedList(_list);
    } catch (err: any) {
      console.log("Failed to get check-in list: %o", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!account) return;
    getCheckedList();
  }, [account]);

  console.log({
    checkInPending,
    handleCheckIn,
    loading,
    checkedList,
    today,
    currentMonth,
    daysInCurrentMonth,
    currentMonthCheckinList,
  });

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
