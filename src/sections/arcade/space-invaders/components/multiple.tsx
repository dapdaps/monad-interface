import clsx from "clsx";
import { LayerStatus } from "../hooks";

const Multiple = (props: any) => {
  const { layer, className, children } = props;

  return (
    <div
      className={clsx(
        "text-[1.11vw] font-[DelaGothicOne] font-[400] leading-[100%] p-[0.48vw] w-[9.51vw] h-[4.17vw] rounded-[0.42vw] border border-black bg-[#474B6B] shadow-[-2px_-2px_0_0_rgba(0,_0,_0,_0.60)_inset]",
        className
      )}
    >
      <div
        className={clsx(
          "w-full h-full flex justify-center items-center gap-[0.27vw] border border-black  rounded-[0.28vw] shadow-[2px_2px_0_0_rgba(0,_0,_0,_0.50)_inset]",
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
              className="w-[0.97vw] h-[0.97vw] object-center object-contain flex-0"
            />
          )
        }
      </div>
    </div>
  );
};

export default Multiple;
