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
    const dapps = ALL_DAPP_LIST.filter(
      (dapp: IDapp) => {
        if (activeType === "all" ||
          activeType === "instation" && dapp.link.indexOf("http") === -1 ||
          activeType === "outlink" && dapp.link.indexOf("http") > -1
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
    console.log("array: %o", array);
    console.log("arrayIndex: %o", arrayIndex);
    console.log("maxLength: %o", maxLength);
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