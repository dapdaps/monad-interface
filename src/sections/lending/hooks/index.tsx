import { Tab } from '@/sections/lending/components/tabs';
import LendingMarket from '@/sections/lending/components/market';
import LendingYours from '@/sections/lending/components/yours';
import { useEffect, useState } from 'react';
import { LendingAction } from '@/sections/lending/config';
import { Column } from '@/sections/lending/column';

export function useLending(props: any): Lending {
  const { dapp } = props;

  console.log("DAppConfig: %o", dapp);

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
  const [marketColumns, setMarketColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingColumns, setLoadingColumns] = useState(true);
  const [actionVisible, setActionVisible] = useState(false);
  const [currentAction, setCurrentAction] = useState<LendingAction>();

  const toggleCurrentTab = (tab: Tab) => {
    setCurrentTab(tab);
  };

  const toggleCurrentMarket = (market?: any) => {
    setCurrentMarket(market);
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

  useEffect(() => {
    setLoading(true);
    dapp.loadData(dapp).then((res: any) => {
      console.log(res);
      setMarkets(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoadingColumns(true);
    dapp.loadColumns({ currentMarket }).then((res: { columns: Column[]; }) => {
      setMarketColumns(res.columns);
      setLoadingColumns(false);
    });
  }, [currentMarket]);

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
    markets,
    loading,
    marketColumns,
    loadingColumns,
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
}
