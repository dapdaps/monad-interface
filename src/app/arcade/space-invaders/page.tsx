"use client";

import SpaceInvadersView from "@/sections/arcade/space-invaders";
import GamePrivyProvider from "@/components/privy-provider";

const SpaceInvadersPage = () => {
  return (
    <div className="w-full h-screen overflow-y-auto bg-[#010101] relative scrollbar-hide">
      <GamePrivyProvider>
        <SpaceInvadersView />
      </GamePrivyProvider>
    </div>
  );
};

export default SpaceInvadersPage;
