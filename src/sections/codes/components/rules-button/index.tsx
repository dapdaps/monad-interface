import { memo } from "react";
import { useCodesContext } from "@/sections/codes/context";

export default memo(function RulesButotn() {
  const { setShowRuleModal } = useCodesContext()
  return (
    <div className="mb-[29px] flex justify-end">
      <span className="cursor-pointer text-[#A5FFFD] font-DogicaPixel text-[12px] leading-[150%]"
        onClick={() => {
          setShowRuleModal(true)
        }}
      >Rules</span>
    </div>
  )
})
