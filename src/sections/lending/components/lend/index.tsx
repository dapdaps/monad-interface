import clsx from 'clsx';
import LendingActionCard from '@/sections/lending/components/action-card';
import { useState } from 'react';

const LendForm = (props: any) => {
  const { className, market } = props;

  const [amount, setAmount] = useState();
  const [errorTips, setErrorTips] = useState("");
  const [pending, setPending] = useState(false);
  const [updater, setUpdater] = useState(0);

  const onLend = () => {};

  return (
    <LendingActionCard
      className={clsx("", className)}
      amount={amount}
      spender={market?.lendContract}
      errorTips={errorTips}
      token={market?.tokens?.[0]}
      loading={pending}
      onClick={onLend}
      disabled={pending}
      onRefresh={() => {}}
      updater={`button-${updater}`}
    >
      123
    </LendingActionCard>
  );
};

export default LendForm;
