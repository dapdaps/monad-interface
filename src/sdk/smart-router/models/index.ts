import { iZiSwap } from "./iziswap.model";
import { TraderJoe } from "./trader-joe.model";
import { PancakeSwap } from "./pancake-swap.model";
import { OpenOcean } from "./openocean.model";

export default {
  iZumi: iZiSwap,
  LFJ: TraderJoe,
  Pancake: PancakeSwap,
  OpenOcean
} as { [key: string]: any };
