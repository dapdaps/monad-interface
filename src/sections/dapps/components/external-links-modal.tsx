import HexagonButton from "@/components/button/hexagon";
import Modal from "@/components/modal";
import useClickTracking from "@/hooks/use-click-tracking";
import { IDapp } from "@/types";
import { memo } from "react";

export default memo(function externalLinksModal({
  dapp,
  onClose
}: {
  dapp: IDapp | null
  onClose: VoidFunction
}) {
  const { handleReport } = useClickTracking()
  return (
    <Modal
      open={dapp != null}
      onClose={onClose}
      closeIcon={(
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="9" viewBox="0 0 10 9" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2 0H0L4 4.5L0 9H2L5 5.625L8 9H10L6 4.5L10 0H8L5 3.375L2 0Z" fill="#A6A6DB" />
        </svg>
      )}
    >
      <div className="flex flex-col items-center font-Oxanium w-[300px] h-[342px] rounded-[6px] border border-[#3E347C] bg-[rgba(26,24,67,0.80)] shadow-[0_0_0px_0_rgba(0,0,0,0.25)] blur-[10]">
        <div className="m-[48px_auto_24px] w-[23px]">
          <img src="/images/dapps/link_2.svg" alt="link_2" />
        </div>
        <div className="text-white  text-[20px] font-medium leading-[100%]">External Links</div>
        <div className="flex items-center gap-[10px] m-[18px_0_14px]">
          <div className="w-[30px]">
            <img src={dapp?.icon} alt={dapp?.name} className="w-[30px] h-[30px] object-center object-contain rounded-[6px]" />
          </div>
          <div className="text-white  text-[16px] leading-[100%]">{dapp?.name}</div>
        </div>
        <div className="text-center text-white  text-[12px] leading-[150%] opacity-60">The app you selected needs to be<br />used on its official website.<br />We will redirect you to an external<br />link shortly.</div>
        <HexagonButton
          className="mt-[22px] w-[253px] h-[42px] flex items-center justify-center text-white  text-[14px] font-medium leading-[100%]"
          onClick={() => {
            handleReport("1003-001", dapp?.name)
            window.open(dapp?.link, "_blank");
          }}
        >Visit</HexagonButton>
      </div>
    </Modal>
  )
})
