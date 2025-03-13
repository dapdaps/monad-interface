import { memo } from "react";
import Background from "./components/background";
import Jar from "./components/jar";

export default memo(function MarketPlaceView() {

  return (
    <Background>
      <div className="h-full flex justify-center">
        <Jar />
      </div>
    </Background>
  )
})
