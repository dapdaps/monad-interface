import DAppCard from '@/components/card/dapp-card';
import LendModal from '@/sections/lending/components/lend/modal';
import LendingContextProvider from '@/sections/lending/context';
import { useLending } from '@/sections/lending/hooks';
import { LendingActionType } from '@/sections/lending/config';
import BorrowModal from '@/sections/lending/components/borrow/modal';
import WithdrawModal from '@/sections/lending/components/withdraw/modal';
import RepayModal from '@/sections/lending/components/repay/modal';
import useIsMobile from '@/hooks/use-isMobile';
import NormalTabs from '@/components/tab';

const TAB_WIDTH = 260;

const LendingView = (props: any) => {
  const lending = useLending(props);
  const isMobile = useIsMobile();

  return (
    <LendingContextProvider value={lending}>
      <div className="w-full">
        <DAppCard
          icon={(
            <img
              src={isMobile ? "/images/lending/dapps/timeswap-mobile.svg" : "/images/lending/dapps/timeswap.svg"}
              alt=""
              className="w-[129px] h-[26px] object-center object-contain"
            />
          )}
          config={lending.config}
          className="w-[920px] mx-auto mt-[78px]"
          contentClassName="py-[14px]"
          iconClassName="w-[235px] mx-auto"
          mobileClassName="min-h-[calc(100dvh_-_40px)] pb-[40px]"
        >
          <NormalTabs
            tabs={Object.values(lending.TABS)}
            tabWidth={TAB_WIDTH}
            onTab={lending.toggleCurrentTab}
            currentTab={lending.currentTab}
            bodyClassName="overflow-hidden"
          />
        </DAppCard>
        <LendModal
          visible={lending.actionVisible && lending.currentAction?.value === LendingActionType.Lend}
          onClose={(params?: { isReload?: boolean; }) => {
            lending.handleCurrentAction({ visible: false });
            if (params?.isReload) {
              lending.getMarkets();
              lending.getUserData();
            }
          }}
          market={lending.currentMarket}
          config={lending.config}
          action={lending.currentAction}
        />
        <BorrowModal
          visible={lending.actionVisible && lending.currentAction?.value === LendingActionType.Borrow}
          onClose={(params?: { isReload?: boolean; }) => {
            lending.handleCurrentAction({ visible: false });
            if (params?.isReload) {
              lending.getMarkets();
              lending.getUserData();
            }
          }}
          market={lending.currentMarket}
          config={lending.config}
          action={lending.currentAction}
        />
        <WithdrawModal
          visible={lending.actionVisible && lending.currentAction?.value === LendingActionType.Withdraw}
          onClose={(params?: { isReload?: boolean; }) => {
            lending.handleCurrentAction({ visible: false });
            if (params?.isReload) {
              lending.getMarkets();
              lending.getUserData();
            }
          }}
          market={lending.currentYoursMarket}
          config={lending.config}
          action={lending.currentAction}
        />
        <RepayModal
          visible={lending.actionVisible && lending.currentAction?.value === LendingActionType.Repay}
          onClose={(params?: { isReload?: boolean; }) => {
            lending.handleCurrentAction({ visible: false });
            if (params?.isReload) {
              lending.getMarkets();
              lending.getUserData();
            }
          }}
          market={lending.currentYoursMarket}
          config={lending.config}
          action={lending.currentAction}
        />
      </div>
    </LendingContextProvider>
  );
};

export default LendingView;
