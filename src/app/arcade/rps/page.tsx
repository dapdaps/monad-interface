"use client";

import { ArcadeContextProvider } from "@/context/arcade";
import RPSView from "@/sections/arcade/rps";
import { useRef } from "react";

const RPSPage = () => {
  const containerRef = useRef<any>(null);

  return (
    <div ref={containerRef} className="w-full h-[100dvh] overflow-y-auto bg-[#010101] relative scrollbar-hide">
      <ArcadeContextProvider>
        <RPSView containerRef={containerRef} />
      </ArcadeContextProvider>
    </div>
  );
};

export default RPSPage;
