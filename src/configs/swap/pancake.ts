import { monad } from "../tokens/monad-testnet";

export default {
  name: "Pancake",
  logo: "/images/dapps/icons/Pancake.svg",
  path: "/dex?dapp=pancake",
  defaultInputCurrency: monad["mon"],
  tokens: {
    10143: [monad["mon"], monad["wmon"], monad["usdt"]]
  }
};
