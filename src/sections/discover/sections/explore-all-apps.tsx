import { useMemo, useState } from "react";
import Card from "../components/card";
import clsx from "clsx";
import { motion } from "framer-motion";
import DexApps from "@/configs/swap";
import StakeApps from "@/configs/stake";

console.log(DexApps);
console.log(StakeApps);

enum AppCategory {
  Gaming = "Gaming",
  Dex = "Dex",
  Staking = "Staking",
};

const TABS = [
  {
    label: "All",
    value: "",
    selected: true,
  },
  {
    label: "Gaming",
    value: AppCategory.Gaming,
    selected: false,
  },
  {
    label: "Dex",
    value: AppCategory.Dex,
    selected: false,
  },
  {
    label: "Staking",
    value: AppCategory.Staking,
    selected: false,
  },
];

const APPS = [
  {
    name: "Space Invaders",
    category: AppCategory.Gaming,
    icon: "/images/mainnet/discover/avatar-space-invaders.png",
    description: "Attacked or Escape! Bet MON. Cash out. Repeat.",
    visits: "32356",
    link: "/arcade/space-invaders",
  },
  {
    name: "Lucky 777",
    category: AppCategory.Gaming,
    icon: "/images/mainnet/discover/avatar-lucky-777.png",
    description: "Spin! Spin! Spin! Earn MON or NFTs by the easiest way",
    visits: "3235",
    link: "/arcade/lucky777",
  },
  ...Object.values(DexApps).map((app) => ({
    name: app.name,
    category: AppCategory.Dex,
    icon: app.logo,
    description: "The Smart Aggregator for Monad",
    visits: "1234",
    link: app.path,
  })),
  ...Object.values(StakeApps).map((app) => ({
    name: app.basic.name,
    category: AppCategory.Staking,
    icon: app.basic.icon,
    description: "Liquid Staking on Monad. Featuring MEV-boosted yield powered by the fastest Block Engine in crypto.",
    visits: "1234",
    link: app.basic.path,
  })),
];

const ExploreAllApps = (props: any) => {
  const { } = props;

  const [tabs, setTabs] = useState(TABS);
  const activeTab = useMemo(() => {
    return tabs.find((tab: any) => tab.selected);
  }, [tabs]);

  const apps = useMemo(() => {
    return APPS.filter((app) => {
      if (!activeTab || activeTab?.value === "") {
        return true;
      }
      return app.category === activeTab.value;
    });
  }, [activeTab, APPS]);

  return (
    <>
      <div className="flex flex-col items-center translate-y-[2px]">
        <div className="text-[16px] text-white/30 font-[400] uppercase">
          Spotlight apps
        </div>
        <img
          src="/images/mainnet/discover/icon-down2.svg"
          alt=""
          className="w-[12px] h-[10px] object-center object-contain shrink-0 mt-[7px] rotate-[180deg]"
        />
        <div className="text-[18px] text-white font-[400] uppercase mt-[7px]">
          TRENDING TOKENS
        </div>
        <img
          src="/images/mainnet/discover/icon-down.svg"
          alt=""
          className="w-[12px] h-[10px] object-center object-contain shrink-0 mt-[3px] rotate-[180deg]"
        />
      </div>
      <Card
        title="EXPLORE ALL APPS"
        className="mx-auto"
        contentClassName="h-[clamp(1px,_31vw,_calc(var(--pc-1512)*0.31))] flex justify-center"
        backdropClassName=""
      >
        <Tabs
          tabs={tabs}
          setTabs={setTabs}
          className="absolute left-1/2 -translate-x-1/2 top-[clamp(1px,_5.42vw,_calc(var(--pc-1512)*0.0542))]"
        />
        <div className="explore-all-apps-content absolute h-[clamp(1px,_40vw,_calc(var(--pc-1512)*0.40))] overflow-y-auto top-[clamp(1px,_7.94vw,_calc(var(--pc-1512)*0.0794))] w-full flex flex-col gap-[clamp(1px,_0.1vw,_calc(var(--pc-1512)*0.001))]">
          {
            apps.map((app, index) => (
              <div
                key={index}
                className="flex justify-between items-center shrink-0 pl-[clamp(1px,_1.98vw,_calc(var(--pc-1512)*0.0198))] pr-[clamp(1px,_1.32vw,_calc(var(--pc-1512)*0.0132))] gap-[clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))] w-[clamp(1px,_78.04vw,_calc(var(--pc-1512)*0.7804))] h-[clamp(1px,_6.68vw,_calc(var(--pc-1512)*0.0668))] mx-auto bg-[url('/images/mainnet/discover/bg-explore-app2.png')] bg-no-repeat bg-center bg-contain"
              >
                <div className="flex items-center gap-[clamp(1px,_2.31vw,_calc(var(--pc-1512)*0.0231))] flex-1">
                  <div className="flex items-center gap-[clamp(1px,_1.46vw,_calc(var(--pc-1512)*0.0146))] shrink-0">
                    <img
                      src={app.icon}
                      alt=""
                      className="w-[clamp(1px,_3.31vw,_calc(var(--pc-1512)*0.0331))] h-[clamp(1px,_3.31vw,_calc(var(--pc-1512)*0.0331))] border border-[#836EF9] rounded-[4px] object-center object-contain shrink-0"
                    />
                    <div className="w-[clamp(1px,_8.60vw,_calc(var(--pc-1512)*0.0860))] text-[clamp(1px,_1.19vw,_calc(var(--pc-1512)*0.0119))] text-white font-[600]">
                      {app.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-[clamp(1px,_1.98vw,_calc(var(--pc-1512)*0.0198))] flex-1">
                    <div className="rounded-[4px] shrink-0 flex justify-center items-center text-[#FFF] w-[clamp(1px,_5.95vw,_calc(var(--pc-1512)*0.0595))] text-[clamp(1px,_0.93vw,_calc(var(--pc-1512)*0.0093))] h-[clamp(1px,_2.78vw,_calc(var(--pc-1512)*0.0278))] backdrop-blur-[2px] bg-[rgba(131,110,249,0.20)]">
                      {app.category}
                    </div>
                    <div className="text-[#A1AECB] w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(1px,_1.06vw,_calc(var(--pc-1512)*0.0106))]">
                      {app.description}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-[clamp(1px,_1.19vw,_calc(var(--pc-1512)*0.0119))] shrink-0">
                  <div className="rounded-[4px] shrink-0 flex justify-center items-center gap-[clamp(1px,_0.4vw,_calc(var(--pc-1512)*0.0040))] text-[#FFF] px-[clamp(1px,_1.32vw,_calc(var(--pc-1512)*0.0132))] text-[clamp(1px,_0.93vw,_calc(var(--pc-1512)*0.0093))] h-[clamp(1px,_2.78vw,_calc(var(--pc-1512)*0.0278))] backdrop-blur-[2px] bg-[rgba(131,110,249,0.20)]">
                    <img
                      src="/images/mainnet/discover/icon-up.svg"
                      alt=""
                      className="w-[clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))] h-[clamp(1px,_0.53vw,_calc(var(--pc-1512)*0.0053))] object-center object-contain shrink-0"
                    />
                    <div>{app.visits}</div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </Card>
    </>
  );
};

export default ExploreAllApps;

const Tabs = (props: any) => {
  const { tabs, setTabs, className } = props;

  return (
    <div className={clsx("h-[32px] rounded-[4px] flex items-center justify-center gap-[0px] border border-[#34304B] bg-black [filter:drop-shadow(0_0_10px_rgba(0,0,0,0.05))]", className)}>
      {
        tabs.map((tab: any) => (
          <motion.button
            type="button"
            key={tab.value}
            className="relative rounded-[2px] text-[16px] h-full flex justify-center items-center"
            animate={{
              color: tab.selected ? "#FFF" : "#A1AECB",
            }}
            onClick={() => {
              if (tab.selected) return;
              setTabs((prev: any) => {
                return prev.map((t: any) => ({
                  ...t,
                  selected: t.value === tab.value
                }));
              });
            }}
          >
            <div className="relative z-[2] px-[22px] flex justify-center items-center">{tab.label}</div>
            <motion.div
              className="w-full h-full rounded-[2px] absolute z-[1] left-0 top-0 bg-[radial-gradient(89.06%_89.06%_at_0%_10.94%,_#3E3284_0%,_#1F1A3D_100%)] backdrop-blur-[2px]"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: tab.selected ? 1 : 0,
              }}
            >

            </motion.div>
          </motion.button>
        ))
      }
    </div>
  );
};
