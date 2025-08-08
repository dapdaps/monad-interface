"use client";

import SpaceInvadersView from "@/sections/arcade/space-invaders";
import GamePrivyProvider from "@/components/privy-provider";

const SpaceInvadersPage = () => {
  return (
    <GamePrivyProvider>
      <SpaceInvadersView />
    </GamePrivyProvider>
  );
};

export default SpaceInvadersPage;
