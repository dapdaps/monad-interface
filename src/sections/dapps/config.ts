import { IDapp } from "@/types";

export const LEFT_DAPP_LIST: IDapp[] = [
  {
    name: "Kuru",
    icon: "/images/dapps/icons/kuru.svg",
    type: "perps",
    link: "https://www.kuru.io/markets",
    desc: "Find, trade and launch your coins on a fully on-chain CLOB. Built for traders, powered by Monad."
  },
  {
    name: "iZumi",
    icon: "/images/dapps/icons/iZumi.svg",
    type: "dex",
    link: "/dex/izumi",
    desc: "iZUMi Finance is a multi-chain DeFi protocol providing one-stop DEX-as-a-Service (DaaS)."
  },
  {
    name: "Pancake",
    icon: "/images/dapps/icons/Pancake.svg",
    type: "dex",
    link: "/dex/pancake",
    desc: "Trade and earn crypto on the all-in-one decentralized exchange. Enjoy low fees, high liquidity, and a user-friendly interface."
  },
  {
    name: "OpenOcean",
    icon: "/images/dapps/icons/OpenOcean.svg",
    type: "dex",
    link: "/dex/openocean",
    desc: "A leading DEX aggregator on 30+ chains, with its swap API powering 180+ projects like MetaMask, Rabby, Li.Fi, and more."
  },
  {
    name: "Timeswap",
    icon: "/images/dapps/icons/timeswap.svg",
    type: "dex",
    link: "https://app.timeswap.io/markets?chainId=10143",
    desc: "Timeswap is the first oracleless lending/borrowing protocol — enabling the creation of money markets for ANY ERC20 tokens."
  }
];

export const RIGHT_DAPP_LIST: IDapp[] = [
  {
    name: "LEVR",
    icon: "/images/dapps/icons/levr.svg",
    type: "defi",
    link: "https://app.levr.bet/",
    desc: "Leverage Sports Betting with Fully Liquid Positions."
  },
  {
    name: "Magic Eden",
    icon: "/images/dapps/icons/magic-eden.svg",
    type: "nft",
    link: "https://magiceden.io/monad-testnet",
    desc: "Magic Eden brings all chains and all assets together in one easy-to-use platform."
  },
  {
    name: "LFJ",
    icon: "/images/dapps/icons/LFJ.svg",
    type: "dex",
    link: "/dex/lfj",
    desc: "The onchain trading platform built for winners. One-stop DEX, Aggregator & Screener for Monad. Discover & buy every token at the best prices."
  },
  {
    name: "Orbiter",
    icon: "https://assets.dapdap.net/images/100-obiter.png",
    type: "bridge",
    link: "/bridge/obiter",
    desc: "Orbiter Finance is a decentralized cross-rollup bridge that offers secure, low cost and almost instant transfer."
  }
];
