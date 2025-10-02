import { motion } from "framer-motion";
import Badge from "./badge";
import Trend from "./trend";
import clsx from "clsx";
import { numberFormatter } from "@/utils/number-formatter";

export const Spotlight = (props: any) => {
  const { data, type = "left", className, onClick, visits } = props;

  const isLeft = type === "left";

  return (
    <div
      className={clsx("relative w-[clamp(1px,_19.31vw,_calc(var(--pc-1512)*0.1931))] h-[clamp(1px,_25.26vw,_calc(var(--pc-1512)*0.2526))] shrink-0 bg-no-repeat bg-center bg-contain transition-all duration-300", className)}
      style={{
        backgroundImage: isLeft ? "url('/images/mainnet/discover/spotlight-card-left.png')" : "url('/images/mainnet/discover/spotlight-card-right.png')",
        paddingLeft: isLeft ? "clamp(1px, 1.12vw, calc(var(--pc-1512)*0.0112))" : "0px",
        paddingRight: isLeft ? "0px" : "clamp(1px, 1.12vw, calc(var(--pc-1512)*0.0112))",
        paddingBottom: "clamp(1px, 1.12vw, calc(var(--pc-1512)*0.0112))",
      }}
    >
      <motion.div
        className="relative cursor-pointer w-full h-full rounded-[clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))] overflow-hidden bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url(${data.banner})`,
        }}
        whileHover={{
          x: isLeft ? -2 : 2,
          y: 2,
          scale: 1.05,
        }}
        onClick={onClick}
      >
        <Badge className="absolute left-[clamp(1px,_0.53vw,_calc(var(--pc-1512)*0.0053))] top-[clamp(1px,_0.53vw,_calc(var(--pc-1512)*0.0053))]" />
        <Trend className="absolute right-[clamp(1px,_0.53vw,_calc(var(--pc-1512)*0.0053))] top-[clamp(1px,_0.53vw,_calc(var(--pc-1512)*0.0053))]">
          {numberFormatter(visits, 0, true)}
        </Trend>
        <div className="absolute rounded-b-[clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))] pl-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))] pr-[clamp(1px,_0.93vw,_calc(var(--pc-1512)*0.0093))] left-0 bottom-0 flex justify-between items-center gap-[10px] w-full h-[clamp(1px,_4.37vw,_calc(var(--pc-1512)*0.0437))] bg-[rgba(92,90,101,0.30)] backdrop-blur-[20px]">
          <div className="flex items-center gap-[10px]">
            <img
              src={data.icon}
              alt=""
              className="border border-[#2F3543] rounded-[8px] w-[clamp(1px,_3.04vw,_calc(var(--pc-1512)*0.0304))] h-[clamp(1px,_3.04vw,_calc(var(--pc-1512)*0.0304))] object-center object-contain shrink-0"
            />
            <div className="flex flex-col justify-center gap-[4px]">
              <div className="text-[clamp(1px,_1.19vw,_calc(var(--pc-1512)*0.0119))] font-[500]">{data.name}</div>
              <div className="text-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))] text-[rgba(255,255,255,0.65)]">{data.category}</div>
            </div>
          </div>
          <div className="w-[clamp(1px,_2.31vw,_calc(var(--pc-1512)*0.0231))] h-[clamp(1px,_2.31vw,_calc(var(--pc-1512)*0.0231))] shrink-0 border border-[rgba(114,125,151,0.30)] bg-[rgba(25,25,26,0.60)] rounded-[6px] flex justify-center items-center">
            <img
              src="/images/mainnet/discover/icon-more2.svg"
              alt=""
              className="w-[clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))] h-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))] object-center object-contain shrink-0"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Spotlight;
