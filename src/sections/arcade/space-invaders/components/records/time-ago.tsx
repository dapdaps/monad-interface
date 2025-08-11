import Popover, { PopoverPlacement, PopoverTrigger } from "@/components/popover";
import { useTimeAgo } from "../../hooks/use-time-ago";
import dayjs from "dayjs";


const TimeAgo = (props: any) => {
  const { date, className } = props;

  const { timeAgo } = useTimeAgo({ date });

  return (
    <Popover
      content={(
        <div className="px-[10px] py-[5px] font-[Montserrat] text-[12px] text-white font-[400] leading-[100%] flex justify-center items-center rounded-[4px] border border-[#514F60] bg-[#2B294A] shadow-[0_0_10px_0_rgba(0,0,0,0.05)]">
          {dayjs(date).format("M/D/YYYY, HH:mm:ss A")}
        </div>
      )}
      placement={PopoverPlacement.Top}
      trigger={PopoverTrigger.Hover}
      contentClassName="!z-[101]"
      closeDelayDuration={0}
    >
      <div className={className}>{timeAgo}</div>
    </Popover>
  );
};

export default TimeAgo;
