import dayjs from 'dayjs';
import Big from 'big.js';

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
  checkinList: ICheckinItem[];
  collectedMON: Big.Big;
  checkinDays: number;
  collectedToday: boolean;
  ethereumMainnetBalance: any;
  isEthereumMainnetBalanceLoading: boolean;

  handleCheckIn(recaptchaToken?: string): Promise<void>;
}

export interface ICheckedItem {
  address: string;
  checkin_date: number;
  id: number;
  reward_amount: string;
}

export interface ICheckinItem {
  date: number;
  checkin_date: number;
  checkin_sort: number;
  id: string;
  reward_amount: string;
}

export const FaucetStartDate = dayjs.utc("2025-03-01");
