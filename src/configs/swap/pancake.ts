import { monad } from "../tokens/monad-testnet";

export default {
  name: "Pancake",
  logo: "/assets/dapps/pancake.png",
  path: "/dex/pancake",
  defaultInputCurrency: monad["mon"],
  tokens: {
    10143: [monad["mon"], monad["usdt"]]
  }
};
