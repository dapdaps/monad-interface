import clsx from "clsx"
import { motion } from "framer-motion"
import { memo, useMemo, useState } from "react"
import RectangularButton from "./components/rectangular-button"
import DappsEntry from "./components/dapps-entry"
import { IDapp } from "@/types"



export default memo(function Dapps() {
  const [activeType, setActiveType] = useState("all")

  const LEFT_DAPP_LIST: IDapp[] = [{
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
  },]
  const RIGHT_DAPP_LIST: IDapp[] = [{
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
  },]

  
  const FILTER_LEFT_DAPP_LIST = useMemo(() => LEFT_DAPP_LIST.filter((dapp: IDapp) => dapp.type === activeType || activeType === "all"), [activeType])
  const FILTER_RIGHT_DAPP_LIST = useMemo(() => RIGHT_DAPP_LIST.filter((dapp: IDapp) => dapp.type === activeType || activeType === "all"), [activeType])


  return (
    <div className="min-h-[840px] pt-[30px]">
      <div className="flex flex-col gap-[18px]">
        <DappsEntry direction="left" dapps={FILTER_LEFT_DAPP_LIST} />
        <DappsEntry direction="right" dapps={FILTER_RIGHT_DAPP_LIST} />
      </div>

      <div className="absolute left-0 right-0 bottom-0 h-[87px] bg-[#23243D] border-t-[18px] border-[#273051]">
        <div className="absolute bottom-[42px] left-1/2 translate-x-[calc(-50%_-_441px)] w-[81px] h-[110px] bg-[url('/images/dapps/body.svg')] bg-contain bg-no-repeat">
          <motion.div className="absolute right-0 top-0 w-[29px] origin-bottom-left"
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
            bgColor={activeType === 'all' ? "bg-[#A5FFFD]" : "bg-[#A6A6D2]"}
            className={clsx("absolute left-[52px] top-[24px] w-[178px] h-[36px]", activeType === 'all' ? 'bg-[#A5FFFD] drop-shadow-[0_0_10px_rgba(165, 255, 253, 0.60)]' : 'bg-[#A6A6D2] drop-shadow-[0_6px_0_#000]')}
            onClick={() => setActiveType("all")}
          >
            All
          </RectangularButton>
          <div className="absolute left-[46px] top-[71px] flex gap-[10px]">
            <RectangularButton
              type={1}
              bgColor={activeType === 'bridge' ? "bg-[#A5FFFD]" : "bg-[#A6A6D2]"}
              className={clsx("w-[86px] h-[36px]", activeType === 'bridge' ? 'bg-[#A5FFFD] drop-shadow-[0_0_10px_rgba(165, 255, 253, 0.60)]' : 'bg-[#A6A6D2] drop-shadow-[0_6px_0_#000]')}
              onClick={() => setActiveType("bridge")}
            >
              Bridge
            </RectangularButton>

            <RectangularButton
              type={3}
              bgColor={activeType === 'dex' ? "bg-[#A5FFFD]" : "bg-[#A6A6D2]"}
              className={clsx("w-[88px] h-[36px]", activeType === 'dex' ? 'bg-[#A5FFFD] drop-shadow-[0_0_10px_rgba(165, 255, 253, 0.60)]' : 'bg-[#A6A6D2] drop-shadow-[0_6px_0_#000]')}
              onClick={() => setActiveType("dex")}
            >
              Dex
            </RectangularButton>

            <RectangularButton
              type={3}
              bgColor={activeType === 'lending' ? "bg-[#A5FFFD]" : "bg-[#A6A6D2]"}
              className={clsx("w-[86px] h-[36px]", activeType === 'lending' ? 'bg-[#A5FFFD] drop-shadow-[0_0_10px_rgba(165, 255, 253, 0.60)]' : 'bg-[#A6A6D2] drop-shadow-[0_6px_0_#000]')}
              onClick={() => setActiveType("lending")}
            >
              Lending
            </RectangularButton>
            <RectangularButton
              type={2}
              bgColor={activeType === 'staking' ? "bg-[#A5FFFD]" : "bg-[#A6A6D2]"}
              className={clsx("w-[86px] h-[36px]", activeType === 'staking' ? 'bg-[#A5FFFD] drop-shadow-[0_0_10px_rgba(165, 255, 253, 0.60)]' : 'bg-[#A6A6D2] drop-shadow-[0_6px_0_#000]')}
              onClick={() => setActiveType("staking")}
            >
              Staking
            </RectangularButton>
          </div>

        </div>
      </div>
    </div>
  )
})
