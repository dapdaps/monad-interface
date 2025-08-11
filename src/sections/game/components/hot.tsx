import clsx from "clsx";

const HotGame = (props: any) => {
  const { className } = props;

  return (
    <div className={clsx("absolute top-[clamp(calc(var(--nadsa-laptop-width-base)*-0.135),_-13.5vw,_1px)] right-[clamp(calc(var(--nadsa-laptop-width-base)*-0.05),_-5vw,_1px)] shrink-0 w-[clamp(1px,_17.36vw,_calc(var(--nadsa-laptop-width-base)*0.1736))] h-[clamp(1px,_17.36vw,_calc(var(--nadsa-laptop-width-base)*0.1736))]", className)}>
      <img
        src="/images/game/Fire.gif"
        alt=""
        className="w-full h-full object-contain object-center"
      />
     <img
        src="/images/game/all-in.png"
        alt=""
        className="absolute z-[1] left-[clamp(1px,_3vw,_calc(var(--nadsa-laptop-width-base)*0.03))] top-[clamp(1px,_10.5vw,_calc(var(--nadsa-laptop-width-base)*0.105))] w-[clamp(1px,_5.35vw,_calc(var(--nadsa-laptop-width-base)*0.0535))] h-[clamp(1px,_2.92vw,_calc(var(--nadsa-laptop-width-base)*0.0292))] object-contain object-center"
      />
    </div>
  );
};

export default HotGame;
