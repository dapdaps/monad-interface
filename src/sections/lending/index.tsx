import DAppCard from '@/components/card/dapp-card';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import LendingTabs, { Tab } from '@/sections/lending/components/tabs';
import LendingMarket from '@/sections/lending/components/market';
import LendingYours from '@/sections/lending/components/yours';
import { DEFAULT_CHAIN_ID } from '@/configs';
import LendModal from '@/sections/lending/components/lend/modal';
import LendingContextProvider from '@/sections/lending/context';
import { useLending } from '@/sections/lending/hooks';
import { LendingActionType } from '@/sections/lending/config';

const TAB_WIDTH = 260;

const LendingView = (props: any) => {
  const lending = useLending(props);

  return (
    <LendingContextProvider value={lending}>
      <div className="">
        <DAppCard
          icon={(
            <img
              src="/images/lending/dapps/timeswap.svg"
              alt=""
              className="w-[129px] h-[26px] object-center object-contain"
            />
          )}
          className="w-[920px] mx-auto mt-[78px]"
          contentClassName="py-[14px]"
          iconClassName="w-[235px] mx-auto"
        >
          <LendingTabs
            tabs={Object.values(lending.TABS)}
            tabWidth={TAB_WIDTH}
            onTab={lending.toggleCurrentTab}
            currentTab={lending.currentTab}
            bodyClassName="overflow-hidden"
          />
        </DAppCard>
        <LendModal
          visible={lending.actionVisible && lending.currentAction?.value === LendingActionType.Lend}
          onClose={lending.handleCurrentAction}
          market={lending.currentMarket}
        />
      </div>
    </LendingContextProvider>
  );
};

export default LendingView;
