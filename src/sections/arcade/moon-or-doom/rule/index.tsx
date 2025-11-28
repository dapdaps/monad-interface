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
              <div className="font-bold">Chart Voyager: Navigate the Market, Seize the Moment.</div>
            </div>
          </div>
          <div className="w-[666px] mt-[20px] flex flex-col items-stretch gap-[6px] px-[32px] md:px-[10px] md:w-full">
            <Accordion
              label="1. How to Play"
              contentClassName=""
              defaultExpand={true}
            >
              <div className="pb-[10px]">
                Predict the next move of the ETH/USDT price — will it rise or fall in the upcoming steps?
                <br /><br />
                Choose your wager (50 / 200 / 500 MON) and place it on the grid where you believe the price will go.
              </div>
            </Accordion>
            <Accordion
              label="2. Winning Rule"
              contentClassName=""
              defaultExpand={true}
            >
              <div className="pb-[10px]">
                If the price reaches your chosen grid, you win:
                <br /><br />
                Reward = <strong className="text-white">Multiplier</strong> × <strong className="text-white">Bet Amount</strong>
                <br /><br />
                The farther your grid is from the current price, the higher the multiplier — higher risk, higher reward.
              </div>
            </Accordion>
            <Accordion
              label="3. Jump In Anytime"
              contentClassName=""
              defaultExpand={true}
            >
              <div className="pb-[10px]">
                No fixed rounds. Enter or exit at any moment, and track the market in real time.
                <br /><br />
                Every move is a voyage — will you chart the right path?
              </div>
            </Accordion>
          </div>
          <div className="mt-[15px] text-[#A6A6DB] font-[SpaceGrotesk] text-[16px] font-normal leading-[120%] px-[32px] md:px-[10px] pb-[32px]">
            <strong className="text-white">Note:</strong> Prices are sourced from Binance. Multipliers are capped to ensure fairness.
            <br /><br />
            Predict wisely, play boldly, and enjoy the adventure with Chart Voyager!
          </div>
        </div>
      </MonadBaseCard>
    </Modal>
  );
};

export default RulesModal;

