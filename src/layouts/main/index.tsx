"use client";

import MainLayoutHeader from "@/layouts/main/header";
import React, { useEffect, useMemo } from 'react';
import { usePathname } from "next/navigation";
import useUser from "@/hooks/use-user";
import { useAccount } from "wagmi";
import Link from "next/link";
import Image from "next/image";
import useClickTracking from "@/hooks/use-click-tracking";
import useRem from "@/hooks/use-rem";
import useTokenPrice from "@/hooks/use-token-price";


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

  return (
    <div
      id="layout"
      className={`relative flex flex-col items-stretch justify-start transition-background duration-150 bg-[var(--background)]`}
      style={{
        ...style,
      }}
    >
      <MainLayoutHeader />
      <div className="grow">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
