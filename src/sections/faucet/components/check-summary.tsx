import clsx from 'clsx';
import { useFaucetContext } from '@/sections/faucet/context';
import { numberFormatter } from '@/utils/number-formatter';
import Skeleton from 'react-loading-skeleton';

const FaucetCheckSummary = (props: any) => {
  const { className } = props;

  const { collectedMON, checkinDays, loading } = useFaucetContext();

  return (
    <div className={clsx("md:p-[17px_13px_0] flex justify-between items-center w-full text-white text-[12px] font-[400] font-Unbounded", className)}>
      <div className="flex md:flex-col md:items-start items-center gap-[6px]">
        <div className="flex items-center md:text-[#A6A6DB]">
          Collected MON:
        </div>
        <div className='flex items-center gap-[6px]'>
          <div className="flex items-center ml-[5px] text-[26px] font-[500]">
            {
              loading ? (
                <Skeleton
                  width={30}
                  height={39}
                  borderRadius={4}
                />
              ) : numberFormatter(collectedMON, 2, true)
            }
          </div>
          <div className="flex items-center">
          MON
          </div>
          <div className="flex items-center text-[9px] font-[300] justify-center w-[65px] h-[14px] rounded-[8px] bg-[#7370C8]">
            Test Token
          </div>
        </div>

      </div>
      <div className="flex md:flex-col md:items-end items-center justify-end md:gap-[8px] gap-[12px]">
        <div className="flex items-center md:text-[#A6A6DB]">
          Check-in:
        </div>
        <div className="flex items-center text-[26px] font-[500]">
          {loading ? (
            <Skeleton
              width={30}
              height={39}
              borderRadius={4}
            />
          ) : checkinDays}
        </div>
      </div>
    </div>
  );
};

export default FaucetCheckSummary;
