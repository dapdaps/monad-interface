import clsx from 'clsx';
import LendingActionCard from '@/sections/lending/components/action-card';
import LendingAmountInput from '@/sections/lending/components/amount-input';
import DescriptionTitle from '@/sections/lending/components/description-title';
import { useAmount } from '@/sections/lending/hooks/amount';
import LendingWarning from '@/sections/lending/components/warning';
import { LendingAmountChangeParams, LendingAmountChangeType } from '@/sections/lending/config';
import Big from 'big.js';
import { numberFormatter, numberRemoveEndZero } from '@/utils/number-formatter';
import { calculateTimeSwapBorrow, calculateTimeSwapCollateral } from '@/sections/lending/utils';
import { useMemo } from 'react';

const BorrowForm = (props: any) => {
  const { className, market, config, action, onClose } = props;

  const {
    amount,
    actionAmount,
    errorTips,
    pending,
    updater,
    handleAmountChange,
    onSubmit: onBorrow,
    balance,
    balanceLoading,
    balanceToken,
  } = useAmount({ market, config, onClose, action });

  return (
    <LendingActionCard
      className={clsx("", className)}
      title="Borrow"
      market={market}
      token={balanceToken}
      amount={actionAmount}
      spender={config?.borrowContract}
      errorTips={errorTips}
      loading={pending}
      onClick={() => {
        onBorrow();
      }}
      disabled={pending}
      onRefresh={() => {}}
      updater={`button-${updater}`}
      text="Borrow"
    >
      <LendingAmountInput
        value={amount}
        onChange={(res: LendingAmountChangeParams) => {
          if (res.type === LendingAmountChangeType.Balance) {
            if (config.name === "Timeswap") {
              // res.value = collateral amount, token0Amount = borrow amount
              const token0Amount = numberRemoveEndZero(
                calculateTimeSwapBorrow(res.value, market?.poolData?.apr, market?.transitionPrice10, market?.duration).toFixed(market?.tokens?.[0]?.decimals || 18, 0)
              );
              handleAmountChange(token0Amount);
              return;
            }
          }
          handleAmountChange(res.value);
        }}
        title="Amount to Borrow"
        token={market?.tokens?.[0]}
        balance={balance}
        balanceLoading={balanceLoading}
        balanceToken={balanceToken}
      />
      {
        config.name === "Timeswap" && (
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
                  <div className="text-[#FFF]">
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
                  <div className="text-[#FFF]">
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
        )
      }
    </LendingActionCard>
  );
};

export default BorrowForm;
