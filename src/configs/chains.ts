import { Chain } from "viem";
import {
  mainnet,
  berachainTestnetbArtio,
  base,
  mantle,
  arbitrum,
  avalanche,
  bsc,
  linea,
  metis,
  optimism,
  polygon,
  polygonZkEvm,
  zksync,
  gnosis,
  manta,
  scroll,
  blast,
  mode,
  aurora,
  monadTestnet,
  sepolia,
} from "viem/chains";


export const turbo = {
  id: 1313161567,
  name: "TurboChain",
  nativeCurrency: { name: "Turbo", symbol: "TURBO", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc-0x4e45415f.aurora-cloud.dev"] },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.turbo.aurora.dev" },
  },
} as const satisfies any

const chains: Record<number, Chain | any> = {
  80094: {
    id: 80094,
    name: "Berachain Mainnet",
    nativeCurrency: { decimals: 18, name: "BERA Token", symbol: "BERA" },
    contracts: {
      multicall3: { address: "0xcA11bde05977b3631167028862bE2a173976CA11" }
    },
    rpcUrls: {
      default: {
        http: ["https://rpc.berachain.com"]
      }
    },
    blockExplorers: {
      default: {
        name: "Berachain Mainnet",
        url: "https://berascan.com/"
      }
    },
    isWalletSupport: true
  },
  [berachainTestnetbArtio.id]: {
    ...berachainTestnetbArtio,
    isWalletSupport: true
  },
  [mainnet.id]: {
    ...mainnet,
    isWalletSupport: false
  },
  [base.id]: {
    ...base,
    isWalletSupport: false
  },
  [mantle.id]: {
    ...mantle,
    isWalletSupport: false
  },
  [scroll.id]: {
    ...scroll,
    isWalletSupport: false
  },
  [blast.id]: {
    ...blast,
    isWalletSupport: false
  },
  [mode.id]: {
    ...mode,
    isWalletSupport: false
  },
  [polygonZkEvm.id]: {
    ...polygonZkEvm,
    isWalletSupport: false
  },
  [zksync.id]: {
    ...zksync,
    isWalletSupport: false
  },
  [gnosis.id]: {
    ...gnosis,
    isWalletSupport: false
  },
  [manta.id]: {
    ...manta,
    isWalletSupport: false
  },
  [avalanche.id]: {
    ...avalanche,
    isWalletSupport: false
  },
  [bsc.id]: {
    ...bsc,
    isWalletSupport: false
  },
  [linea.id]: {
    ...linea,
    isWalletSupport: false
  },
  [metis.id]: {
    ...metis,
    isWalletSupport: false
  },
  [optimism.id]: {
    ...optimism,
    isWalletSupport: false
  },
  [polygon.id]: {
    ...polygon,
    isWalletSupport: false
  },
  [arbitrum.id]: {
    ...arbitrum,
    isWalletSupport: false
  },
  [turbo.id]: {
    ...turbo,
    isWalletSupport: false
  },
  [aurora.id]: {
    ...aurora,
    isWalletSupport: false
  },
  [sepolia.id]: {
    ...sepolia,
    isWalletSupport: false
  },
  [monadTestnet.id]: {
    ...monadTestnet,
    isWalletSupport: false
  }
};

export const icons: Record<number, string> = {
  80094: "/images/berachain.png",
  1: "/images/eth.svg"
  // 1101: '/images/berachain.png'
};

export default chains;

export const ChristmasActivityChains: Record<number, Chain | any> = {
  [arbitrum.id]: {
    ...arbitrum
  },
  [mainnet.id]: {
    ...mainnet
  },
  [sepolia.id]: {
    ...sepolia,
  },
  [berachainTestnetbArtio.id]: {
    ...berachainTestnetbArtio,
    rpcUrls: {
      default: {
        http: ["https://bartio.drpc.org", "https://bartio.rpc.berachain.com"]
      }
    }
  }
};
