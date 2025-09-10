import { monad } from "../tokens/monad-testnet";

export default {
  name: "Oneclick",
  logo: "/images/dapps/icons/one-click.png",
  path: "/dex?dapp=oneclick",
  defaultInputCurrency: monad["mon"],
  tokens: {
    10143: [
      monad["mon"],
      monad["wmon"],
      monad["usdc"],
    ]
  }
};
