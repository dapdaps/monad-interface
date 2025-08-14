import clsx from "clsx";
import { LayerStatus } from "../config";
import useIsMobile from "@/hooks/use-isMobile";

const Multiple = (props: any) => {
  const { layer, className, children } = props;

  const isMobile = useIsMobile();

  return (
    <div
      className={clsx(
        "md:text-[16px] text-[clamp(1px,_1.11vw,_calc(var(--nadsa-laptop-width)*0.0111))] font-[DelaGothicOne] font-[400] leading-[100%] p-[clamp(1px,_0.48vw,_calc(var(--nadsa-laptop-width)*0.0048))] w-[clamp(1px,_9.51vw,_calc(var(--nadsa-laptop-width)*0.0951))] h-[clamp(1px,_4.17vw,_calc(var(--nadsa-laptop-width)*0.0417))] rounded-[clamp(1px,_0.42vw,_calc(var(--nadsa-laptop-width)*0.0042))] border border-black bg-[#474B6B] shadow-[-2px_-2px_0_0_rgba(0,_0,_0,_0.60)_inset]",
        className
      )}
    >
      <div
        className={clsx(
          "md:rounded-[4px] md:gap-[10px] w-full h-full flex justify-center items-center gap-[clamp(1px,_0.27vw,_calc(var(--nadsa-laptop-width)*0.0027))] border border-black  rounded-[clamp(1px,_0.28vw,_calc(var(--nadsa-laptop-width)*0.0028))] shadow-[2px_2px_0_0_rgba(0,_0,_0,_0.50)_inset]",
          layer.status === LayerStatus.Unlocked && "bg-[#BFFF60] text-black",
          layer.status === LayerStatus.Failed && "bg-[#F13636] text-black",
          ![LayerStatus.Unlocked, LayerStatus.Failed].includes(layer.status) && "bg-[#1F2536] text-white/50",
        )}
      >
        {
          isMobile && (
            <svg className="shrink-0 translate-y-[1px]" width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                opacity={[LayerStatus.Unlocked, LayerStatus.Failed].includes(layer.status) ? "1" : "0.5"}
                d="M4.63397 1.16895C5.01887 0.502279 5.98113 0.502279 6.36603 1.16895L10.2631 7.91895C10.648 8.58561 10.1669 9.41895 9.39711 9.41895H1.60289C0.833085 9.41895 0.35196 8.58561 0.73686 7.91895L4.63397 1.16895Z"
                fill={[LayerStatus.Unlocked, LayerStatus.Failed].includes(layer.status) ? "black" : "white"}
              />
            </svg>
          )
        }
        <div className="">{children}X</div>
        {
          (!isMobile && layer.status === LayerStatus.Failed) && (
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
