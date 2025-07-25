import DAppCard from "@/components/card/dapp-card";
import NormalTabs from "@/components/tab";
import { useStakeContext } from "../../context";
import useIsMobile from "@/hooks/use-isMobile";
import clsx from "clsx";

const StakeCommon = (props: any) => {
  const {
    tabs,
    tabWidth,
    onTab,
    currentTab,
    className,
    iconClassName,
    iconImgClassName,
    mobileClassName,
    tabsClassName,
    tabsHeaderClassName,
    tabsBodyClassName,
  } = props;

  const { dapp } = useStakeContext();
  const isMobile = useIsMobile();

  return (
    <DAppCard
      icon={(
        <div className="flex items-center justify-center gap-[5px]">
          <img
            src={dapp.icon}
            alt=""
            className={clsx("w-[26px] h-[26px] object-center object-contain shrink-0", iconImgClassName)}
          />
          <div className="text-[18px] font-[600] text-black leading-[100%] font-Unbounded">
            {dapp.name}
          </div>
        </div>
      )}
      config={dapp}
      className={clsx("w-[520px] mx-auto mt-[78px]", className)}
      contentClassName="py-[14px]"
      iconClassName={clsx("w-[235px] mx-auto", iconClassName)}
      mobileClassName={clsx("min-h-[calc(100dvh_-_40px)] pb-[40px]", mobileClassName)}
    >
      <NormalTabs
        tabs={tabs}
        tabWidth={tabWidth}
        onTab={onTab}
        currentTab={currentTab}
        className={clsx("", tabsClassName)}
        headerClassName={clsx("", tabsHeaderClassName)}
        bodyClassName={clsx("overflow-hidden", tabsBodyClassName)}
      />
    </DAppCard>
  );
};

export default StakeCommon;
