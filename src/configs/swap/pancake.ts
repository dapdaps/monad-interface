import { monad } from "../tokens/monad-testnet";
import { monad as monadMainnet } from "../tokens/monad";

export default {
  name: "Pancake",
  logo: "/images/dapps/icons/Pancake.svg",
  path: "/dex?dapp=pancake",
  defaultInputCurrency: monadMainnet["mon"],
  defaultOutputCurrency: monadMainnet["usdc"],
  tokens: {
    10143: [monad["mon"], monad["wmon"], monad["usdt"]],
    143: [...Object.values(monadMainnet)]
  }
};
