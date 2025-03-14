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


  function handleSort(tokens: IToken[], type: "price" | "volume") {
    const key = type === "price" ? "price_change_percent_24h" : "volume_24h"
    const sortTokens = tokens?.sort((prev: IToken, next: IToken) => Big(prev?.[key] ?? 0).gt(next?.[key] ?? 0) ? -1 : 1)
    const array: IToken[][] = []
    const max_col = 2
    const max_row = Math.ceil(sortTokens.length / max_col)
    const h = 100 / max_row
    let col = 1, row = 0
    for (let i = 0; i < sortTokens.length; i++) {
      if (i % max_col === 0) {
        col = 1
        row += 1
      } else {
        col += 1
      }
      const x = col === 1 ? (Math.random() * 20 + 70) : (Math.random() * 20 + 30)
      const y = col === 1 ? row * h - h / 2 : row * h - h / 4
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
