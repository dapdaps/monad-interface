import Modal from "@/components/modal";
import { memo } from "react";
import { useFaucetContext } from "../context";
import VerificationBgSvg from '@public/images/faucet/verification_bg.svg'
import ModalBgSvg from '@public/images/faucet/mobile/modal_bg.svg'
import useIsMobile from "@/hooks/use-isMobile";

export default memo(function VerificationModal() {
  const {
    errorMsg,
    setErrorMsg
  } = useFaucetContext();
  const isMobile = useIsMobile()
  return (
    <Modal
      open={errorMsg}
      isForceNormal={true}
      closeIcon={(
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.25 0.25H2.5V4.75H0.25V0.25ZM2.5 4.75H4.75V7H2.5V4.75ZM4.75 7H7V9.25H4.75V7ZM7 7V4.75H9.25V7H7ZM9.25 4.75V0.25H11.5V4.75H9.25ZM7 9.25H9.25V11.5H7V9.25ZM9.25 11.5H11.5V16H9.25V11.5ZM4.75 9.25V11.5H2.5V9.25H4.75ZM2.5 11.5V16H0.25V11.5H2.5Z" fill="#A5FFFD" />
        </svg>
      )}
      className="flex items-center justify-center"
      closeIconClassName="absolute md:right-[17px] right-[25px] top-[12px] cursor-pointer"
      onClose={() => {
        setErrorMsg("")
      }}
    >
      <div className="md:w-[368px] w-[452px] md:h-[258px]  text-[#A5FFFD] font-DogicaPixel  leading-[180%] text-center">
        <div className="absolute md:-left-[10px] -left-[20px] md:-top-[20px] -top-[20px] md:w-[390px] w-[494px] md:h-[400px] h-[300px]">
          {
            isMobile ? (
              <ModalBgSvg />
            ) : (
              <VerificationBgSvg />
            )
          }
        </div>
        <div className="absolute p-[40px_28px_0] left-0 top-0 right-0 bottom-0">
          <div className="text-[18px] font-bold">De-bot Verification</div>
          <div className="m-[25px_0_64px] text-[14px]">To check in and get MON, you need at least 0.01 ETH on Ethereum.</div>
          <div
            className="flex justify-center"
            onClick={() => {
              setErrorMsg("")
            }}
          >
            <span className="underline text-[14px] cursor-pointer">I See</span>
          </div>
        </div>
      </div>
    </Modal>
  )
})
