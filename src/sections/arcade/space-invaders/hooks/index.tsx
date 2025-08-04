import useToast from "@/hooks/use-toast";
import { usePrivy } from "@privy-io/react-auth";
import { useRequest } from "ahooks";
import { cloneDeep } from "lodash";
import { useEffect, useMemo, useRef, useState } from "react";

export enum LayerStatus {
  Succeed,
  Failed,
  Locked,
  Unlocked,
}

const mockMap = [
  {
    layer: 1,
    multiple: 1.1,
    status: LayerStatus.Unlocked,
    items: [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6, isGhost: true },
      { id: 7 },
    ],
  },
  {
    layer: 2,
    multiple: 1.32,
    status: LayerStatus.Locked,
    items: [
      { id: 8 },
      { id: 9, isGhost: true },
      { id: 10 },
      { id: 11 },
      { id: 12 },
    ],
  },
  {
    layer: 3,
    multiple: 1.66,
    status: LayerStatus.Locked,
    items: [
      { id: 13 },
      { id: 14 },
      { id: 15, isGhost: true },
    ],
  },
  {
    layer: 4,
    multiple: 2.21,
    status: LayerStatus.Locked,
    items: [
      { id: 16 },
      { id: 17 },
      { id: 18, isGhost: true },
      { id: 19 },
      { id: 20 },
    ],
  },
  {
    layer: 5,
    multiple: 3.34,
    status: LayerStatus.Locked,
    nft: true,
    items: [
      { id: 21, isGhost: true },
      { id: 22 },
      { id: 23 },
      { id: 24 },
      { id: 25 },
      { id: 26 },
      { id: 27 },
    ],
  },
  {
    layer: 6,
    multiple: 6.23,
    status: LayerStatus.Locked,
    items: [
      { id: 28 },
      { id: 29 },
      { id: 30 },
      { id: 31 },
      { id: 32, isGhost: true },
      { id: 33 },
    ],
  },
  {
    layer: 7,
    multiple: 2.21,
    status: LayerStatus.Locked,
    items: [
      { id: 34, isGhost: true },
      { id: 35 },
    ],
  },
];

export function useSpaceInvaders(props?: any): SpaceInvaders {
  const { } = props ?? {};

  const toast = useToast();
  const { user } = usePrivy();

  const containerRef = useRef<any>(null);

  // used for layout
  const [mapData, setMapData] = useState([]);
  // use for dynamic data
  const [data, setData] = useState([]);
  // play amount
  const [amount, setAmount] = useState("0.1");
  // before opened game
  const [userGameData, setUserGameData] = useState<any>(null);
  // game started
  const [gameStarted, setGameStarted] = useState<any>(false);
  // verifier modal
  const [verifierVisible, setVerifierVisible] = useState<any>(false);
  const [verifierData, setVerifierData] = useState<any>(void 0);
  // when game failed, popup failed ghost
  const [failedGhostVisible, setFailedGhostVisible] = useState<any>(false);
  const [failedGhostPosition, setFailedGhostPosition] = useState<any>([0, 0]);

  const [gameFailed, currentLayer] = useMemo(() => {
    return [
      data?.some((_it: any) => _it.status === LayerStatus.Failed),
      data?.find((_it: any) => _it.status === LayerStatus.Unlocked),
    ];
  }, [data]);

  const onReset = () => {
    setData(cloneDeep(mapData));
  };

  const { loading } = useRequest(async () => {
    const _data: any = mockMap.sort((a: any, b: any) => b.layer - a.layer);
    setMapData(cloneDeep(_data));
    setData(cloneDeep(_data));
  }, {});

  const { runAsync: onOpen, loading: openning } = useRequest(async (layer: any, item: any, opts?: any) => {
    const { ev } = opts ?? {};
    const result: any = { isOpen: false };
    const _data: any = data.slice();
    const currentLayerIndex: any = _data.findIndex((_it: any) => _it.layer === layer.layer);
    const currentLayer: any = _data[currentLayerIndex];
    const currentItem: any = currentLayer.items.find((_it: any) => _it.id === item.id);

    if (currentLayer.status !== LayerStatus.Unlocked || !gameStarted) {
      return result;
    }

    let toastId: any = toast.loading({
      title: "Opening...",
    });

    const mockReq = () => new Promise<any>((resolve) => {
      const timer = setTimeout(() => {
        const res = {
          code: 0,
          data: {
            success: !currentItem?.isGhost,
          },
        };
        resolve(res);
        clearTimeout(timer);
      }, 1500);
    });

    const res = await mockReq();

    toast.dismiss(toastId);
    result.isOpen = true;

    // not ghost
    if (res.data.success) {
      currentLayer.status = LayerStatus.Succeed;
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

  const { loading: userGameDataLoading } = useRequest(async () => {
    if (!user || !user.wallet) {
      setUserGameData(void 0);
      return false;
    }
    setUserGameData({
      amount: 0.1,
      multiple: 1.1,
      claimed: false,
      hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
    });
  }, {
    refreshDeps: [user],
  });

  const { runAsync: onCashOut, loading: cashOutPending } = useRequest(async () => {
    const mockReq = () => new Promise((resolve) => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        resolve({
          code: 0,
        });
      }, 1500);
    });

    let toastId: any = toast.loading({
      title: "Processing cash out...",
    });

    const res: any = await mockReq();

    toast.dismiss(toastId);

    if (res.code === 0) {
      toast.success({
        title: "Cash out successfully",
      });
      setUserGameData(void 0);
      setGameStarted(false);
      onReset();
    } else {
      toast.fail({
        title: "Cash out failed",
      });
    }
  }, { manual: true });

  const onAmountChange = (_amount: string) => {
    setAmount(_amount);
  };

  const onMapChange = () => {
    setData(cloneDeep(mapData));
  };

  const onGameStart = () => {
    onReset();
    setGameStarted(true);
  };

  const onVerifierClose = () => {
    setVerifierVisible(false);
    setVerifierData(void 0);
  };

  const onVerifierOpen = () => {
    setVerifierVisible(true);
    setVerifierData(cloneDeep(data));
  };

  useEffect(() => {
    if (mapData.length > 0 && containerRef.current) {
      // Use requestAnimationFrame to ensure scrolling after the next frame is rendered
      const animationId = requestAnimationFrame(() => {
        // Use setTimeout to ensure DOM is completely updated
        const timeoutId = setTimeout(() => {
          containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: "smooth",
          });
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
  }, [mapData]);

  return {
    containerRef,
    data,
    mapData,
    loading,
    onOpen,
    openning,
    onAmountChange,
    amount,
    onMapChange,
    userGameData,
    userGameDataLoading,
    onCashOut,
    cashOutPending,
    gameFailed,
    currentLayer,
    gameStarted,
    onGameStart,
    verifierVisible,
    onVerifierClose,
    onVerifierOpen,
    verifierData,
    failedGhostVisible,
    failedGhostPosition,
    setFailedGhostVisible,
  };
};

export interface SpaceInvaders {
  containerRef: any;
  data: any;
  mapData: any;
  loading: boolean;
  onOpen: (layer: any, item: any, opts?: any) => Promise<void>;
  openning: boolean;
  onAmountChange: (amount: string) => void;
  amount: string;
  onMapChange: () => void;
  userGameData: any;
  userGameDataLoading: boolean;
  onCashOut: () => Promise<void>;
  cashOutPending: boolean;
  gameFailed: boolean;
  currentLayer: any;
  gameStarted: boolean;
  onGameStart: () => void;
  verifierVisible: boolean;
  onVerifierClose: () => void;
  onVerifierOpen: () => void;
  verifierData: any;
  failedGhostVisible: boolean;
  failedGhostPosition: any;
  setFailedGhostVisible: (visible: boolean) => void;
}
