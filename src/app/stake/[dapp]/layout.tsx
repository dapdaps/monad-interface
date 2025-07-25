"use client";

import Bg from "@/components/background/dex";

export default function DexLayout({
  children
}: {
  children: React.ReactElement;
}) {
  return (
    <div className="w-full relative md:h-[calc(100dvh_-_40px)] md:overflow-y-auto">
      <div className="relative z-[20] flex justify-center md:bg-[linear-gradient(to_bottom,_#0E0F29_50dvh,_rgba(14,15,11,0.1))] md:pb-[40px]">
        {children}
      </div>
      <Bg isDex={false} />
    </div>
  );
}
