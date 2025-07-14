import Modal from "@/components/modal";
import useIsMobile from "@/hooks/use-isMobile";
import ModalBgSvg from '@public/images/faucet/mobile/modal_bg.svg';
import VerificationBgSvg from '@public/images/faucet/verification_bg.svg';
import { memo, useEffect, useRef } from "react";
import { useFaucetContext } from "../context";

export default memo(function CaptchaModal() {
  const {
    captchaId,
    setCaptchaId,
    captchaSolution,
    setCaptchaSolution,
    handleGetCaptcha,
    handleCheckIn
  } = useFaucetContext();
  const isMobile = useIsMobile()
  const captchaInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (captchaInputRef.current) {
      captchaInputRef.current.focus();
    }
  }, [captchaId])

  return (
    <Modal
      open={captchaId}
      isForceNormal={true}
      closeIcon={(
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.25 0.25H2.5V4.75H0.25V0.25ZM2.5 4.75H4.75V7H2.5V4.75ZM4.75 7H7V9.25H4.75V7ZM7 7V4.75H9.25V7H7ZM9.25 4.75V0.25H11.5V4.75H9.25ZM7 9.25H9.25V11.5H7V9.25ZM9.25 11.5H11.5V16H9.25V11.5ZM4.75 9.25V11.5H2.5V9.25H4.75ZM2.5 11.5V16H0.25V11.5H2.5Z" fill="#A5FFFD" />
        </svg>
      )}
      className="flex items-center justify-center"
      closeIconClassName="absolute md:right-[17px] right-[25px] top-[12px] cursor-pointer"
      onClose={() => {
        setCaptchaId("")
        setCaptchaSolution("")
      }}
    >
      <div onClick={(e) => {
        e.stopPropagation();
      }} className="md:w-[368px] w-[452px] md:h-[258px] text-[#A5FFFD] font-DogicaPixel">
        <div className="absolute md:-left-[10px] -left-[20px] md:-top-[10px] -top-[20px] md:w-[390px] w-[494px] md:h-[400px] h-[300px]">
          {
            isMobile ? (
              <ModalBgSvg />
            ) : (
              <VerificationBgSvg />
            )
          }
        </div>
        <div className="absolute md:p-[40px_14px_0] p-[40px_28px_0]  left-0 top-0 right-0 bottom-0">

          <div className="flex justify-between gap-[10px] text-white">
            <div className="flex-1 h-[40px]">
              <input
                className="w-[100%] h-[100%] text-[26px] bg-[transparent]"
                value={captchaSolution}
                onChange={(event) => {
                  setCaptchaSolution(event.target.value);
                }}
                ref={captchaInputRef}
                placeholder="0"
              />
            </div>
            <div className="flex flex-col items-end gap-[8px]">
              <div className="w-[120px] bg-white">
                <img src={`${process.env.NEXT_PUBLIC_API || "https://testnet-api-monad.dapdap.net"}/api/captcha/image/${captchaId}.png`} alt="captcha" />
              </div>
              <span className="cursor-pointer text-[10px]" onClick={handleGetCaptcha}>Can't you see clearly?</span>
            </div>
          </div>
          <div className="mt-[64px] flex justify-center">
            <span className="underline cursor-pointer" onClick={handleCheckIn}>submit</span>
          </div>
        </div>
      </div>
    </Modal>
  )
})
