import { monad } from "../tokens/monad-testnet";
import { monad as monadMainnet } from "../tokens/monad";

export default {
  name: "OneClick",
  logo: "/images/mainnet/logo.svg",
  path: "/dex?dapp=superswap",
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
