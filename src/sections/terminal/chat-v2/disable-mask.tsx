import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import useCountdown from "@/hooks/use-count-down";

dayjs.extend(utc);

const getEndTimestamp = () => {
  return dayjs.utc("2025-06-24 15:00:00").unix();
};

const calculateTimeUnits = (totalSeconds: number) => {
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
};

export default function DisableMask() {
  const endTimestamp = getEndTimestamp();
  const { secondsRemaining } = useCountdown(endTimestamp);

  const { days, hours, minutes, seconds } =
    calculateTimeUnits(secondsRemaining);

  return (
    <div className="absolute top-0 left-0 z-[10] w-full h-full flex flex-col items-center justify-center">
      <div className="relative z-[1] flex flex-col items-center justify-center">
        <img
          src="/images/terminal/icon-alert.gif"
          alt=""
          className="w-[98px] h-[98px] md:w-[72px] md:h-[72px] object-center object-contain shrink-0"
        />
        <div className="flex items-center gap-[7px] text-[#03E212] text-[26px] font-bold mt-[60px] md:mt-[40px] md:text-[20px]">
          <Item number={days} />
          <span>-</span>
          <Item number={hours} />
          <span>:</span>
          <Item number={minutes} />
          <span>:</span>
          <Item number={seconds} />
        </div>
        <div className="text-[#03E212] text-[16px] font-bold mt-[30px] w-[354px] font-SpaceMono leading-[150%] md:text-[14px] md:w-[320px]">
          Terminal is now under maintenance, preparing for the One station
          launch
        </div>
      </div>
    </div>
  );
}

const Item = ({ number }: { number: number }) => {
  return (
    <div className="w-[70px] h-[70px] md:w-[60px] md:h-[60px] bg-black/60 rounded-[10px] border border-[#836EF9] flex items-center justify-center">
      {number.toString().padStart(2, "0")}
    </div>
  );
};
