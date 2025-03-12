"use client";

import FaucetCard from '@/sections/faucet/components/card';
import FaucetCardTitle from '@/sections/faucet/components/card/title';

const FaucetView = () => {

  return (
    <div className="w-full h-screen bg-[#0E0F29]">
      <div className="w-full h-full bg-[url('/images/faucet/bg.png')] bg-no-repeat bg-[position:center_left_-18.54%] bg-[length:auto_133%]">
        <div className="w-full h-full flex justify-center items-start pt-[163px] bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.00)_100%)] bg-no-repeat bg-top bg-[length:100%_37.79%]">
          <FaucetCard className="">
            <div className="flex flex-col">
              <div className="w-full h-[100px]"></div>
              <div className="w-full h-[100px]">
                <FaucetCardTitle>
                  16 CHECK-IN
                </FaucetCardTitle>
              </div>
            </div>
          </FaucetCard>
        </div>
      </div>
    </div>
  );
};

export default FaucetView;
