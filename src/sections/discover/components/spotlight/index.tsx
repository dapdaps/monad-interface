import { motion } from "framer-motion";
import Badge from "./badge";
import Trend from "./trend";

export const Spotlight = (props: any) => {
  const { data, type = "left" } = props;

  const isLeft = type === "left";

  return (
    <div
      className="relative w-[clamp(1px,_19.31vw,_calc(var(--pc-1512)*0.1931))] h-[clamp(1px,_25.26vw,_calc(var(--pc-1512)*0.2526))] overflow-hidden shrink-0 bg-no-repeat bg-center bg-contain"
      style={{
        backgroundImage: isLeft ? "url('/images/mainnet/discover/spotlight-card-left.png')" : "url('/images/mainnet/discover/spotlight-card-right.png')",
        paddingLeft: isLeft ? "clamp(1px, 1.12vw, calc(var(--pc-1512)*0.0112))" : "0px",
        paddingRight: isLeft ? "0px" : "clamp(1px, 1.12vw, calc(var(--pc-1512)*0.0112))",
        paddingBottom: "clamp(1px, 1.12vw, calc(var(--pc-1512)*0.0112))",
      }}
    >
      <motion.div
        className="relative w-full h-full rounded-[10px] overflow-hidden bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url(${data.banner})`,
        }}
        whileHover={{
          x: isLeft ? -5 : 5,
          y: 5,
        }}
      >
        <Badge className="absolute left-[clamp(1px,_0.53vw,_calc(var(--pc-1512)*0.0053))] top-[clamp(1px,_0.53vw,_calc(var(--pc-1512)*0.0053))]" />
        <Trend className="absolute right-[clamp(1px,_0.53vw,_calc(var(--pc-1512)*0.0053))] top-[clamp(1px,_0.53vw,_calc(var(--pc-1512)*0.0053))]">
          3255
        </Trend>
        <div className="absolute pl-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))] pr-[clamp(1px,_0.93vw,_calc(var(--pc-1512)*0.0093))] left-0 bottom-0 flex justify-between items-center gap-[10px] w-full h-[clamp(1px,_4.37vw,_calc(var(--pc-1512)*0.0437))] bg-[rgba(92,90,101,0.30)] backdrop-blur-[20px]">
          <div className="flex items-center gap-[10px]">
            <img
              src={data.icon}
              alt=""
              className="w-[clamp(1px,_3.04vw,_calc(var(--pc-1512)*0.0304))] h-[clamp(1px,_3.04vw,_calc(var(--pc-1512)*0.0304))] object-center object-contain shrink-0"
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
