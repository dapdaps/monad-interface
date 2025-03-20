import { monad } from "@/configs/tokens/monad-testnet";
import RectangularButton from "@/sections/dapps/components/rectangular-button";
import { IToken } from "@/types";
import { memo, useMemo, useState } from "react";
import Background from "./components/background";
import Jar from "./components/jar";
import useTokenMarket from "./hooks/use-token-market";
import Big from "big.js";


export default memo(function MarketPlaceView() {

  const { loading, market, onRefresh } = useTokenMarket()
  const NATIVE_TOKENS: IToken[] = [
    monad.dak,
    monad.yaki,
    monad.chog,
    monad.wmon,
    monad.usdc,
    monad.usdt
  ]
  const BRIDGED_TOKENS: IToken[] = [
    monad.weth,
    monad.wbtc,
    monad.wsol,
  ]
  const MEME_TOKENS: IToken[] = [
    monad.dof,
    monad.b3m,
    monad.dogfood
  ]
  const [activeType, setActiveType] = useState("price")

  const [native, bridged, meme] = useMemo(() => {
    const first = []
    const second = []
    const third = []
    if (market?.length > 0) {
      console.log('===market', market)
      NATIVE_TOKENS?.forEach((token: IToken) => {
        const idx = market?.findIndex((m) => m.address.toLocaleLowerCase() === token.address.toLocaleLowerCase())
        first.push({
          ...token,
          price: market?.[idx]?.price,
          volume_24h: market?.[idx]?.volume_24h,
          price_7day: market?.[idx]?.price_7day,
          price_change_percent_24h: market?.[idx]?.price_change_percent_24h,
        })
      })
      BRIDGED_TOKENS?.forEach((token: IToken) => {
        const idx = market?.findIndex((m) => m.address.toLocaleLowerCase() === token.address.toLocaleLowerCase())
        second.push({
          ...token,
          price: market?.[idx]?.price,
          volume_24h: market?.[idx]?.volume_24h,
          price_7day: market?.[idx]?.price_7day,
          price_change_percent_24h: market?.[idx]?.price_change_percent_24h,
        })
      })
      MEME_TOKENS?.forEach((token: IToken) => {
        const idx = market?.findIndex((m) => m.address.toLocaleLowerCase() === token.address.toLocaleLowerCase())
        third.push({
          ...token,
          price: market?.[idx]?.price,
          volume_24h: market?.[idx]?.volume_24h,
          price_7day: market?.[idx]?.price_7day,
          price_change_percent_24h: market?.[idx]?.price_change_percent_24h,
        })
      })
    }

    return [
      handleSort(first, activeType),
      handleSort(second, activeType),
      handleSort(third, activeType)
    ]
  }, [market, activeType])


  function hasNextLevel(array, i, key) {
    const up = 1
    const down = -1
    const prev = array?.[i - 1]?.[key] ?? 0
    const curr = array?.[i]?.[key] ?? 0

    return i - 1 > -1 && (Big(prev).gte(up) && (Big(curr).lt(up) && Big(curr).gt(down))) ||
      Big(prev).gt(up) && Big(curr).lte(down) ||
      (Big(prev).lt(up) && Big(prev).gt(down)) && Big(curr).lte(down)
  }
  function handleSort(tokens: IToken[], type: "price" | "volume") {
    const key = type === "price" ? "price_change_percent_24h" : "volume_24h"
    const sortTokens = tokens?.sort((prev: IToken, next: IToken) => Big(prev?.[key] ?? 0).gt(next?.[key] ?? 0) ? -1 : 1)
    const array: IToken[] = []
    const next_level_length = sortTokens.filter((_, i) => hasNextLevel(sortTokens, i, key))?.length
    const h = 100 / (sortTokens.length + next_level_length)
    for (let i = 0; i < sortTokens.length; i++) {
      let next_level = false
      if (hasNextLevel(sortTokens, i, key)) {
        next_level = true
      } else {
        next_level = false
      }
      const row = Math.ceil(i / 2)
      const x = i % 2 === 0 ? (Math.random() * 20 + 60) : (Math.random() * 20 + 30)
      const y = h * (i + 1) + ((i % 2 === 0 ? 1 / 4 : -1 / 4) + next_level ? 1 : 0) * h / 6
      array.push({
        ...sortTokens[i],
        x,
        y
      })
    }

    return array
  }
  return (
    <Background>
      <div className="h-full flex justify-center gap-[14px]">
        <Jar tokens={native} title="Native" type={activeType} />
        <Jar tokens={bridged} title="Bridged" type={activeType} />
        <Jar tokens={meme} title="Meme Coins" type={activeType} />
      </div>
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2  w-[32.639vw] h-[8.819vw] bg-[url('/images/marketplace/op_bg.svg')] bg-contain bg-center bg-no-repeat">
        <div className="absolute left-0 right-0 bottom-[25px] flex items-center justify-center gap-[24px]">
          <RectangularButton
            type={1}
            clicked={activeType === 'price'}
            className="w-[12.222vw] h-[2.5vw]"
            onClick={() => {
              setActiveType("price")
            }}
          >Price (24h)</RectangularButton>
          <RectangularButton
            type={2}
            clicked={activeType === 'volume'}
            className="w-[12.222vw] h-[2.5vw]"
            onClick={() => {
              setActiveType("volume")
            }}
          >Volume</RectangularButton>
        </div>
      </div>
    </Background>
  )
})
