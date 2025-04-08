import { AnimatePresence, motion } from 'framer-motion';
import { useMemo } from 'react';
import clsx from 'clsx';

const LendingTabs = (props: any) => {
  const {
    tabs,
    tabWidth,
    onTab,
    currentTab,
    className,
    headerClassName,
    bodyClassName
  } = props;

  const currentTabIndex = useMemo(() => {
    let idx = tabs.findIndex((tab: Tab) => tab.value === currentTab.value);
    if (idx < 0) return 0;
    return idx;
  }, [currentTab]);

  return (
    <div className={clsx("", className)}>
      <div
        className={clsx("flex items-center justify-center mx-auto relative", headerClassName)}
        style={{
          width: tabWidth * tabs.length,
        }}
      >
        {
          tabs.map((tab: Tab) => (
            <div
              key={tab.value}
              className="w-[260px] py-[10px] cursor-pointer shrink-0 justify-center flex items-center text-center text-[#FFF] font-Unbounded text-[16px] font-normal leading-normal"
              style={{
                width: tabWidth,
              }}
              onClick={() => onTab(tab)}
            >
              {tab.label}
            </div>
          ))
        }
        <motion.div
          className="h-[3px] bg-[#ACACE2] absolute bottom-0 left-0"
          style={{
            width: tabWidth,
          }}
          animate={{
            x: currentTabIndex * 100 + "%",
          }}
        />
      </div>
      <div className={clsx("", bodyClassName)}>
        <AnimatePresence mode="wait">
          {
            tabs.map((tab: Tab) => tab.value === currentTab.value && (
              <motion.div
                key={tab.value}
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
              >
                {tab.content}
              </motion.div>
            ))
          }
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LendingTabs;

export interface Tab {
  label: string;
  value: string;
  content: any;
}
