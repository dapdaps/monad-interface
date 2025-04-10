import RectangularButton from "@/sections/dapps/components/rectangular-button";
import { Dispatch, memo, SetStateAction } from "react";

export default memo(function Operation({
  activeType,
  setActiveType
}: {
  activeType: string
  setActiveType: Dispatch<SetStateAction<string>>
}) {


  return (
    <div className="absolute left-1/2 bottom-0 -translate-x-1/2 md:w-full w-[32.639vw] md:h-[28.974vw] h-[8.819vw] md:bg-[url('/images/marketplace/mobile/op_bg.svg')] bg-[url('/images/marketplace/op_bg.svg')] bg-contain bg-center bg-no-repeat">
      <div className="absolute left-0 right-0 md:bottom-[6.41vw] bottom-[1.736vw] flex items-center justify-center md:gap-[20px] gap-[24px]">
        <RectangularButton
          type={1}
          data-bp="1004-001"
          clicked={activeType === "price"}
          className="md:w-[37.436vw] w-[12.222vw] md:h-[7.692vw] h-[2.5vw]"
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
          className="md:w-[37.436vw] w-[12.222vw] md:h-[7.692vw] h-[2.5vw]"
          onClick={() => {
            setActiveType("volume");
          }}
        >
          Volume
        </RectangularButton>
      </div>
    </div>
  )
})
