import { useTerminalStore } from '@/stores/terminal';
import { useEffect, useMemo, useRef, useState } from 'react';
import useCustomAccount from '@/hooks/use-account';
import Big from 'big.js';

export const POST_LIMIT_SECONDS: any = process.env.NEXT_PUBLIC_LEANCLOUD_ROOM_LIMIT_SECONDS || 5;

export function useLimit(props?: any) {
  const { precision = 1, updateDuration = 50 } = props ?? {};

  const { account } = useCustomAccount();
  const limit = useTerminalStore((store) => store.limit);
  const timer = useRef<any>();

  // 100 = can input
  const [limitProgress, setLimitProgress] = useState<string>("100");

  const currentUserLimit = useMemo<any>(() => {
    if (!account) return {};
    return limit?.[account] || {};
  }, [account]);

  useEffect(() => {
    if (!account || !limit || !limit[account]) {
      setLimitProgress("100");
      return;
    }
    const getLimitProgress = () => {
      const currLimit = limit[account];
      const currTime = Date.now();
      const diff = Math.max(currTime - currLimit.lastPostTime, 0);
      if (Big(diff).gt(Big(POST_LIMIT_SECONDS || 5).times(1000))) {
        setLimitProgress("100");
        clearInterval(timer.current);
      } else {
        setLimitProgress(
          Big(diff).div(Big(POST_LIMIT_SECONDS || 5).times(1000)).times(100).toFixed(precision, 0)
        );
      }
    };
    getLimitProgress();
    timer.current = setInterval(getLimitProgress, updateDuration);
    return () => {
      clearInterval(timer.current);
    };
  }, [limit, account]);

  return {
    limitProgress,
    currentUserLimit,
  };
}
