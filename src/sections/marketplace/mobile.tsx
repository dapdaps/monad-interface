import { memo, useMemo } from "react"
import RectangularButton from "../dapps/components/rectangular-button"
import Jar from "./components/jar"
import Background from "./components/mobile/background"
import usePage from "./hooks/use-page"
import Operation from "./components/operation"

export default memo(function Mobile() {
  const { tokensArray, activeType, setActiveType } = usePage()
  const tokens = useMemo(() => tokensArray?.[0] ?? [], [tokensArray])
  return (
    <Background>
      <div className="flex justify-center h-full overflow-auto">
        <Jar title="Tokens" tokens={tokens} type={activeType} />
      </div>
      <Operation activeType={activeType} setActiveType={setActiveType} />
      {/* <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-full h-[28.974vw] bg-[url('/images/marketplace/mobile/op_bg.svg')] bg-contain bg-center bg-no-repeat">
        <div className="absolute left-0 right-0 bottom-[6.41vw] flex items-center justify-center gap-[20px]">
          <RectangularButton
            type={1}
            data-bp="1004-001"
            clicked={activeType === "price"}
            className="w-[37.436vw] h-[7.692vw]"
            onClick={() => {
              setActiveType("price");
            }}
          >
            Price (24h)
          </RectangularButton>
          <RectangularButton
            type={2}
            data-bp="1004-002"
            clicked={activeType === "volume"}
            className="w-[37.436vw] h-[7.692vw]"
            onClick={() => {
              setActiveType("volume");
            }}
          >
            Volume
          </RectangularButton>
        </div>
      </div> */}
    </Background>
  )
})
