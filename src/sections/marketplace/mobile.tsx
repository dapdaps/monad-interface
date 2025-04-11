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
    </Background>
  )
})
