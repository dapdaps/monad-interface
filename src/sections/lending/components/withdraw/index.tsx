import clsx from 'clsx';
import LendingActionCard from '@/sections/lending/components/action-card';
import LendingAmountInput from '@/sections/lending/components/amount-input';
import { useAmount } from '@/sections/lending/hooks/amount';
import { LENDING_ACTION_TYPE_MAP, LendingAmountChangeParams } from '@/sections/lending/config';
import { useEffect } from 'react';
import LendingWithdraw from '@/sections/lending/withdraw';

const WithdrawForm = (props: any) => {
  const { className, market, config, action, onClose } = props;

  const data = useAmount({ market, config, onClose, action });
  const {
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
  } = data;

  const isTimeSwap = config.name === "Timeswap";

  const actionTitle = isTimeSwap ? LENDING_ACTION_TYPE_MAP.withdraw.labelAlias : LENDING_ACTION_TYPE_MAP.withdraw.label;
  const actionText = isTimeSwap ? LENDING_ACTION_TYPE_MAP.claim.label : LENDING_ACTION_TYPE_MAP.withdraw.label;

  const WithdrawContent = LendingWithdraw[config.pathName];

  useEffect(() => {
    handleAmountChange(market.balance);
  }, [market.balance]);

  return (
    <LendingActionCard
      className={clsx("", className)}
      title={actionTitle}
      market={market}
      token={balanceToken}
      amount={actionAmount}
      spender={config?.withdrawContract}
      isSkip={isTimeSwap}
      errorTips={errorTips}
      loading={pending}
      onClick={() => {
        onWithdraw();
      }}
      disabled={pending}
      onRefresh={() => {}}
      updater={`button-${updater}`}
      text={actionText}
    >
      <LendingAmountInput
        disabled={true}
        isBalance={false}
        value={amount}
        onChange={(res: LendingAmountChangeParams) => {
          handleAmountChange(res.value);
        }}
        title="Total Amount Lent"
        token={market?.tokens?.[0]}
        balance={balance}
        balanceLoading={balanceLoading}
        balanceToken={balanceToken}
      />
      <WithdrawContent {...props} {...data} />
    </LendingActionCard>
  );
};

export default WithdrawForm;
