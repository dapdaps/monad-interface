import izumi from "./izumi";
import lfj from "./lfj";
import pancake from "./pancake";
import pancakeV2 from "./pancake-v2";
import pancakeV3 from "./pancake-v3";
import openocean from "./openocean";
import uniswap from "./uniswap";
import uniswapV2 from "./uniswap-v2";
import uniswapV3 from "./uniswap-v3";
import kuru from "./kuru";
import oneclick from "./oneclick";
import mondaytrade from "./mondaytrade";
import mondaytradeV3 from "./mondaytrade-v3";
import monorail from "./monorail";
import capricornV3 from "./capricorn-v3";

export default {
  izumi,
  lfj,
  pancake,
  pancakev2: pancakeV2,
  pancakev3: pancakeV3,
  openocean,
  uniswap,
  uniswapv2: uniswapV2,
  uniswapv3: uniswapV3,
  kuru,
  oneclick: oneclick,
  mondaytrade: mondaytrade,
  mondaytradev3: mondaytradeV3,
  monorail: monorail,
  capricornv3: capricornV3,
} as Record<string, any>;
