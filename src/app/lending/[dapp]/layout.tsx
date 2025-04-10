"use client";

import Bg from "@/components/background/dex";

export default function LendingLayout({
  children
}: {
  children: React.ReactElement;
}) {
  return (
    <div className="w-full relative md:h-[calc(100dvh_-_40px)] md:overflow-y-auto">
      <div className="relative z-[20] flex justify-center md:pb-[100px]">{children}</div>
      <Bg />
    </div>
  );
}
