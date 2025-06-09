import BackgroundSound from '@/components/background-sound';
import Loading from '@/components/loading';
import useCustomAccount from '@/hooks/use-account';
import { useFaucetContext } from '@/sections/faucet/context';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import clsx from 'clsx';
import {
  differenceInMilliseconds,
  endOfToday,
  format
} from 'date-fns';
import { useEffect, useRef, useState } from 'react';
const FaucetCheckIn = (props: any) => {
  const { className } = props;

  const { openConnectModal } = useConnectModal();
  const { account, accountWithAk } = useCustomAccount();
  const {
    ethereumMainnetBalance,
    isEthereumMainnetBalanceLoading,
    checkinInfo,
    checkinInfoLoading,
    captchaLoading,
    handleGetCaptcha
  } = useFaucetContext();

  const { today_check_in } = checkinInfo ?? {

  }

  const [countdown, setCountdown] = useState('00:00:00');
  const checkinRef = useRef(null)

  const formatCountdown = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(' : ');
  };
  function calculateRemainingTime() {
    const now = new Date();
    const endOfDay = endOfToday();
    const remainingMs = differenceInMilliseconds(endOfDay, now);
    return formatCountdown(remainingMs)
  }
  useEffect(() => {
    if (today_check_in) {
      let animationFrameId: number;
      let lastUpdate = 0;
      const update = (timestamp: number) => {
        if (!lastUpdate || timestamp - lastUpdate >= 1000) {
          lastUpdate = timestamp;
          setCountdown(calculateRemainingTime());
        }
        animationFrameId = requestAnimationFrame(update);
      };
      animationFrameId = requestAnimationFrame(update);
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [today_check_in]);

  return (
    <>
      <button
        type="button"
        data-bp="1002-001"
        disabled={!account ? false : (!accountWithAk || today_check_in)}
        className={clsx("flex justify-center items-center gap-[10px] md:w-[200px] w-[227px] h-[50px] rounded-[6px] disabled:opacity-50 text-white text-[14px] font-[500] font-Unbounded", today_check_in ? "bg-[rgba(131,110,249,0.3)]" : "bg-[#836EF9]", className)}
        onClick={() => {
          if (!account) {
            openConnectModal?.();
            return;
          }
          checkinRef?.current?.play();
          handleGetCaptcha();
        }}
      >
        {
          account ? (
            <>
              {
                (captchaLoading || checkinInfoLoading || isEthereumMainnetBalanceLoading) && (
                  <Loading size={14} />
                )
              }
              <div className="">
                {today_check_in ? countdown : "Daily Check-in"}
              </div>
            </>
          ) : (
            <div className="">
              Connect Wallet
            </div>
          )
        }
      </button>

      <BackgroundSound ref={checkinRef} src="/audios/faucet/checkin.mp3" />
    </>
  );
};

export default FaucetCheckIn;
