import clsx from 'clsx';
import useCustomAccount from '@/hooks/use-account';
import { useAppKit } from '@reown/appkit/react';

const FaucetCheckIn = (props: any) => {
  const { className } = props;

  const { open } = useAppKit();
  const { account } = useCustomAccount();

  return (
    <button
      type="button"
      className={clsx("flex justify-center items-center gap-[10px] w-[227px] h-[50px] rounded-[6px] bg-[#836EF9] text-white text-[14px] font-[500] font-Unbounded", className)}
      onClick={() => {
        if (!account) {
          open();
          return;
        }

      }}
    >
      {
        account ? (
          <div className="">
            GMonad
          </div>
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
