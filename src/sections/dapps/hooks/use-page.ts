import useIsMobile from "@/hooks/use-isMobile";
import { useSoundStore } from "@/stores/sound";
import { useScroll, useSize } from "ahooks";
import { useEffect, useMemo, useRef, useState } from "react";
import { ALL_DAPP_LIST } from "../config";
export default function usePage() {
  const isMobile = useIsMobile()
  const size = useSize(document.getElementsByTagName("body")[0]);
  const soundStore: any = useSoundStore();
  const [activeType, setActiveType] = useState("all");

  const timerRef = useRef()
  const entryScrollRef = useRef()
  const entryContainerRef = useRef()

  const scrollSize = useSize(entryScrollRef?.current)
  const containerSize = useSize(entryContainerRef?.current)
  const scroll = useScroll(entryContainerRef)

  const maxLength = useMemo(() => isMobile ? 2 : Math.floor(((size?.width - 64) * 0.8 + 80) / 240), [size])
  const dappsArray = useMemo(() => {
    const dapps = ALL_DAPP_LIST.filter(
      (dapp: IDapp) => {
        if (activeType === "all" ||
          activeType === "instation" && dapp.link.indexOf("http") === -1 ||
          activeType === "outlink" && dapp.link.indexOf("http") > -1 ||
          activeType === "other" && !["Dex", "Betting", "NFT", "Lending"].includes(dapp.type)
        ) {
          return true
        }
        return dapp.type === activeType
      }
    );
    const outlinkDApps = dapps.filter((dapp: IDapp) => dapp.link.indexOf("http") > -1);
    const otherDApps = dapps.filter((dapp: IDapp) => dapp.link.indexOf("http") < 0);
    const array: any = []

    let arrayIndex = 0;
    for (let i = 0; i < otherDApps.length; i++) {
      if (!array[arrayIndex]) {
        array[arrayIndex] = [otherDApps[i]];
      } else {
        array[arrayIndex].push(otherDApps[i]);
      }

      if (i - maxLength * arrayIndex >= maxLength - 1) {
        arrayIndex += 1;
      }
    }
    if (!array[arrayIndex] || array[arrayIndex].length < maxLength) {
      arrayIndex += 1;
    }
    const _prevArrayIndex = arrayIndex;
    for (let i = 0; i < outlinkDApps.length; i++) {
      if (!array[arrayIndex]) {
        array[arrayIndex] = [outlinkDApps[i]];
      } else {
        array[arrayIndex].push(outlinkDApps[i]);
      }

      if (i - maxLength * (arrayIndex - _prevArrayIndex) >= maxLength - 1) {
        arrayIndex += 1;
      }
    }
    return array.filter((it: any) => !!it && it.length > 0);
  }, [activeType, maxLength]);

  function handleClickButton(type: any) {
    setActiveType(type);
  }

  function playConveyorBeltSound() {
    if (timerRef?.current) clearTimeout(timerRef?.current)
    soundStore?.conveyorBeltRef?.current?.play?.();
    timerRef.current = setTimeout(() => {
      soundStore?.conveyorBeltRef?.current?.pause?.()
    }, 3 * 1000)
  }

  useEffect(() => {
    playConveyorBeltSound()
    return () => {
      soundStore?.conveyorBeltRef?.current?.pause?.();
    };
  }, []);

  useEffect(() => {
    playConveyorBeltSound()
  }, [activeType])

  return {
    dappsArray,
    activeType,
    handleClickButton,
    
    scroll,
    scrollSize,
    containerSize,
    entryScrollRef,
    entryContainerRef,
  }
}