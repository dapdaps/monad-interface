import clsx from 'clsx';

const FaucetCheckSummary = (props: any) => {
  const { className } = props;

  return (
    <div className={clsx("flex justify-between items-center w-full text-white text-[12px] font-[400] font-Unbounded", className)}>
      <div className="flex items-center gap-[6px]">
        <div className="flex items-center">
          Collected MON:
        </div>
        <div className="flex items-center ml-[5px] text-[26px] font-[500]">
          0.2
        </div>
        <div className="flex items-center">
          MONAD
        </div>
        <div className="flex items-center text-[9px] font-[300] justify-center w-[65px] h-[14px] rounded-[8px] bg-[#7370C8]">
          Test Token
        </div>
      </div>
      <div className="flex items-center justify-end gap-[12px]">
        <div className="flex items-center">
          Check-in:
        </div>
        <div className="flex items-center text-[26px] font-[500]">
          11
        </div>
      </div>
    </div>
  );
};

export default FaucetCheckSummary;
