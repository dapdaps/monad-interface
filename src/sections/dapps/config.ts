import { IDapp } from "@/types";

export const ALL_DAPP_LIST: IDapp[] = [
  // feedback-6
  // {
  //   name: "iZumi",
  //   icon: "/images/dapps/icons/iZumi.svg",
  //   type: "Dex",
  //   link: "/dex/izumi",
  //   desc: "iZUMi Finance is a multi-chain DeFi protocol providing one-stop DEX-as-a-Service (DaaS)."
  // },
  {
    // feedback-5
    name: "PancakeSwap",
    icon: "/images/dapps/icons/Pancake.svg",
    type: "Dex",
    link: "/dex/pancake",
    desc: "Trade and earn crypto on the all-in-one decentralized exchange. Enjoy low fees, high liquidity, and a user-friendly interface.",
    disabled: false
  },
  {
    name: "Uniswap",
    icon: "/images/dapps/icons/uniswap.png",
    type: "Dex",
    link: "/dex/uniswap",
    desc: "The largest onchain marketplace. Buy and sell crypto on Monad and 11+ other chains."
  },
  // feedback-6
  // {
  //   name: "OpenOcean",
  //   icon: "/images/dapps/icons/OpenOcean.svg",
  //   type: "Dex",
  //   link: "/dex/openocean",
  //   desc: "A leading DEX aggregator on 30+ chains, with its swap API powering 180+ projects like MetaMask, Rabby, Li.Fi, and more."
  // },
  {
    name: "LFJ",
    icon: "/images/dapps/icons/LFJ.svg",
    type: "Dex",
    link: "/dex/lfj",
    desc: "The onchain trading platform built for winners. One-stop DEX, Aggregator & Screener for Monad. Discover & buy every token at the best prices.",
    disabled: false
  },
  // feedback-6
  // {
  //   name: "Orbiter",
  //   icon: "https://assets.dapdap.net/images/100-obiter.png",
  //   type: "bridge",
  //   link: "/bridge/obiter",
  //   desc: "Orbiter Finance is a decentralized cross-rollup bridge that offers secure, low cost and almost instant transfer."
  // },
  {
    name: "Kuru",
    icon: "/images/dapps/icons/kuru.svg",
    type: "Dex",
    link: "/dex/kuru",
    desc: "Find, trade and launch your coins on a fully on-chain CLOB. Built for traders, powered by Monad."
  },
  {
    name: "Timeswap",
    icon: "/images/dapps/icons/timeswap.svg",
    type: "Lending",
    link: "/lending/timeswap",
    desc: "Timeswap is the first oracleless lending/borrowing protocol — enabling the creation of money markets for ANY ERC20 tokens.",
    disabled: false
  },
  {
    name: "LEVR",
    icon: "/images/dapps/icons/levr.svg",
    type: "Betting",
    link: "https://app.levr.bet/",
    desc: "Leverage Sports Betting with Fully Liquid Positions."
  },
  {
    name: "Magic Eden",
    icon: "/images/dapps/icons/magic-eden.svg",
    type: "NFT",
    link: "https://magiceden.io/monad-testnet",
    desc: "Magic Eden brings all chains and all assets together in one easy-to-use platform."
  },
  {
    name: "WooFi",
    icon: "/images/dapps/icons/WooFi.jpg",
    type: "Perps",
    link: "https://testnet-pro.woofi.com/en/trade/ETH_PERP",
    desc: "Hybrid omnichain perpetual futures orderbook with unparalleled execution and self-custody."
  },
  {
    name: "Kizzy",
    icon: "/images/dapps/icons/Kizzy.jpg",
    type: "Betting",
    link: "https://kizzy.io/",
    desc: "Kizzy is a social media betting app. Bet on how your favorite influencers and celebrities will perform on Twitter and YouTube."
  },
  {
    name: "RareBetSports",
    icon: "/images/dapps/icons/RareBetSports.jpg",
    type: "Betting",
    link: "https://rarelink.rarebetsports.io/",
    desc: "Building consumer sports applications powered by the RBS Oracle. Play RareLink and win up to 100x your crypto."
  },
  {
    name: "LootGo",
    icon: "/images/dapps/icons/LootGo.jpg",
    type: "Gaming",
    link: "https://www.lootgo.app/",
    desc: "LootGO is a free walk-to-earn mobile app turning your daily life into a treasure hunt for next 100x memecoins."
  },
  {
    name: "OpenSea",
    icon: "/images/dapps/icons/OpenSea.jpg",
    type: "NFT",
    link: "https://testnets.opensea.io/",
    desc: "The world’s first and largest digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, sell, and discover exclusive digital items."
  }
];
