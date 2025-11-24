"use client";

import { cookieStorage, createStorage, fallback, http } from "wagmi";
import chains from "./chains";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { DEFAULT_CHAIN_ID } from '@/configs/index';
import { mainnet, monadTestnet, sepolia, bsc } from "viem/chains";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const metadata = {
  name: "MonadX",
  description: "MonadX",
  // origin must match your domain & subdomain
  url: "https://www.nadsa.space",
  icons: ["/favicon.ico"]
};

export const networks: any = Object.values(chains);

const transports: any = {};
networks.forEach((network: any) => {
  if (network.id === DEFAULT_CHAIN_ID) {
    transports[DEFAULT_CHAIN_ID] = fallback([http("https://rpc.monad.xyz")]);
    return;
  }
  if (network.id === mainnet.id) {
    transports[mainnet.id] = fallback([http("https://eth.merkle.io")]);
    return;
  }
  if (network.id === sepolia.id) {
    transports[sepolia.id] = fallback([http("https://eth-sepolia.api.onfinality.io/public")]);
    return;
  }
  transports[network.id] = http();
});

export const config = getDefaultConfig({
  appName: metadata.name,
  appDescription: metadata.description,
  appUrl: metadata.url,
  appIcon: metadata.icons[0],
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId: projectId,
  chains: networks,
  transports,
});

// export const wagmiAdapter = new WagmiAdapter({
//   // @ts-ignore
//   storage: createStorage({
//     storage: cookieStorage
//   }),
//   ssr: true,
//   projectId,
//   networks,
//   // @ts-ignore
//   connectors,
//   transports: {
//     [DEFAULT_CHAIN_ID]: fallback([http("https://testnet-rpc.monad.xyz")]),
//   }
// });

// export const config = wagmiAdapter.wagmiConfig;
