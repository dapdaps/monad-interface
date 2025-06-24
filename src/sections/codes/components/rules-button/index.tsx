import { memo } from "react";
import { useCodesContext } from "@/sections/codes/context";
import clsx from "clsx";

export default memo(function RulesButotn(props: any) {
  const { className } = props

  const { setShowRuleModal } = useCodesContext()
  return (
    <div data-bp="1008-001" className={clsx("mb-[29px] flex justify-end", className)}>
      <span className="cursor-pointer text-[#A5FFFD] font-DogicaPixel text-[12px] leading-[150%]"
        onClick={() => {
          setShowRuleModal(true)
        }}
      >
        Rules
      </span>
    </div>
  )
})
