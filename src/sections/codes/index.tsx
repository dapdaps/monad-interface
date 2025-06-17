"use client";

import { memo } from "react";
import CodesContextProvider from "./context";
import useIsMobile from "@/hooks/use-isMobile";
import CodesMobile from "./mobile";
import CodesLaptop from "./laptop";

export default memo(function CodesView() {
  const isMobile = useIsMobile();

  return (
    <CodesContextProvider>
      {isMobile ? <CodesMobile /> : <CodesLaptop />}
    </CodesContextProvider>
  )
})
