import { memo } from "react";
import { useFaucetContext } from "../context";
import Popover, { PopoverPlacement, PopoverTrigger } from "@/components/popover";

export default memo(function Summary() {
  const {
    checkinInfo,
  } = useFaucetContext();
  return (

    <div className="m-[24px_183px_0] flex flex-col gap-[33px]">
      <div className='flex justify-between text-[#A6A6DB] font-DogicaPixel text-[12px] leading-[180%]'>
        <div className='flex items-center gap-[8px]'>
          <span>GMs in total:</span>
          <Popover
            placement={PopoverPlacement.Top}
            trigger={PopoverTrigger.Hover}
            closeDelayDuration={0}
            content={(
              <div className="p-[9px_13px_9px_10px] flex items-center justify-center gap-[11px] rounded-[6px] border border-[#3E347C] bg-[rgba(26,24,67,0.80)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] backdrop-blur-[10px]">
                <div className="w-[14px]">
                  <img src="/images/faucet/icon_lightning.svg" alt="icon_lightning" />
                </div>
                <span className="text-[#A6A6DB] font-Unbounded text-[12px] leading-[150%]">1 Check-in  = 0.05 MON</span>
              </div>
            )}
          >

            <div className='flex items-center gap-[5px] cursor-pointer'>
              <div className='w-[14px]'>
                <img src="/images/faucet/icon_lightning.svg" alt="icon_lightning" />
              </div>
              <span className='text-white text-[14px] font-bold'>x{checkinInfo?.total_check_in ?? 0}</span>
            </div>
          </Popover>
        </div>

        <div className='flex items-center gap-[9px]'>
          <span>Energy Bar:</span>
          <Popover
            placement={PopoverPlacement.Top}
            trigger={PopoverTrigger.Hover}
            content={(
              <div className="p-[9px_16px_12px_6px] flex justify-center gap-[8.6px] rounded-[6px] border border-[#3E347C] bg-[rgba(26,24,67,0.80)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] backdrop-blur-[10px]">
                <div className="w-[29px]">
                  <img src="/images/faucet/icon_capsule.svg" alt="icon_lightning" />
                </div>
                <div className="flex flex-col gap-[9px] text-[#A6A6DB] font-Unbounded text-[12px] leading-[150%]">
                  <span>7 Days in a row = 1 Energy Bar</span>
                  <span>1 Energy Bar = 0.2 MON</span>
                </div>
              </div>
            )}
          >
            <div className='flex items-center gap-[2px] cursor-pointer'>
              <div className='w-[34px]'>
                <img src="/images/faucet/icon_capsule.svg" alt="icon_capsule" />
              </div>
              <span className='text-white text-[14px] font-bold'>x{checkinInfo?.total_energy_bar ?? 0}</span>
            </div>
          </Popover>
        </div>
      </div>

      <div className='flex flex-col items-center gap-[10px] text-white font-Unbounded '>
        <div className='text-[42px] font-medium leading-[52px]'>{checkinInfo?.total_reward_amount ?? 0}</div>
        <div className='flex items-center gap-[6px]'>
          <span className='text-[12px]'>MONAD</span>
          <div className='flex items-center justify-center w-[65px] h-[14px] rounded-[8px] bg-[#7370C8] text-[9px] font-light'>Test Token</div>
        </div>
      </div>
    </div>
  )
})
