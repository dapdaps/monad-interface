import { INotification, NotificationType } from "@/context/notification";
import { useEffect, useMemo, useState } from "react";
import useCustomAccount from "./use-account";
import { useRequest } from "ahooks";
import { RPS_CONTRACT_ADDRESS, RPS_CONTRACT_ADDRESS_ABI } from "@/sections/arcade/guess-who/contract";
import { multicall, multicallAddresses } from "@/utils/multicall";
import { DEFAULT_CHAIN_ID } from "@/configs";
import { WinnerStatus } from "@/sections/arcade/guess-who/config";

export function useGuessWho(props?: any) {
  const { queue, update, remove } = props ?? {};

  const { account, provider } = useCustomAccount();
  const [data, setData] = useState({
    open: false,
    room: void 0,
  });

  const [joinedList, winnerList] = useMemo(() => {
    const _joinedList = queue?.filter((item: INotification) => item.type === NotificationType.GuessWho);
    return [
      _joinedList,
      _joinedList?.filter((item: INotification) => item.data.isYourWon),
    ];
  }, [queue]);

  const { } = useRequest(async () => {
    if (!account || !provider) {
      return;
    }
    const calls = joinedList
      ?.filter((item: any) => !item.data.winner_address)
      ?.map((item: any) => ({
        address: RPS_CONTRACT_ADDRESS,
        name: "getRoomsInfo",
        params: [item.data.room_id, item.data.room_id],
      }));
    if (!calls?.length) {
      return;
    }
    const multicallAddress = multicallAddresses[DEFAULT_CHAIN_ID];
    console.log("%cPolling global guess-who contract room info: %o", "background:#6B3F69;color:#fff;", calls);

    try {
      const roomInfos = await multicall({
        abi: RPS_CONTRACT_ADDRESS_ABI,
        options: {},
        calls,
        multicallAddress,
        provider
      });

      roomInfos.forEach((item: any) => {
        const [[roomInfo]] = item;
        const currNotification = joinedList.find((it: any) => it.data.room_id === +roomInfo.data.roomId.toString());
        if (!currNotification) {
          return;
        }
        if (roomInfo.winnerStatus) {
          // winnerStatus = 1: data.playerA won
          // winnerStatus = 2: data.playerB won
          // winnerStatus = 3: data.playerC won
          const winnerMap: any = {
            [WinnerStatus.WinnerPlayerA]: {
              address: roomInfo.data.playerA,
              moves: roomInfo.numberA,
            },
            [WinnerStatus.WinnerPlayerB]: {
              address: roomInfo.data.playerB,
              moves: roomInfo.numberB,
            },
            [WinnerStatus.WinnerPlayerC]: {
              address: roomInfo.data.playerC,
              moves: roomInfo.numberC,
            },
          };
          if (roomInfo.winnerStatus !== WinnerStatus.UnusedRoomClosed) {
            const isYourWon =  winnerMap[roomInfo.winnerStatus as WinnerStatus].address.toLowerCase() === account.toLowerCase();
            console.log("%cPolling global guess-who contract isYourWon: %o", "background:#6B3F69;color:#fff;", isYourWon);
            update({
              id: currNotification.id,
              data: {
                winner_address: winnerMap[roomInfo.winnerStatus as WinnerStatus].address,
                winner_moves: winnerMap[roomInfo.winnerStatus as WinnerStatus].moves,
                isYourWon,
              },
            });
            if (!isYourWon) {
              remove(currNotification.id);
            }
          }
        }
      });
    } catch (error) {
      console.log("polling guess-who global notification contract room info failed: %o", error);
    }
  }, {
    // 10s
    pollingInterval: 10000,
  });

  const onClose = () => {
    setData((prev) => {
      const _data = { ...prev };
      _data.open = false;
      _data.room = void 0;
      return _data;
    });
  };

  useEffect(() => {
    if (data.open || !winnerList?.length || !!data.room) {
      return;
    }
    const nextNotification = winnerList[0];
    remove(nextNotification.id);
    setData((prev) => {
      const _data = { ...prev };
      _data.open = true;
      _data.room = nextNotification.data;
      return _data;
    });
  }, [winnerList, data]);

  return {
    data,
    onClose,
  };
}
