import { Tab } from '@/sections/lending/components/tabs';
import { useEffect, useMemo, useState } from 'react';
import {
  LENDING_ACTION_TYPE_MAP,
  LendingAction,
  LendingOrderDirection
} from '@/sections/lending/config';
import { Column } from '@/sections/lending/column';
import Big from 'big.js';
import useCustomAccount from '@/hooks/use-account';
import LendingYours from '@/sections/lending/yours';
import LendingMarkets from '@/sections/lending/markets';
import useIsMobile from '@/hooks/use-isMobile';

export function useLending(props: any): Lending {
  const { dapp } = props;

  const TABS: Record<string, Tab> = {};

  const Yours = LendingYours[dapp.pathName];
  const Markets = LendingMarkets[dapp.pathName];
  if (Markets) {
    TABS.MARKET = {
      label: "Market",
      value: "market",
      content: <Markets />
    };
  }
  if (Yours) {
    TABS.YOURS = {
      label: "Yours",
      value: "yours",
      content: <Yours />
    };
  }

  const isMobile = useIsMobile();
  const { account, provider } = useCustomAccount();

  const [currentTab, setCurrentTab] = useState<Tab>(TABS.MARKET);
  const [currentMarket, setCurrentMarket] = useState();
  const [currentYoursMarket, setCurrentYoursMarket] = useState();
  const [markets, setMarkets] = useState<any[]>([]);
  const [marketsOrderKey, setMarketsOrderKey] = useState<string>(dapp.marketOrderKey);
  const [marketsOrderDirection, setMarketsOrderDirection] = useState<LendingOrderDirection>(LendingOrderDirection.Desc);
  const [yoursOrderKey, setYoursOrderKey] = useState<string>(dapp.yoursOrderKey);
  const [yoursOrderDirection, setYoursOrderDirection] = useState<LendingOrderDirection>(LendingOrderDirection.Desc);
  const [marketColumns, setMarketColumns] = useState<Column[]>([]);
  const [yoursColumns, setYoursColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<Record<string, any>>();
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [loadingColumns, setLoadingColumns] = useState(true);
  const [actionVisible, setActionVisible] = useState(false);
  const [currentAction, setCurrentAction] = useState<LendingAction>();

  const marketsList = useMemo(() => {
    if (loading) return [];
    return markets.map((market: any) => {
      if (userData && userData[market.id]) {
        return { ...market, ...userData[market.id] };
      }
      return { ...market };
    }).sort((a: any, b: any) => {
      const valueA = new Big(a[marketsOrderKey] || 0);
      const valueB = new Big(b[marketsOrderKey] || 0);
      return marketsOrderDirection === LendingOrderDirection.Asc
        ? valueA.minus(valueB).toNumber()
        : valueB.minus(valueA).toNumber();
    });
  }, [markets, userData, loading, marketsOrderKey, marketsOrderDirection]);

  const yoursList = useMemo(() => {
    let lendBalanceKey = "lendBalance";
    let borrowBalanceKey = "borrowBalance";

    const _yoursList: any = [];
    if (loading || userDataLoading) return _yoursList;

    markets.forEach((market: any) => {
      const lendBalance = userData?.[market.id]?.[lendBalanceKey];
      if (lendBalance && Big(lendBalance).gt(0)) {
        _yoursList.push({
          ...market,
          uniqueId: market.id + "_lend",
          type: LENDING_ACTION_TYPE_MAP.deposit,
          ...userData[market.id],
          balance: lendBalance,
        });
      }
      const _borrowBalance = userData?.[market.id]?.[borrowBalanceKey];
      if (_borrowBalance && Big(_borrowBalance).gt(0)) {
        _yoursList.push({
          ...market,
          uniqueId: market.id + "_borrow",
          type: LENDING_ACTION_TYPE_MAP.borrow,
          ...userData[market.id],
          balance: _borrowBalance,
        });
      }
    });
    return _yoursList.slice().sort((a: any, b: any) => {
      const valueA = new Big(a[yoursOrderKey] || 0);
      const valueB = new Big(b[yoursOrderKey] || 0);
      return yoursOrderDirection === LendingOrderDirection.Asc
        ? valueA.minus(valueB).toNumber()
        : valueB.minus(valueA).toNumber();
    });
  }, [markets, userData, loading, yoursOrderKey, yoursOrderDirection]);

  const toggleCurrentTab = (tab: Tab) => {
    setCurrentTab(tab);
  };

  const toggleCurrentMarket = (market?: any) => {
    setCurrentMarket(market);
  };

  const toggleCurrentYoursMarket = (market?: any) => {
    setCurrentYoursMarket(market);
  };

  const toggleMarketsOrderDirection = (params?: { orderKey?: string; direction?: LendingOrderDirection }) => {
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

  const toggleYoursOrderDirection = (params?: { orderKey?: string; direction?: LendingOrderDirection }) => {
    const { orderKey, direction } = params ?? {};

    if (orderKey) {
      setYoursOrderKey(orderKey);
      if (orderKey !== yoursOrderKey) {
        setYoursOrderDirection(LendingOrderDirection.Desc);
        return;
      }
    }

    setYoursOrderDirection(
      typeof direction === "undefined"
        ? (yoursOrderDirection === LendingOrderDirection.Desc ? LendingOrderDirection.Asc : LendingOrderDirection.Desc)
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
    dapp.loadData({ config: dapp }).then((res: any) => {
      setMarkets(res);
      setLoading(false);
    });
  };

  const getUserData = () => {
    if (!account || !markets?.length || !dapp.loadUserData) {
      setUserData({});
      return;
    }
    setUserDataLoading(true);
    dapp.loadUserData({
      config: dapp,
      markets,
      provider,
      account,
    }).then((res: any) => {
      setUserData(res);
      setUserDataLoading(false);
    });
  };

  useEffect(() => {
    getMarkets();
  }, []);

  useEffect(() => {
    getUserData();
  }, [account, provider, markets]);

  useEffect(() => {
    setLoadingColumns(true);
    dapp.loadColumns({
      currentMarket,
      currentYoursMarket,
      marketsOrderKey,
      marketsOrderDirection,
      yoursOrderKey,
      yoursOrderDirection,
      toggleMarketsOrderDirection,
      toggleYoursOrderDirection,
      yoursUniqueKey: "uniqueId",
      isMobile,
    }).then((res: any) => {
      setMarketColumns(res.marketColumns);
      setYoursColumns(res.yoursColumns);
      setLoadingColumns(false);
    });
  }, [
    currentMarket,
    currentYoursMarket,
    marketsOrderKey,
    marketsOrderDirection,
    yoursOrderKey,
    yoursOrderDirection,
    isMobile,
  ]);

  console.log("marketsList: %o", marketsList);

  return {
    config: dapp,
    TABS,
    currentTab,
    currentMarket,
    currentYoursMarket,
    actionVisible,
    handleCurrentAction,
    toggleCurrentTab,
    toggleCurrentMarket,
    toggleCurrentYoursMarket,
    currentAction,
    markets: marketsList,
    yours: yoursList,
    loading,
    userDataLoading,
    marketColumns,
    yoursColumns,
    loadingColumns,
    getMarkets,
    getUserData,
    marketsOrderKey,
    marketsOrderDirection,
    toggleMarketsOrderDirection,
    yoursOrderKey,
    yoursOrderDirection,
    toggleYoursOrderDirection,
  };
}

export interface Lending {
  config: any;
  TABS: Record<string, Tab>;
  currentTab: Tab;
  currentMarket: any;
  currentYoursMarket: any;
  toggleCurrentTab: (tab: Tab) => void;
  toggleCurrentMarket: (market?: any) => void;
  toggleCurrentYoursMarket: (market?: any) => void;
  currentAction?: LendingAction;
  actionVisible: boolean;
  handleCurrentAction: (params?: { action?: LendingAction; visible?: boolean; market?: any; }) => void;
  markets: any[];
  yours: any[];
  loading: boolean;
  userDataLoading: boolean;
  marketColumns: Column[];
  yoursColumns: Column[];
  loadingColumns: boolean;
  getMarkets: () => void;
  getUserData: () => void;
  marketsOrderKey?: string;
  marketsOrderDirection: LendingOrderDirection;
  toggleMarketsOrderDirection: (params?: { orderKey?: string; direction?: LendingOrderDirection }) => void;
  yoursOrderKey?: string;
  yoursOrderDirection: LendingOrderDirection;
  toggleYoursOrderDirection: (params?: { orderKey?: string; direction?: LendingOrderDirection }) => void;
}
