import { monad } from "../tokens/monad-testnet";
import { monad as monadMainnet } from "../tokens/monad";

export default {
  name: "Capricorn v3",
  logo: "/images/mainnet/capricorn.png",
  path: "/dex?dapp=capricorn-v3",
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
