import { iZiSwap } from "./iziswap.model";
import { TraderJoe } from "./trader-joe.model";
import { PancakeSwap, PancakeSwapUniversal } from "./pancake-swap.model";
import { OpenOcean } from "./openocean.model";
import { Uniswap } from "./uniswap.model";
import { Kuru } from "./kuru.model";
import { OneClick } from "./oneclick.model";
import { MondayTrade } from "./mondaytrade.model";

export default {
  iZumi: iZiSwap,
  LFJ: TraderJoe,
  Pancake: PancakeSwapUniversal,
  OpenOcean,
  Uniswap,
  Kuru,
  OneClick,
  MondayTrade,
} as { [key: string]: any };
