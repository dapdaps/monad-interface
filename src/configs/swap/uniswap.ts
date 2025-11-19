import { monad } from "../tokens/monad-testnet";
import { monad as monadMainnet } from "../tokens/monad";

export default {
  name: "Uniswap",
  logo: "/images/dapps/icons/uniswap.png",
  path: "/dex?dapp=uniswap",
  defaultInputCurrency: monadMainnet["mon"],
  defaultOutputCurrency: monadMainnet["usdc"],
  tokens: {
    10143: [monad["mon"], monad["wmon"], monad["usdt"]],
    143: [...Object.values(monadMainnet)]
  }
};
