import clsx from 'clsx';
import LendingActionCard from '@/sections/lending/components/action-card';
import LendingAmountInput from '@/sections/lending/components/amount-input';
import { useAmount } from '@/sections/lending/hooks/amount';
import { LendingAmountChangeParams, LendingAmountChangeType } from '@/sections/lending/config';
import { numberRemoveEndZero } from '@/utils/number-formatter';
import { calculateTimeSwapBorrow } from '@/sections/lending/utils';
import LendingBorrow from '@/sections/lending/borrow';

const BorrowForm = (props: any) => {
  const { className, market, config, action, onClose } = props;

  const data = useAmount({ market, config, onClose, action });
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
  } = data;

  const BorrowContent = LendingBorrow[config.pathName];

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
      onClose={onClose}
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
      <BorrowContent {...props} {...data} />
    </LendingActionCard>
  );
};

export default BorrowForm;
