import { memo } from "react";

export default memo(function Mission() {


  return (
    <div className="flex flex-col items-center">
      <div className="text-white font-Unbounded text-[18px]">Global Mission</div>
      <div className="m-[13px_0_19px] text-[#A6A6DB] font-Unbounded text-[12px] font-light">Complete more, unlock more invites. The progress bar will be reset if you missed 3 in a row</div>
      <div className="w-[449px] h-[42px] p-[0_10px_0_16px] rounded-[6px] border border-[#26274B] bg-[#31305A] flex items-center justify-between text-white font-Unbounded text-[14px]">
        <span>Complete 3 swaps in NADSA</span>
        <div className="flex items-center gap-[12px]">
          <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5.34783L6.77778 11L17 1" stroke="#78FEFF" stroke-width="2" />
          </svg>
          <span>+1 Codes</span>
        </div>
      </div>

      <div className="m-[15px_0_35px] flex items-center gap-[7px] text-[12px] font-Unbounded font-light">
        <span className="text-[#A6A6DB]">Next Mission in</span>
        <span className="text-white">9 h 59m 23s</span>
      </div>

      <div className="flex">

        <div className="mb-[82px] relative w-[622px] h-[10px] rounded-[6px] border border-[#26274B] bg-[#31305A]">
          <div className="flex flex-col gap-[8px] absolute -top-[10px]">
            <div className="flex items-center justify-center w-[29px] h-[29px] rounded-full bg-[#31305A]">
              <div className="flex items-center justify-center bg-[#A5FFFD] w-[21px] h-[21px] rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 13 10" fill="none">
                  <path d="M1 4.54348L4.97222 8.5L12 1.5" stroke="black" stroke-width="2" stroke-linecap="round" />
                </svg>
              </div>
            </div>
            <div className="text-[#A6A6DB] font-Unbounded text-[12px]">+2 Codes</div>
          </div>
        </div>
        <div className="w-[126px]">
          <img src="/images/codes/dotted.png" />
        </div>
      </div>
    </div>
  )
})
