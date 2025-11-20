import useCustomAccount from "@/hooks/use-account";
import { lazy, Suspense, useEffect, useState, useRef } from "react";
import { useWelcomeContext } from "./context";
import { EWelcomeStatus } from "./config";
import { useBonus } from "@/sections/ranking/hooks/use-bonus";
import { useDebounceFn, useRequest } from "ahooks";

const WelcomeConnect = lazy(() => import("./connect"));
const WelcomeLoading = lazy(() => import("./loading"));

const WelcomeContent = (props: any) => {
  const { } = props;

  const { account } = useCustomAccount();
  const { status, setStatus } = useWelcomeContext();
  const { getBonus } = useBonus({ autoLoad: false });
  const [progress, setProgress] = useState(0);
  const minDuration = 3000; // Minimum 3 seconds
  const delayDuration = 4000;
  const maxWaitingProgress = 90;
  const progressTimerRef = useRef<any>(null);
  const minDurationTimerRef = useRef<any>(null);

  const updateProgress = (is2Finish?: boolean) => {
    clearInterval(progressTimerRef.current);
    progressTimerRef.current = null;

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5;
        if (prev >= maxWaitingProgress && !is2Finish) {
          clearInterval(progressTimerRef.current);
          progressTimerRef.current = null;
          return maxWaitingProgress;
        }
        if (next >= 100) {
          clearInterval(progressTimerRef.current);
          progressTimerRef.current = null;
          return 100;
        }
        return next;
      });
    }, is2Finish ? 40 : 150);
  };

  const { runAsync: getBonusDelay, cancel: cancelGetBonusDelay } = useRequest(async () => {
    const startTime = Date.now();
    const bonus = await getBonus();
    const lastDuration = Date.now() - startTime - minDuration;
    const waitMinDuration = () => new Promise((resolve) => {
      minDurationTimerRef.current = setTimeout(() => {
        clearTimeout(minDurationTimerRef.current);
        minDurationTimerRef.current = null;
        resolve(true);
      }, Math.abs(lastDuration));
    });
    if (lastDuration < 0) {
      await waitMinDuration();
    }
    return bonus;
  }, {
    manual: true,
  });

  const { run: startGetBonus, cancel: cancelStartGetBonus } = useDebounceFn(() => {
    setProgress(() => 0);
    updateProgress();

    // Start getBonus request
    getBonusDelay().then((bonus) => {
      console.log("bonus: %o", bonus);
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
      updateProgress(true);
      setStatus?.(EWelcomeStatus.READY);
    });
  }, { wait: delayDuration });

  useEffect(() => {
    setProgress(() => 0);
    cancelStartGetBonus();

    if (!account) {
      setStatus?.(EWelcomeStatus.CONNECTING);
      return;
    }

    setStatus?.(EWelcomeStatus.LOADING);
    startGetBonus();

    return () => {
      cancelGetBonusDelay();
      cancelStartGetBonus();
      clearInterval(progressTimerRef.current);
      clearTimeout(minDurationTimerRef.current);
      progressTimerRef.current = null;
      minDurationTimerRef.current = null;
    };
  }, [account]);

  return (
    <div className="w-full">
      <Suspense fallback={null}>
        {
          status === EWelcomeStatus.CONNECTING && (
            <WelcomeConnect />
          )
        }
        {
          [EWelcomeStatus.LOADING, EWelcomeStatus.READY].includes(status as EWelcomeStatus) && (
            <WelcomeLoading progress={progress} />
          )
        }
      </Suspense>
    </div>
  );
};

export default WelcomeContent;
