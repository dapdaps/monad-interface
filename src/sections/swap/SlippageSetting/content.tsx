import { useState, useEffect } from "react";
import { useSettingsStore } from "@/stores/settings";

const TYPES = ["Auto", "Custom"];

export default function SlippageSettingContent({ show }: any) {
  const settingStore: any = useSettingsStore();
  const [type, setType] = useState(
    settingStore.getSlippage() ? "Custom" : "Auto"
  );
  useEffect(() => {
    if (!show && !settingStore.getSlippage()) {
      settingStore.setSlippage(0.5);
    }
  }, [show]);

  return (
    <div className="text-white w-[302px] h-[139px] p-[20px] rounded-[20px] border border-[#A6A6DB] bg-[#2B294A] md:w-full md:border-none">
      <div className="text-[16px] font-semibold">Setting</div>
      <div className="text-[14px] font-medium mt-[6px]">Max Slippage</div>
      <div className="flex gap-[8px] mt-[10px] text-[14px] font-normal">
        <div className="rounded-[12px] border border-[#fff] bg-[#4D4D73] p-[4px] flex">
          {TYPES.map((_type) => (
            <div
              key={_type}
              className={`rounded-[10px] cursor-pointer	h-[32px] leading-[32px] px-4 text-center ${
                _type === type ? " bg-[#8B87FF]" : "bg-transparent"
              }`}
              onClick={() => {
                setType(_type);
                settingStore.setSlippage(_type === "Auto" ? "" : "0.5");
              }}
            >
              {_type}
            </div>
          ))}
        </div>
        <div className="text-black grow h-[40px] rounded-[12px] border border-[#373A53] bg-white flex gap-[4px] items-center pr-[5px]">
          <input
            placeholder="0.5"
            value={settingStore.getSlippage()}
            className="border-0 leading-[40px] pl-[5px] bg-transparent w-full flex-1"
            onChange={(ev: any) => {
              settingStore.setSlippage(Number(ev.target.value));
              setType(Number(ev.target.value) !== 0.5 ? "Custom" : "Auto");
            }}
            type="number"
            onWheel={(e: any) => (e.target as HTMLInputElement).blur()}
          />
          <div>%</div>
        </div>
      </div>
    </div>
  );
}
