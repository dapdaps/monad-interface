import MonadBaseCard from "@/components/card/monad-base-card";
import Modal from "@/components/modal";
import Accordion from "@/components/accordion";
import clsx from "clsx";

const RulesModal = (props: any) => {
  const { open, onClose, className } = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeIconClassName="!right-[25px]"
    >
      <MonadBaseCard
        className="w-[676px] md:w-full"
        contentClassName="max-h-[70dvh] overflow-y-auto"
      >
        <div
          className={clsx(
            "text-white font-[SpaceGrotesk] text-[16px] font-normal leading-[120%]",
            className
          )}
        >
          <div className="font-[DelaGothicOne] text-[20px] flex items-center gap-[10px] px-[32px] md:px-[10px] pt-[32px]">
            <div className="w-[24px] h-[24px] shrink-0 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#FFD700"/>
                <circle cx="12" cy="12" r="10" fill="#FFEB3B"/>
                <circle cx="15" cy="12" r="8" fill="#FFD700"/>
              </svg>
            </div>
            <div>
              <div className="font-bold">Moon or Doom: Ride the trend.</div>
              <div className="font-normal">Defy the odds.</div>
            </div>
          </div>
          <div className="w-[666px] mt-[20px] flex flex-col items-stretch gap-[6px] px-[32px] md:px-[10px] md:w-full">
            <Accordion
              label="1. How to Play"
              contentClassName=""
              defaultExpand={true}
            >
              <div className="pb-[10px]">
                Predict whether the ETH/USDT price will <strong className="text-white">rise (Moon)</strong> or <strong className="text-white">fall (Doom)</strong> in the next few steps. Choose your bet (0.1 / 1 / 10 MON) and place it on your target grid.
              </div>
            </Accordion>
            <Accordion
              label="2. Winning Rule"
              contentClassName=""
              defaultExpand={true}
            >
              <div className="pb-[10px]">
                If the price hits your chosen grid, you earn a reward = <strong className="text-white">Multiplier</strong> x <strong className="text-white">Bet Amount</strong>. The farther the grid, the higher the multiplier — higher risk, higher reward!
              </div>
            </Accordion>
            <Accordion
              label="3. Join Anytime"
              contentClassName=""
              defaultExpand={true}
            >
              <div className="pb-[10px]">
                There's no fixed round. Jump in anytime, exit anytime, and follow the market in real time. Every click is a <strong className="text-white">bold prediction</strong> — will you catch the next move?
              </div>
            </Accordion>
          </div>
          <div className="mt-[15px] text-[#A6A6DB] font-[SpaceGrotesk] text-[16px] font-normal leading-[120%] px-[32px] md:px-[10px] pb-[32px]">
            <strong className="text-white">Note:</strong> Prices are sourced from Binance. Multipliers are capped for fairness. Predict smart, play bold, and enjoy the thrill!
          </div>
        </div>
      </MonadBaseCard>
    </Modal>
  );
};

export default RulesModal;

