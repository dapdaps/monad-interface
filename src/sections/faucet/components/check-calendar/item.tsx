import clsx from 'clsx';
import Big from 'big.js';

const FaucetCheckCard = (props: any) => {
  const { className, item } = props;

  return (
    <div
      className={clsx(
        "relative flex justify-center items-center w-[63px] h-[62px] bg-no-repeat bg-center rounded-[6px] shadow-[0_0_10px_0_rgba(0,_0,_0,_0.05)]",
        item.checkin_date ? (Big(item.reward_amount || 0).gt(0) ? "bg-[#BFFF60]" : "bg-[#836EF9] bg-[url('/images/faucet/icon-un-check-in.svg')]") : "bg-[#3E347C] bg-[url('/images/faucet/icon-un-check-in.svg')]",
        className
      )}
    >
      {
        !!item.checkin_date && (
          <>
            {
              Big(item.reward_amount || 0).gt(0) ? (
                <>
                  <div className="text-[#3E347C] text-[12px] font-Unbounded font-[500] text-center translate-y-2.5">
                    <div>{item.reward_amount}</div>
                    <div>MON</div>
                  </div>
                  <img src="/images/faucet/icon-coin.svg" alt="" className="absolute w-[36px] h-[36px] top-[-14px]" />
                </>
              ) : (
                <div className="text-white text-[16px] font-Unbounded font-[500] opacity-30 text-center">
                  {item.checkin_sort}
                </div>
              )
            }
          </>
        )
      }
    </div>
  );
};

export default FaucetCheckCard;
