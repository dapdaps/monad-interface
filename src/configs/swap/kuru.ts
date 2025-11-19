import { monad } from "../tokens/monad-testnet";
import { monad as monadMainnet } from "../tokens/monad";

export default {
  name: "Kuru",
  logo: "/images/dapps/icons/kuru.svg",
  path: "/dex?dapp=kuru",
  defaultInputCurrency: monadMainnet["mon"],
  defaultOutputCurrency: monadMainnet["usdc"],
  tokens: {
    143: [
      ...Object.values(monadMainnet)
    ],
    10143: [
      monad["mon"],
      monad["wmon"],
      monad["usdc"],
      monad["dump"],
      monad["axo"],
      monad["bean"],
      monad["bb"],
      monad["chog"],
      monad["q"],
      monad["chad"],
      monad["dak"],
      monad["melo"],
      monad["fiabtc"],
      monad["jml"],
      monad["jerry"],
      monad["smon"],
      monad["kiwif"],
      monad["kb"],
      monad["kurt"],
      monad["lbtc"],
      monad["monka"],
      monad["monzilla"]
    ]
  }
};
