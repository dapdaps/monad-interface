import useCustomAccount from "@/hooks/use-account";
import useAddAction from "@/hooks/use-add-action";
import useApprove from "@/hooks/use-approve";
import useToast from "@/hooks/use-toast";
import useTokenBalance from "@/hooks/use-token-balance";
import { useRequest } from "ahooks";
import Big from "big.js";
import { Contract, utils } from "ethers";
import { useEffect, useMemo, useState } from "react";

export function useStake(props: any) {
  const { dapp } = props;

  const { account, provider, chainId } = useCustomAccount();
  const toast = useToast();
  const { addAction } = useAddAction("dapp");

  //#region tabs
  const [currentTab, setCurrentTab] = useState<any>({
    label: "Stake",
    value: "stake",
  });
  const onCurrentTab = (_currentTab: any) => {
    if (_currentTab.value === currentTab?.value) return;
    setCurrentTab(_currentTab);
    setInputToken(_currentTab.value === "stake" ? dapp.inputToken : dapp.outputToken);
    setOutputToken(_currentTab.value === "stake" ? dapp.outputToken : dapp.inputToken);
    setInputAmount("");
    setOutputAmount("");
  };
  //#endregion

  //#region stake
  const [inputAmount, setInputAmount] = useState<string>("");
  const [outputAmount, setOutputAmount] = useState<string>("");
  const [inputToken, setInputToken] = useState<any>(dapp.inputToken);
  const [outputToken, setOutputToken] = useState<any>(dapp.outputToken);

  const {
    approved,
    approve,
    approving,
    checking,
    allowance,
    checkApproved
  } = useApprove({
    token: inputToken,
    amount: inputAmount,
    spender: dapp.spender,
  });

  const {
    tokenBalance: inputTokenBalance,
    isLoading: inputTokenBalanceLoading,
    update: getInputTokenBalance,
  } = useTokenBalance(inputToken?.address, inputToken?.decimals, chainId);

  const {
    tokenBalance: outputTokenBalance,
    isLoading: outputTokenBalanceLoading,
    update: getOutputTokenBalance,
  } = useTokenBalance(outputToken?.address, outputToken?.decimals, chainId);

  const afterSuccess = () => {
    getInputTokenBalance();
    getOutputTokenBalance();
    setInputAmount("");
  };

  const { runAsync: onStake, loading: stakePending } = useRequest(async (params?: {}) => {
    const { } = params ?? {};
    const isWithdraw = currentTab?.value === "withdraw";
    const currentAction = isWithdraw ? "Unstake" : "Stake";
    if (!account || !provider) return;

    if (!approved) {
      approve();
      return;
    }

    let toastId = toast.loading({ title: isWithdraw ? "Unstaking..." : "Staking..." });
    const signer = provider.getSigner(account);
    const contract = new Contract(dapp.contractAddress, dapp.ABI, signer);

    const contractMethod = dapp.contractMethod?.({ tab: currentTab?.value });
    const contractParams: any = dapp.contractParams?.({
      tab: currentTab?.value,
      inputAmount,
      inputToken,
      outputAmount,
      outputToken,
    });
    const contractOptions: any = {
      gasLimit: 4000000,
    };

    if (inputToken.isNative) {
      contractOptions.value = utils.parseUnits(inputAmount, inputToken.decimals);
    }

    // estimate gas
    try {
      contractOptions.gasLimit = await contract.estimateGas[contractMethod](...contractParams);
    } catch (error: any) {
      console.error("get estimate gas error: %o", error);
    }

    // send transaction
    try {
      const tx = await contract[contractMethod](...contractParams, contractOptions);
      toast.dismiss(toastId);
      toastId = toast.loading({ title: "Confirming...", chainId, tx: tx.hash });
      const { status, transactionHash } = await tx.wait();
      toast.dismiss(toastId);
      if (status === 1) {
        toast.success({
          title: `${currentAction} successful!`,
          tx: transactionHash,
          chainId
        });
        addAction({
          type: dapp.type,
          template: dapp.name,
          action: currentTab?.value,
          sub_type: currentTab?.value,
          token: inputToken,
          amount: inputAmount,
          add: false,
          status,
          transactionHash,
          tokens: [inputToken],
        });
        // Succeed
        afterSuccess();
      } else {
        toast.fail({
          title: `${currentAction} failed!`,
          tx: transactionHash,
          chainId
        });
      }
    } catch (error: any) {
      console.error("send transaction error: %o", error);
      toast.dismiss(toastId);
      toast.fail({
        title: `${currentAction} failed!`,
        text: error?.message?.includes("user rejected transaction") && "User rejected transaction"
      });
    }
  }, { manual: true });

  const buttonValid = useMemo(() => {
    const _result: any = { text: "Stake", loading: false, valid: true };

    if (currentTab?.value === "withdraw") {
      _result.text = "Withdraw";
    }

    if (approving || checking || stakePending || inputTokenBalanceLoading || outputTokenBalanceLoading) {
      _result.loading = true;
    }

    if (Big(inputAmount || 0).lte(0)) {
      _result.valid = false;
      _result.text = "Enter an amount";
      return _result;
    }

    if (Big(inputAmount || 0).gt(Big(inputTokenBalance || 0))) {
      _result.valid = false;
      _result.text = "Insufficient balance";
      return _result;
    }

    if (inputToken.isNative && Big(inputAmount || 0).gte(Big(inputTokenBalance || 0))) {
      _result.valid = false;
      _result.text = "Insufficient gas";
      return _result;
    }

    if (!approved) {
      _result.text = "Approve";
      return _result;
    }

    return _result;
  }, [
    approving,
    checking,
    approved,
    currentTab,
    stakePending,
    inputAmount,
    inputTokenBalance,
    inputToken,
    inputTokenBalanceLoading,
    outputTokenBalanceLoading,
  ]);

  useEffect(() => {
    setOutputAmount(inputAmount);
  }, [inputAmount]);
  //#endregion

  return {
    dapp,
    currentTab,
    onCurrentTab,

    inputAmount,
    setInputAmount,
    outputAmount,
    setOutputAmount,
    inputToken,
    setInputToken,
    outputToken,
    setOutputToken,
    buttonValid,
    onStake,
    inputTokenBalance,
    inputTokenBalanceLoading,
    outputTokenBalance,
    outputTokenBalanceLoading,
  };
}
