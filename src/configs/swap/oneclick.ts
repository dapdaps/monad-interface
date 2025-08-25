import { monad } from "../tokens/monad-testnet";

export default {
  name: "OneClick",
  logo: "",
  path: "/dex",
  defaultInputCurrency: monad["mon"],
  defaultOutputCurrency: monad["usdt"],
  tokens: {
    10143: [
      monad["mon"],
      monad["wmon"],
      monad["usdt"],
      monad["usdc"],
    ]
  }
};
