import Popover, { PopoverPlacement, PopoverTrigger } from "@/components/popover";
import { monad } from "@/configs/tokens/monad-testnet";
import clsx from "clsx";
import { memo } from "react";
import { useFaucetContext } from "../context";
import TokenInfo from "./token-info";

export default memo(function EnergyBars() {
  const {
    checkinInfo,
  } = useFaucetContext();
  const checkArray = [{
    left: 197,
    width: 60
  }, {
    left: 259,
    width: 57
  }, {
    left: 322,
    width: 56,
    token: monad?.chog,
  }, {
    left: 387,
    width: 53
  }, {
    left: 448,
    width: 56,
    token: monad?.yaki,
  }, {
    left: 510,
    width: 57
  }, {
    left: 571,
    width: 60,
    token: monad?.dak,
  }]
  const { consecutive_check_in } = checkinInfo || {}
  return (
    <div className='relative md:scale-75 md:-left-[25px] md:-top-[104px] md:w-[205px] w-[824px] md:h-[824px] h-[205px] text-black font-DogicaPixel text-[16px] font-bold'>
      <div className="md:-rotate-90 absolute md:-left-[304px] left-0 md:top-[310px] top-0 w-[824px] h-[205px]">
        <div className='absolute left-0 right-0 top-0 bottom-0'>
          <div className="absolute left-0 top-0 md:hidden">
            <img src="/images/faucet/tubes.svg" alt="tubes" />
          </div>

          <div className="md:block hidden absolute -left-[136px] -bottom-[126px] w-[390px] h-[154px] rotate-[90deg] scale-[1.335]">
            <img src="/images/faucet/mobile/base.svg" alt="base" />
          </div>
          <div className="absolute right-0 bottom-0">
            <img src="/images/faucet/capsule.svg" alt="capsule" />
          </div>

        </div>
        {
          checkArray?.map((check, index: number) => (
            <div
              className={clsx(' absolute', index < consecutive_check_in ? "top-[30px] h-[162px]" : "top-[39px] h-[142px]")}
              style={{
                left: index < consecutive_check_in ? check.left - 9 : check.left,
                width: index < consecutive_check_in ? check.width + 20 : check.width,
              }}
            >
              <div className={clsx('absolute left-0 top-0 bottom-0 overflow-hidden duration-500', index < consecutive_check_in ? "w-full" : "w-0")}>
                <div className="absolute left-0 top-0 right-0 bottom-0 h-[162px]" style={{ width: check.width + 20 }}>
                  <img src={`/images/faucet/number/number_bg_${index + 1}.svg`} alt="number_1" />
                </div>
              </div>
              <div className={clsx('md:rotate-90 absolute left-0 top-0 right-0 bottom-0 z-20', index < consecutive_check_in ? "pt-[70px] pl-[27px]" : "pt-[61px] pl-[18px]")}>
                {index + 1}
              </div>
              {
                check?.token && (
                  <div className={clsx("absolute z-20 top-[22px] left-[10.5px] hover:opacity-100", index < consecutive_check_in ? "opacity-100" : "opacity-30")}>
                    <Popover
                      trigger={PopoverTrigger.Hover}
                      placement={PopoverPlacement?.Top}
                      contentClassName="!z-[200]"
                      content={(
                        <div className="text-center w-[183px] p-[10px_9px] rounded-[6px] border border-[#3E347C] bg-[rgba(26,24,67,0.80)] shadow-[0_0_10px_0_rgba(0,0,0,0.25)] backdrop-blur-[5px] text-[#A6A6DB] font-Unbounded text-[12px] leading-[150%]">
                          Unlock $$ (Token) after your {index + 1}th check-in
                        </div>
                      )}
                    >
                      <div className="cursor-pointer w-[36px] rounded-full overflow-hidden border borer-[#A5FFFD]">
                        <img src={check?.token?.icon} alt={check?.token?.symbol} />
                      </div>
                    </Popover>
                    {
                      index < consecutive_check_in && (
                        <div className="absolute right-[-1px] bottom-[-2px]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <circle cx="9" cy="9" r="8" fill="black" stroke="#A5FFFD" />
                            <path d="M5 8.17391L7.88889 11L13 6" stroke="#78FEFF" stroke-width="2" />
                          </svg>
                        </div>
                      )
                    }
                  </div>
                )
              }
            </div>
          ))
        }
      </div>
    </div>
  )
})
