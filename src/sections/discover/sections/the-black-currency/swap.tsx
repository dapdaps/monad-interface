import InputNumber from "@/components/input-number";
import clsx from "clsx";

const Swap = (props: any) => {
  const {
    activeTab,
    setActiveTab,
  } = props;

  return (
    <div className="w-[clamp(1px,_24.80vw,_calc(var(--pc-1512)*0.2480))] shrink-0">
      <div className="w-full border border-[#7262FF] rounded-[clamp(1px,_0.53vw,_calc(var(--pc-1512)*0.0053))] bg-[rgba(0,0,0,0.35)]">
        <div className="grid grid-cols-2 h-[clamp(1px,_2.45vw,_calc(var(--pc-1512)*0.0245))] font-Oxanium leading-[100%] uppercase text-[clamp(1px,_1.06vw,_calc(var(--pc-1512)*0.0106))] text-[rgba(255,255,255,0.5)]">
          <div
            className={clsx(
              "h-full cursor-pointer flex justify-center items-center overflow-hidden rounded-tl-[clamp(1px,_0.50vw,_calc(var(--pc-1512)*0.0050))]",
              activeTab === "buy" ? "text-white bg-[radial-gradient(50%_66%_at_47.77%_50%,_#553BE4_0%,_#221662_100%)] backdrop-blur-[2px] border-r border-b border-[#836EF9]" : "bg-[rgba(131,110,249,0.25)]",
            )}
            onClick={() => {
              setActiveTab("buy");
            }}
          >
            BUY
          </div>
          <div
            className={clsx(
              "h-full cursor-pointer flex justify-center items-center overflow-hidden rounded-tr-[clamp(1px,_0.50vw,_calc(var(--pc-1512)*0.0050))]",
              activeTab === "sell" ? "text-white bg-[radial-gradient(50%_66%_at_47.77%_50%,_#553BE4_0%,_#221662_100%)] backdrop-blur-[2px] border-l border-b border-[#836EF9]" : "bg-[rgba(131,110,249,0.25)]",
            )}
            onClick={() => {
              setActiveTab("sell");
            }}
          >
            SELL
          </div>
        </div>
        <div className="w-full py-[clamp(1px,_1.32vw,_calc(var(--pc-1512)*0.0132))]">
          <div className="text-[#A6A6DB]">
            Balance: 5,000.35
          </div>
          <div className="flex justify-between items-stretch text-[clamp(1px,_1.19vw,_calc(var(--pc-1512)*0.0119))] text-white h-[clamp(1px,_2.51vw,_calc(var(--pc-1512)*0.0251))] border border-[#34304B] rounded-[clamp(1px,_0.26vw,_calc(var(--pc-1512)*0.0026))] mt-[clamp(1px,_0.53vw,_calc(var(--pc-1512)*0.0053))]">
            <InputNumber
              className="w-0 flex-1 bg-[unset]"
              placeholder="0"
            />
            <div className="flex justify-end items-center gap-[clamp(1px,_0.40vw,_calc(var(--pc-1512)*0.0040))]">
              <img
                src=""
                alt=""
                className="w-[clamp(1px,_1.32vw,_calc(var(--pc-1512)*0.0132))] h-[clamp(1px,_1.32vw,_calc(var(--pc-1512)*0.0132))] rounded-full object-center object-contain shrink-0"
              />
              <div className="">
                MON
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;
