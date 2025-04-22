import { memo, useState } from "react";
import { useFaucetContext } from "../context";
import clsx from "clsx";

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
    width: 56
  }, {
    left: 387,
    width: 53
  }, {
    left: 448,
    width: 56
  }, {
    left: 510,
    width: 57
  }, {
    left: 571,
    width: 60
  },]
  const { consecutive_check_in } = checkinInfo || {}
  return (
    <div className='relative h-[203px] text-black font-DogicaPixel text-[16px] font-bold'>
      <div className='absolute left-0 right-0 top-0 bottom-0'>
        <img src="/images/faucet/capsule.svg" alt="capsule" />
      </div>
      {
        checkArray?.map((check, index: number) => (
          <div
            className={clsx('absolute', index < consecutive_check_in ? "top-[30px] h-[162px]" : "top-[39px] h-[142px]")}
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
            <div className={clsx('absolute left-0 top-0 right-0 bottom-0 z-20', index < consecutive_check_in ? "pt-[70px] pl-[27px]" : "pt-[61px] pl-[18px]")}>
              {index + 1}
            </div>
          </div>
        ))
      }
    </div>
  )
})
