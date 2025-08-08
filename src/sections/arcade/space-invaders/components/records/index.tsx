import clsx from "clsx";
import { useSpaceInvadersContext } from "../../context";
import { useState } from "react";
import Results from "./results";
import Nft from "./nft";
import { AnimatePresence } from "framer-motion";

const TABS = [
  { label: "Results", value: "results" },
  { label: "NFT", value: "nft" },
];

const Records = (props: any) => {
  const { className } = props;

  const {
  } = useSpaceInvadersContext();

  const [tab, setTab] = useState(TABS[0]);

  return (
    <div className="font-[Montserrat] text-[14px] font-[500] text-white leading-[150%] relative">
      <div
        className={clsx(
          "absolute z-[1] top-[-46px] left-1/2 -translate-x-1/2 rounded-[6px] border border-[#292A41] bg-[#8786B5] w-[258px] h-[47px] flex-shrink-0 p-[4px] text-black font-[HackerNoonV2] text-[20px] font-[400] leading-[90%]"
        )}
      >
        <div className="flex justify-center items-center w-full h-full rounded-[6px] border border-black bg-[#BFFF60] shadow-[inset_0_6px_0_0_rgba(0,0,0,0.5)]">
          Space invaders
        </div>
      </div>
      <div className="flex justify-center items-center gap-[10px] pt-[20px]">
        {
          TABS.map((_tab) => (
            <button
              key={_tab.value}
              type="button"
              className={clsx(
                "rounded-[6px] border border-black  w-[143px] h-[37px] flex-shrink-0 text-[16px] text-black transition-all duration-200",
                tab.value === _tab.value ? "bg-[#BFFF60] shadow-[0_4px_0_0_rgba(0,_0,_0,_0.50)_inset] !cursor-default" : "bg-[#A9ADB8] shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.5)]"
              )}
              onClick={() => {
                setTab(_tab);
              }}
            >
              {_tab.label}
            </button>
          ))
        }
      </div>
      <div className="">
        <AnimatePresence>
          {
            tab.value === TABS[0].value && (
              <Results />
            )
          }
          {
            tab.value === TABS[1].value && (
              <Nft />
            )
          }
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Records;
