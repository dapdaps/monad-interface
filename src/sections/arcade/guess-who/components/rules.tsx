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
          <div className="font-[DelaGothicOne] text-[20px] flex items-center gap-[10px] px-[32px] md:px-[10px]">
            <div className="">
              Guess Who
            </div>
          </div>
          <div className="mt-[20px] px-[32px] md:px-[10px] text-[#A6A6DB]">
            Welcome to Guess Who 👾
          </div>
          <div className="w-[666px] mt-[15px] flex flex-col items-stretch gap-[6px] px-[22px] md:px-[10px] md:w-full">
            <Accordion
              label="👽 How to Play"
              contentClassName=""
              defaultExpand={true}
            >
              <ul className="list-disc pl-[15px] pb-[10px]">
                <li className="mb-[5px]">
                  🛸 <strong className="text-white">Up to 3 players</strong> can join each round.
                </li>
                <li className="mb-[5px]">
                  👁️ Pick <strong className="text-white">1, 2, or 3 alien eyes</strong> — you can even pick multiple!
                </li>
                <li className="mb-[5px]">
                  🔒 Once all players are in, the round locks.
                </li>
                <li className="mb-[5px]">
                  🎲 The <strong className="text-white">smart contract randomly reveals</strong> one alien — fair and square!
                </li>
                <li className="mb-[5px]">
                  🏆 <strong className="text-white">Only players who picked the winning eye take the entire pot.</strong> No ties, no splitting!
                </li>
                <li className="mb-[5px]">
                  💰 Platform takes a <strong className="text-white">6.9% fee</strong> from the winnings.
                </li>
              </ul>
            </Accordion>
            <Accordion
              label="🔄 Special Rule"
              contentClassName=""
              defaultExpand={true}
            >
              <ul className="list-disc pl-[15px] pb-[10px]">
                <li className="mb-[5px]">
                  ⏳ If the round doesn’t fill within <strong className="text-white">24 hours</strong>, any joined player can cancel.
                </li>
                <li className="mb-[5px]">
                  💸 All bets are refunded <strong className="text-white">without fees</strong>.
                </li>
              </ul>
            </Accordion>
          </div>
          <div className="mt-[15px]  text-[#A6A6DB] font-[SpaceGrotesk] text-[16px] font-normal leading-[120%] px-[32px]">
            ✨ Are you ready to guess which alien eye will win? Let the cosmic fun begin! 👽🎉
          </div>
        </div>
      </MonadBaseCard>
    </Modal>
  );
};

export default RulesModal;

const Label = (props: any) => {
  const { className, icon, children } = props;

  return (
    <div className={clsx("flex items-center gap-[5px]", className)}>
      <img
        src={icon}
        className="w-[24px] h-[24px] object-contain object-center shrink-0"
      />
      <div className="">
        {children}
      </div>
    </div>
  );
};
