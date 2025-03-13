import { memo } from "react";

export default memo(function background({
  children
}: {
  children: ReactDOM
}) {

  return (
    <div className="relative">
      <div className="fixed left-0 right-0 bottom-[8.2vw]">
        <img className="w-full" src="/images/marketplace/bg_top.svg" alt="bg_top" />
        <div className="h-[3.47vw] bg-[#23243D]" />
      </div>
      <div className="fixed left-0 right-0 bottom-0 top-0 flex flex-col">
        <div className="flex-1">
          {children}
        </div>
        <img className="w-full -mt-[3.47vw]" src="/images/marketplace/bg_bottom.svg" alt="bg_bottom" />
      </div>
    </div>
  )
})
