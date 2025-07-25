import { monad } from "@/configs/tokens/monad";
import { monadTestnet } from "viem/chains";

export default {
  basic: {
    name: "aPriori",
    icon: "/images/stake/apriori/logo.png",
    type: "Staking",
    path: '/stake/apriori',
  },
  networks: {
    [monadTestnet.id]: {}
  }
}
