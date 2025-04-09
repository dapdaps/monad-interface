import { Tab } from '@/sections/lending/components/tabs';
import LendingMarket from '@/sections/lending/components/market';
import LendingYours from '@/sections/lending/components/yours';
import { useEffect, useMemo, useState } from 'react';
import { LendingAction, LendingOrderDirection } from '@/sections/lending/config';
import { Column } from '@/sections/lending/column';
import Big from 'big.js';

export function useLending(props: any): Lending {
  const { dapp } = props;

  const TABS: Record<string, Tab> = {
    MARKET: {
      label: "Market",
      value: "market",
      content: <LendingMarket />
    },
    YOURS: {
      label: "Yours",
      value: "yours",
      content: <LendingYours />
    },
  };

  const [currentTab, setCurrentTab] = useState<Tab>(TABS.MARKET);
  const [currentMarket, setCurrentMarket] = useState();
  const [markets, setMarkets] = useState<any[]>([]);
  const [marketsOrderKey, setMarketsOrderKey] = useState<string>(dapp.orderKey);
  const [marketsOrderDirection, setMarketsOrderDirection] = useState<LendingOrderDirection>(LendingOrderDirection.Desc);
  const [marketColumns, setMarketColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingColumns, setLoadingColumns] = useState(true);
  const [actionVisible, setActionVisible] = useState(false);
  const [currentAction, setCurrentAction] = useState<LendingAction>();

  const marketsList = useMemo(() => {
    if (loading) return [];
    return markets.slice().sort((a: any, b: any) => {
      const valueA = new Big(a[marketsOrderKey] || 0);
      const valueB = new Big(b[marketsOrderKey] || 0);
      return marketsOrderDirection === LendingOrderDirection.Asc
        ? valueA.minus(valueB).toNumber()
        : valueB.minus(valueA).toNumber();
    });
  }, [markets, loading, marketsOrderKey, marketsOrderDirection]);

  const toggleCurrentTab = (tab: Tab) => {
    setCurrentTab(tab);
  };

  const toggleCurrentMarket = (market?: any) => {
    setCurrentMarket(market);
  };

  const toggleOrderDirection = (params?: { orderKey?: string; direction?: LendingOrderDirection }) => {
    const { orderKey, direction } = params ?? {};

    if (orderKey) {
      setMarketsOrderKey(orderKey);
      if (orderKey !== marketsOrderKey) {
        setMarketsOrderDirection(LendingOrderDirection.Desc);
        return;
      }
    }

    setMarketsOrderDirection(
      typeof direction === "undefined"
        ? (marketsOrderDirection === LendingOrderDirection.Desc ? LendingOrderDirection.Asc : LendingOrderDirection.Desc)
        : direction
    );
  };

  const handleCurrentAction = (params?: { action?: LendingAction; visible?: boolean; market?: any; }) => {
    const { action, visible, market } = params ?? {};
    const _visible = typeof visible === "boolean" ? visible : !actionVisible;

    if (typeof market !== "undefined") {
      setCurrentMarket(market);
    }

    if (action) {
      setCurrentAction(action);
      setActionVisible(_visible);
      return;
    }

    setActionVisible(_visible);
  };

  const getMarkets = () => {
    setLoading(true);
    dapp.loadData(dapp).then((res: any) => {
      console.log(res);
      setMarkets(res);
      setLoading(false);
    });
  };

  useEffect(() => {
    getMarkets();
  }, []);

  useEffect(() => {
    setLoadingColumns(true);
    dapp.loadColumns({
      currentMarket,
      marketsOrderKey,
      marketsOrderDirection,
      toggleOrderDirection,
    }).then((res: { columns: Column[]; }) => {
      setMarketColumns(res.columns);
      setLoadingColumns(false);
    });
  }, [currentMarket, marketsOrderKey, marketsOrderDirection]);

  return {
    config: dapp,
    TABS,
    currentTab,
    currentMarket,
    actionVisible,
    handleCurrentAction,
    toggleCurrentTab,
    toggleCurrentMarket,
    currentAction,
    markets: marketsList,
    loading,
    marketColumns,
    loadingColumns,
    getMarkets,
    marketsOrderKey,
    marketsOrderDirection,
    toggleOrderDirection,
  };
}

export interface Lending {
  config: any;
  TABS: Record<string, Tab>;
  currentTab: Tab;
  currentMarket: any;
  toggleCurrentTab: (tab: Tab) => void;
  toggleCurrentMarket: (market?: any) => void;
  currentAction?: LendingAction;
  actionVisible: boolean;
  handleCurrentAction: (params?: { action?: LendingAction; visible?: boolean; market?: any; }) => void;
  markets: any[];
  loading: boolean;
  marketColumns: Column[];
  loadingColumns: boolean;
  getMarkets: () => void;
  marketsOrderKey?: string;
  marketsOrderDirection: LendingOrderDirection;
  toggleOrderDirection: (params?: { orderKey?: string; direction?: LendingOrderDirection }) => void;
}
