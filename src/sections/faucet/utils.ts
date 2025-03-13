import dayjs from 'dayjs';
import { FaucetStartDate, ICheckedItem, ICheckinItem } from '@/sections/faucet/config';

export const getMonthlyCheckinList = (month: number, checkedInList?: ICheckedItem[]) => {
  const startOfMonth = dayjs().month(month - 1).startOf('month');
  const daysInCurrentMonth = startOfMonth.daysInMonth();
  return Array.from({ length: daysInCurrentMonth }, (_, index) => {
    const currDate = startOfMonth.add(index, 'day').startOf('day').valueOf();
    const checkedIdx = checkedInList?.findIndex?.((it) => it.checkin_date === currDate);
    let checked;
    let checkedIndex = 0;
    if (checkedIdx !== void 0 && checkedIdx > -1) {
      checkedIndex = checkedIdx;
      checked = checkedInList?.[checkedIdx];
    }
    return {
      date: currDate,
      checkin_date: checked?.checkin_date || 0,
      checkin_sort: checkedIndex,
      id: `${month}-${index}`,
      reward_amount: checked?.reward_amount || 0,
    };
  }) as ICheckinItem[];
};

export const getUntilCurrentMonthCheckinList = (checkedInList?: ICheckedItem[]) => {
  const startDate = dayjs(FaucetStartDate);
  const endDate = dayjs().endOf("month");

  const totalDays = endDate.diff(startDate, "day") + 1;

  return Array.from({ length: totalDays }, (_, index) => {
    const currDate = startDate.add(index, "day").startOf("day").valueOf();

    const checkedIdx = checkedInList?.findIndex?.((it) => it.checkin_date === currDate);

    let checked;
    let checkedIndex = 0;
    if (checkedIdx !== void 0 && checkedIdx > -1) {
      checkedIndex = checkedIdx;
      checked = checkedInList?.[checkedIdx];
    }

    return {
      date: currDate,
      checkin_date: checked?.checkin_date || 0,
      checkin_sort: checkedIndex,
      id: dayjs(currDate).format('YYYY-MM-DD'),
      reward_amount: checked?.reward_amount || 0,
    };
  }) as ICheckinItem[];
};
