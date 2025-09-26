"use client";

import { ArcadeContextProvider } from "@/context/arcade";
import GuessWhoView from "@/sections/arcade/guess-who";
import { useRef } from "react";

const GuessWhoPage = () => {
  const containerRef = useRef<any>(null);

  return (
    <div ref={containerRef} className="w-full h-[100dvh] overflow-y-auto bg-[#000] relative scrollbar-hide">
      <ArcadeContextProvider>
        <GuessWhoView />
      </ArcadeContextProvider>
    </div>
  );
};

export default GuessWhoPage;
