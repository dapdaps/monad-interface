"use client";

import Bg from "@/components/background/dex";

export default function SuperSwapLayout({
  children
}: {
  children: React.ReactElement;
}) {
  return (
    <div className="w-full relative">
      <div className="relative z-[20] lg:w-[548px] mx-auto">{children}</div>
      <Bg isDex={false} />
    </div>
  );
}
