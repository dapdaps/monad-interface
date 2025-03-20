"use client";

import withSound from "@/hoc/withSound";
import useClickTracking from "@/hooks/use-click-tracking";
import useRem from "@/hooks/use-rem";
import useTokenPrice from "@/hooks/use-token-price";
import useUser from "@/hooks/use-user";
import MainLayoutFooter from "@/layouts/main/footer";
import MainLayoutHeader from "@/layouts/main/header";
import { usePathname } from "next/navigation";
import React, { useEffect } from 'react';
import { useAccount } from "wagmi";


const MainLayout = (props: Props) => {
  const { children, style } = props;
  useRem()

  const { handleTrack } = useClickTracking();
  const { initializePrice } = useTokenPrice();
  const { handleReportNoCode } = useClickTracking();
  const pathname = usePathname();

  useEffect(() => {
    handleReportNoCode();
    initializePrice();
  }, []);

  const { address } = useAccount();
  const { getAccessToken } = useUser();

  useEffect(() => {
    getAccessToken();
  }, [address]);

  const hideHeader = ['/']
  return (
    <div
      id="layout"
      className={`min-h-screen relative flex flex-col items-stretch justify-start transition-background duration-150 bg-[var(--background)]`}
      style={{
        ...style,
      }}
    >
      {
        !hideHeader.includes(pathname) && <MainLayoutHeader />
      }
      <div className="grow">
        {children}
      </div>
      <MainLayoutFooter />
    </div>
  );
};

export default withSound(MainLayout);

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
