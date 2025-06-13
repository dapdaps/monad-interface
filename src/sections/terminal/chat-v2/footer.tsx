import clsx from "clsx";
import dayjs from "dayjs";
import { useInterval, useRequest } from "ahooks";
import { START_DATE } from "../config";
import { useState } from "react";
import { POST_LIMIT_SECONDS } from "../hooks/use-limit";

const ChatFooter = (props: any) => {
  const { className } = props;

  const [currentTime, setCurrentTime] = useState(dayjs());

  const { data: currentDay } = useRequest(
    async () => {
      return dayjs(currentTime).diff(START_DATE, "day");
    },
    { refreshDeps: [currentTime] }
  );
  
  useInterval(() => {
    setCurrentTime(dayjs());
  }, 1000);

  return (
    <div className={clsx("md:pt-[10px] md:pb-[10px] md:pl-[15px] md:pr-[15px] md:z-[1] md:border-t-0 shrink-0 flex justify-between items-center px-[30px] pt-[10px] pb-[16px] border-t border-dashed border-[#836EF9] text-[12px] md:text-[10px] font-Pixelmix text-[#8D7CFF] leading-[200%]", className)}>
    <div className="">
      MONADVERSE: DAY {currentDay} {dayjs(currentTime).format("HH:mm:ss")}
    </div>
    <div className="">SIGNAL DELAY: {POST_LIMIT_SECONDS}s</div>
  </div>
  );
};

export default ChatFooter;
