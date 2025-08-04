import { monad } from "../tokens/monad-testnet";

export default {
  name: "OpenOcean",
  logo: "/assets/dapps/openocean.png",
  path: "/dex?dapp=openocean",
  defaultInputCurrency: monad["mon"],
  tokens: {
    10143: [monad["mon"], monad["wmon"], monad["usdt"], monad["usdc"]]
  }
};
