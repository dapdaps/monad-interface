import { monad } from "../tokens/monad-testnet";
import { monad as monadMainnet } from "../tokens/monad";

export default {
  name: "UniswapV3",
  logo: "/images/dapps/icons/uniswap.png",
  path: "/dex?dapp=uniswap-v3",
  defaultInputCurrency: monadMainnet["mon"],
  defaultOutputCurrency: monadMainnet["usdc"],
  tokens: {
    143: [...Object.values(monadMainnet)]
  }
};
