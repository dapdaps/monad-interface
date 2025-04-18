import Modal from "@/components/modal";
import { IDapp } from "@/types";
import clsx from "clsx";
import { capitalize } from "lodash";
import { useRouter } from "next/navigation";
import { memo } from "react";

export default memo(function DappModal({
  dapp,
  onClose
}: {
  dapp: IDapp
  onClose: VoidFunction
}) {
  const router = useRouter()
  return (
    <Modal open={dapp} onClose={onClose}>
      <div
        className={clsx("relative w-full drop-shadow-[0_0_10px_rgba(0,0,0,0.05)]", dapp?.link.startsWith("http") ? "h-[300px]" : "h-[260px]")}
      >
        <div className="flex flex-col absolute left-0 -top-[10px] right-0 bottom-0 z-10">
          <div className="w-full">
            <img className="w-full" src="/images/dapps/mobile/modal_top.svg" alt="modal_top" />
          </div>
          <div className="w-full flex-1 bg-[#2B294A]" />
        </div>
        <div className="absolute p-[17px_24px] left-0 top-0 bottom-0 right-0 z-20">
          <div className="flex items-center gap-[16px]">
            <div className="w-[56px]">
              <img src={dapp?.icon} alt={dapp?.name} />
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="text-white font-Unbounded text-[16px] font-medium leading-[100%]">{dapp?.name}</div>
              <div className="text-white font-Unbounded text-[12px] font-light leading-[100%]">{capitalize(dapp?.type)}</div>
            </div>
          </div>
          
          <div className="text-white font-Unbounded text-[12px] font-light leading-[150%] opacity-60">
            Trade and earn crypto on the all-in-one<br />decentralized exchange. Enjoy low fees, high<br />liquidity, and a user-friendly interface.
          </div>

          {
            dapp?.link?.startsWith("http") && (
              <div className="mt-[11px] p-[10px] rounded-[6px] bg-[rgba(120,254,255,0.10)] text-[#78FEFF] font-Unbounded text-[12px] font-light leading-[150%] ">
                The app you selected needs to be used on its<br />official website.<br />We will redirect you to an external link shortly.
              </div>
            )
          }
          {
            dapp?.link?.startsWith("http") ? (
              <div className="mt-[25px] flex justify-center">
                <div
                  className="flex items-center gap-[10px]"
                  onClick={() => {
                    window.open(dapp?.link)
                  }}
                >
                  <span className="text-[#836EF9] font-Unbounded text-[14px] font-normal leading-[120%]">External Link</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 11L11 1M11 1H1.90909M11 1V10.0909" stroke="#836EF9" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            ) : (
              <div
                className="mt-[27px] h-[50px] flex items-center justify-center bg-[#8B87FF] rounded-[6px] text-white font-Unbounded text-[14px] font-medium leading-[120%]"
                onClick={() => {
                  router.push(dapp?.link)
                }}
              >
                Trade Now
              </div>
            )
          }
        </div>
        <svg onClick={onClose} className="absolute right-[17px] top-[13px] z-20" xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
          <g filter="url(#filter0_i_33330_3208)">
            <path d="M5.26795 10C6.03775 11.3333 7.96225 11.3333 8.73205 10L12.1962 4C12.966 2.66666 12.0037 1 10.4641 1L3.5359 1C1.9963 1 1.03405 2.66667 1.80385 4L5.26795 10Z" fill="#BFFF60" />
          </g>
          <path d="M9.16506 10.25C8.20281 11.9167 5.79719 11.9167 4.83494 10.25L1.37083 4.25C0.408585 2.58333 1.61139 0.5 3.5359 0.5L10.4641 0.5C12.3886 0.5 13.5914 2.58333 12.6292 4.25L9.16506 10.25Z" stroke="black" />
          <defs>
            <filter id="filter0_i_33330_3208" x="0.531433" y="0" width="12.9371" height="12" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="-2" dy="-2" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_33330_3208" />
            </filter>
          </defs>
        </svg>
      </div>
    </Modal>
  )
})
