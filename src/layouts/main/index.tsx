"use client";

import withSound from "@/hoc/withSound";
import useClickTracking from "@/hooks/use-click-tracking";
import useRem from "@/hooks/use-rem";
import useTokenPrice from "@/hooks/use-token-price";
import useUser from "@/hooks/use-user";
import MainLayoutFooter from "@/layouts/main/footer";
import MainLayoutHeader from "@/layouts/main/header";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo } from 'react';
import { useAccount } from "wagmi";
import clsx from 'clsx';
import { useConnecting } from '@/hooks/use-connecting';
import LoginLayout from '@/layouts/login';
import LoginView from '@/sections/login';


const MainLayout = (props: Props) => {
  const { children, style } = props;
  useRem()

  const { handleTrack } = useClickTracking();
  const { initializePrice } = useTokenPrice();
  const { handleReportNoCode } = useClickTracking();
  const pathname = usePathname();
  const { walletConnecting, walletConnected } = useConnecting();

  const [isLoginPage] = useMemo(() => {
    return [["/login"].includes(pathname)];
  }, [pathname]);
  const [isShowHeader, isShowFooter] = useMemo(() => {
    return [!isLoginPage, !isLoginPage];
  }, [isLoginPage]);

  useEffect(() => {
    handleReportNoCode();
    initializePrice();
  }, []);

  const { address } = useAccount();
  const { getAccessToken } = useUser();

  useEffect(() => {
    getAccessToken();
  }, [address]);

  return (
    <div
      id="layout"
      className={clsx(
        "min-h-screen relative flex flex-col items-stretch justify-start transition-background duration-150",
        isLoginPage ? "bg-[#010101]" : "bg-[var(--background)]",
      )}
      onClick={handleTrack}
      style={{
        ...style,
      }}
    >
      {
        walletConnecting ? (
          <LoginLayout className="fixed z-[100]" />
        ) : (
          !walletConnected && (
            <LoginLayout className="fixed z-[100]">
              <LoginView />
            </LoginLayout>
          )
        )
      }
      {
        isShowHeader && (
          <MainLayoutHeader />
        )
      }
      <div className="relative grow">
        {children}
      </div>
      {
        isShowFooter && (
          <MainLayoutFooter />
        )
      }
    </div>
  );
};

export default withSound(MainLayout);

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
