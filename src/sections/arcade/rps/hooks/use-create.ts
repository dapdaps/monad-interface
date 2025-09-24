import useCustomAccount from "@/hooks/use-account";
import { post } from "@/utils/http";
import { useRequest } from "ahooks";
import { useMemo, useState } from "react";
import { RPS_MIN_BET_AMOUNT, RPS_MOVES_ROUND, RPSMove } from "../config";
import { useBalance } from "wagmi";
import { DEFAULT_CHAIN_ID } from "@/configs";
import { Contract, utils } from "ethers";
import Big from "big.js";
import { useConnectWallet } from "@/hooks/use-connect-wallet";
import useToast from "@/hooks/use-toast";
import { RPS_CONTRACT_ADDRESS, RPS_CONTRACT_ADDRESS_ABI } from "../contract";

export function useCreate(props?: any) {
  const {
    betToken,
    betTokenBalance,
    getBetTokenBalance,
  } = props ?? {};

  const { accountWithAk, account, chainId, provider } = useCustomAccount();
  const { onConnect, onSwitchChain } = useConnectWallet();
  const toast = useToast();

  const [moves, setMoves] = useState<RPSMove[]>([]);
  const [amount, setAmount] = useState<string>();

  const { runAsync: onCreate, loading: creating } = useRequest(async () => {
    if (!account) {
      onConnect();
      return;
    }
    if (chainId !== DEFAULT_CHAIN_ID) {
      onSwitchChain({ chainId: DEFAULT_CHAIN_ID });
      return;
    }
    let toastId = toast.loading({
      title: "Creating...",
    });
    try {
      const res = await post("/game/rps/create", {
        moves,
      });
      if (res.code !== 200) {
        toast.dismiss(toastId);
        toast.fail({
          title: "Create failed",
          text: res.message,
        });
        return;
      }
      const parsedAmount = utils.parseUnits(amount || "0", betToken.decimals);
      const params = [
        parsedAmount,
        res.data.hidden_moves_hash
      ];
      const options: any = {
        value: parsedAmount,
      };
      const signer = provider.getSigner(account);
      const contract = new Contract(RPS_CONTRACT_ADDRESS, RPS_CONTRACT_ADDRESS_ABI, signer);

      try {
        const estimatedGas = await contract.estimateGas.initRoom(...params, options);
        options.gasLimit = Math.floor(Number(estimatedGas) * 1.2);
      } catch (err) {
        options.gasLimit = 10000000;
        console.log("estimate gas failed: %o", err);
      }

      console.log("RPS_CONTRACT_ADDRESS: %o", RPS_CONTRACT_ADDRESS);
      console.log("RPS_CONTRACT_ADDRESS_ABI: %o", RPS_CONTRACT_ADDRESS_ABI);
      console.log("params: %o", params);
      console.log("options: %o", options);
      console.log("contract: %o", contract);

      const tx = await contract.initRoom(...params, options);

      toast.dismiss(toastId);
      toastId = toast.loading({ title: "Confirming...", chainId, tx: tx.hash });
      const { status, transactionHash } = await tx.wait();
      toast.dismiss(toastId);

      if (status !== 1) {
        toast.fail({
          title: "Created failed",
          tx: transactionHash,
          chainId,
        });
        return;
      }

      toast.success({
        title: "Created successful",
        tx: transactionHash,
        chainId,
      });

      // TODO reload list
      getBetTokenBalance();
    } catch (error: any) {
      console.log("create rps failed: %o", error);
      toast.dismiss(toastId);
      toast.fail({
        title: "Create failed",
        text: error?.message?.includes("user rejected transaction") ? "User rejected transaction" : "",
      });
    }
  }, {
    manual: true,
  });

  const onSelectMove = (move: RPSMove, index: number) => {
    const _moves = moves.slice();
    _moves[index] = move;
    setMoves(_moves);
  };

  const buttonValid = useMemo(() => {
    const _result = { disabled: true, text: "start", loading: false };
    if (!account) {
      _result.text = "Connect Wallet";
      _result.disabled = false;
      return _result;
    }
    if (chainId !== DEFAULT_CHAIN_ID) {
      _result.text = "Switch Network";
      _result.disabled = false;
      return _result;
    }
    if (creating) {
      _result.loading = true;
    }
    if (Big(amount || 0).lte(0)) {
      _result.text = "Enter an amount";
      return _result;
    }
    if (Big(amount || 0).gt(Big(betTokenBalance || 0))) {
      _result.text = "Insufficient balance";
      return _result;
    }
    if (Big(amount || 0).lt(RPS_MIN_BET_AMOUNT)) {
      _result.text = `Minimum amount is ${RPS_MIN_BET_AMOUNT}`;
      return _result;
    }
    if (moves.length !== RPS_MOVES_ROUND) {
      _result.text = "Select all moves";
      return _result;
    }
    _result.disabled = false;
    return _result;
  }, [amount, moves, creating, account, chainId, betTokenBalance]);

  return {
    moves,
    setMoves,
    onCreate,
    creating,
    amount,
    setAmount,
    onSelectMove,
    buttonValid,
  };
}
