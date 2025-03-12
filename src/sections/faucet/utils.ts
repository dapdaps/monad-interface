import dayjs from 'dayjs';
import { ICheckedItem, ICheckinItem } from '@/sections/faucet/config';

export const getMonthlyCheckinList = (month: number, checkedInList?: ICheckedItem[]) => {
  const startOfMonth = dayjs().month(month - 1).startOf('month');
  const daysInCurrentMonth = startOfMonth.daysInMonth();
  return Array.from({ length: daysInCurrentMonth }, (_, index) => {
    const currDate = startOfMonth.add(index, 'day').startOf('day').valueOf();
    const checked = checkedInList?.find((it) => it.checkin_date === currDate);
    return {
      date: currDate,
      checkin_date: checked?.checkin_date || 0,
      id: `${month}-${index}`,
      reward_amount: checked?.reward_amount || 0,
    };
  }) as ICheckinItem[];
};
