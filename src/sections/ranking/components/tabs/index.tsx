"use client";

import { ERankingTabs, RankingTabs } from "../../config";
import { useRankingStore } from "../../store";
import TabsSwitch from "./switch";
import Leaderboard from "./leaderboard";
import History from "./history";

const RankingTabsView = () => {
  const tabs = Object.values(RankingTabs).filter(tab => !tab.disabled);

  const { currentTab, setCurrentTab } = useRankingStore();

  return (
    <div className="w-full text-white">
      <TabsSwitch
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <div className="w-full">
        {
          currentTab === ERankingTabs.Leaderboard && <Leaderboard />
        }
        {
          currentTab === ERankingTabs.History && <History />
        }
      </div>
    </div>
  )
}

export default RankingTabsView;
