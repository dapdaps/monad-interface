import { memo } from "react";

export default memo(function MobileBackground({
  children
}: {
  children: ReactDOM
}) {
  return (
    <div className="absolute left-0 right-0 top-0 bottom-[56px]">
      <div className="absolute left-0 right-0 bottom-0">
        <img className="w-full" src="/images/marketplace/mobile/bg_top.svg" alt="bg_top" />
      </div>
      <div className="absolute flex flex-col left-0 right-0 bottom-0 top-0">
        <div className="flex-1">
          {children}
        </div>
        <img className="w-full -mt-[8.5vw]" src="/images/marketplace/mobile/bg_bottom.svg" alt="bg_bottom" />
      </div>
    </div>
  )
})
