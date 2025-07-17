import FaucetCard from '@/sections/faucet/components/card';
import FaucetCheckIn from '@/sections/faucet/components/check-in';
import { useFaucetStore } from '@/stores/useFaucet';
import { memo, useMemo } from "react";
import CaptchaModal from './components/captcha-modal';
import CongratsModal from './components/congrats-modal';
import EnergyBars from './components/energy-bars';
import RuleModal from './components/rule-modal';
import Summary from './components/summary';
import VerificationModal from './components/verification-modal';
import { useSize } from 'ahooks';
import HistoryButton from './components/history-button';
import HistoryModal from './components/history-modal';
import useMultiNft from './hooks/useMultiNft';
import NftCheck from './components/nft-check';
import EthBalance from './components/eth-balance';


export default memo(function Laptop() {
  const store = useFaucetStore()
  

  return (
    <div className="w-full h-screen bg-[#0E0F29]">
      <div className="w-full h-full bg-[url('/images/faucet/bg.png')] bg-no-repeat bg-top bg-cover">
        <div className="w-full h-full flex justify-center items-start pt-[110px] bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.00)_100%)] bg-no-repeat bg-top bg-[length:100%_37.79%]">
          <FaucetCard bodyClassName="relative !p-0 border border-transparent">
            <div
              data-bp="1002-003"
              className='absolute right-[34px] top-[22px] underline cursor-pointer text-[#A5FFFD] font-DogicaPixel text-[12px] leading-[150%]'
              onClick={() => {
                store.set({
                  showRule: true
                })
              }}
            >Rules</div>
            <div className="flex items-center justify-between pl-[25px] pt-[25px] font-DogicaPixel font-bold">
              <div>Satisfy one of the following requirements to check-in & earn MON</div>
            </div>

            <EthBalance />
            <NftCheck />

            {/* <div className='m-[25px_32px_17px] p-[12px_101px] rounded-[4px] bg-[rgba(165,255,253,0.20)] text-center text-[#A5FFFD] font-Unbounded text-[12px] leading-[150%]'>
              Testnet tokens are for development purposes only and have no real value.
              To check in and receive MON, you must have at least 0.01 ETH and a transaction history on Ethereum mainnet.
            </div> */}

            <EnergyBars />
            <Summary />

            <FaucetCheckIn className="m-[28px_auto_19px]" />
            <HistoryButton />

            <div className="absolute right-[22px] -bottom-[9px] w-[202px] h-[160px] shrink-0 flex justify-center items-center">
              <img src="/images/faucet/coffee-coins.svg" alt="" className="w-[202px] h-[160px]" />
              <img src="/images/faucet/heat-smoking.gif" alt="" className="absolute w-[154px] h-[154px] top-[-80px] translate-x-[40px]" />
              <img src="/images/faucet/sparkle.gif" alt="" className="absolute w-[92px] h-[92px] translate-y-[20px] translate-x-[-20px]" />
            </div>

          </FaucetCard>
        </div>
      </div>
      <RuleModal />
      <CongratsModal />
      <VerificationModal />
      <CaptchaModal />
      <HistoryModal />


    </div>
  )
})
