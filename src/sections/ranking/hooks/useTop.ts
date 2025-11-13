import { get } from "@/utils/http";
import { useRequest } from "ahooks";
import { useRankingStore } from "../store";

export function useTop() {
  const { topUsers, setTopUsers } = useRankingStore();

  const { runAsync: getTopUsers, loading } = useRequest(async () => {
    try {
      const res = await get("/rp/ranking/top");
      if (res.code !== 200) {
        setTopUsers([]);
        return;
      }
      setTopUsers(res.data);
    } catch (error) {
      console.log("get top failed: %o", error);
      setTopUsers([]);
    }
  }, {
    manual: true,
  });

  return {
    topUsers,
    getTopUsers,
    loading,
  };
}
