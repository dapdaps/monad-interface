import {
  Chain,
  monadTestnet,
} from "@reown/appkit/networks";
import { DEFAULT_CHAIN_ID } from '@/configs/index';

const chains: Record<number, Chain | any> = {
  [DEFAULT_CHAIN_ID]: monadTestnet,
};

export const icons: Record<number, string> = {
  [DEFAULT_CHAIN_ID]: "/images/monad.png",
  1: "/images/eth.svg"
};

export default chains;
