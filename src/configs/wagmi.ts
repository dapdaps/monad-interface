"use client";

import { cookieStorage, createStorage, fallback, http } from "wagmi";
import chains from "./chains";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { CreateConnectorFn } from "wagmi";
import { DEFAULT_CHAIN_ID } from '@/configs/index';

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const metadata = {
  name: "MonadX",
  description: "MonadX",
  // origin must match your domain & subdomain
  url: "https://berachain.dapdap.net",
  icons: ["/favicon.ico"]
};

export const networks = Object.values(chains);

const connectors: CreateConnectorFn[] = [];

export const wagmiAdapter = new WagmiAdapter({
  // @ts-ignore
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks,
  // @ts-ignore
  connectors,
  transports: {
    [DEFAULT_CHAIN_ID]: fallback([http("https://testnet-rpc.monad.xyz")]),
  }
});

export const config = wagmiAdapter.wagmiConfig;
