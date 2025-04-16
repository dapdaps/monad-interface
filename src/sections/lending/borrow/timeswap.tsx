import DescriptionTitle from '@/sections/lending/components/description-title';
import { numberFormatter } from '@/utils/number-formatter';
import LendingWarning from '@/sections/lending/components/warning';
import { calculateTimeSwapCollateral } from '@/sections/lending/utils';

const TimeSwap = (props: any) => {
  const {
    market,
    config,
    action,
    onClose,
    amount,
    actionAmount,
    errorTips,
    pending,
    updater,
    handleAmountChange,
    onSubmit: onWithdraw,
    balance,
    balanceLoading,
    balanceToken,
  } = props;

  return (
    <>
      <div className="mt-[26px]">
        <div className="flex justify-between items-center">
          <DescriptionTitle
            descriptionClassName="w-[318px]"
            description="The amount of debt you have to repay at maturity"
          >
            Debt to Repay
          </DescriptionTitle>
          <div className="flex justify-end items-center gap-[4px] text-[#A6A6DB] font-Unbounded text-[12px] font-normal leading-normal">
            <div
              className="text-[#FFF]"
              title={(
                numberFormatter(amount, market?.tokens?.[0]?.decimals, true, { round: 0 })
              )}
            >
              {numberFormatter(amount, 4, true, { round: 0 })}
            </div>
            <div className="">
              {market?.tokens?.[0]?.symbol}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-[16px]">
          <DescriptionTitle
            descriptionClassName="w-[318px]"
            description="The amount of shMON collateral to be deposited, and the amount withdrawn when the debt is paid."
          >
            Collateral to Lock
          </DescriptionTitle>
          <div className="flex justify-end items-center gap-[4px] text-[#A6A6DB] font-Unbounded text-[12px] font-normal leading-normal">
            <div
              className="text-[#FFF]"
              title={(
                numberFormatter(
                  calculateTimeSwapCollateral(amount || "0", market?.poolData?.apr, market?.transitionPrice10, market?.duration),
                  market?.tokens?.[1]?.decimals,
                  true,
                  { round: 0 }
                )
              )}
            >
              {numberFormatter(
                calculateTimeSwapCollateral(amount || "0", market?.poolData?.apr, market?.transitionPrice10, market?.duration),
                4,
                true,
                { round: 0 }
              )}
            </div>
            <div className="">
              {market?.tokens?.[1]?.symbol}
            </div>
          </div>
        </div>
      </div>
      <LendingWarning className="mt-[15px]">
        You have to repay the above debt <strong>before maturity</strong>, else you forfeit the collateral deposited.
      </LendingWarning>
    </>
  );
};

export default TimeSwap;
