import { monad } from "../tokens/monad-testnet";

export default {
  name: "monday trade",
  logo: "/images/dapps/icons/mondaytrade.png",
  path: "/dex?dapp=mondaytrade",
  defaultInputCurrency: monad["mon"],
  defaultOutputCurrency: monad["usdc"],
  tokens: {
    10143: [
      ...Object.values(monad)
    ]
  }
};
