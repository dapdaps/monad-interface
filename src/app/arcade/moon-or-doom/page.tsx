"use client";

import { ArcadeContextProvider } from "@/context/arcade";
import MoonOrDoom from "@/sections/arcade/moon-or-doom";

export default function GamePage() {
  return (
    <ArcadeContextProvider>
      <MoonOrDoom />
    </ArcadeContextProvider>
  );
}
