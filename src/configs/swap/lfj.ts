import { monad } from "../tokens/monad-testnet";

export default {
  name: "LFJ",
  logo: "/assets/dapps/trader-joe.png",
  path: "/dex?dapp=lfj",
  defaultInputCurrency: monad["mon"],
  tokens: {
    10143: [monad["mon"], monad["wmon"], monad["usdt"], monad["usdc"]]
  }
};
