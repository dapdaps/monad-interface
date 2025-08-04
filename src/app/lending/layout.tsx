"use client";

import Bg from "@/components/background/dex";

export default function LendingLayout({
  children
}: {
  children: React.ReactElement;
}) {
  return (
    <div className="w-full relative md:h-[calc(100dvh_-_40px)] md:overflow-y-auto">
      <div className="relative z-[20] flex justify-center md:bg-[linear-gradient(to_bottom,_#0E0F29_50dvh,_rgba(14,15,11,0.1))]">
        {children}
      </div>
      <Bg className="md:min-h-[100dvh] md:h-full" />
    </div>
  );
}
