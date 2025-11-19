import izumi from "./izumi";
import lfj from "./lfj";
import pancake from "./pancake";
import openocean from "./openocean";
import uniswap from "./uniswap";
import kuru from "./kuru";
import oneclick from "./oneclick";
import mondaytrade from "./mondaytrade";

export default {
  izumi,
  lfj,
  pancake,
  openocean,
  uniswap,
  kuru,
  oneclick: oneclick,
  mondaytrade: mondaytrade,
} as Record<string, any>;
