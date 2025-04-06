import Modal from "@/components/modal";
import { IDapp } from "@/types";
import { memo } from "react";

export default memo(function externalLinksModal({
  dapp,
  onClose
}: {
  dapp: IDapp | null
  onClose: VoidFunction
}) {

  return (
    <Modal
      open={dapp}
      onClose={onClose}
      closeIcon={(
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="9" viewBox="0 0 10 9" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2 0H0L4 4.5L0 9H2L5 5.625L8 9H10L6 4.5L10 0H8L5 3.375L2 0Z" fill="#A6A6DB" />
        </svg>
      )}
    >
      <div className="flex flex-col items-center w-[300px] h-[342px] rounded-[6px] border border-[#3E347C] bg-[rgba(26,24,67,0.80)] shadow-[0_0_0px_0_rgba(0,0,0,0.25)] blur-[10]">
        <div className="m-[48px_auto_24px] w-[23px]">
          <img src="/images/dapps/link_2.svg" alt="link_2" />
        </div>
        <div className="text-white font-Unbounded text-[20px] font-medium leading-[100%]">External Links</div>
        <div className="flex items-center gap-[10px] m-[18px_0_14px]">
          <div className="w-[30px]">
            <img src="/images/dapps/magic_eden.png" alt="magic_eden" />
          </div>
          <div className="text-white font-Unbounded text-[16px] leading-[100%]">Magic Eden</div>
        </div>
        <div className="text-center text-white font-Unbounded text-[12px] leading-[150%] opacity-60">The app you selected needs to be<br />used on its official website.<br />We will redirect you to an external<br />link shortly.</div>
        <div
          className="mt-[22px] cursor-pointer w-[253px] h-[42px] rounded-[6px] bg-[#8B87FF] flex items-center justify-center text-white font-Unbounded text-[14px] font-medium leading-[100%]"
          onClick={() => {
            window.open(dapp.link, "_blank");
          }}
        >Visit</div>
      </div>
    </Modal>
  )
})
