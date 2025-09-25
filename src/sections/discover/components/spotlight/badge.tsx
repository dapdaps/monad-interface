import clsx from "clsx";

const Badge = (props: any) => {
  const { className } = props;

  return (
    <div className={clsx("h-[clamp(1px,_1.72vw,_calc(var(--pc-1512)*0.0172))] pl-[clamp(1px,_0.4vw,_calc(var(--pc-1512)*0.0040))] pr-[clamp(1px,_0.73vw,_calc(var(--pc-1512)*0.0073))] flex items-center justify-center gap-[3px] text-white text-[clamp(1px,_0.93vw,_calc(var(--pc-1512)*0.0093))] font-[500] rounded-[8px] border border-[#4D4193] bg-[linear-gradient(90deg,_#000_0%,_#4D4193_148.47%)]", className)}>
      <img
        src="/images/mainnet/discover/icon-star.svg"
        alt=""
        className="w-[clamp(1px,_0.99vw,_calc(var(--pc-1512)*0.0099))] h-[clamp(1px,_0.99vw,_calc(var(--pc-1512)*0.0099))] object-center object-contain shrink-0"
      />
      <div className="">Spotlight</div>
    </div>
  );
};

export default Badge;
