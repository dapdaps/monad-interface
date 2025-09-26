"use client";

import { ArcadeContextProvider } from "@/context/arcade";
import SpaceInvadersView from "@/sections/arcade/space-invaders";
import { useRef } from "react";

const SpaceInvadersPage = () => {
  const containerRef = useRef<any>(null);

  return (
    <div ref={containerRef} className="w-full h-[100dvh] overflow-y-auto bg-[#010101] relative scrollbar-hide">
      <ArcadeContextProvider>
        <SpaceInvadersView containerRef={containerRef} />
      </ArcadeContextProvider>
    </div>
  );
};

export default SpaceInvadersPage;
