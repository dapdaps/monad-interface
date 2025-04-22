import Modal from "@/components/modal";
import { useFaucetStore } from "@/stores/useFaucet";
import { memo } from "react";
import { useFaucetContext } from "../context";

export default memo(function CongratsModal() {
  const {
    checkinSuccess,
  } = useFaucetContext();
  return (
    <Modal
      open={checkinSuccess}
      closeIcon={(
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.25 0.25H2.5V4.75H0.25V0.25ZM2.5 4.75H4.75V7H2.5V4.75ZM4.75 7H7V9.25H4.75V7ZM7 7V4.75H9.25V7H7ZM9.25 4.75V0.25H11.5V4.75H9.25ZM7 9.25H9.25V11.5H7V9.25ZM9.25 11.5H11.5V16H9.25V11.5ZM4.75 9.25V11.5H2.5V9.25H4.75ZM2.5 11.5V16H0.25V11.5H2.5Z" fill="#A5FFFD" />
        </svg>
      )}
      closeIconClassName="absolute right-[40px] top-[32px] cursor-pointer"
      onClose={() => {
        setCheckinSuccess(false)
      }}
    >
      <div className="w-[504px] h-[330px] bg-[url('/images/faucet/congrats_bg.svg')] bg-contain bg-no-repeat text-white font-Unbounded">
        <div className="relative -top-[30px] m-[0_auto_20px] w-[183px]">
          <img src="/images/faucet/congrats_capsule.svg" alt="congrats_capsule" />
        </div>

        <div className="-mt-[30px] text-center text-[20px] font-medium leading-[100%]">Congrats!</div>
        <div className="m-[22px_80px_52px_92px] text-[14px] font-light leading-[150%] text-center">You‘ve got 1 Energy Bar,  and you will get extra 0.2 MON </div>
      </div>
    </Modal>
  )
})
