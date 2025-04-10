import RectangularButton from "@/sections/dapps/components/rectangular-button";
import { memo } from "react";
import Background from "./components/background";
import Jar from "./components/jar";
import usePage from "./hooks/use-page";
import Operation from "./components/operation";

export default memo(function Laptop() {
  const { tokensArray, activeType, setActiveType } = usePage()
  const [native, bridged, meme] = tokensArray
  console.log('===native', native)
  return (
    <Background>
      <div className="h-full flex justify-center gap-[14px]">
        <Jar tokens={native} title="Native" type={activeType} />
        <Jar tokens={bridged} title="Bridged" type={activeType} />
        <Jar tokens={meme} title="Meme Coins" type={activeType} />
      </div>
      <Operation activeType={activeType} setActiveType={setActiveType} />
    </Background>
  );
});
