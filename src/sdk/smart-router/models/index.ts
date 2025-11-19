import { iZiSwap } from "./iziswap.model";
import { TraderJoe } from "./trader-joe.model";
import { PancakeSwap, PancakeSwapUniversal } from "./pancake-swap.model";
import { OpenOcean } from "./openocean.model";
import { Uniswap } from "./uniswap.model";
import { Kuru } from "./kuru.model";
import { OneClick } from "./oneclick.model";
import { MondayTrade } from "./mondaytrade.model";
import { MondayTradeV3 } from "./mondaytrade-v3.model";

export default {
  iZumi: iZiSwap,
  LFJ: TraderJoe,
  Pancake: PancakeSwapUniversal,
  OpenOcean,
  Uniswap,
  Kuru,
  OneClick,
  MondayTrade,
  MondayTradeV3,
} as { [key: string]: any };
