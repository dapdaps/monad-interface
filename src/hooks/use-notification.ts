import { useNotificationStore } from "@/stores/useNotification";
import { get } from "@/utils/http";
import { useRequest } from "ahooks";
import useCustomAccount from "./use-account";

const UnreadPollingDuration = 1000 * 30; // 30 seconds

export function useNotification() {
  const { accountWithAk } = useCustomAccount();
  const { unread, list, setUnread, setList, hasMore } = useNotificationStore();

  const { runAsync: getList, loading } = useRequest(async (cursor?: string) => {
    if (!accountWithAk) {
      setList([], { isFirst: true });
      return;
    }
    const isFirst = cursor ? false : true;
    try {
      const res = await get("/notification/list", {
        page_size: 5,
        cursor,
      });
      if (res.code !== 200) {
        setList([], { isFirst });
        return;
      }
      setList(res.data.data || [], { hasMore: res.data.has_more, isFirst });
    } catch (error) {
      console.log("get notification list failed", error);
      setList([], { isFirst });
    }
  }, { manual: true });

  const { runAsync: getUnread, loading: unreadLoading } = useRequest(async () => {
    if (!accountWithAk) {
      setUnread(0);
      return;
    }
    try {
      const res = await get("/notification/unread");
      if (res.code !== 200) {
        setUnread(0);
        return;
      }
      setUnread(res.data.unread || 0);
    } catch (error) {
      console.log("get unread failed", error);
    }
  }, { pollingInterval: UnreadPollingDuration, manual: true });

  const clearList = () => {
    setList([], { isFirst: true });
  };

  return {
    unread,
    list,
    getList,
    loading,
    getUnread,
    unreadLoading,
    accountWithAk,
    hasMore,
    clearList,
  };
}
