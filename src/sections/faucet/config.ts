import dayjs from 'dayjs';
import Big from 'big.js';
import { Dispatch, SetStateAction } from 'react';

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
export interface ICheckinInfo {
  total_check_in: number
  consecutive_check_in: number
  total_energy_bar: number
  total_reward_amount: string
  today_check_in: boolean
}

export interface IFaucetContext {
  ethereumMainnetBalance: any;
  isEthereumMainnetBalanceLoading: boolean;

  checkinInfo: ICheckinInfo;
  checkinInfoLoading: boolean;
  captchaLoading: boolean;
  captchaId: string;
  setCaptchaId: Dispatch<SetStateAction<string>>;
  captchaId: string;
  setCaptchaId: Dispatch<SetStateAction<string>>;
  captchaSolution: string;
  setCaptchaSolution: Dispatch<SetStateAction<string>>;

  errorMsg: string;
  setErrorMsg: Dispatch<SetStateAction<string>>;
  checkinSuccess: boolean;
  setCheckinSuccess: Dispatch<SetStateAction<boolean>>;
  errorMsg: string;
  setErrorMsg: Dispatch<SetStateAction<boolean>>

  handleCheckIn(): Promise<void>;
  handleGetCaptcha(): Promise<void>;

  multiNft: any;
  multiNftLoading: boolean;
  baseUri: string;
  NFT_ADDRESSES: string[];
  getMultiNft: () => void;
  hasNft: boolean;
  hasEhereumMainnetBalanceBalance: boolean;
  refetchEthereumMainnetBalance: () => void;
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
