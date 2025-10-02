import Big from "big.js";
import { motion, AnimatePresence } from "framer-motion";
import Fee from "./Fee";
import { useSettingsStore } from "@/stores/settings";
import dapps from "@/configs/swap";

import { useEffect, useMemo, useState } from "react";

const COLOR: Record<number, string> = {
  1: "text-[#ff9445]",
  2: "text-[#ff547d]",
  0: "text-[#33b65f]"
};

export default function Routes({
  priceImpactType,
  priceImpact,
  gasUsd,
  routerStr,
  outputCurrencyAmount,
  show,
  inputCurrency,
  outputCurrency,
  trade,
  tradeList,
  onSelectRoute,
}: any) {
  const slippage = useSettingsStore((store: any) => store.slippage);
  const [showRoutesModal, setShowRoutesModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null)

  const RouteInfo = useMemo(() => {
    if (!trade) return null;
    const dapp = dapps[trade.name.toLowerCase()];
    return <div className="flex gap-[10px] items-center" onClick={() => {
      // setShowRoutesModal(true);
    }}>
      <img src={dapp.logo} className="w-[16px] h-[16px]" />
      <div className="text-[12px] text-white">{dapp.name}</div>
      {/* <div>...</div> */}
    </div>
  }, [trade, dapps]);

  

  return (
    <>
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 140 }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-[10px] py-[10px] md:backdrop-blur-[4px]"
          >
            <Fee
              name="Minimum received"
              value={Big(outputCurrencyAmount || 0)
                .mul(1 - slippage / 100)
                .toFixed(8)}
            />
            <Fee
              name="Price impact"
              value={`${priceImpact || "-"}%`}
              valueClassName={COLOR[priceImpactType || 0]}
            />
            <Fee name="Trading fee" value={gasUsd} />
            <Fee name="Route" value={RouteInfo} />
          </motion.div>
        )}
      </AnimatePresence>

      
    </>
  );
}
