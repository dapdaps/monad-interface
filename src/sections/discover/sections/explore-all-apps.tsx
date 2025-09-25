import { useMemo, useState } from "react";
import Card from "../components/card";
import clsx from "clsx";
import { motion } from "framer-motion";
import DexApps from "@/configs/swap";
import StakeApps from "@/configs/stake";
import { useProgressRouter } from "@/hooks/use-progress-router";

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
  ...Object.values(DexApps).filter((app) => app.name !== "SuperSwap").map((app) => ({
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
    <div className="pt-[clamp(1px,_2.38vw,_calc(var(--pc-1512)*0.0238))]">
      <div className="flex flex-col items-center">
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
        type="2"
        title="EXPLORE ALL APPS"
        className="mx-auto"
        backdropClassName=""
      >
        <Tabs
          tabs={tabs}
          setTabs={setTabs}
          className="absolute left-1/2 -translate-x-1/2 top-[clamp(1px,_5.42vw,_calc(var(--pc-1512)*0.0542))]"
        />
        <div className="explore-all-apps-content h-[clamp(1px,_calc(100dvh_-_253px_-_clamp(1px,_7.94vw,_calc(var(--pc-1512)*0.0794))),_clamp(1px,_37.00vw,_calc(var(--pc-1512)*0.3700)))] overflow-y-auto w-full flex flex-col gap-[clamp(1px,_0.1vw,_calc(var(--pc-1512)*0.001))]">
          {
            apps.map((app, index) => (
              <AppItem
                app={app}
                key={index}
              />
            ))
          }
        </div>
      </Card>
    </div>
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

const ButtonVisit = (props: any) => {
  const { app, ...restProps } = props;

  return (
    <button
      type="button"
      {...restProps}
      className={clsx(
        "group w-[50px] h-[36px] p-[1px] bg-[rgba(131,110,249,0.50)] hover:bg-[#836EF9] [clip-path:polygon(26%_0,100%_0,100%_63.89%,74%_100%,0_100%,0_36.11%)] transition-all duration-150",
        restProps.className
      )}
    >
      <div className="w-full h-full bg-black group-hover:bg-[radial-gradient(50%_66%_at_46%_50%,_#553BE4_0%,_#221662_100%)] [clip-path:polygon(26%_0,100%_0,100%_63.89%,74%_100%,0_100%,0_36.11%)] flex justify-center items-center transition-all duration-150">
        <svg
          width="10"
          height="12"
          viewBox="0 0 10 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[10px] h-[12px] shrink-0 text-[#836EF9] group-hover:text-[#FFF] group-hover:[filter:drop-shadow(0_0_10px_rgba(255,255,255,0.60))] transition-all duration-150"
        >
          <path d="M9.5 5.06218C10.1667 5.44708 10.1667 6.40933 9.5 6.79423L2.23205 10.9904C1.34602 11.5019 0.354474 10.5104 0.866025 9.62436L2.71133 6.4282C2.88996 6.1188 2.88996 5.7376 2.71132 5.4282L0.866025 2.23205C0.354474 1.34602 1.34602 0.354474 2.23205 0.866025L9.5 5.06218Z" fill="currentColor" />
        </svg>

      </div>
    </button>
  );
};

const AppItem = (props: any) => {
  const { app } = props;

  const router = useProgressRouter();

  return (
    <div className="flex justify-between items-center shrink-0 pl-[clamp(1px,_1.98vw,_calc(var(--pc-1512)*0.0198))] pr-[clamp(1px,_1.32vw,_calc(var(--pc-1512)*0.0132))] gap-[clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))] w-[clamp(1px,_78.04vw,_calc(var(--pc-1512)*0.7804))] h-[clamp(1px,_6.68vw,_calc(var(--pc-1512)*0.0668))] mx-auto bg-[url('/images/mainnet/discover/bg-explore-app2.png')] bg-no-repeat bg-center bg-contain">
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
        <ButtonVisit
          className=""
          onClick={() => {
            router.push(app.link);
          }}
        />
      </div>
    </div>
  );
};
