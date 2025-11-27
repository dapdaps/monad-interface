"use client";

import SceneContextProvider from "@/context/scene";
import WagmiProvider from "@/context/wagmi";
import MainnetLayout from "@/layouts/mainnet";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React, { Suspense, useEffect } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InvitationContextProvider from "@/context/invitation";
import { useApps } from "@/hooks/use-apps";
import { initRpcCache } from "@/sdk/smart-router/utils";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({
  children,
}: ClientProvidersProps) {
  const { fetchApps } = useApps();

  useEffect(() => {
    fetchApps();
    initRpcCache();
  }, []);

  return (
    <>
      <WagmiProvider>
        <SkeletonTheme baseColor="#7990F4" highlightColor="#8B87FF">
          <SceneContextProvider>
            <InvitationContextProvider>
              <Suspense>
                <MainnetLayout>{children}</MainnetLayout>
              </Suspense>
            </InvitationContextProvider>
          </SceneContextProvider>
        </SkeletonTheme>
      </WagmiProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        theme="light"
        toastStyle={{ backgroundColor: "transparent", boxShadow: "none" }}
        newestOnTop
        rtl={false}
        pauseOnFocusLoss
        closeButton={false}
        limit={3}
      />
      <ProgressBar
        height="4px"
        color="#8B87FF"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
}

