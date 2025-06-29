"use client";

import { config, projectId } from "@/configs/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";
import { DEFAULT_CHAIN_ID } from '@/configs';
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// const defaultNetwork = networks.find((it: any) => it.id === DEFAULT_CHAIN_ID);

// const customWallets: any = [];

// Create the modal
// const modal = createAppKit({
//   adapters: [wagmiAdapter],
//   projectId,
//   networks: networks as any,
//   defaultNetwork: defaultNetwork || networks[0],
//   metadata: metadata,
//   featuredWalletIds: [
//     // Explorer: https://explorer.walletconnect.com/
//     "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393", // Phantom
//     "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // Metamask
//     "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa", // Coinbase
//     "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709", // OKX
//     "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662", // Bitget
//     "8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4" // Binance
//   ],
//   customWallets,
//   features: {
//     analytics: true, // Optional - defaults to your Cloud configuration
//     email: true,
//     socials: [
//       "google",
//       "x",
//       "github",
//       "discord",
//       "apple",
//       "facebook",
//       "farcaster"
//     ],
//     emailShowWallets: true // default to true
//   },
//   allWallets: "SHOW",
//   enableInjected: true,
//   enableWalletConnect: true,
//   enableEIP6963: true,
//   enableCoinbase: true,
//   allowUnsupportedChain: true
// });

function ContextProvider({
  children,
  cookies
}: {
  children: ReactNode;
  cookies?: string | null;
}) {
  const initialState = cookieToInitialState(
    config as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={config as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          locale="en-US"
          initialChain={DEFAULT_CHAIN_ID}
          theme={darkTheme()}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;
