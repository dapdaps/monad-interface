import Big from "big.js";
import { motion, AnimatePresence } from "framer-motion";
import Fee from "./Fee";
import { useSettingsStore } from "@/stores/settings";

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
  show
}: any) {
  const slippage = useSettingsStore((store: any) => store.slippage);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 140 }}
          exit={{ opacity: 0, height: 0 }}
          className="border lg:border-[#75759D] md:border-[#454556] rounded-[12px] mt-[10px] p-[10px] md:backdrop-blur-[4px]"
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
          <Fee name="Route" value={routerStr} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
