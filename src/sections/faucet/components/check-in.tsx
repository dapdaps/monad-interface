import clsx from 'clsx';
import useCustomAccount from '@/hooks/use-account';
import { useAppKit } from '@reown/appkit/react';
import { useFaucetContext } from '@/sections/faucet/context';
import Loading from '@/components/loading';

const FaucetCheckIn = (props: any) => {
  const { className } = props;

  const { open } = useAppKit();
  const { account, accountWithAk } = useCustomAccount();
  const { handleCheckIn, checkInPending, loading, collectedToday } = useFaucetContext();

  return (
    <button
      type="button"
      disabled={checkInPending || !accountWithAk || loading || collectedToday}
      className={clsx("flex justify-center items-center gap-[10px] w-[227px] h-[50px] rounded-[6px] bg-[#836EF9] disabled:opacity-50 text-white text-[14px] font-[500] font-Unbounded", className)}
      onClick={() => {
        if (!account) {
          open();
          return;
        }
        handleCheckIn();
      }}
    >
      {
        account ? (
          <>
            {
              (checkInPending || loading) && (
                <Loading size={14} />
              )
            }
            <div className="">
              {collectedToday ? "Collected Today" : "GMonad"}
            </div>
          </>
        ) : (
          <div className="">
            Connect Wallet
          </div>
        )
      }
    </button>
  );
};

export default FaucetCheckIn;
