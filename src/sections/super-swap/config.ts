import { monad } from "@/configs/tokens/monad-testnet";

export default {
    name: "super swap",
    logo: "/images/dapps/icons/super-swap.png",
    defaultInputCurrency: monad["mon"],
    tokens: {
      10143: [monad["mon"], monad["wmon"], monad["usdt"], monad["usdc"], monad["eth"]]
    }
  };
  