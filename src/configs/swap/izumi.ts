import { monad } from "../tokens/monad-testnet";
import { monad as monadMainnet } from "../tokens/monad";

export default {
  name: "iZumi",
  logo: "/assets/dapps/izi-swap.png",
  path: "/dex?dapp=izumi",
  defaultInputCurrency: monadMainnet["mon"],
  tokens: {
    10143: [monad["mon"], monad["wmon"], monad["usdt"]],
    143: [...Object.values(monadMainnet)]
  }
};
