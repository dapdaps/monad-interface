import useCustomAccount from "@/hooks/use-account";
import { get } from "@/utils/http";
import { useRequest } from "ahooks";
import { useState } from "react";
import { RPS_TIMEOUT_DURATION, RPSStatus, RPSWinner } from "../config";
import Big from "big.js";

export function useHistory(props?: any) {
  const { } = props ?? {};

  const { accountWithAk, account } = useCustomAccount();

  const [list, setList] = useState({
    data: [],
    // RPSStatus
    status: "",
    page: 1,
    pageSize: 10,
    pageTotal: 0,
  });

  const { runAsync: getList, loading } = useRequest(async (params?: any) => {
    const _page = params?.page || list.page;
    const _status = params?.status || list.status;

    if (!accountWithAk) {
      return;
    }
    try {
      const res = await get("/game/rps/mine", {
        status: _status,
        page: _page,
        page_size: list.pageSize,
      });
      if (res.code !== 200) {
        return;
      }
      setList((prev) => {
        const _list = { ...prev };
        _list.data = res.data.data || [];
        _list.data.forEach((item: any) => {
          item.isCreatorOwn = item.address.toLowerCase() === account.toLowerCase();
          // item.isPlayerOwn = item.player_address.toLowerCase() === account.toLowerCase();
          item.isWinner = item.winner_address.toLowerCase() === account.toLowerCase();
          item.isDraw = item.winner === RPSWinner.Draw;
          // item.isClaimable = item.status === RPSStatus.Canceled && Big(Math.floor(Date.now() / 1000)).minus(item.create_time).gt(RPS_TIMEOUT_DURATION);
          item.isClaimable = true;
        });
        _list.pageTotal = res.data.total_page;
        return _list;
      });
    } catch (error) {
      console.log("get rps history failed: %o", error);
    }
  }, {
    manual: true,
  });

  const onPageChange = (page: number) => {
    setList((prev) => {
      const _list = { ...prev };
      _list.page = page;
      return _list;
    });
    getList({ page });
  };

  const onStatusChange = (status: string) => {
    setList((prev) => {
      const _list = { ...prev };
      _list.page = 1;
      _list.status = status;
      return _list;
    });
    getList({ status, page: 1 });
  };

  const onRecordLoading = (roomId: number, loading: boolean) => {
    setList((prev) => {
      const _list = { ...prev };
      const current: any = _list.data.find((item: any) => item.room_id === roomId);
      if (current) {
        current.loading = loading;
      }
      return _list;
    });
  };

  return {
    list,
    getList,
    loading,
    onPageChange,
    onStatusChange,
    onRecordLoading,
  };
};
