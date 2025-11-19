import izumi from "./izumi";
import lfj from "./lfj";
import pancake from "./pancake";
import openocean from "./openocean";
import uniswap from "./uniswap";
import kuru from "./kuru";
import oneclick from "./oneclick";
import mondaytrade from "./mondaytrade";
import mondaytradeV3 from "./mondaytrade-v3";

export default {
  izumi,
  lfj,
  pancake,
  openocean,
  uniswap,
  kuru,
  oneclick: oneclick,
  mondaytrade: mondaytrade,
  mondaytradev3: mondaytradeV3,
} as Record<string, any>;
