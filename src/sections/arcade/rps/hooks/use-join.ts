import { DEFAULT_CHAIN_ID } from "@/configs";
import useCustomAccount from "@/hooks/use-account";
import { useConnectWallet } from "@/hooks/use-connect-wallet";
import useToast from "@/hooks/use-toast";
import { post } from "@/utils/http";
import { useRequest } from "ahooks";
import { Room, RPS_MOVES_ROUND, RPSMove } from "../config";
import { useMemo, useState } from "react";
import { Contract, utils } from "ethers";
import { RPS_CONTRACT_ADDRESS, RPS_CONTRACT_ADDRESS_ABI } from "../contract";
import Big from "big.js";

export function useJoin(props?: any) {
  const {
    betToken,
    betTokenBalance,
    getBetTokenBalance,
    onRoomLoading,
  } = props ?? {};

  const { accountWithAk, account, chainId, provider } = useCustomAccount();
  const { onConnect, onSwitchChain } = useConnectWallet();
  const toast = useToast();

  const [moves, setMoves] = useState<RPSMove[]>([]);
  const [room, setRoom] = useState<Room>();
  const [open, setOpen] = useState<boolean>(false);

  const { runAsync: onJoin, loading: joining } = useRequest(async () => {
    if (!account) {
      onConnect();
      return;
    }
    if (chainId !== DEFAULT_CHAIN_ID) {
      onSwitchChain({ chainId: DEFAULT_CHAIN_ID });
      return;
    }
    let toastId = toast.loading({
      title: "Confirming...",
    });
    try {
      const res = await post("/game/rps/join", {
        moves,
        room_id: room?.room_id,
      });
      if (res.code !== 200) {
        toast.dismiss(toastId);
        toast.fail({
          title: "Battle failed",
          text: res.message,
        });
        return;
      }
      const parsedAmount = utils.parseUnits(room?.bet_amount?.toString() || "0", betToken.decimals);
      const params = [
        room?.room_id,
        res.data.hidden_moves_hash
      ];
      const options: any = {
        value: parsedAmount,
      };
      const signer = provider.getSigner(account);
      const contract = new Contract(RPS_CONTRACT_ADDRESS, RPS_CONTRACT_ADDRESS_ABI, signer);

      try {
        const estimatedGas = await contract.estimateGas.joinRoom(...params, options);
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

      const tx = await contract.joinRoom(...params, options);

      toast.dismiss(toastId);
      toastId = toast.loading({ title: "Confirming...", chainId, tx: tx.hash });
      const { status, transactionHash } = await tx.wait();
      toast.dismiss(toastId);

      if (status !== 1) {
        toast.fail({
          title: "Battle failed",
          tx: transactionHash,
          chainId,
        });
        return;
      }

      toast.success({
        title: "Join successful",
        text: "Please wait for the game is confirming...",
        tx: transactionHash,
        chainId,
      });

      // reload list
      getBetTokenBalance();
      onClose();
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

  const { runAsync: onJoinCheck, loading: checking } = useRequest(async (_room: Room) => {
    setRoom(void 0);
    onRoomLoading(_room.room_id, true);

    // check your own game
    if (account.toLowerCase() === _room.address.toLowerCase()) {
      toast.fail({
        title: "Join failed",
        text: "You can't join your own game",
      });
      onRoomLoading(_room.room_id, false);
      return;
    }

    // check your balance
    const betBalance = await getBetTokenBalance();
    if (Big(betBalance || 0).lt(Big(_room.bet_amount || 0))) {
      toast.fail({
        title: "Join failed",
        text: "Insufficient balance",
      });
      onRoomLoading(_room.room_id, false);
      return;
    }

    // check room status
    const contract = new Contract(RPS_CONTRACT_ADDRESS, RPS_CONTRACT_ADDRESS_ABI, provider);
    try {
      const res = await contract.getRoomsInfo(_room.room_id, _room.room_id);
      const roomInfo = res[0];
      // console.log("roomInfo: %o", roomInfo);
      // console.log("roomInfo.status: %o", roomInfo.status);
      // console.log("roomInfo.data: %o", roomInfo.data);
      // console.log("roomInfo.data.playerB: %o", roomInfo.data.playerB);
      // RoomStatus.Open = 1
      if (roomInfo.status !== 1 || roomInfo.data.playerB !== "0x0000000000000000000000000000000000000000") {
        toast.fail({
          title: "Join failed",
          text: "This room has ended, please refresh the list and try again.",
        });
        onRoomLoading(_room.room_id, false);
        return;
      }
    } catch (error) {
      console.log("join check failed: %o", error);
      toast.fail({
        title: "Join failed",
        text: "This room has ended, please refresh the list and try again.",
      });
      onRoomLoading(_room.room_id, false);
      return;
    }

    // room is ongoing
    setRoom(_room);
    setOpen(true);
    onRoomLoading(_room.room_id, false);
  }, { manual: true });

  const onClose = () => {
    setOpen(false);
    setRoom(void 0);
    setMoves([]);
  };

  const onSelectMove = (move: RPSMove, index: number) => {
    const _moves = moves.slice();
    _moves[index] = move;
    setMoves(_moves);
  };

  const buttonValid = useMemo(() => {
    const _result = { disabled: true, text: "join", loading: false };
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
    if (joining) {
      _result.loading = true;
    }
    if (Big(room?.bet_amount || 0).gt(Big(betTokenBalance || 0))) {
      _result.text = "Insufficient balance";
      return _result;
    }
    if (moves.length !== RPS_MOVES_ROUND) {
      _result.text = "Select all moves";
      return _result;
    }
    _result.disabled = false;
    return _result;
  }, [room, moves, joining, account, chainId, betTokenBalance]);

  return {
    onJoin,
    joining,
    room,
    moves,
    onJoinCheck,
    checking,
    open,
    onClose,
    onSelectMove,
    buttonValid,
  };
};
