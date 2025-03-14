import { iZiSwap } from "./iziswap.model";
import { TraderJoe } from "./trader-joe.model";
import { PancakeSwap } from "./pancake-swap.model";

export default {
  iZumi: iZiSwap,
  LFJ: TraderJoe,
  Pancake: PancakeSwap
} as { [key: string]: any };
