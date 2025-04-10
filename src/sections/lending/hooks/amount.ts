import { useMemo, useState } from 'react';
import useTokenBalance from '@/hooks/use-token-balance';
import { DEFAULT_CHAIN_ID } from '@/configs';
import Big from 'big.js';
import useCustomAccount from '@/hooks/use-account';
import useToast from '@/hooks/use-toast';
import { LendingActionType } from '@/sections/lending/config';
import { calculateTimeSwapCollateral } from '@/sections/lending/utils';
import { numberRemoveEndZero } from '@/utils/number-formatter';

export function useAmount(props: any) {
  const { market, config, onClose, action } = props;

  const token0 = market.tokens?.[0];
  const token1 = market.tokens?.[1];

  const { account, provider } = useCustomAccount();
  const toast = useToast();

  const {
    tokenBalance: token0Balance,
    isError: token0BalanceError,
    isLoading: token0BalanceLoading,
    update: updateToken0Balance,
  } = useTokenBalance(token0?.address, token0?.decimals ?? 0, DEFAULT_CHAIN_ID);
  const {
    tokenBalance: token1Balance,
    isError: token1BalanceError,
    isLoading: token1BalanceLoading,
    update: updateToken1Balance,
  } = useTokenBalance(token1?.address, token1?.decimals ?? 0, DEFAULT_CHAIN_ID);

  const [amount, setAmount] = useState<string>();
  const [pending, setPending] = useState(false);
  const [updater, setUpdater] = useState(0);

  const [balance, balanceLoading, balanceToken] = useMemo(() => {
    if ([LendingActionType.Lend, LendingActionType.Borrow].includes(action.value)) {
      if (action.value === LendingActionType.Borrow) {
        if (config.name === "Timeswap") {
          return [token1Balance, token1BalanceLoading, token1];
        }
      }
      return [token0Balance, token0BalanceLoading, token0];
    }
    if (action.value === LendingActionType.Withdraw) {
      if (config.name === "Timeswap") {
        return [
          market?.balance,
          false,
          {
            address: config?.timeswapV2TokenNft,
            decimals: 18,
          }
        ];
      }
    }
    if (action.value === LendingActionType.Repay) {
      if (config.name === "Timeswap") {
        return [
          numberRemoveEndZero(Big(market.balance || 0).times(market.transitionPrice10 || 1).toFixed(market.tokens[0]?.decimals || 18)),
          false,
          token0
        ];
      }
    }
    return [market?.balance, false, token0];
  }, [
    token0,
    token1,
    token0Balance,
    token1Balance,
    token0BalanceLoading,
    token1BalanceLoading,
    market,
    action
  ]);

  const errorTips = useMemo(() => {
    if ([LendingActionType.Lend, LendingActionType.Borrow].includes(action.value)) {
      if (action.value === LendingActionType.Borrow) {
        if (config.name === "Timeswap") {
          if (token0BalanceLoading || token1BalanceLoading) {
            return "";
          }
          // amount = borrow amount, token1Amount = collateral amount
          const token1Amount = calculateTimeSwapCollateral(amount || "0", market?.poolData?.apr, market?.transitionPrice10, market?.duration);
          if (Big(amount || 0).gt(0) && (Big(amount || 0).gt(token0Balance || 0) || token1Amount.gt(token1Balance || 0))) {
            return "Insufficient balance";
          }
          return "";
        }
      }

      if (token0BalanceLoading) {
        return "";
      }
      if (Big(amount || 0).gt(0) && Big(amount || 0).gt(token0Balance || 0)) {
        return "Insufficient balance";
      }
    }
    if ([LendingActionType.Withdraw, LendingActionType.Repay].includes(action.value)) {
      if (action.value === LendingActionType.Repay) {
        if (config.name === "Timeswap") {
          if (token1BalanceLoading) {
            return "";
          }
          if (Big(amount || 0).gt(0) && Big(amount || 0).gt(Big(market.balance || 0).times(market.transitionPrice10 || 1).toFixed(market.tokens[0]?.decimals || 18))) {
            return "Exceeding total debt";
          }
          if (Big(amount || 0).gt(0) && Big(amount || 0).gt(token0Balance || 0)) {
            return "Insufficient balance";
          }
          return "";
        }
      }
      if (Big(amount || 0).gt(0) && Big(amount || 0).gt(market.balance || 0)) {
        return "Invalid amount";
      }
    }
    return "";
  }, [
    token0,
    token1,
    token0Balance,
    token1Balance,
    token0BalanceLoading,
    token1BalanceLoading,
    market,
    amount
  ]);

  const actionAmount = useMemo(() => {
    if (action.value === LendingActionType.Borrow) {
      if (config.name === "Timeswap") {
        return numberRemoveEndZero(
          calculateTimeSwapCollateral(amount || "0", market?.poolData?.apr, market?.transitionPrice10, market?.duration).toFixed(market?.tokens?.[1]?.decimals || 18, 0)
        );
      }
    }
    if (action.value === LendingActionType.Repay) {
      if (config.name === "Timeswap") {
        return numberRemoveEndZero(Big(amount || 0).div(market.transitionPrice10).toFixed(market?.tokens?.[1]?.decimals || 18, 0));
      }
    }
    return amount;
  }, [amount, market, config, action]);

  const handleAmountChange = (_amount: string) => {
    setAmount(_amount);
  };

  const onSubmit = async (params?: any) => {
    if (pending) return;
    setPending(true);
    let toastId = toast.loading({ title: "Confirming..." });

    const signer = provider.getSigner(account);

    try {
      const tx = await config.onAction({
        ...params,
        action,
        actionAmount,
        amount,
        market,
        config,
        signer,
        account,
      });
      toast.dismiss(toastId);
      if (!tx) {
        setPending(false);
        toast.fail({ title: action?.label + " failed!" });
        return;
      }
      toastId = toast.loading({ title: "Pending..." });
      const { status, transactionHash } = await tx.wait();
      toast.dismiss(toastId);
      // succeed
      if (status === 1) {
        toast.success({
          title: action?.label + " successful!",
          tx: transactionHash,
          chainId: DEFAULT_CHAIN_ID
        });
        onClose({ isReload: true });
      }
      // failed
      else {
        toast.fail({ title: action?.label + " failed!" });
      }
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.fail({
        title: err?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : action?.label + " failed!"
      });
    }

    setPending(false);
  };

  return {
    amount,
    actionAmount,
    errorTips,
    pending,
    updater,
    handleAmountChange,
    onSubmit,
    balance,
    balanceLoading,
    balanceToken,
    token0Balance,
    token1Balance,
  };
}
