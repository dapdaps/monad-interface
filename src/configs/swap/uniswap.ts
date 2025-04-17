import { monad } from "../tokens/monad-testnet";

export default {
  name: "Uniswap",
  logo: "/images/dapps/icons/uniswap.png",
  path: "/dex/uniswap",
  defaultInputCurrency: monad["mon"],
  tokens: {
    10143: [monad["mon"], monad["wmon"], monad["usdt"]]
  }
};
