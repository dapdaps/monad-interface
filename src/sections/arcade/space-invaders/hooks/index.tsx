import useToast from "@/hooks/use-toast";
import { useRequest } from "ahooks";
import { cloneDeep } from "lodash";
import { useEffect, useRef, useState } from "react";

export enum LayerStatus {
  Succeed,
  Failed,
  Locked,
  Unlocked,
}

const mockMap = [
  {
    layer: 1,
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
    status: LayerStatus.Locked,
    items: [
      { id: 13 },
      { id: 14 },
      { id: 15, isGhost: true },
    ],
  },
  {
    layer: 4,
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
    status: LayerStatus.Locked,
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

  const containerRef = useRef<any>(null);

  // used for layout
  const [mapData, setMapData] = useState([]);
  // use for dynamic data
  const [data, setData] = useState([]);

  const { loading } = useRequest(async () => {
    const _data: any = mockMap.sort((a: any, b: any) => b.layer - a.layer);
    setMapData(cloneDeep(_data));
    setData(cloneDeep(_data));
  }, {});

  const { runAsync: onOpen, loading: openning } = useRequest(async (layer: any, item: any) => {
    let toastId: any = toast.loading({
      title: "Opening...",
    });

    const _data: any = data.slice();
    const currentLayerIndex: any = _data.findIndex((_it: any) => _it.layer === layer.layer);
    const currentLayer: any = _data[currentLayerIndex];
    const currentItem: any = currentLayer.items.find((_it: any) => _it.id === item.id);

    if (currentLayer.status !== LayerStatus.Unlocked) {
      return;
    }

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

    // not ghost
    if (res.data.success) {
      currentLayer.status = LayerStatus.Succeed;
      // go to next layer
      if (currentLayerIndex - 1 >= 0) {
        _data[currentLayerIndex - 1].status = LayerStatus.Unlocked;
        setData(_data);
        return;
      }
      // final winner
      toast.success({
        title: "Congratulations! You've won the game!",
      });
      setData(_data);
      return;
    }

    // is ghost
    // game over
    currentLayer.status = LayerStatus.Failed;
    toast.fail({
      title: "Game over! You've lost the game!",
    });
    setData(_data);
  }, { manual: true });

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
  };
};

export interface SpaceInvaders {
  containerRef: any;
  data: any;
  mapData: any;
  loading: boolean;
  onOpen: (layer: any, item: any) => Promise<void>;
  openning: boolean;
}
