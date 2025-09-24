import useCustomAccount from "@/hooks/use-account";
import { get } from "@/utils/http";
import { useRequest } from "ahooks";
import { useState } from "react";
import useTokenBalance from "@/hooks/use-token-balance";
import { monad } from "@/configs/tokens/monad-testnet";
import { useLayoutContext } from "@/context/layout";

export function useRPS(props?: any) {
  const { } = props ?? {};

  const [betToken] = useState(monad["mon"]);

  const { accountWithAk, account } = useCustomAccount();
  const { nativeBalance, nativeBalanceLoading, getNativeBalance } = useLayoutContext();

  const [list, setList] = useState({
    data: [],
    page: 1,
    pageSize: 10,
    pageTotal: 0,
    // bet_amount | create_time
    sort: "create_time",
    // asc | desc
    order: "desc",
  });

  const { runAsync: getList, loading } = useRequest(async (params?: any) => {
    const _page = params?.page || list.page;
    const _sort = params?.sort || list.sort;
    const _order = params?.order || list.order;

    if (!accountWithAk) {
      return;
    }
    try {
      const res = await get("/game/rps/list", {
        page: _page,
        sort: _sort,
        order: _order,
        page_size: list.pageSize,
      });
      if (res.code !== 200) {
        return;
      }
      setList((prev) => {
        const _list = { ...prev };
        _list.data = res.data.data || [];
        _list.data.forEach((item: any) => {
          item.isOwn = item.address.toLowerCase() === account.toLowerCase();
        });
        _list.pageTotal = res.data.total_page;
        return _list;
      });
    } catch (error) {
      console.log("get rps list failed: %o", error);
    }
  }, {
    refreshDeps: [accountWithAk],
  });

  const onPageChange = (page: number) => {
    setList((prev) => {
      const _list = { ...prev };
      _list.page = page;
      return _list;
    });
    getList({ page });
  };

  const onSortChange = (sort: "bet_amount" | "create_time") => {
    setList((prev) => {
      const _list = { ...prev };
      _list.page = 1;
      _list.sort = sort;
      return _list;
    });
    getList({ sort, page: 1 });
  };

  const onOrderChange = (order: "asc" | "desc") => {
    setList((prev) => {
      const _list = { ...prev };
      _list.page = 1;
      _list.order = order;
      return _list;
    });
    getList({ order, page: 1 });
  };

  const onRoomLoading = (roomId: number, loading: boolean) => {
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
    betToken,
    betTokenBalance: nativeBalance,
    betTokenBalanceLoading: nativeBalanceLoading,
    getBetTokenBalance: getNativeBalance,
    onPageChange,
    onSortChange,
    onOrderChange,
    onRoomLoading,
    account,
  };
}
