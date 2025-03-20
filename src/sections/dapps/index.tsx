import { useSoundStore } from "@/stores/sound"
import { IDapp } from "@/types"
import { useSize } from "ahooks"
import { motion } from "framer-motion"
import { memo, useEffect, useMemo, useState } from "react"
import DappsEntry from "./components/dapps-entry"
import RectangularButton from "./components/rectangular-button"

function Dapps() {
  const size = useSize(document.getElementsByTagName("body")[0]);
  const soundStore = useSoundStore()
  const [activeType, setActiveType] = useState("all")
  // const [dappsArray, setDappsArray] = useState([])

  const ALL_DAPP_LIST = [{
    name: "Lynex",
    icon: "/images/dapps/icons/Lynex.svg",
    type: "dex",
    link: "",
  }, {
    name: "iZumi",
    icon: "/images/dapps/icons/iZumi.svg",
    type: "dex",
    link: "",
  }, {
    name: "Pancake",
    icon: "/images/dapps/icons/Pancake.svg",
    type: "dex",
    link: "",
  }, {
    name: "OpenOcean",
    icon: "/images/dapps/icons/OpenOcean.svg",
    type: "dex",
    link: "",
  }, {
    name: "Infinex",
    icon: "/images/dapps/icons/Infinex.svg",
    type: "dex",
    link: "",
  }, {
    name: "Orderly",
    icon: "/images/dapps/icons/Orderly.svg",
    type: "dex",
    link: "",
  }, {
    name: "D3X",
    icon: "/images/dapps/icons/D3X.svg",
    type: "dex",
    link: "",
  }, {
    name: "LFJ",
    icon: "/images/dapps/icons/LFJ.svg",
    type: "dex",
    link: "",
  }, {
    name: "Owlto",
    icon: "/images/dapps/icons/OwltoFinance.svg",
    type: "bridge",
    link: "",
  }, {
    name: "Balancer",
    icon: "/images/dapps/icons/Balancer.svg",
    type: "dex",
    link: "",
  }, {
    name: "emelverse",
    icon: "/images/dapps/icons/emelverse.svg",
    type: "dex",
    link: "",
  }
  ]

  // const FILTER_LEFT_DAPP_LIST = useMemo(
  //   () =>
  //     LEFT_DAPP_LIST.filter(
  //       (dapp: IDapp) => dapp.type === activeType || activeType === "all"
  //     ),
  //   [activeType]
  // );
  // const FILTER_RIGHT_DAPP_LIST = useMemo(
  //   () =>
  //     RIGHT_DAPP_LIST.filter(
  //       (dapp: IDapp) => dapp.type === activeType || activeType === "all"
  //     ),
  //   [activeType]
  // );

  const dappsArray = useMemo(() => {
    const maxLength = Math.floor(((size?.width - 64) * 0.8 + 80) / 240)
    const dapps = ALL_DAPP_LIST.filter(
      (dapp: IDapp) => dapp.type === activeType || activeType === "all"
    )
    const array = []

    for (let i = 0; i < dapps.length; i += maxLength) {
      array.push(dapps.slice(i, i + maxLength))
    }
    console.log('===array', array)
    return array
  }, [activeType, size])

  function handleClickButton(type: any) {
    handlePlay()
    setActiveType(type);
  }
  function handlePlay() {
    try {
      soundStore?.conveyorBeltRef?.current?.play?.()
      setTimeout(() => {
        soundStore?.conveyorBeltRef?.current?.pause?.()
      }, 3000)
    } catch (error) {
      console.log('=====error', error)
    }
  }
  useEffect(() => {
    handlePlay()
    return () => {
      soundStore?.conveyorBeltRef?.current?.pause?.()
    }
  }, [soundStore?.conveyorBeltRef])
  return (
    <div className="h-[calc(100vh-60px)] p-[30px_0_180px] overflow-x-hidden overflow-y-auto">
      <div className="flex flex-col gap-[18px]">
        {
          dappsArray?.map((dapps: IDapp, index: number) => (
            <DappsEntry direction={index % 2 ? "right" : "left"} dapps={dapps} />
          ))
        }
      </div>
      <div className="absolute left-0 right-0 bottom-0 h-[87px] bg-[#23243D] border-t-[18px] border-[#273051]">
        <div className="absolute bottom-[42px] left-1/2 translate-x-[calc(-50%_-_441px)] w-[81px] h-[110px] bg-[url('/images/dapps/body.svg')] bg-contain bg-no-repeat">
          <motion.div
            className="absolute right-0 top-0 w-[29px] origin-bottom-left"
            animate={{
              rotate: [0, -15, 0, 8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <img src="/images/dapps/hand.svg" alt="hand" />
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-[470px] h-[136px] bg-[url('/images/dapps/operation_panel.svg')] bg-center bg-contain bg-no-repeat">
          <RectangularButton
            type={1}
            clicked={activeType === "all"}
            className="absolute left-[52px] top-[24px] w-[178px] h-[36px]"
            onClick={() => {
              handleClickButton("all");
            }}
          >
            All
          </RectangularButton>
          <div className="absolute left-[46px] top-[71px] flex gap-[10px]">
            <RectangularButton
              type={1}
              clicked={activeType === "bridge"}
              className="w-[86px] h-[36px]"
              onClick={() => handleClickButton("bridge")}
            >
              Bridge
            </RectangularButton>

            <RectangularButton
              type={3}
              clicked={activeType === "dex"}
              className="w-[88px] h-[36px]"
              onClick={() => handleClickButton("dex")}
            >
              Dex
            </RectangularButton>

            <RectangularButton type={3} disabled className="w-[86px] h-[36px]">
              Lending
            </RectangularButton>
            <RectangularButton type={2} disabled className="w-[86px] h-[36px]">
              Staking
            </RectangularButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Dapps)
