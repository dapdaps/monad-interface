import clsx from "clsx"
import { memo } from "react"

export default memo(function RectangularButton({
  type,
  clicked,
  children,
  className,
  disabled,
  onClick,
  ...others
}: {
  type: 1 | 2 | 3;
  clicked?: boolean;
  children: any;
  className: string;
  disabled?: boolean;
  onClick?: Function;
}) {
  return (
    <div
      className={clsx("relative flex  border border-black rounded-[6px] transform", disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer ", type === 1 ? "skew-x-[-5deg]" : (type === 2 ? "skew-x-[5deg]" : ""), clicked ? 'bg-[#A5FFFD] drop-shadow-[0_0_10px_rgba(165, 255, 253, 0.60)]' : 'bg-[#A6A6D2] drop-shadow-[0_6px_0_#000]', className)}
      data-click-sound="/audios/press_button.mp3"
      {...{
        ...others
      }}
      onClick={onClick}
    >
      <div className={clsx("absolute left-0 right-0 bottom-0 top-0 pointer-events-none", type === 1 ? "skew-x-[5deg]" : (type === 2 ? "skew-x-[-5deg]" : ""))}>
        <div className={clsx("absolute w-1/2 top-0 bottom-0 rounded-[6px] border-black", type === 1 ? "-right-[6px] border-r" : (type === 2 ? "-left-[6px] border-l" : "hidden"), clicked ? "bg-[#A5FFFD]" : "bg-[#A6A6D2]")} />
        <div className="absolute left-0 top-0 right-0 bottom-0 flex justify-center items-center text-black font-Unbounded md:text-[10px] text-[12px] font-medium ">{children}</div>
      </div>
    </div>
  );
});
