import { monad } from "../tokens/monad-testnet";
import { monad as monadMainnet } from "../tokens/monad";

export default {
  name: "UniswapV2",
  logo: "/images/dapps/icons/uniswap.png",
  path: "/dex?dapp=uniswap-v2",
  defaultInputCurrency: monadMainnet["mon"],
  defaultOutputCurrency: monadMainnet["usdc"],
  tokens: {
    143: [...Object.values(monadMainnet)]
  }
};
