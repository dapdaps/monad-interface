import { monad } from "../tokens/monad-testnet";

export default {
  name: "iZumi",
  logo: "/assets/dapps/izi-swap.png",
  path: "/dex?dapp=izumi",
  defaultInputCurrency: monad["mon"],
  tokens: {
    10143: [monad["mon"], monad["wmon"], monad["usdt"]]
  }
};
