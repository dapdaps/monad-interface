import Modal from "@/components/modal";
import { memo } from "react";
import { useFaucetContext } from "../context";

export default memo(function VerificationModal() {
  const {
    errorMsg,
    setErrorMsg
  } = useFaucetContext();
  return (
    <Modal
      open={errorMsg}
      closeIcon={(
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.25 0.25H2.5V4.75H0.25V0.25ZM2.5 4.75H4.75V7H2.5V4.75ZM4.75 7H7V9.25H4.75V7ZM7 7V4.75H9.25V7H7ZM9.25 4.75V0.25H11.5V4.75H9.25ZM7 9.25H9.25V11.5H7V9.25ZM9.25 11.5H11.5V16H9.25V11.5ZM4.75 9.25V11.5H2.5V9.25H4.75ZM2.5 11.5V16H0.25V11.5H2.5Z" fill="#A5FFFD" />
        </svg>
      )}
      closeIconClassName="absolute right-[40px] top-[32px] cursor-pointer"
      onClose={() => {
        setErrorMsg("")
      }}
    >
      <div className="p-[61px_48px_0]  w-[494px] h-[300px] bg-[url('/images/faucet/verification_bg.svg')] bg-contain bg-no-repeat text-[#A5FFFD] font-DogicaPixel  leading-[180%] text-center">
        <div className="text-[18px] font-bold">De-bot Verification</div>
        <div className="text-[14px]">{errorMsg}</div>
        <div
          className="flex justify-center mt-[64px]"
          onClick={() => {
            setErrorMsg("")
          }}
        >
          <span className="underline text-[14px] cursor-pointer">I See</span>
        </div>
      </div>
    </Modal>
  )
})
