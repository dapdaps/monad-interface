import { get } from "@/utils/http";
import { useRequest } from "ahooks";
import { IRankListPage, useRankingStore } from "../store";
import useCustomAccount from "@/hooks/use-account";
import { EMilitaryRank } from "../config";

export function useRank() {
  const { userRank, setUserRank, rankList, setRankList, rankListPage, setRankListPage, userRankSwitch, setUserRankSwitch } = useRankingStore();
  const { account } = useCustomAccount();

  const { runAsync: getUserRank, loading: userRankLoading } = useRequest(async () => {
    if (!account) {
      setUserRank({});
      return;
    }
    try {
      const res = await get("/rp/ranking/user", { address: account });
      if (res.code !== 200) {
        setUserRank({});
        return;
      }
      setUserRank(res.data);
    } catch (error) {
      console.log("get user rank failed: %o", error);
      setUserRank({});
    }
  }, {
    manual: true,
  });

  const { runAsync: getRankList, loading: rankListLoading } = useRequest(async (page?: Partial<IRankListPage>) => {
    try {
      const res = await get("/rp/ranking/list", {
        page: page?.page || rankListPage.page,
        page_size: page?.pageSize || rankListPage.pageSize,
        tier: page?.tier || rankListPage.tier,
      });
      if (res.code !== 200) {
        setRankList([]);
        return;
      }
      setRankList(res.data.data);
      setRankListPage({
        pageTotal: res.data.total_page,
        total: res.data.total,
      });
    } catch (error) {
      console.log("get list of rank failed: %o", error);
      setRankList([]);
    }
  }, {
    manual: true,
  });

  const onRankListPageChange = (page: number) => {
    setRankListPage({
      page,
    });
    getRankList({
      page,
    });
  };

  const onRankListTierChange = (tier: EMilitaryRank) => {
    if (tier === rankListPage.tier) {
      return;
    }
    setRankListPage({
      page: 1,
      tier,
    });
    getRankList({
      page: 1,
      tier,
    });
  };

  return {
    userRank,
    rankList,
    rankListPage,
    account,
    getUserRank,
    userRankLoading,
    getRankList,
    rankListLoading,
    onRankListPageChange,
    onRankListTierChange,
    userRankSwitch,
    setUserRankSwitch,
  };
}
