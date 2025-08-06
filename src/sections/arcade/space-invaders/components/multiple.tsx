import clsx from "clsx";
import { LayerStatus } from "../config";

const Multiple = (props: any) => {
  const { layer, className, children } = props;

  return (
    <div
      className={clsx(
        "text-[clamp(1px,_1.11vw,_calc(var(--nadsa-laptop-width)*0.0111))] font-[DelaGothicOne] font-[400] leading-[100%] p-[clamp(1px,_0.48vw,_calc(var(--nadsa-laptop-width)*0.0048))] w-[clamp(1px,_9.51vw,_calc(var(--nadsa-laptop-width)*0.0951))] h-[clamp(1px,_4.17vw,_calc(var(--nadsa-laptop-width)*0.0417))] rounded-[clamp(1px,_0.42vw,_calc(var(--nadsa-laptop-width)*0.0042))] border border-black bg-[#474B6B] shadow-[-2px_-2px_0_0_rgba(0,_0,_0,_0.60)_inset]",
        className
      )}
    >
      <div
        className={clsx(
          "w-full h-full flex justify-center items-center gap-[clamp(1px,_0.27vw,_calc(var(--nadsa-laptop-width)*0.0027))] border border-black  rounded-[clamp(1px,_0.28vw,_calc(var(--nadsa-laptop-width)*0.0028))] shadow-[2px_2px_0_0_rgba(0,_0,_0,_0.50)_inset]",
          layer.status === LayerStatus.Unlocked && "bg-[#BFFF60] text-black",
          layer.status === LayerStatus.Failed && "bg-[#F13636] text-black",
          ![LayerStatus.Unlocked, LayerStatus.Failed].includes(layer.status) && "bg-[#1F2536] text-white/50",
        )}
      >
        <div className="">{children}X</div>
        {
          layer.status === LayerStatus.Failed && (
            <img
              src="/images/arcade/space-invaders/icon-arrow-right.png"
              alt=""
              className="w-[clamp(1px,_0.97vw,_calc(var(--nadsa-laptop-width)*0.0097))] h-[clamp(1px,_0.97vw,_calc(var(--nadsa-laptop-width)*0.0097))] object-center object-contain flex-0"
            />
          )
        }
      </div>
    </div>
  );
};

export default Multiple;
