import { monad } from "@/configs/tokens/monad-testnet";
import { useState } from "react";

export function useGuessWho() {
  const [betToken] = useState(monad["mon"]);

  return {
    betToken
  };
}
