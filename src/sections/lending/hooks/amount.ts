import { useState } from 'react';

export function useAmount() {
  const [amount, setAmount] = useState<string>();
  const [errorTips, setErrorTips] = useState("");
  const [pending, setPending] = useState(false);
  const [updater, setUpdater] = useState(0);

  const handleAmountChange = (_amount: string) => {
    setAmount(_amount);
  };

  const onSubmit = () => {};

  return {
    amount,
    errorTips,
    pending,
    updater,
    handleAmountChange,
    onSubmit,
  };
}
