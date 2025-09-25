import clsx from "clsx";

const Card = (props: any) => {
  const { children, className, contentClassName, title, onExploreAll, backdropClassName } = props;

  return (
    <div className={clsx("relative w-[clamp(1px,_93.92vw,_calc(var(--pc-1512)*0.9392))] flex flex-col gap-[0px] items-stretch text-white", className)}>
      <div className="absolute z-[2] left-0 top-0 w-full h-[clamp(1px,_11.77vw,_calc(var(--pc-1512)*0.1177))] bg-[length:100%_clamp(1px,_11.77vw,_calc(var(--pc-1512)*0.1177))] translate-y-[0px] bg-[url('/images/mainnet/discover/carousel-card-top.png')] bg-no-repeat bg-bottom shrink-0">
        <div className="absolute left-1/2 -translate-x-1/2 top-[clamp(1px,_2.2vw,_calc(var(--pc-1512)*0.022))] uppercase text-[clamp(1px,_1.72vw,_calc(var(--pc-1512)*0.0172))] leading-[normal] [text-shadow:0_0_6px_rgba(255,255,255,0.50)] font-[500]">
          {title}
        </div>
      </div>
      <div className="relative z-[3] pt-[clamp(1px,_11.77vw,_calc(var(--pc-1512)*0.1177))] pb-[clamp(1px,_10.58vw,_calc(var(--pc-1512)*0.1058))] w-full flex-1">
        <div className={clsx("w-full bg-[length:100%_1px] pl-[clamp(1px,_0.79vw,_calc(var(--pc-1512)*0.0079))] pr-[clamp(1px,_0.93vw,_calc(var(--pc-1512)*0.0093))] bg-[url('/images/mainnet/discover/carousel-card-middle.png')] bg-repeat-y bg-center", contentClassName)}>
          {children}
        </div>
      </div>
      <div className="absolute z-[2] left-0 bottom-0 w-full h-[clamp(1px,_10.58vw,_calc(var(--pc-1512)*0.1058))] bg-[length:100%_clamp(1px,_10.58vw,_calc(var(--pc-1512)*0.1058))] translate-y-[0px] bg-[url('/images/mainnet/discover/carousel-card-bottom.png')] bg-no-repeat bg-top shrink-0" />
      <div className={clsx("absolute z-[1] w-full h-full backdrop-blur-[15px] hidden", backdropClassName)}>
      </div>
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
