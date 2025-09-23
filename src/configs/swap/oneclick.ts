import { monad } from "../tokens/monad-testnet";

export default {
  name: "SuperSwap",
  logo: "",
  path: "/dex?dapp=superswap",
  defaultInputCurrency: monad["mon"],
  defaultOutputCurrency: monad["usdt"],
  tokens: {
    10143: [
      monad["mon"],
      monad["wmon"],
      monad["usdt"],
      monad["usdc"],
    ]
  }
};
