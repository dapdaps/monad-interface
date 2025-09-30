import { useMemo, useState } from "react";
import { Monster, RPS_MIN_BET_AMOUNT } from "../config";
import useCustomAccount from "@/hooks/use-account";
import { useConnectWallet } from "@/hooks/use-connect-wallet";
import useToast from "@/hooks/use-toast";
import { useRequest } from "ahooks";
import { DEFAULT_CHAIN_ID } from "@/configs";
import { Contract, utils } from "ethers";
import { RPS_CONTRACT_ADDRESS, RPS_CONTRACT_ADDRESS_ABI } from "../contract";
import Big from "big.js";

export function useCreate(props?: any) {
  const {
    betToken,
    betTokenBalance,
    getBetTokenBalance,
    getList,
    getListDelay,
  } = props ?? {};

  const { accountWithAk, account, chainId, provider } = useCustomAccount();
  const { onConnect, onSwitchChain } = useConnectWallet();
  const toast = useToast();

  const [betMonster, setBetMonster] = useState<Monster[]>([]);
  const [betAmount, setBetAmount] = useState<string>();

  const onSelectMonster = (monster: Monster) => {
    setBetMonster((prev) => {
      const _betMonster = [...prev];
      if (_betMonster.includes(monster)) {
        _betMonster.splice(_betMonster.indexOf(monster), 1);
      } else {
        _betMonster.push(monster);
        if (_betMonster.length > 2) {
          _betMonster.shift();
        }
      }
      return _betMonster;
    });
  };

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

    const isDouble = betMonster.length > 1;
    const parsedAmount = utils.parseUnits(Big(betAmount || "0").times(isDouble ? 2 : 1).toFixed(betToken.decimals), betToken.decimals);
    const signer = provider.getSigner(account);

    const contract = new Contract(RPS_CONTRACT_ADDRESS, RPS_CONTRACT_ADDRESS_ABI, signer);
    const options: any = {
      value: parsedAmount,
    };

    let params = [
      parsedAmount,
      betMonster[0],
    ];
    if (isDouble) {
      params = [
        utils.parseUnits(betAmount || "0", betToken.decimals),
        betMonster[0] < betMonster[1] ? betMonster[0] : betMonster[1],
        betMonster[1] < betMonster[0] ? betMonster[0] : betMonster[1],
      ];
    }

    let method = "initRoom";
    if (isDouble) {
      method = "initAndJoinRoom";
    }

    try {
      const estimatedGas = await contract.estimateGas[method](...params, options);
      options.gasLimit = Math.floor(Number(estimatedGas) * 1.2);
    } catch (err) {
      options.gasLimit = 10000000;
      console.log("estimate gas failed: %o", err);
    }

    try {
      const tx = await contract[method](...params, options);

      toast.dismiss(toastId);
      toastId = toast.loading({ title: "Confirming...", chainId, tx: tx.hash });
      const txReceipt = await tx.wait();
      const { status, transactionHash } = txReceipt;
      toast.dismiss(toastId);

      const events = txReceipt.logs.map((log: any) => {
        try {
          return contract.interface.parseLog(log);
        } catch (e) {
          return null;
        }
      }).filter(Boolean);

      const roomCreatedEvent = events.find((event: any) => event.name === "RoomCreated");
      if (roomCreatedEvent) {
        const { roomId, entrantA, betAmount, numberA, createTime } = roomCreatedEvent.args;
        console.log("created room_id: %o", roomId.toString());
        console.log("created playerA: %o", entrantA);
        console.log("created betAmount: %o", betAmount);
        console.log("created numberA: %o", numberA);
        console.log("created createTime: %o", createTime);
      }

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

      // reload list
      setBetMonster([]);
      getBetTokenBalance();
      getListDelay();
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

  const buttonValid = useMemo(() => {
    const _result = { disabled: true, text: "", loading: false };
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
    if (Big(betAmount || 0).lte(0)) {
      _result.text = "Enter an amount";
      return _result;
    }
    if (Big(betAmount || 0).gt(Big(betTokenBalance || 0))) {
      _result.text = "Insufficient balance";
      return _result;
    }
    if (Big(betAmount || 0).lt(RPS_MIN_BET_AMOUNT)) {
      _result.text = `Minimum amount is ${RPS_MIN_BET_AMOUNT}`;
      return _result;
    }
    if (betMonster.length < 1) {
      _result.text = "Select your monster";
      return _result;
    }
    _result.disabled = false;
    return _result;
  }, [betAmount, betMonster, creating, account, chainId, betTokenBalance]);

  return {
    betMonster,
    onSelectMonster,
    setBetAmount,
    betAmount,
    onCreate,
    creating,
    buttonValid,
  };
}
