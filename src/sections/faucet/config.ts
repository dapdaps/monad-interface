import dayjs from 'dayjs';

export enum EStatus {
  Finished,
  Unfinished,
}

export interface IStep {
  value: number;
  amount: number;
  unit: string;
  label: any;
  status?: EStatus;
}

export interface IFaucetContext {
  checkInPending: boolean;
  loading: boolean;
  checkedList: ICheckedItem[];
  today: dayjs.Dayjs;
  currentMonth: number;
  daysInCurrentMonth: number;
  currentMonthCheckinList: ICheckinItem[];

  handleCheckIn(): Promise<void>;
}

export interface ICheckedItem {
  address: string;
  checkin_date: number;
  id: number;
  reward_amount: number;
}

export interface ICheckinItem {
  date: number;
  checkin_date: number;
  id: string;
  reward_amount: number;
}
