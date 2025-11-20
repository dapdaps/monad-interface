import { MONAD_TESTNET_START_DATE } from "@/configs";
import { useInterval, useRequest } from "ahooks";
import clsx from "clsx";
import dayjs from "dayjs";
import { useState } from "react";
import { POST_LIMIT_SECONDS } from "./config";

const WelcomeFooter = (props: any) => {
  const { className } = props;

  const [currentTime, setCurrentTime] = useState(dayjs());

  const { data: currentDay } = useRequest(
    async () => {
      return dayjs(currentTime).diff(MONAD_TESTNET_START_DATE, "day");
    },
    { refreshDeps: [currentTime] }
  );

  useInterval(() => {
    setCurrentTime(dayjs());
  }, 1000);

  return (
    <div className={clsx("absolute px-[80px] bottom-[40px] w-full flex justify-between items-center left-0 text-[12px] md:text-[10px] font-Pixelmix text-[#8D7CFF] leading-[200%]", className)}>
      <div className="">
        MONADVERSE: DAY {currentDay} {dayjs(currentTime).format("HH:mm:ss")}
      </div>
      <div className="">SIGNAL DELAY: {POST_LIMIT_SECONDS}s</div>
    </div>
  );
};

export default WelcomeFooter;
