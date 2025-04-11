import Modal from "@/components/modal";
import { IToken } from "@/types";
import { numberFormatter } from "@/utils/number-formatter";
import { memo } from "react";

export default memo(function TokenModal({
  token,
  onClose,
  onSwap
}: {
  token: IToken
  onClose: VoidFunction
  onSwap: VoidFunction
}) {
  return (
    <Modal open={token} onClose={onClose}>
      <div className="relative w-full drop-shadow-[0_0_10px_rgba(0,0,0,0.05)] h-[252px]">
        <div className="flex flex-col absolute left-0 -top-[10px] right-0 bottom-0 z-10">
          <div className="w-full">
            <img className="w-full" src="/images/dapps/mobile/modal_top.svg" alt="modal_top" />
          </div>
          <div className="w-full flex-1 bg-[#2B294A]" />
        </div>
        <div className="absolute p-[17px_24px] left-0 top-0 bottom-0 right-0 z-20">
          <div className="flex items-center gap-[16px]">
            <div className="w-[56px]">
              <img src={token?.icon} alt={token?.symbol} />
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="text-white font-Unbounded text-[16px] font-medium leading-[100%]">{token?.symbol}</div>
              {/* <div className="text-white font-Unbounded text-[12px] font-light leading-[100%]">{capitalize(dapp?.type)}</div> */}
            </div>
          </div>
          <div className="m-[31px_0_16px] flex items-center justify-between">
            <div className="flex flex-col gap-[4px]">
              <div className="text-white font-Unbounded text-[12px] font-light leading-[150%] opacity-60">Price</div>
              <div className="text-white font-Unbounded text-[14px] font-normal leading-[150%]">
                {numberFormatter(token?.price, 5, true, {
                  prefix: "$",
                  isShort: true
                })}
              </div>
            </div>

            <div className="flex flex-col gap-[4px]">
              <div className="text-white font-Unbounded text-[12px] font-light leading-[150%] opacity-60">Volume</div>
              <div className="text-white font-Unbounded text-[14px] font-normal leading-[150%]">
                {numberFormatter(token?.volume_24h, 2, true, {
                  prefix: "$",
                  isShort: true
                })}
              </div>
            </div>

          </div>

          <div
            className="mt-[27px] h-[50px] flex items-center justify-center bg-[#8B87FF] rounded-[6px] text-white font-Unbounded text-[14px] font-medium leading-[120%]"
            onClick={onSwap}
          >
            Swap
          </div>
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
