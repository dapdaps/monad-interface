import { monad } from "../tokens/monad-testnet";
import { monad as monadMainnet } from "../tokens/monad";

export default {
  name: "LFJ",
  logo: "/assets/dapps/trader-joe.png",
  path: "/dex?dapp=lfj",
  defaultInputCurrency: monadMainnet["mon"],
  tokens: {
    10143: [monad["mon"], monad["wmon"], monad["usdt"], monad["usdc"]],
    143: [...Object.values(monadMainnet)]
  }
};
