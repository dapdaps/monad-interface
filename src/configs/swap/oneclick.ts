import { monad } from "../tokens/monad-testnet";

export default {
  name: "OneClick",
  logo: "/images/mainnet/logo.svg",
  path: "/dex?dapp=superswap",
  defaultInputCurrency: monad["mon"],
  defaultOutputCurrency: monad["usdc"],
  tokens: {
    10143: [
      ...Object.values(monad)
    ]
  }
};
