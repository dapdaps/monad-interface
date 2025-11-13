import { get } from "@/utils/http";
import { useRequest } from "ahooks";
import { IRankHistoryPage, useRankingStore } from "../store";
import { EHistoryType } from "../config";

export function useHistory() {
  const { historyList, setHistoryList, historyListPage, setHistoryListPage } = useRankingStore();

  const { runAsync: getHistoryList, loading } = useRequest(async (page?: Partial<IRankHistoryPage>) => {
    try {
      const res = await get("/rp/records", {
        page: page?.page || historyListPage.page,
        page_size: page?.pageSize || historyListPage.pageSize,
        category: typeof page?.type === "undefined" ? historyListPage.type : page.type,
        start_time: typeof page?.startTime === "undefined" ? historyListPage.startTime : page.startTime,
        end_time: typeof page?.endTime === "undefined" ? historyListPage.endTime : page.endTime,
      });
      if (res.code !== 200) {
        setHistoryList([]);
        return;
      }
      setHistoryList(res.data.data);
      setHistoryListPage({
        pageTotal: res.data.total_page,
        total: res.data.total,
      });
    } catch (error) {
      console.log("get top failed: %o", error);
      setHistoryList([]);
    }
  }, {
    manual: true,
  });

  const onHistoryListPageChange = (page: number) => {
    setHistoryListPage({
      page,
    });
    getHistoryList({
      page,
    });
  };

  const onHistoryListTypeChange = (type: EHistoryType) => {
    setHistoryListPage({
      page: 1,
      type,
    });
    getHistoryList({
      page: 1,
      type,
    });
  };

  const onHistoryListTimeChange = (startTime?: number | null, endTime?: number | null) => {
    setHistoryListPage({
      page: 1,
      startTime,
      endTime,
    });
    getHistoryList({
      page: 1,
      startTime,
      endTime,
    });
  };

  return {
    historyList,
    getHistoryList,
    loading,
    historyListPage,
    onHistoryListPageChange,
    onHistoryListTypeChange,
    onHistoryListTimeChange,
  };
}
