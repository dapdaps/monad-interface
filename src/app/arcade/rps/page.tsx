"use client";

import RPSView from "@/sections/arcade/rps";
import { useRef } from "react";

const RPSPage = () => {
  const containerRef = useRef<any>(null);

  return (
    <div ref={containerRef} className="w-full h-[100dvh] overflow-y-auto bg-[#010101] relative scrollbar-hide">
      <RPSView containerRef={containerRef} />
    </div>
  );
};

export default RPSPage;
