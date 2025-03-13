import { memo } from "react";

export default memo(function jar() {


  return (
    <div className="w-[21.667vw] h-full flex flex-col items-center">
      <div className="relative z-10 w-[19.301vw] h-[10.833vw] bg-[url('/images/marketplace/jar_top.svg')] bg-center bg-contain bg-no-repeat">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[12.639vw] h-[2.639vw] flex items-center justify-center text-[#78FEFF] font-bold">
          Meme Coins
        </div>
      </div>
      <div className="-mt-[0.8vw] flex flex-col w-[18.194vw] flex-1 border border-black bg-black/50 shadow-[0_0_40px_20px_rgba(0,255,249,0.5)_inset] backdrop-blur-[5px]">
        <div
          className="flex-1"
          style={{
            background: "linear-gradient(180deg, rgba(191, 255, 96, 0.30) 0%, rgba(191, 255, 96, 0.00) 100%)"
          }}
        ></div>
        <div className="flex-1"></div>
        <div
          className="flex-1"
          style={{
            background: "linear-gradient(180deg, rgba(255, 80, 217, 0.00) 0%, rgba(255, 80, 217, 0.50) 100%)"
          }}
        ></div>
      </div>
      <div className="w-full">
        <img className="w-full" src="/images/marketplace/jar_bottom.svg" alt="jar_bottom" />
      </div>
    </div>
  )
})
