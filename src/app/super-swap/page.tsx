"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import useDexTokens from "@/hooks/use-dex-tokens";
import SuperSwap from "@/sections/super-swap";

export default function SwapPage() {
  return <SuperSwap />;
}
