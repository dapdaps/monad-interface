import { DEFAULT_CHAIN_ID } from '@/configs';
import { Tab } from '@/sections/lending/components/tabs';
import LendingMarket from '@/sections/lending/components/market';
import LendingYours from '@/sections/lending/components/yours';
import { useState } from 'react';
import { LendingAction } from '@/sections/lending/config';

export function useLending(props: any): Lending {
  const { dapp } = props;

  const config = {
    ...dapp.basic,
    ...dapp.networks[DEFAULT_CHAIN_ID],
  };

  console.log("DAppConfig: %o", config);

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

  return {
    config,
    TABS,
    currentTab,
    currentMarket,
    actionVisible,
    handleCurrentAction,
    toggleCurrentTab,
    toggleCurrentMarket,
    currentAction,
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
}
