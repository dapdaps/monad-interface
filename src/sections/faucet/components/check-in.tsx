import clsx from 'clsx';
import useCustomAccount from '@/hooks/use-account';
import { useAppKit } from '@reown/appkit/react';
import { useFaucetContext } from '@/sections/faucet/context';
import Loading from '@/components/loading';
import Big from 'big.js';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import useToast from '@/hooks/use-toast';

/**
 * FaucetCheckIn component with Google reCAPTCHA v3 integration
 * 
 * This component displays a button that allows users to check in and receive $MON tokens.
 * It integrates Google reCAPTCHA v3 to prevent malicious bot activity.
 * When the button is clicked, it executes a reCAPTCHA verification and passes the token
 * to the handleCheckIn function.
 */
const FaucetCheckIn = (props: any) => {
  const { className } = props;

  const { open } = useAppKit();
  const { account, accountWithAk } = useCustomAccount();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const toast = useToast();
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
    <div className="w-full flex flex-col items-center gap-[10px]">
      <button
        type="button"
        data-bp="1002-001"
        disabled={!account ? false : (checkInPending || !accountWithAk || loading || collectedToday || !isETHValidBalance)}
        className={clsx("flex justify-center items-center gap-[10px] md:w-full w-[227px] h-[50px] rounded-[6px] bg-[#836EF9] disabled:opacity-50 text-white text-[14px] font-[500] font-Unbounded", className)}
        onClick={async () => {
          if (!account) {
            open();
            return;
          }

          try {
            if (!executeRecaptcha) {
              console.error('Execute recaptcha not available');
              toast.fail({
                title: 'Check-in failed!',
                text: 'reCAPTCHA verification is not available. Please try again later.',
              });
              return;
            }

            const token = await executeRecaptcha('faucet_checkin');
            if (!token) {
              toast.fail({
                title: 'Check-in failed!',
                text: 'reCAPTCHA verification failed. Please try again.',
              });
              return;
            }
            handleCheckIn(token);
          } catch (error) {
            console.error('reCAPTCHA execution failed:', error);
            toast.fail({
              title: 'Check-in failed!',
              text: 'reCAPTCHA verification failed. Please try again.',
            });
          }
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
