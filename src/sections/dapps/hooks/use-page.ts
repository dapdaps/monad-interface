import { useSoundStore } from "@/stores/sound";
import { useSize } from "ahooks";
import { useEffect, useMemo, useState } from "react";
import { ALL_DAPP_LIST } from "../config";
import useIsMobile from "@/hooks/use-isMobile";
export default function usePage() {
  const isMobile = useIsMobile()
  const size = useSize(document.getElementsByTagName("body")[0]);
  const soundStore: any = useSoundStore();
  const [activeType, setActiveType] = useState("all");
  const maxLength = useMemo(() => isMobile ? 2 : Math.floor(((size?.width - 64) * 0.8 + 80) / 240), [size])
  const dappsArray = useMemo(() => {
    const outlinkDapps = ALL_DAPP_LIST.filter((dapp: IDapp) =>
      dapp.link.indexOf('http') > -1
    );
    const otherDapps = ALL_DAPP_LIST.filter((dapp: IDapp) =>
      activeType === 'all'
        ? dapp.link.indexOf('http') === -1 || dapp.link.indexOf('http') > -1
        : activeType === 'instation'
          ? dapp.link.indexOf('http') === -1
          : dapp.type === activeType
    );

    const combinedDapps =
      activeType === 'all' || activeType === 'outlink'
        ? [...otherDapps.filter(dapp => outlinkDapps.indexOf(dapp) === -1), ...outlinkDapps]
        : otherDapps;

    const array = [];
    for (let i = 0; i < combinedDapps.length; i += maxLength) {
      array.push(combinedDapps.slice(i, i + maxLength));
    }
    return array;
  }, [activeType, maxLength]);

  function handleClickButton(type: any) {
    setActiveType(type);
  }

  useEffect(() => {
    soundStore?.conveyorBeltRef?.current?.play?.();
    return () => {
      soundStore?.conveyorBeltRef?.current?.pause?.();
    };
  }, []);

  return {
    dappsArray,
    activeType,
    handleClickButton
  }
}