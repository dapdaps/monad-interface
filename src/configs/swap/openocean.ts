import { monad } from "../tokens/monad-testnet";
import { monad as monadMainnet } from "../tokens/monad";

export default {
  name: "OpenOcean",
  logo: "/assets/dapps/openocean.png",
  path: "/dex?dapp=openocean",
  defaultInputCurrency: monadMainnet["mon"],
  tokens: {
    10143: [monad["mon"], monad["wmon"], monad["usdt"], monad["usdc"]],
    143: [...Object.values(monadMainnet)]
  }
};
