import { memo } from "react";
import { useFaucetContext } from "../context";
import HistoryButton from "./history-button";

export default memo(function Amount() {
  const {
    checkinInfo,
  } = useFaucetContext();
  return (
    <div className="m-[0_39px_20px] flex items-end justify-between p-[12px_28px_18px_83px] h-[101px] bg-[#31305A] border border-[#26274B] rounded-[6px]">
      <div className='flex flex-col items-center gap-[10px] text-white font-Unbounded '>
        <div className='text-[42px] font-medium leading-[52px]'>{checkinInfo?.total_reward_amount ?? 0}</div>
        <div className='flex items-center gap-[6px]'>
          <span className='text-[12px]'>MON</span>
          <div className='flex items-center justify-center w-[65px] h-[14px] rounded-[8px] bg-[#7370C8] text-[9px] font-light'>Test Token</div>
        </div>
      </div>

      <div className="flex items-end gap-[65px]">
        <div className="flex flex-col">
          <span className="text-white text-[14px] font-medium font-Unbounded">10,000</span>
          <span className="text-[#A6A6DB] text-[12px] leading-[180%] font-DogicaPixel">CHOG</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white text-[14px] font-medium font-Unbounded">10,000</span>
          <span className="text-[#A6A6DB] text-[12px] leading-[180%] font-DogicaPixel">CHOG</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white text-[14px] font-medium font-Unbounded">10,000</span>
          <span className="text-[#A6A6DB] text-[12px] leading-[180%] font-DogicaPixel">CHOG</span>
        </div>

        <HistoryButton />
      </div>
    </div>
  )
})
