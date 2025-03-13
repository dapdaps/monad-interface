import clsx from "clsx"
import { memo } from "react"

export default memo(function RectangularButton({
  type,
  bgColor,
  children,
  className,
  onClick
}: {
  type: 1 | 2 | 3
  bgColor: string
  children: ReactDOM
  clssName: string
  onClick: any
}) {
  return (
    <div className={clsx("cursor-pointer relative flex  border border-black rounded-[6px] transform", type === 1 ? "skew-x-[-5deg]" : (type === 2 ? "skew-x-[5deg]" : ""), className)} onClick={onClick}>
      <div className={clsx("absolute left-0 right-0 bottom-0 top-0", type === 1 ? "skew-x-[5deg]" : (type === 2 ? "skew-x-[-5deg]" : ""))}>
        <div className={clsx("absolute w-1/2 top-0 bottom-0 rounded-[6px] border-black", type === 1 ? "-right-[6px] border-r" : (type === 2 ? "-left-[6px] border-l" : "hidden"), bgColor)} />
        <div className="absolute left-0 top-0 right-0 bottom-0 flex justify-center items-center text-black font-Unbounded text-[12px] font-medium ">{children}</div>
      </div>
    </div>
  )
})
