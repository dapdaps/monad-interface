import { asyncFetch } from "@/utils/http";
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_CHAIN_ID } from "@/configs";
import { bera } from "@/configs/tokens/bera";

export default function useDexTokens(dapp: any) {
  const [tokens, setTokens] = useState<any>([]);

  const getTokens = useCallback(() => {
    setTokens(dapp.tokens[DEFAULT_CHAIN_ID]);
  }, [dapp]);

  useEffect(() => {
    getTokens();
  }, [dapp]);

  return tokens;
}
