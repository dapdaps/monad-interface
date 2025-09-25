import Modal from "@/components/modal";
import { useFaucetStore } from "@/stores/useFaucet";
import { memo } from "react";
import useIsMobile from "@/hooks/use-isMobile";
export default memo(function RuleModal() {
  const store = useFaucetStore();
  const isMobile = useIsMobile();
  return (
    <Modal
      open={store.showRule}
      isForceNormal={true}
      closeIcon={
        <svg
          width="12"
          height="16"
          viewBox="0 0 12 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.25 0.25H2.5V4.75H0.25V0.25ZM2.5 4.75H4.75V7H2.5V4.75ZM4.75 7H7V9.25H4.75V7ZM7 7V4.75H9.25V7H7ZM9.25 4.75V0.25H11.5V4.75H9.25ZM7 9.25H9.25V11.5H7V9.25ZM9.25 11.5H11.5V16H9.25V11.5ZM4.75 9.25V11.5H2.5V9.25H4.75ZM2.5 11.5V16H0.25V11.5H2.5Z"
            fill="#A5FFFD"
          />
        </svg>
      }
      className="flex items-center justify-center"
      closeIconClassName="absolute md:right-[17px] right-[25px] top-[12px] cursor-pointer"
      onClose={() => {
        store.set({
          showRule: false
        });
      }}
    >
      <div className="relative md:w-[368px] w-[602px] md:h-[378px] h-[258px] bg-contain bg-no-repeat text-[#A5FFFD] font-DogicaPixel">
        <div className="absolute md:-left-[10px] -left-[20px] md:-top-[10px] -top-[20px] md:w-[390px] w-[644px] md:h-[400px] h-[300px]">
          {isMobile ? (
            <img src="/images/faucet/mobile/modal_bg.svg" />
          ) : (
            <img src="/images/faucet/rule_bg.svg" />
          )}
        </div>
        <div className="absolute p-[40px_28px_0] left-0 top-0 right-0 bottom-0">
          <div className="md:text-[16px] text-[18px] font-bold leading-[180%]">
            Faucet Daily Check-In Rules
          </div>
          <div className="md:m-[28px_0_50px] m-[16px_0_48px] md:text-[12px] text-[14px] leading-[180%]">
            <div className="flex before:min-w-[8px] before:h-[8px] before:m-[8px_4px_0_0] before:rounded-full before:bg-[#A5FFFD]">
              Check-in daily to earn 0.01 MON
            </div>
            <div className="flex before:min-w-[8px] before:h-[8px] before:m-[8px_4px_0_0] before:rounded-full before:bg-[#A5FFFD]">
              Check-in 7 days in a row to get an extra 0.1 MON Miss a day?
              Streak resets and starts over
            </div>
          </div>
          <div className="flex justify-center">
            <div
              className="text-[14px] underline cursor-pointer"
              onClick={() => {
                store.set({
                  showRule: false
                });
              }}
            >
              I See
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
});
