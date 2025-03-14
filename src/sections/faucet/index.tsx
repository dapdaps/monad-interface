"use client";

import FaucetCard from '@/sections/faucet/components/card';
import FaucetCardTitle from '@/sections/faucet/components/card/title';
import FaucetStep from '@/sections/faucet/components/step';
import FaucetCheckIn from '@/sections/faucet/components/check-in';
import FaucetCheckSummary from '@/sections/faucet/components/check-summary';
import FaucetCheckCalendar from '@/sections/faucet/components/check-calendar';
import FaucetContextProvider from '@/sections/faucet/context';

const FaucetView = () => {

  return (
    <FaucetContextProvider>
      <div className="w-full h-screen bg-[#0E0F29]">
        <div className="w-full h-full bg-[url('/images/faucet/bg.png')] bg-no-repeat bg-top bg-cover">
          <div className="w-full h-full flex justify-center items-start pt-[110px] bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.00)_100%)] bg-no-repeat bg-top bg-[length:100%_37.79%]">
            <FaucetCard bodyClassName="pt-[71px]">
              <div className="flex flex-col">
                <div className="w-full">
                  <div className="w-full flex items-center pr-[22px]">
                    <FaucetStep />
                    <div className="relative w-[202px] h-[160px] shrink-0 flex justify-center items-center">
                      <img src="/images/faucet/coffee-coins.svg" alt="" className="w-[202px] h-[160px]" />
                      <img src="/images/faucet/heat-smoking.gif" alt="" className="absolute w-[154px] h-[154px] top-[-80px] translate-x-[40px]" />
                      <img src="/images/faucet/sparkle.gif" alt="" className="absolute w-[92px] h-[92px] translate-y-[20px] translate-x-[-20px]" />
                    </div>
                  </div>
                  <div className="flex justify-center mt-[5px]">
                    <FaucetCheckIn />
                  </div>
                </div>
                <div className="w-full mt-[34px]">
                  <FaucetCardTitle className="h-[40px]" />
                  <div className="px-[46px]">
                    <FaucetCheckSummary />
                    <FaucetCheckCalendar />
                  </div>
                </div>
              </div>
            </FaucetCard>
          </div>
        </div>
      </div>
    </FaucetContextProvider>
  );
};

export default FaucetView;
