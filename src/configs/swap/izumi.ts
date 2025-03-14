import { monad } from "../tokens/monad-testnet";

export default {
  name: "iZumi",
  logo: "/assets/dapps/izi-swap.png",
  path: "/dex/izumi",
  defaultInputCurrency: monad["mon"],
  tokens: {
    10143: [monad["mon"], monad["usdt"]]
  }
};
