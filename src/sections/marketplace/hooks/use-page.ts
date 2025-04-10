import { monad } from "@/configs/tokens/monad-testnet";
import Big from "big.js";
import { useMemo, useState } from "react";
import useTokenMarket from "./use-token-market";
import useIsMobile from "@/hooks/use-isMobile";

export default function usePage() {
  const isMobile = useIsMobile()
  const { loading, market, onRefresh } = useTokenMarket();
  const NATIVE_TOKENS: any[] = [
    monad.dak,
    monad.yaki,
    monad.chog,
    monad.wmon,
    monad.usdc,
    monad.usdt
  ];
  const BRIDGED_TOKENS: any[] = [monad.weth, monad.wbtc, monad.wsol];
  const MEME_TOKENS: any[] = [monad.dof, monad.b3m, monad.dogfood];
  const [activeType, setActiveType] = useState("price");
  const tokensArray = useMemo(() => {
    const first: any = [];
    const second: any = [];
    const third: any = [];
    if (market?.length > 0) {
      NATIVE_TOKENS?.forEach((token: IToken) => {
        const idx = market?.findIndex(
          (m: any) =>
            m?.address?.toLocaleLowerCase() === token?.address?.toLocaleLowerCase()
        );
        first.push({
          ...token,
          price: market?.[idx]?.price,
          volume_24h: market?.[idx]?.volume_24h,
          price_7day: market?.[idx]?.price_7day,
          price_change_percent_24h: market?.[idx]?.price_change_percent_24h
        });
      });
      BRIDGED_TOKENS?.forEach((token: IToken) => {
        const idx = market?.findIndex(
          (m: any) =>
            m?.address?.toLocaleLowerCase() === token?.address?.toLocaleLowerCase()
        );
        second.push({
          ...token,
          price: market?.[idx]?.price,
          volume_24h: market?.[idx]?.volume_24h,
          price_7day: market?.[idx]?.price_7day,
          price_change_percent_24h: market?.[idx]?.price_change_percent_24h
        });
      });
      MEME_TOKENS?.forEach((token: IToken) => {
        const idx = market?.findIndex(
          (m: any) =>
            m?.address?.toLocaleLowerCase() === token?.address?.toLocaleLowerCase()
        );
        third.push({
          ...token,
          price: market?.[idx]?.price,
          volume_24h: market?.[idx]?.volume_24h,
          price_7day: market?.[idx]?.price_7day,
          price_change_percent_24h: market?.[idx]?.price_change_percent_24h
        });
      });
    }

    return isMobile ? [
      handleSort([...first, ...second, ...third], activeType)
    ] : [
      handleSort(first, activeType),
      handleSort(second, activeType),
      handleSort(third, activeType)
    ];
  }, [market, activeType, isMobile]);

  function hasNextLevel(array: any, i: number, key: any) {
    const up = 1;
    const down = -1;
    const prev = array?.[i - 1]?.[key] ?? 0;
    const curr = array?.[i]?.[key] ?? 0;

    return (
      (i - 1 > -1 &&
        Big(prev).gte(up) &&
        Big(curr).lt(up) &&
        Big(curr).gt(down)) ||
      (Big(prev).gt(up) && Big(curr).lte(down)) ||
      (Big(prev).lt(up) && Big(prev).gt(down) && Big(curr).lte(down))
    );
  }

  function generateCustomRandomNumbers({
    min = 0,
    max = 100,
    groups = 2,
    gap = 5,
    decimals = 2
  } = {}) {
    if (min >= max || groups <= 0 || !Number.isInteger(groups) || gap < 0) throw new Error('some error');
    const totalRange = max - min;
    const requiredRange = groups * gap;
    if (requiredRange > totalRange) {
      throw new Error('some error')
    }

    const freeSpace = totalRange - requiredRange;
    const groupRange = freeSpace / groups;

    const boundaries = [min];
    let previousBoundary = min;

    for (let i = 1; i < groups; i++) {
      const additionalSpace = Math.random() * groupRange;
      const newBoundary = previousBoundary + additionalSpace + gap;
      boundaries.push(newBoundary);
      previousBoundary = newBoundary;
    }
    boundaries.push(max);
    const result = [];
    for (let i = 0; i < groups; i++) {
      const start = boundaries[i];
      const end = boundaries[i + 1];
      const random = (Math.random() * (end - start) + start).toFixed(decimals);
      result.push(Number(random));
    }
    return result;
  }


  function handleSort(tokens: IToken[], type: string) {
    const key = type === "price" ? "price_change_percent_24h" : "volume_24h";
    const sortTokens = tokens?.sort((prev: IToken, next: IToken) =>
      Big(prev?.[key] ?? 0).gt(next?.[key] ?? 0) ? -1 : 1
    );
    const array: IToken[] = [];
    const next_level_length = sortTokens.filter((_, i) =>
      hasNextLevel(sortTokens, i, key)
    )?.length;
    const col = isMobile ? 3 : 2
    const h = 100 / ((sortTokens.length + next_level_length));

    console.log('====h', h)
    let randomNumbers = null
    for (let i = 0; i < sortTokens.length; i++) {
      let next_level = false;
      if (hasNextLevel(sortTokens, i, key)) {
        next_level = true;
      } else {
        next_level = false;
      }
      const row = Math.ceil((i + 1) / col);
      if (i % col === 0) {
        randomNumbers = generateCustomRandomNumbers({
          min: 10,
          max: 90,
          groups: col,
          gap: 15
        })
      }
      const x = randomNumbers[i % col];
      const y = h * (i + 1) + ((i % col) / 4 + (next_level ? 1 : 0) / 6) * h
      array.push({
        ...sortTokens[i],
        x,
        y: y < 20 ? 20 : (y > 100 ? 100 : y)
      });
    }

    return array;
  }

  return {
    // native,
    // bridged,
    // meme,
    tokensArray,
    activeType,
    setActiveType
  }

}