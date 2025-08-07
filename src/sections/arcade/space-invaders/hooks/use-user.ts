import { get } from "@/utils/http";
import { useRequest } from "ahooks";
import { useState } from "react";

export function useUserData(): UserData {
  const { runAsync: getUserStatistics, data: userStatistics, loading: userStatisticsLoading } = useRequest(async () => {
    try {
      const res = await get("/game/deathfun/user/stats");
      if (res.code !== 200) {
        return {};
      }
      return res.data;
    } catch (error) {
      console.log("get user statistics failed: %o", error);
    }
  }, {
    manual: true,
  });

  const [userResultsPage, setUserResultsPage] = useState(1);
  const [userResultsPageSize] = useState(10);
  const [userResultsPageTotal, setUserResultsPageTotal] = useState(0);
  const { runAsync: getUserResults, data: userResults, loading: userResultsLoading } = useRequest(async () => {
    try {
      const res = await get("/game/deathfun/user/historyRecords", {
        page: userResultsPage,
        page_size: userResultsPageSize,
      });
      if (res.code !== 200) {
        return [];
      }
      setUserResultsPageTotal(res.data.total_page);
      return res.data.data;
    } catch (error) {
      console.log("get user statistics failed: %o", error);
    }
  }, {
    manual: true,
  });

  const { runAsync: getUserNfts, data: userNfts, loading: userNftsLoading } = useRequest(async () => {
    try {
      const res = await get("/game/deathfun/user/nfts");
      if (res.code !== 200) {
        return [];
      }
      return res.data;
    } catch (error) {
      console.log("get user statistics failed: %o", error);
    }
  }, {
    manual: true,
  });

  return {
    userStatistics,
    userStatisticsLoading,
    getUserStatistics,
    userResultsPage,
    setUserResultsPage,
    userResultsPageTotal,
    userResultsPageSize,
    getUserResults,
    userResults,
    userResultsLoading,
    getUserNfts,
    userNfts,
    userNftsLoading,
  };
}

export interface UserData {
  userStatistics: any;
  userStatisticsLoading: boolean;
  getUserStatistics: () => Promise<any>;
  userResultsPage: number;
  setUserResultsPage: (page: number) => void;
  userResultsPageTotal: number;
  userResultsPageSize: number;
  getUserResults: () => Promise<any>;
  userResults: any;
  userResultsLoading: boolean;
  getUserNfts: () => Promise<any>;
  userNfts: any;
  userNftsLoading: boolean;
}
