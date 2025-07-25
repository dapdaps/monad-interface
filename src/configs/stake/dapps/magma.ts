import { monad } from "@/configs/tokens/monad";
import { monadTestnet } from "viem/chains";

export default {
  basic: {
    name: "Magma",
    icon: "/images/stake/magma/logo.png",
    type: "Staking",
    path: '/stake/magma',
  },
  networks: {
    [monadTestnet.id]: {
      stakeContractAddress: "0x2c9C959516e9AAEdB2C748224a41249202ca8BE7",
      stakeToken: {
        address: "0xaEef2f6B429Cb59C9B2D7bB2141ADa993E8571c3",
        chainId: monadTestnet.id,
        symbol: "gMON",
        decimals: 18,
        name: "gMON",
        icon: "/assets/tokens/gmon.png"
      },
      inputToken: monad["mon"],
      // inputToken -> stakeToken
      exchangeRate: 1,
    }
  }
}
