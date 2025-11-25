import { monad } from "../tokens/monad-testnet";
import { monad as monadMainnet } from "../tokens/monad";

export default {
  name: "Monorail",
  logo: "/images/mainnet/monorail.png",
  path: "/dex?dapp=monorail",
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
