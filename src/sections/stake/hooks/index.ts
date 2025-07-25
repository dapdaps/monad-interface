import { useState } from "react";

export function useStake(props: any) {
  const { dapp } = props;

  const [currentTab, setCurrentTab] = useState<any>("stake");

  const onCurrentTab = (_currentTab: any) => {
    if (_currentTab === currentTab) return;
    setCurrentTab(_currentTab);
  };

  return {
    dapp,
    currentTab,
    onCurrentTab,
  };
}
