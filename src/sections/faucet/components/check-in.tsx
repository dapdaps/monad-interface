import clsx from 'clsx';
import useCustomAccount from '@/hooks/use-account';
import { useAppKit } from '@reown/appkit/react';
import { useFaucetContext } from '@/sections/faucet/context';
import Loading from '@/components/loading';
import Big from 'big.js';

const FaucetCheckIn = (props: any) => {
  const { className } = props;

  const { open } = useAppKit();
  const { account, accountWithAk } = useCustomAccount();
  const {
    handleCheckIn,
    checkInPending,
    loading,
    collectedToday,
    ethereumMainnetBalance,
    isEthereumMainnetBalanceLoading,
  } = useFaucetContext();

  const isETHValidBalance = !isEthereumMainnetBalanceLoading && Big(ethereumMainnetBalance?.formatted || 0).gt(0.01);

  return (
    <div className="flex flex-col items-center gap-[10px]">
      <button
        type="button"
        disabled={!account ? false : (checkInPending || !accountWithAk || loading || collectedToday || !isETHValidBalance)}
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
                (checkInPending || loading || isEthereumMainnetBalanceLoading) && (
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
      {
        !isETHValidBalance && (
          <div className="text-[#A6A6DB] font-Unbounded text-[12px] font-[300] leading-normal text-center">
            To check in and get $MON, you need at least 0.01 ETH on Ethereum.
          </div>
        )
      }
    </div>
  );
};

export default FaucetCheckIn;
