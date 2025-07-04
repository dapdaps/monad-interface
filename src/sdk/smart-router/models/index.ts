import { iZiSwap } from "./iziswap.model";
import { TraderJoe } from "./trader-joe.model";
import { PancakeSwap, PancakeSwapUniversal } from "./pancake-swap.model";
import { OpenOcean } from "./openocean.model";
import { Uniswap } from "./uniswap.model";
import { Kuru } from "./kuru.model";

export default {
  iZumi: iZiSwap,
  LFJ: TraderJoe,
  Pancake: PancakeSwapUniversal,
  OpenOcean,
  Uniswap,
  Kuru
} as { [key: string]: any };
