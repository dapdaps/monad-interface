import { monad } from "../tokens/monad-testnet";
import { monad as monadMainnet } from "../tokens/monad";

export default {
  name: "monday trade",
  logo: "/images/dapps/icons/mondaytrade.png",
  path: "/dex?dapp=mondaytrade",
  defaultInputCurrency: monadMainnet["mon"],
  defaultOutputCurrency: monadMainnet["usdc"],
  tokens: {
    10143: [
      ...Object.values(monad)
    ],
    143: [
      ...Object.values(monadMainnet)
    ]
  }
};
