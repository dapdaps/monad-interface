import useCustomAccount from "@/hooks/use-account";
import { lazy, Suspense, useEffect, useState, useRef } from "react";
import { useWelcomeContext } from "./context";
import { EWelcomeStatus } from "./config";
import { useBonus } from "@/sections/ranking/hooks/use-bonus";
import { useDebounceFn, useRequest } from "ahooks";

const WelcomeConnect = lazy(() => import("./connect"));
const WelcomeLoading = lazy(() => import("./loading"));
const WelcomeNft = lazy(() => import("./nft"));
const WelcomeProgress = lazy(() => import("./progress"));
const WelcomeStart = lazy(() => import("./start"));

const WelcomeContent = (props: any) => {
  const { } = props;

  const { account } = useCustomAccount();
  const { status, setStatus, setBonus } = useWelcomeContext();
  const { allBonus, getBonus } = useBonus({ autoLoad: false });
  const [progress, setProgress] = useState(0);
  const minDuration = 3000; // Minimum 3 seconds
  const maxWaitingProgress = 90;
  const progressTimerRef = useRef<any>(null);
  const minDurationTimerRef = useRef<any>(null);

  const clearProgressTimer = () => {
    clearInterval(progressTimerRef.current);
    progressTimerRef.current = null;
  };

  const updateProgress = (is2Finish?: boolean) => {
    clearProgressTimer();

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5;
        if (prev >= maxWaitingProgress && !is2Finish) {
          clearProgressTimer();
          return maxWaitingProgress;
        }
        if (next >= 100) {
          clearProgressTimer();
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

  const { run: setReady, cancel: cancelSetReady } = useDebounceFn((bonus: any) => {
    const hasNFT = Object.values(bonus || {}).some((it: any) => it === true);
    if (!hasNFT) {
      setStatus?.(EWelcomeStatus.NOT_FOUND);
      return;
    }
    setStatus?.(EWelcomeStatus.READY);
  }, { wait: 500 });

  const { run: setBonusResult, cancel: cancelSetBonusResult } = useDebounceFn((bonus: any) => {
    const hasNFT = Object.values(bonus || {}).some((it: any) => it === true);

    if (hasNFT) {
      updateProgress(true);
    }

    setReady(bonus);
  }, { wait: 3000 });

  const { run: startGetBonus, cancel: cancelStartGetBonus } = useDebounceFn(() => {
    setProgress(() => 0);

    // Start getBonus request
    getBonusDelay().then((bonus) => {
      setBonus?.(bonus);

      const hasNFT = Object.values(bonus || {}).some((it: any) => it === true);

      if (hasNFT) {
        // start progress
        updateProgress();
        setBonusResult(bonus);
        return;
      }

      setStatus?.(EWelcomeStatus.NOT_FOUND);
    });
  }, { wait: 0 });

  useEffect(() => {
    setProgress(() => 0);
    cancelStartGetBonus();
    cancelSetReady();
    cancelSetBonusResult();

    if (!account) {
      setStatus?.(EWelcomeStatus.CONNECTING);
      return;
    }

    setStatus?.(EWelcomeStatus.LOADING);
    startGetBonus();

    return () => {
      cancelGetBonusDelay();
      cancelStartGetBonus();
      cancelSetReady();
      cancelSetBonusResult();
      clearProgressTimer();
      clearTimeout(minDurationTimerRef.current);
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
          [EWelcomeStatus.LOADING, EWelcomeStatus.NOT_FOUND].includes(status as EWelcomeStatus) && (
            <WelcomeLoading bonus={allBonus} progress={progress} />
          )
        }
        {
          [EWelcomeStatus.READY, EWelcomeStatus.OPENED].includes(status as EWelcomeStatus) && (
            <WelcomeNft bonus={allBonus} />
          )
        }
        {
          [EWelcomeStatus.LOADING].includes(status as EWelcomeStatus) && (
            <WelcomeProgress progress={progress} className="mt-[10px]" />
          )
        }
        {
          [EWelcomeStatus.NOT_FOUND, EWelcomeStatus.OPENED].includes(status as EWelcomeStatus) && (
            <WelcomeStart />
          )
        }
      </Suspense>
    </div>
  );
};

export default WelcomeContent;
