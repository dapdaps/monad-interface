"use client";

import { ArcadeContextProvider } from "@/context/arcade";
import LuckyBeraView from "@/sections/lucky777";

export default function GamePage() {
  return (
    <ArcadeContextProvider>
      <LuckyBeraView />
    </ArcadeContextProvider>
  );
}
