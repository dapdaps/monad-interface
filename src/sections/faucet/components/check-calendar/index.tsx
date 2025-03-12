import clsx from 'clsx';
import { useFaucetContext } from '@/sections/faucet/context';

const FaucetCheckCalendar = (props: any) => {
  const { className } = props;

  const {
    currentMonthCheckinList,
  } = useFaucetContext();

  return (
    <div className={clsx("grid grid-cols-10 gap-x-[12px] gap-y-[20px] mt-[41px]", className)}>
      {
        currentMonthCheckinList.map((it) => (
          <div key={it.id} className="flex justify-center items-center w-[63px] h-[62px] rounded-[6px] bg-[#3E347C] shadow-[0_0_10px_0_rgba(0,_0,_0,_0.05)]">
            <img src="/images/faucet/icon-un-check-in.svg" alt="" className="w-[40px] h-[40px] shrink-0" />
          </div>
        ))
      }
    </div>
  );
};

export default FaucetCheckCalendar;
