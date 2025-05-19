import Popover, { PopoverPlacement, PopoverTrigger } from "@/components/popover";
import { Token } from "@/types";
import { memo } from "react";
import TokenInfo from "./token-info";

export default memo(function EarnToken({
  token
}: {
  token: Token
}) {
  return (
    <Popover
      trigger={PopoverTrigger.Hover}
      placement={PopoverPlacement?.RightTop}
      contentClassName="!z-[200]"
      content={<TokenInfo token={token} />}
    >
      <div key={token?.symbol} className="cursor-pointer flex items-center gap-[8px] text-[#A5FFFD] font-DogicaPixel text-[14px] leading-[200%]">
        <span className="underline">{token?.symbol}</span>
        <div className="w-[24px] h-[24px] rounded-full border border-[#A5FFFD] overflow-hidden">
          <img src={token?.icon} alt={token?.name} />
        </div>
      </div>
    </Popover>
  )
})
