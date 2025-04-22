import Modal from "@/components/modal";
import { useFaucetStore } from "@/stores/useFaucet";
import { memo } from "react";

export default memo(function RuleModal() {
  const store = useFaucetStore()
  return (
    <Modal
      open={store?.showRule}
      closeIcon={(
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.25 0.25H2.5V4.75H0.25V0.25ZM2.5 4.75H4.75V7H2.5V4.75ZM4.75 7H7V9.25H4.75V7ZM7 7V4.75H9.25V7H7ZM9.25 4.75V0.25H11.5V4.75H9.25ZM7 9.25H9.25V11.5H7V9.25ZM9.25 11.5H11.5V16H9.25V11.5ZM4.75 9.25V11.5H2.5V9.25H4.75ZM2.5 11.5V16H0.25V11.5H2.5Z" fill="#A5FFFD" />
        </svg>
      )}
      closeIconClassName="absolute right-[40px] top-[32px] cursor-pointer"
      onClose={() => {
        store.set({
          showRule: false
        })
      }}
    >
      <div className="p-[61px_48px_0] w-[644px] h-[300px] bg-[url('/images/faucet/rule_bg.svg')] bg-contain bg-no-repeat text-[#A5FFFD] font-DogicaPixel">
        <div className="text-[18px] font-bold leading-[180%]">Faucet Daily Check-In Rules</div>
        <div className="text-[14px] leading-[180%]">
          <div className="flex before:min-w-[8px] before:h-[8px] before:m-[8px_4px_0_0] before:rounded-full before:bg-[#A5FFFD]">Check-in daily to earn 0.05 MON</div>
          <div className="flex before:min-w-[8px] before:h-[8px] before:m-[8px_4px_0_0] before:rounded-full before:bg-[#A5FFFD]">Check-in 7 days in a row to get an extra 0.2 MON
            Miss a day? Streak resets and starts over</div>
        </div>
        <div className="mt-[48px] flex justify-center">
          <div className="text-[14px] underline">I See</div>
        </div>
      </div>
    </Modal>
  )
})
