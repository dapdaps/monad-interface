import clsx from 'clsx';
import LendingActionCard from '@/sections/lending/components/action-card';
import LendingAmountInput from '@/sections/lending/components/amount-input';
import { useAmount } from '@/sections/lending/hooks/amount';
import { LendingAmountChangeParams } from '@/sections/lending/config';
import LendingLend from '@/sections/lending/lend';

const LendForm = (props: any) => {
  const { className, market, config, action, onClose } = props;

  const data = useAmount({ market, config, onClose, action });
  const {
    amount,
    actionAmount,
    errorTips,
    pending,
    updater,
    handleAmountChange,
    onSubmit: onLend,
    balance,
    balanceLoading,
    balanceToken,
  } = data;

  const LendContent = LendingLend[config.pathName];

  return (
    <LendingActionCard
      className={clsx("", className)}
      title="Lend"
      market={market}
      token={balanceToken}
      amount={actionAmount}
      spender={config?.lendContract}
      errorTips={errorTips}
      loading={pending}
      onClick={() => {
        onLend();
      }}
      disabled={pending || market?.disabledLend}
      onRefresh={() => {}}
      updater={`button-${updater}`}
      text="Lend"
    >
      <LendingAmountInput
        value={amount}
        onChange={(res: LendingAmountChangeParams) => {
          handleAmountChange(res.value);
        }}
        title="Amount to Lend"
        token={market?.tokens?.[0]}
        balance={balance}
        balanceLoading={balanceLoading}
        balanceToken={balanceToken}
      />
      <LendContent {...props} {...data} />
    </LendingActionCard>
  );
};

export default LendForm;
