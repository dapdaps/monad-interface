"use client";

import SpaceInvadersView from "@/sections/arcade/space-invaders";
import GamePrivyProvider from "@/components/privy-provider";
import { useRef } from "react";

const SpaceInvadersPage = () => {
  const containerRef = useRef<any>(null);

  return (
    <div ref={containerRef} className="w-full h-screen overflow-y-auto bg-[#010101] relative scrollbar-hide">
      <GamePrivyProvider>
        <SpaceInvadersView containerRef={containerRef} />
      </GamePrivyProvider>
    </div>
  );
};

export default SpaceInvadersPage;
