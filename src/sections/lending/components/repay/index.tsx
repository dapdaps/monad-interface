import clsx from 'clsx';
import LendingActionCard from '@/sections/lending/components/action-card';
import LendingAmountInput from '@/sections/lending/components/amount-input';
import { useAmount } from '@/sections/lending/hooks/amount';
import { LENDING_ACTION_TYPE_MAP, LendingAmountChangeParams } from '@/sections/lending/config';
import { useEffect } from 'react';
import LendingRepay from '@/sections/lending/repay';

const RepayForm = (props: any) => {
  const { className, market, config, action, onClose } = props;

  const data = useAmount({ market, config, onClose, action });
  const {
    amount,
    errorTips,
    pending,
    updater,
    handleAmountChange,
    onSubmit: onWithdraw,
    balance,
    balanceLoading,
    balanceToken,
  } = data;

  const actionText = LENDING_ACTION_TYPE_MAP.repay.label;

  const RepayContent = LendingRepay[config.pathName];

  useEffect(() => {
    handleAmountChange(balance);
  }, [balance]);

  return (
    <LendingActionCard
      className={clsx("", className)}
      title={actionText}
      market={market}
      token={balanceToken}
      amount={amount}
      spender={config?.repayContract}
      errorTips={errorTips}
      loading={pending}
      onClick={() => {
        onWithdraw();
      }}
      disabled={pending}
      onRefresh={() => {}}
      updater={`button-${updater}`}
      text={actionText}
      onClose={onClose}
    >
      <LendingAmountInput
        value={amount}
        onChange={(res: LendingAmountChangeParams) => {
          handleAmountChange(res.value);
        }}
        title="Debt to Clear"
        token={market?.tokens?.[0]}
        balance={balance}
        balanceLoading={balanceLoading}
        balanceToken={balanceToken}
      />
      <RepayContent {...props} {...data} />
    </LendingActionCard>
  );
};

export default RepayForm;
