import { memo } from "react";
import Popover, { PopoverPlacement, PopoverTrigger } from '@/components/popover';
import { LEVELS } from '@/sections/terminal/config';

export default memo(function LevelIcon({ level }: any) {
  if (!level) return "";

  return level.split(",").map((it: string, i: number) => {
    const currLevel = (LEVELS as any)[it];
    return (
      <Popover
        key={i}
        content={(
          <div className="p-[11px_18px] flex-shrink-0 rounded-[6px] bg-[#212041] text-[#CEB4F5] font-SpaceMono text-[14px] leading-[200%]">
            ({currLevel?.value})"{currLevel?.name}": {currLevel?.condition}
          </div>
        )}
        trigger={PopoverTrigger.Hover}
        placement={PopoverPlacement.TopLeft}
        closeDelayDuration={0}
        triggerContainerClassName="inline"
      >
      <span key={i} className="">
      [{currLevel?.value}]
    </span>
      </Popover>
    );
  });
});
