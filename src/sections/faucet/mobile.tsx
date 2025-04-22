import FaucetCard from '@/sections/faucet/components/card';
import FaucetCardTitle from '@/sections/faucet/components/card/title';
import FaucetCheckCalendar from '@/sections/faucet/components/check-calendar';
import FaucetCheckIn from '@/sections/faucet/components/check-in';
import FaucetCheckSummary from '@/sections/faucet/components/check-summary';
import FaucetStep from '@/sections/faucet/components/step';
import FaucetFontSvg from '@public/images/faucet/mobile/faucet_font.svg'
import { memo } from "react";
export default memo(function Mobile() {
  return (
    <div className="w-full h-screen bg-[#0E0F29]">
      {/* <div className="w-full h-full bg-[url('/images/faucet/mobile/bg.png')] bg-no-repeat bg-top bg-cover">
        <FaucetCard bodyClassName="p-[71px_10px_0] h-screen overflow-auto">
          <div className='my-[20px] flex justify-center'>
            <FaucetFontSvg />
          </div>
          <div className="w-full">
            <div className="w-full flex flex-col gap-[20px] items-center">
              <FaucetStep />
              <div className="relative w-[121px] h-[96px] shrink-0 flex justify-center items-center">
                <img src="/images/faucet/coffee-coins.svg" alt="" className="w-[121px] h-[96px]" />
                <img src="/images/faucet/heat-smoking.gif" alt="" className="absolute w-[92px] h-[92px] top-[-48px] translate-x-[24px]" />
                <img src="/images/faucet/sparkle.gif" alt="" className="absolute w-[55px] h-[55px] translate-y-[12px] translate-x-[-12px]" />
              </div>
            </div>
            <div className="flex justify-center mt-[5px]">
              <FaucetCheckIn />
            </div>
          </div>
          <div className="w-full rounded-[6px] bg-[rgba(45,48,79,0.60)] backdrop-blur-[10px] mt-[17px]">
            <FaucetCheckSummary />
            <FaucetCheckCalendar />
          </div>
        </FaucetCard>
      </div> */}
    </div>
  )
})
