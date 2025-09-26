import clsx from "clsx";

const Card = (props: any) => {
  const { type = "1", children, className, contentClassName, title, onExploreAll, backdropClassName } = props;

  return (
    <div
      className={clsx(
        "relative w-[clamp(1px,_93.78vw,_calc(var(--pc-1512)*0.9378))] pt-[clamp(1px,_7.94vw,_calc(var(--pc-1512)*0.0794))] text-white bg-no-repeat bg-center bg-contain",
        type === "2" ? "h-[clamp(1px,_50.60vw,_calc(var(--pc-1512)*0.5060))] bg-[url('/images/mainnet/discover/bg-discover-card2.png')]" : "h-[clamp(1px,_39.35vw,_calc(var(--pc-1512)*0.3935))] bg-[url('/images/mainnet/discover/bg-discover-card.png')]",
        className
      )}
    >
      <div className="absolute left-1/2 -translate-x-1/2 top-[clamp(1px,_2.2vw,_calc(var(--pc-1512)*0.022))] uppercase text-[clamp(1px,_1.72vw,_calc(var(--pc-1512)*0.0172))] leading-[normal] [text-shadow:0_0_6px_rgba(255,255,255,0.50)] font-[500]">
        {title}
      </div>
      {children}
      {
        onExploreAll && (
          <button
            type="button"
            className="absolute z-[3] w-[clamp(1px,_10.58vw,_calc(var(--pc-1512)*0.1058))] h-[clamp(1px,_3vw,_calc(var(--pc-1512)*0.0300))] flex justify-center items-center pt-[clamp(1px,_0.66vw,_calc(var(--pc-1512)*0.0066))] gap-[0px] shrink-0 right-[clamp(1px,_1.4vw,_calc(var(--pc-1512)*0.014))] top-[clamp(calc(var(--pc-1512)*-0.0024),_-0.24vw,_1px)] bg-[url('/images/mainnet/discover/carousel-card-corner2.png')] bg-no-repeat bg-center bg-contain"
            onClick={onExploreAll}
          >
            <div className="text-[#A1AECB] text-[clamp(1px,_1.06vw,_calc(var(--pc-1512)*0.0106))] leading-[normal] font-[400] hover:[text-shadow:_0_0_10px_rgba(255,255,255,0.60)] transition-all duration-150">
              Explore all
            </div>
            <img
              src="/images/mainnet/discover/icon-more.png"
              alt=""
              className="w-[clamp(1px,_1.72vw,_calc(var(--pc-1512)*0.0172))] h-[clamp(1px,_1.59vw,_calc(var(--pc-1512)*0.0159))] object-center object-contain shrink-0 translate-y-[-1px]"
            />
          </button>
        )
      }
    </div>
  );
};

export default Card;
