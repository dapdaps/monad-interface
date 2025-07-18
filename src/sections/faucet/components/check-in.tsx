import BackgroundSound from '@/components/background-sound';
import Loading from '@/components/loading';
import useCustomAccount from '@/hooks/use-account';
import { useFaucetContext } from '@/sections/faucet/context';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import clsx from 'clsx';
import { differenceInMilliseconds } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useSoundStore } from '@/stores/sound';
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

  const soundStore = useSoundStore()

  const { today_check_in } = checkinInfo ?? {

  }

  const [countdown, setCountdown] = useState('00:00:00');
  const checkinRef = useRef<any>(null)

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
    const utcNow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()));
    const utcTomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
    
    const remainingMs = differenceInMilliseconds(utcTomorrow, utcNow);

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
          if (!soundStore?.muted) {
            checkinRef?.current?.play();
          }
          
          handleGetCaptcha();
        }}
      >
        {
          account ? (
            <>
              {
                (captchaLoading || checkinInfoLoading) && (
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

      <BackgroundSound ref={checkinRef} src="/audios/faucet/checkin.mp3" config={{}} />
    </>
  );
};

export default FaucetCheckIn;
