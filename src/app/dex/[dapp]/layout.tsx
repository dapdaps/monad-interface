"use client";

import Bg from "@/components/background/dex";

export default function DexLayout({
  children
}: {
  children: React.ReactElement;
}) {
  return (
    <div className="w-full relative">
      <div className="relative z-[20] flex justify-center">{children}</div>
      <Bg isDex />
    </div>
  );
}
