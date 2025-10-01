import { useMemo, useState } from "react";
import { Monster, RPS_MIN_BET_AMOUNT, Status } from "../config";
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
    setPlayersAvatar,
    onChange2UserLatest,
    onChange2List,
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
        betMonster[0],
        betMonster[1],
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

      // block crawling
      let isCrawlingRoomEvent = false;
      try {
        const events = txReceipt.logs.map((log: any) => {
          try {
            return contract.interface.parseLog(log);
          } catch (e) {
            return null;
          }
        }).filter(Boolean);

        const roomCreatedEvent = events.find((event: any) => event.name === "RoomCreated");
        const RoomJoinedBEvent = events.find((event: any) => event.name === "RoomJoinedB");
        if (roomCreatedEvent) {
          const roomCreatedData = roomCreatedEvent.args;
          const createdNewRoom = {
            address: roomCreatedData.entrantA,
            bet_amount: utils.formatUnits(roomCreatedData.betAmount, betToken.decimals),
            create_time: +roomCreatedData.createTime.toString(),
            create_tx_hash: transactionHash,
            end_tx_hash: "",
            players: [
              {
                address: roomCreatedData.entrantA,
                moves: +roomCreatedData.numberA.toString(),
                tx_hash: transactionHash,
                tx_time: +roomCreatedData.createTime.toString(),
              },
            ],
            room_id: +roomCreatedData.roomId.toString(),
            status: Status.Ongoing,
            winner_address: "",
            winner_moves: 0,
          };
          // double
          if (RoomJoinedBEvent) {
            const roomJoinedBEventData = RoomJoinedBEvent.args;
            createdNewRoom.players.push({
              address: roomJoinedBEventData.entrant,
              moves: +roomJoinedBEventData.number.toString(),
              tx_hash: transactionHash,
              tx_time: +roomCreatedData.createTime.toString(),
            });
          }
          console.log("%cBlock crawling new room: %o", "background:#3A6F43;color:#fff;", createdNewRoom);
          setPlayersAvatar(createdNewRoom.players);
          onChange2UserLatest("create", createdNewRoom);
          onChange2List("create", createdNewRoom);
          isCrawlingRoomEvent = true;
        }
      } catch (err) {
        console.log("Block crawling new room failed: %o", err);
      }

      // reload list
      setBetMonster([]);
      getBetTokenBalance();
      !isCrawlingRoomEvent && getListDelay();
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
    const _result = { disabled: true, text: "CREATE GAME", loading: false };
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
      _result.text = `Minimum ${RPS_MIN_BET_AMOUNT}`;
      return _result;
    }
    if (betMonster.length < 1) {
      _result.text = "Select a guess";
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
