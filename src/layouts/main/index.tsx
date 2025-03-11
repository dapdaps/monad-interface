"use client";

import MainLayoutHeader from "@/layouts/main/header";
import React from 'react';

const MainLayout = (props: Props) => {
  const { children, style } = props;
  return (
    <div
      id="layout"
      className={`min-h-screen relative flex flex-col items-stretch justify-start transition-background duration-150`}
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
