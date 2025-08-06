import useToast from "@/hooks/use-toast";
import { usePrivy } from "@privy-io/react-auth";
import { useRequest, useDebounceFn } from "ahooks";
import { cloneDeep } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";
import { get, post } from '@/utils/http';
import { EndGameRes, GAME_CONTRACT_ADDRESS, LastGame, LastGameStatus, Layer, LayerRow, LayerStatus, NFTItem, OpenTileRes, StartGameRes } from "../config";
import Big from "big.js";
import { requestContract } from "../utils";
import { GAME_ABI } from "../abi";
import { getSignature } from "@/utils/signature";
import { usePrivyAccount } from "./use-account";
import { Contract, utils } from "ethers";
import { useBlockNumber } from "wagmi";

export function useSpaceInvaders(props?: any): SpaceInvaders {
  const { } = props ?? {};

  const toast = useToast();
  const { user } = usePrivy();
  const { accountWithAk, provider, account } = usePrivyAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const containerRef = useRef<any>(null);
  const unLockedLayerRef = useRef<any>(null);
  const lastBalanceUpdateRef = useRef<number>(0);

  // current playing game
  const [currentGame, setCurrentGame] = useState<Layer>();
  // use for dynamic data
  const [data, setData] = useState<LayerRow[]>([]);
  // play amount
  const [amount, setAmount] = useState("0.1");
  // backend game data
  const [currentGameData, setCurrentGameData] = useState<Partial<StartGameRes>>();
  // game started
  const [gameStarted, setGameStarted] = useState<any>(false);
  // verifier modal
  const [verifierVisible, setVerifierVisible] = useState<any>(false);
  const [verifierData, setVerifierData] = useState<{ rows?: LayerRow[]; seed?: string; seed_hash?: string; }>();
  // when game failed, popup failed ghost
  const [failedGhostVisible, setFailedGhostVisible] = useState<any>(false);
  const [failedGhostPosition, setFailedGhostPosition] = useState<any>([0, 0]);
  const [recordsVisible, setRecordsVisible] = useState<any>(false);

  const [gameLost, gameWon, currentLayer, currentWinLayer] = useMemo<[boolean, boolean, LayerRow | undefined, LayerRow | undefined]>(() => {
    return [
      data?.some((_it: any) => _it.status === LayerStatus.Failed),
      data?.some((_it: any) => _it.status === LayerStatus.Succeed),
      data?.find((_it: any) => _it.status === LayerStatus.Unlocked),
      data?.filter((_it: any) => _it.status === LayerStatus.Succeed)
        ?.sort((a, b) => Big(b.multiplier).minus(a.multiplier).toNumber())
      ?.[0],
    ];
  }, [data]);

  const onReset = () => {
    const _currentGame = allGameMaps?.find((_game) => _game.id === currentGame?.id) ?? allGameMaps?.[0];
    setData(cloneDeep(_currentGame?.rows || []));
  };

  const { data: userBalance, loading: userBalanceLoading, runAsync: getUserBalance } = useRequest(async () => {
    if (!provider || !account) return "0";
    const balanceWei = await provider.getBalance(account);
    const balanceMON = utils.formatUnits(balanceWei, 18);
    return balanceMON || "0";
  }, {
    refreshDeps: [account, provider]
  });

  // Debounce function to ensure balance fetch interval is not less than 3 seconds
  const { run: debouncedGetUserBalance } = useDebounceFn(
    async () => {
      const now = Date.now();
      if (now - lastBalanceUpdateRef.current >= 3000) {
        lastBalanceUpdateRef.current = now;
        await getUserBalance();
      }
    },
    { wait: 3000 }
  );

  // Listen for blockNumber changes and automatically fetch user balance
  useEffect(() => {
    if (blockNumber && account && provider) {
      debouncedGetUserBalance();
    }
  }, [blockNumber, account, provider, debouncedGetUserBalance]);

  const startButton = useMemo<{ text: string; disabled: boolean; tooltip: string; }>(() => {
    const buttonResult = { text: "Go!", disabled: true, tooltip: "" };
    if (!amount || Big(amount).lte(0)) {
      buttonResult.tooltip = "Select an amount";
      return buttonResult;
    }
    if (Big(amount).gt(Big(userBalance || "0"))) {
      buttonResult.tooltip = "Insufficient balance";
      return buttonResult;
    }
    if (!gameStarted && currentGameData?.status === LastGameStatus.Ongoing) {
      buttonResult.text = "Continue";
    }
    buttonResult.disabled = false;
    return buttonResult;
  }, [amount, userBalance, currentGameData, gameStarted]);

  const { runAsync: onReportServer } = useRequest<any, [api: string, gameId: string, txHash: string]>(async (api, gameId, txHash) => {
    try {
      const ssParams = new URLSearchParams();
      ssParams.set("gameId", gameId);
      ssParams.set("txHash", txHash);
      const ss = getSignature(ssParams.toString());
      await post(api, {
        game_id: gameId,
        ss,
        tx_hash: txHash,
      });
    } catch (err: any) {
      console.log("report start game failed: %o", err);
    }
  }, {
    manual: true,
  });

  const onChainGameStart = async (params: any) => {
    const {
      game_id,
      seed_hash,
      algo_variant,
      game_config,
      deadline,
      signature,
      toastId,
    } = params;

    const signer = provider?.getSigner(account);

    try {
      const contractRes = await requestContract({
        address: GAME_CONTRACT_ADDRESS,
        abi: GAME_ABI,
        provider: signer,
        params: [
          game_id,
          seed_hash,
          algo_variant,
          game_config,
          deadline,
          signature,
        ],
        method: "startGame",
        value: amount,
        toast,
        toastId,
      });

      toast.dismiss(toastId);

      if (!contractRes.success) {
        const errorMessage = contractRes.error || "Transaction failed";
        console.error("Contract call failed:", errorMessage);

        toast.fail({
          title: "Prepare game failed",
          text: errorMessage.includes("InternalRpcError")
            ? "Network error, please try again later"
            : errorMessage,
        });
        return;
      }

      if (contractRes.status !== 1) {
        toast.fail({
          title: "Prepare game failed",
          text: "Transaction was not successful",
        });
        return;
      }

      // start game success
      console.log("Game started successfully:", contractRes.transactionHash);

      // report to server
      onReportServer("/game/deathfun/create/transaction", game_id, contractRes.transactionHash as string);

      setCurrentGameData({
        ...params,
        create_hash: contractRes.transactionHash,
      });
      setGameStarted(true);
      onReset();

      toast.success({
        title: "Game started successfully!",
      });

    } catch (err: any) {
      console.log("chain game start failed: %o", err);
      toast.dismiss(toastId);

      toast.fail({
        title: "Prepare game failed",
        text: err.message || "Please try again later",
      });
    }
  };

  const getChainGameId = async (gameId?: string) => {
    const gameContract = new Contract(GAME_CONTRACT_ADDRESS, GAME_ABI, provider);
    const gameChainId = await gameContract.getChainGameId(gameId);
    return { value: utils.formatUnits(gameChainId), chainGameId: gameChainId };
  };

  const getChainGameDetails = async (chainGameId?: any) => {
    const gameContract = new Contract(GAME_CONTRACT_ADDRESS, GAME_ABI, provider);
    return gameContract.getGameDetails(chainGameId);
  };

  const { runAsync: onGameStart, loading: gameStartLoading } = useRequest<Partial<StartGameRes>, any>(async () => {
    if (!currentGame) {
      return;
    }

    let toastId: any = toast.loading({
      title: "Preparing game...",
    });

    // Continue game
    if (currentGameData?.status === LastGameStatus.Ongoing) {
      // not finished, check create_hash
      if (!currentGameData?.create_hash) {
        // if gameChainId does not exist, re-upload to the chain
        if (Big(currentGameData?.gameChainId || 0).eq(0)) {
          try {
            await onChainGameStart({
              ...currentGameData,
              toastId,
            });
          } catch (err: any) {
            console.log("continue game failed: %o", err);
          }
        }
        else {
          // Backend block crawling
        }
      }
      return;
    }

    try {
      const res = await post("/game/deathfun/create", {
        bet_amount: amount,
        death_fun_id: currentGame.id,
      });
      if (res.code !== 200 || !res.data) {
        toast.dismiss(toastId);
        toast.fail({
          title: "Start game failed",
          text: res.message || "Please try again later",
        });
        return;
      }
      await onChainGameStart({
        ...res.data,
        selected_tiles: [],
        toastId,
      });
      return res.data;
    } catch (err: any) {
      console.log("start game failed: %o", err);
    }

    toast.dismiss(toastId);
    return;
  }, {
    manual: true,
  });

  const { runAsync: onGameEnd, loading: gameEndLoading } = useRequest<Partial<EndGameRes>, [result: LayerStatus.Failed | LayerStatus.Succeed]>(async (result) => {
    if (!currentGame || !currentGameData) {
      return;
    }

    // User won
    // click - cash out button
    if (result === LayerStatus.Succeed) {

      let toastId: any = toast.loading({
        title: "Processing cash out...",
      });

      try {
        const res = await post("/game/deathfun/end", {
          game_id: currentGameData.game_id,
        });
        if (res.code !== 200) {
          toast.dismiss(toastId);
          toast.fail({
            title: "Cash out failed",
            text: res.message || "Please try again later",
          });
          return;
        }
        const signer = provider?.getSigner(account);

        const contractRes = await requestContract({
          address: GAME_CONTRACT_ADDRESS,
          abi: GAME_ABI,
          provider: signer,
          params: [
            res.data.chain_game_id,
            res.data.reward_amount,
            res.data.game_state,
            res.data.seed,
            res.data.deadline,
            res.data.signature,
          ],
          method: "endGame",
          toast,
          toastId,
        });
        toast.dismiss(toastId);

        if (!contractRes.success || contractRes.status !== 1) {
          toast.fail({
            title: "Cash out failed",
            text: "Please try again later",
          });
          return;
        }

        toast.success({
          title: "Cash out successfully",
        });

        // end game success
        // report to server
        onReportServer("/game/deathfun/end/transaction", currentGameData.game_id as string, contractRes.transactionHash as string).then(() => {
          getLastGame();
        });

        setGameStarted(false);
        return res.data;
      } catch (err: any) {
        console.log("end game failed: %o", err);
      }
    }
    // User lost
    else {
      // when open door failed, backend will update game status to failed
    }
  }, {
    manual: true,
  });

  const { runAsync: onOpen, loading: openning } = useRequest(async (layer: LayerRow, tileIndex: number, opts?: { ev?: any; }) => {
    const { ev } = opts ?? {};
    const result: any = { isOpen: false };
    const _data: LayerRow[] = data.slice();
    const currentLayerIndex: number = _data.findIndex((_it) => _it.multiplier === layer.multiplier);
    const currentLayer: LayerRow = _data[currentLayerIndex];

    if (currentLayer.status !== LayerStatus.Unlocked || !gameStarted || !currentGameData) {
      return result;
    }

    let toastId: any = toast.loading({
      title: "Opening...",
    });

    let response: OpenTileRes;
    try {
      const res = await post("/game/deathfun/select-tile", {
        game_id: currentGameData.game_id,
        tileIndex,
      });
      toast.dismiss(toastId);
      if (res.code !== 200 || !res.data) {
        toast.fail({
          title: "Open failed",
          text: "Please try again later",
        });
        return result;
      }
      response = res.data;
    } catch (err: any) {
      console.log("open door failed: %o", err);
      toast.fail({
        title: "Open failed",
        text: err.message,
      });
      return result;
    }

    result.isOpen = true;

    currentLayer.deathTileIndex = response.currentRow.deathTileIndex;
    setCurrentGameData((prev) => {
      const _currentGameData = { ...prev };
      if (!_currentGameData.selected_tiles) {
        _currentGameData.selected_tiles = [];
      }
      _currentGameData.selected_tiles[_data.length - 1 - currentLayerIndex] = tileIndex;
      return _currentGameData;
    });

    // not ghost
    if (response.currentRow.deathTileIndex !== tileIndex) {
      currentLayer.status = LayerStatus.Succeed;
      // refresh nft
      if (allNFTList?.some((nft) => nft.row_index === _data.length - 1 - currentLayerIndex)) {
        getAllNFTList();
      }
      // go to next layer
      if (currentLayerIndex - 1 >= 0) {
        _data[currentLayerIndex - 1].status = LayerStatus.Unlocked;
        setData(_data);
        return result;
      }
      // final winner
      toast.success({
        title: "Congratulations! You've won the game!",
      });
      setData(_data);
      return result;
    }

    // is ghost
    // game over
    currentLayer.status = LayerStatus.Failed;
    toast.fail({
      title: "Game over! You've lost the game!",
    });
    setData(_data);
    setGameStarted(false);
    getLastGame();

    // Set failed ghost position and visibility
    if (ev) {
      // Use viewport-relative coordinates
      const x = ev.clientX;
      const y = ev.clientY;
      setFailedGhostPosition([x, y]);
      setFailedGhostVisible(true);
    }

    return result;
  }, { manual: true });

  const { runAsync: onCashOut, loading: cashOutPending } = useRequest(async () => {
    await onGameEnd(LayerStatus.Succeed);
  }, { manual: true });

  const { data: allGameMaps, loading: allGameMapsLoading } = useRequest<Layer[], any>(async () => {
    try {
      const res = await get("/game/deathfun/all");
      if (res.code !== 200) {
        return [];
      }
      const _list: Layer[] = res.data || [];
      _list.forEach((_it: Layer) => {
        _it.rows.forEach((_row, _idx) => {
          _row.gameId = _it.id;
          _row.status = _idx === 0 ? LayerStatus.Unlocked : LayerStatus.Locked;
        });
        _it.rows = _it.rows.sort((a, b) => Big(a.multiplier).minus(b.multiplier).lt(0) ? 1 : -1);
      });
      console.log("all game maps: %o", _list);
      return _list;
    } catch (err: any) {
      console.log("get all game map failed: %o", err);
    }
    return [];
  });

  const formatRows = (rows: LayerRow[], selected_tiles?: number[], deathfun_id?: number) => {
    return rows
      .map((row: LayerRow, index: number) => {
        let _status = LayerStatus.Locked;
        if (typeof row.deathTileIndex === "number") {
          if (typeof selected_tiles?.[index] === "number") {
            if (row.deathTileIndex === selected_tiles?.[index]) {
              _status = LayerStatus.Failed;
            } else {
              _status = LayerStatus.Succeed;
            }
          }
        }
        return {
          ...row,
          gameId: deathfun_id || -1,
          status: _status,
        };
      })
      .sort((a: LayerRow, b: LayerRow) => Big(b.multiplier).minus(a.multiplier).toNumber());
  };

  const { data: lastGame, loading: LastGameLoading, runAsync: getLastGame } = useRequest<Partial<LastGame>, any>(async () => {
    if (!accountWithAk || !allGameMaps?.length) {
      return {};
    }
    const setDefaultCurrentGame = () => {
      setCurrentGame(allGameMaps[0]);
      setData(cloneDeep(allGameMaps[0]?.rows || []));
    };
    try {
      const res = await get("/game/deathfun/active");
      if (res.code !== 200) {
        setDefaultCurrentGame();
        return {};
      }
      // first time to play the game
      if (!res.data) {
        // set first map as current game
        setDefaultCurrentGame();
      }
      // show last game data
      else {
        const matchedGame = allGameMaps.find((game) => {
          if (game.rows.length !== res.data.rows.length) {
            return false;
          }

          const sortedGameRows = [...game.rows].sort((a, b) =>
            Big(a.multiplier).minus(b.multiplier).toNumber()
          );
          const sortedDataRows = [...res.data.rows].sort((a, b) =>
            Big(a.multiplier).minus(b.multiplier).toNumber()
          );

          return sortedGameRows.every((gameRow, index) => {
            const dataRow = sortedDataRows[index];
            return gameRow.multiplier === dataRow.multiplier &&
              gameRow.tiles === dataRow.tiles;
          });
        });

        const _rows: LayerRow[] = formatRows(res.data.rows, res.data.selected_tiles, matchedGame?.id);
        if (res.data.status === LastGameStatus.Ongoing) {
          for (let i = _rows.length - 1; i >= 0; i--) {
            if (_rows[i].status === LayerStatus.Failed) {
              break;
            }
            if (_rows[i].status !== LayerStatus.Succeed) {
              _rows[i].status = LayerStatus.Unlocked;
              break;
            }
          }
        }

        const _currentGame = {
          id: matchedGame?.id || -1,
          rows: _rows,
        };
        setCurrentGame(_currentGame);
        setData(cloneDeep(_currentGame?.rows || []));
        setAmount(res.data.bet_amount);

        const { value: gameChainId } = await getChainGameId(res.data.game_id);
        setCurrentGameData({
          ...res.data,
          signature: res.data.create_signature,
          gameChainId,
        });

        if (res.data.status === LastGameStatus.Ongoing) {
          if (Big(gameChainId || 0).gt(0)) {
            setGameStarted(true);
          }
        }

        if ([LastGameStatus.Win].includes(res.data.status)) {
          // check end_hash
          if (!res.data.end_hash) {
            // if gameChainId does not exist, re-upload to the chain
            if (Big(gameChainId || 0).eq(0)) {

            }
            else {
              // Backend block crawling
            }
          }
        }
      }
      return res.data || {};
    } catch (err: any) {
      setDefaultCurrentGame();
      console.log("get all game map failed: %o", err);
    }
    return {};
  }, {
    refreshDeps: [accountWithAk, allGameMaps]
  });

  const { data: allNFTList, loading: allNFTListLoading, runAsync: getAllNFTList } = useRequest<NFTItem[], any>(async () => {
    try {
      const res = await get("/game/deathfun/reward/whitelist");
      if (res.code !== 200) {
        return [];
      }
      return res.data || [];
    } catch (err: any) {
      console.log("get whitelist failed: %o", err);
    }
  });

  const [gameLoading] = useMemo(() => {
    return [
      allGameMapsLoading || LastGameLoading
    ];
  }, [allGameMapsLoading, LastGameLoading]);

  const onAmountChange = (_amount: string) => {
    setAmount(_amount);
  };

  const onMapChange = () => {
    if (!allGameMaps?.length) {
      return;
    }
    if (gameStarted) {
      toast.fail({
        title: "Game is in progress",
      });
      return;
    }
    if (!currentGame) {
      // set first map as current game
      setCurrentGame(allGameMaps[0]);
      setData(cloneDeep(allGameMaps[0]?.rows || []));
      return;
    }
    let nextGame: Layer;
    const currentGameIndex = allGameMaps.findIndex((_it) => _it.id === currentGame?.id);
    if (currentGameIndex >= allGameMaps.length - 1) {
      nextGame = allGameMaps[0];
    } else {
      nextGame = allGameMaps[currentGameIndex + 1];
    }
    setCurrentGame(nextGame);
    setData(cloneDeep(nextGame?.rows || []));
  };

  const onVerifierClose = () => {
    setVerifierVisible(false);
    setVerifierData(void 0);
  };

  const onVerifierOpen = (params?: { rows?: LayerRow[]; seed?: string; seed_hash?: string; }) => {
    const { rows, seed, seed_hash } = params || {};
    setVerifierVisible(true);
    setVerifierData({
      rows: cloneDeep(rows || data),
      seed: seed || currentGameData?.seed,
      seed_hash: seed_hash || currentGameData?.seed_hash,
    });
  };

  useEffect(() => {
    if (data && containerRef.current) {
      // Use requestAnimationFrame to ensure scrolling after the next frame is rendered
      const animationId = requestAnimationFrame(() => {
        // Use setTimeout to ensure DOM is completely updated
        const timeoutId = setTimeout(() => {
          // Find the first layer with status === LayerStatus.Unlocked
          const unlockedLayerIndex = data.findIndex(layer => layer.status === LayerStatus.Unlocked);

          if (unlockedLayerIndex !== -1) {
            // Find the corresponding DOM element for the unlocked layer
            const layerElements = containerRef.current.querySelectorAll('[data-layer-index]');
            const unlockedElement = Array.from(layerElements).find((element: any) => {
              const layerIndex = parseInt(element.getAttribute('data-layer-index'));
              return layerIndex === unlockedLayerIndex;
            });

            if (unlockedElement) {
              // Scroll to the unlocked layer and center it vertically
              const containerRect = containerRef.current.getBoundingClientRect();
              const elementRect = (unlockedElement as HTMLElement).getBoundingClientRect();
              const scrollTop = containerRef.current.scrollTop + elementRect.top - containerRect.top - (containerRect.height / 2) + (elementRect.height / 2);

              containerRef.current.scrollTo({
                top: scrollTop,
                behavior: "smooth",
              });
            }
          } else {
            // If no unlocked layer found, scroll to bottom
            containerRef.current.scrollTo({
              top: containerRef.current.scrollHeight,
              behavior: "smooth",
            });
          }
        }, 0);

        // Cleanup function: cancel setTimeout when component unmounts
        return () => {
          clearTimeout(timeoutId);
        };
      });

      // Cleanup function: cancel requestAnimationFrame when component unmounts
      return () => {
        cancelAnimationFrame(animationId);
      };
    }
  }, [data]);

  return {
    gameLoading,
    allGameMaps,
    lastGame,
    startButton,
    containerRef,
    unLockedLayerRef,
    data,
    currentGame,
    onOpen,
    openning,
    onAmountChange,
    amount,
    onMapChange,
    onCashOut,
    cashOutPending,
    gameLost,
    gameWon,
    currentLayer,
    currentWinLayer,
    gameStarted,
    onGameStart,
    gameStartLoading,
    verifierVisible,
    onVerifierClose,
    onVerifierOpen,
    verifierData,
    failedGhostVisible,
    failedGhostPosition,
    setFailedGhostVisible,
    userBalance,
    userBalanceLoading,
    currentGameData,
    allNFTList,
    allNFTListLoading,
    getChainGameId,
    getChainGameDetails,
    recordsVisible,
    setRecordsVisible,
    formatRows,
  };
};

export interface SpaceInvaders {
  gameLoading: boolean;
  allGameMaps?: Layer[];
  lastGame?: Partial<LastGame>;
  startButton: { text: string; disabled: boolean; tooltip: string; };
  containerRef: any;
  unLockedLayerRef: any;
  data: LayerRow[];
  currentGame?: Layer;
  onOpen: (layer: any, item: any, opts?: any) => Promise<void>;
  openning: boolean;
  onAmountChange: (amount: string) => void;
  amount: string;
  onMapChange: () => void;
  onCashOut: () => Promise<void>;
  cashOutPending: boolean;
  gameLost: boolean;
  gameWon: boolean;
  currentLayer?: LayerRow;
  currentWinLayer?: LayerRow;
  gameStarted: boolean;
  onGameStart: () => void;
  gameStartLoading: boolean;
  verifierVisible: boolean;
  onVerifierClose: () => void;
  onVerifierOpen: (params?: { rows?: LayerRow[]; seed?: string; seed_hash?: string; }) => void;
  verifierData?: { rows?: LayerRow[]; seed?: string; seed_hash?: string; };
  failedGhostVisible: boolean;
  failedGhostPosition: any;
  setFailedGhostVisible: (visible: boolean) => void;
  userBalance?: string;
  userBalanceLoading: boolean;
  currentGameData?: Partial<StartGameRes>;
  allNFTList?: NFTItem[];
  allNFTListLoading: boolean;
  getChainGameId: (gameId?: string) => Promise<{ value: string; chainGameId: any; }>;
  getChainGameDetails: (chainGameId?: any) => Promise<any>;
  recordsVisible: boolean;
  setRecordsVisible: (visible: boolean) => void;
  formatRows: (rows: LayerRow[], selected_tiles?: number[], deathfun_id?: number) => LayerRow[];
}
