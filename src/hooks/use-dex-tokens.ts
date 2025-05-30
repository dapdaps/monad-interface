import { asyncFetch } from "@/utils/http";
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_CHAIN_ID } from "@/configs";
import { monad } from "@/configs/tokens/monad-testnet";

export default function useDexTokens(dapp: any) {
  const [tokens, setTokens] = useState<any>([]);

  const getTokens = useCallback(async () => {
    if (dapp.name === "LFJ") {
      const tokens = await asyncFetch(
        "https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists-v2/refs/heads/main/popular_tokenlist.json"
      );

      setTokens(
        tokens
          .filter((token: any) => token.chainId === 10143)
          .map((token: any) => ({
            ...token,
            address:
              token.address === "0x0000000000000000000000000000000000000000"
                ? "native"
                : token.address,
            icon:
              token.address === "0x0000000000000000000000000000000000000000"
                ? "/images/monad.svg"
                : `https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists-v2/refs/heads/main/logos/10143/${token.address.toLowerCase()}.png`
          }))
      );
      return;
    }
    if (["Pancake", "Uniswap"].includes(dapp.name)) {
      const tokens = await asyncFetch(
        "https://tokens.pancakeswap.finance/pancakeswap-monad-testnet-default.json"
      );
      tokens.tokens.unshift(monad["mon"]);
      setTokens(
        tokens.tokens.map((token: any) => ({
          ...token,
          icon: token.logoURI || token.icon
        }))
      );
      return;
    }

    setTokens(dapp.tokens[DEFAULT_CHAIN_ID]);
  }, [dapp]);

  useEffect(() => {
    getTokens();
  }, [dapp]);

  return tokens;
}
