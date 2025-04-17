import { iZiSwap } from "./iziswap.model";
import { TraderJoe } from "./trader-joe.model";
import { PancakeSwap } from "./pancake-swap.model";
import { OpenOcean } from "./openocean.model";
import { Uniswap } from "./uniswap.model";

export default {
  iZumi: iZiSwap,
  LFJ: TraderJoe,
  Pancake: PancakeSwap,
  OpenOcean,
  Uniswap
} as { [key: string]: any };
