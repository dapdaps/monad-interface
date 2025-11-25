import { iZiSwap } from "./iziswap.model";
import { TraderJoe } from "./trader-joe.model";
import { PancakeSwap, PancakeSwapUniversal, PancakeSwapV2, PancakeSwapV3 } from "./pancake-swap.model";
import { OpenOcean } from "./openocean.model";
import { UniswapV3, UniswapV2, Uniswap } from "./uniswap.model";
import { Kuru } from "./kuru.model";
import { OneClick } from "./oneclick.model";
import { MondayTrade } from "./mondaytrade.model";
import { MondayTradeV3 } from "./mondaytrade-v3.model";
import { Monorail } from "./monorail.model";

export default {
  iZumi: iZiSwap,
  LFJ: TraderJoe,
  Pancake: PancakeSwapUniversal,
  PancakeV2: PancakeSwapV2,
  PancakeV3: PancakeSwapV3,
  OpenOcean,
  Uniswap,
  UniswapV3: UniswapV3,
  UniswapV2: UniswapV2,
  Kuru,
  OneClick,
  MondayTrade,
  MondayTradeV3,
  Monorail,
} as { [key: string]: any };
