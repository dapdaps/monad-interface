import FaucetFontSvg from '@public/images/faucet/mobile/faucet_font.svg';
import { memo } from "react";
import RuleModal from './components/rule-modal';
import EnergyBars from './components/energy-bars';
import { useFaucetContext } from "./context";
import FaucetCheckIn from './components/check-in';
import clsx from 'clsx';
import Big from 'big.js';
import VerificationModal from './components/verification-modal';
import { useFaucetStore } from '@/stores/useFaucet';
import CongratsModal from './components/congrats-modal';
import CaptchaModal from './components/captcha-modal';
import HistoryModal from './components/mobile/history-modal';
export default memo(function Mobile() {
  const {
    checkinInfo,
    setShowHistory
  } = useFaucetContext();
  const store = useFaucetStore()
  return (
    <div className="w-full h-full bg-[#0E0F29] overflow-auto scrollbar-hide">
      <div className="w-full h-full bg-[url('/images/faucet/mobile/bg.png')] bg-no-repeat bg-top bg-cover">
        <div className='relative m-[60px_0_20px] flex justify-center'>
          <FaucetFontSvg />
          <div
            className='absolute right-[10px] top-[3px] cursor-pointer text-[#A5FFFD] font-DogicaPixel text-[12px] leading-[150%]'
            onClick={() => {
              store.set({
                showRule: true
              })
            }}
          >Rules</div>
        </div>

        <div className='m-[20px_10px_0] p-[10px_8px_14px] flex flex-col justify-between h-[114px] rounded-[4px] bg-[rgba(165,255,253,0.20)] text-[#A5FFFD] text-[12px] font-Unbounded leading-[150%]'>
          <div className='flex font-light before:w-[6px] before:min-w-[6px] before:h-[6px] before:m-[6px_4px_0_0] before:rounded-full before:bg-[#A5FFFD]'>Testnet tokens are for development purposes only and have no real value.</div>
          <div className='flex font-light before:w-[6px] before:min-w-[6px] before:h-[6px] before:m-[6px_4px_0_0] before:rounded-full before:bg-[#A5FFFD]'>To check in and receive MON, you must have at least 0.01 ETH and a transaction history on Ethereum mainnet.</div>
        </div>
        <div className='relative'>
          <div className="absolute z-10 left-0 top-[130px] flex flex-col items-end w-[390px] h-[350px]  bg-[url('/images/faucet/mobile/summary_bg.svg')] bg-no-repeat" />
          <div className='relative z-20 w-[390px] h-[643px]'>
            <EnergyBars />
            <div className='absolute z-30 right-[34px] top-[159px]'>
              <div className='flex flex-col items-center gap-[10px] text-white font-Unbounded '>
                <div className='text-[42px] font-medium leading-[52px]'>{checkinInfo?.total_reward_amount ?? 0}</div>
                <div className='flex items-center gap-[6px]'>
                  <span className='text-[12px]'>MON</span>
                  <div className='flex items-center justify-center w-[65px] h-[14px] rounded-[8px] bg-[#7370C8] text-[9px] font-light'>Test Token</div>
                </div>
              </div>
              <div className='m-[29px_0_25px]'>
                <FaucetCheckIn />
              </div>

              <div className='flex flex-col gap-[16px] font-DogicaPixel leading-[180%]'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-[11px]'>
                    <div className='w-[17px]'>
                      <img src="/images/faucet/icon_lightning.svg" alt="icon_lightning" />
                    </div>
                    <span className='text-[#A6A6DB] text-[12px]'>Check-in</span>
                  </div>
                  <span className={clsx('text-white text-[14px] font-bold', Big(checkinInfo?.total_check_in ?? 0).eq(0) ? "opacity-30" : "")}>x{checkinInfo?.total_check_in ?? 0}</span>
                </div>

                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-[6px]'>
                    <div className='w-[24px] -ml-[2.5px]'>
                      <img src="/images/faucet/icon_capsule.svg" alt="icon_capsule" />
                    </div>
                    <span className='text-[#A6A6DB] text-[12px]'>Energy Bar</span>
                  </div>
                  <span className={clsx('text-white text-[14px] font-bold', Big(checkinInfo?.total_energy_bar ?? 0).eq(0) ? "opacity-30" : "")}>x{checkinInfo?.total_energy_bar ?? 0}</span>
                </div>

              </div>
              <div className='absolute z-10 right-0 -bottom-[26px] text-[#A5FFFD] text-[12px] font-DogicaPixel underline' onClick={() => {
                setShowHistory(true)
              }}>History</div>

              <div className="absolute -right-[23px] -bottom-[134px] w-[101px] h-[80px] shrink-0 flex justify-center items-center">
                <img src="/images/faucet/coffee-coins.svg" alt="" className="w-[101px] h-[80px]" />
                <img src="/images/faucet/heat-smoking.gif" alt="" className="absolute w-[77px] h-[77px] top-[-40px] translate-x-[20px]" />
                <img src="/images/faucet/sparkle.gif" alt="" className="absolute w-[46px] h-[46px] translate-y-[10px] translate-x-[-10px]" />
              </div>

            </div>
          </div>
        </div>
      </div>

      <RuleModal />
      <VerificationModal />
      <CongratsModal />
      <CaptchaModal />
      <HistoryModal />
    </div>
  )
})
