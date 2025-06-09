import useCustomAccount from "@/hooks/use-account";
import { get } from "@/utils/http";
import { useDebounceFn, useInterval, useRequest } from "ahooks";
import dayjs from "dayjs";
import { cloneDeep } from "lodash";
import { useMemo, useState } from "react";

const MISSION_CODES = new Map([
  [
    1,
    {
      codes: 1,
      completed: false,
      mission: "",
    },
  ],
  [
    2,
    {
      codes: 2,
      completed: false,
      mission: "",
    },
  ],
  [
    3,
    {
      codes: 2,
      completed: false,
      mission: "",
    },
  ],
  [
    4,
    {
      codes: 3,
      completed: false,
      mission: "",
    },
  ],
  [
    5,
    {
      codes: 3,
      completed: false,
      isMore: true,
      mission: "",
    },
  ],
]);

export function useMission() {
  const { accountWithAk } = useCustomAccount();

  const [lastTime, setLastTime] = useState<string>("00h 00m 00s");

  const { data: missionData, loading: missionLoading, runAsync: getMissionData } = useRequest(async () => {
    if (!accountWithAk) return {};
    const res = await get("/invite/quest/user");
    if (res.code !== 200) {
      return {};
    }
    return res.data ?? {};
  }, { refreshDeps: [accountWithAk] });

  const { run: debounceGetMissionData } = useDebounceFn(getMissionData, { wait: 1000 });

  const currentRountCodes = useMemo(() => {
    const { consecutive_round = 0 } = missionData ?? {};
    const curr = MISSION_CODES.get(consecutive_round + 1);
    if (!curr) return 3;
    return curr.codes;
  }, [missionData]);

  useInterval(() => {
    const {
      // seconds
      quest_round_time,
      // seconds
      quest_start_time
    } = missionData ?? {};
    const zeroLastTime = "starts soon!";
    if (!quest_round_time || !quest_start_time) return setLastTime(zeroLastTime);
    const now = dayjs();
    const start = dayjs(quest_start_time * 1000);
    const diff = now.diff(start, "second");
    const currentRoundDiff = diff % quest_round_time;
    const lastTime = quest_round_time - currentRoundDiff;
    if (lastTime <= 1) {
      debounceGetMissionData();
      return setLastTime(zeroLastTime);
    }
    const lastH = Math.floor(lastTime / 3600);
    const lastM = Math.floor((lastTime % 3600) / 60);
    const lastS = lastTime % 60;
    setLastTime(`${lastH < 10 ? `0${lastH}` : lastH}h ${lastM < 10 ? `0${lastM}` : lastM}m ${lastS < 10 ? `0${lastS}` : lastS}s`);
  }, 1000, { immediate: true });

  const consecutiveList = useMemo(() => {
    const { consecutive_round = 0 } = missionData ?? {};
    const missionCodes = cloneDeep(Array.from(MISSION_CODES.values()));
    return missionCodes.map((item, index) => {
      if (index <= consecutive_round - 1) {
        return { ...item, completed: true };
      }
      return item;
    });
  }, [missionData]);

  return { missionData, missionLoading, getMissionData, lastTime, consecutiveList, currentRountCodes };
}
