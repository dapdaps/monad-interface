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
              label="🪐 How to Play"
              contentClassName=""
              defaultExpand={true}
            >
              <ul className="list-disc pl-[15px] pb-[10px]">
                <li className="mb-[5px]">
                  ☄️ Somewhere in the galaxy, six completely unqualified creatures are hiding inside meteors: <strong className="text-white">Chog · Molandak · Salmonad · Mouch · Moyaki · Mokadel</strong>
                </li>
                <li className="mb-[5px]">
                  🌌 Each round, your meteor <strong className="text-white">spits out 3 random creatures.</strong> No one knows which three
                </li>
                <li className="mb-[5px]">
                  👁️ Pick <strong className="text-white">1 or up to 2</strong> of them to bet on — trust your gut, your vibes, or whatever cosmic nonsense you believe in.
                </li>
                <li className="mb-[5px]">
                  💰 <strong className="text-white">Minimum bet: 50 MON</strong>
                </li>
                <li className="mb-[5px]">
                  🛸 Up to <strong className="text-white">3 players</strong> can join each round. Once it’s full, boom — <strong className="text-white">locked</strong>.
                </li>
                <li className="mb-[5px]">
                  🎲 The smart contract then reveals the <strong className="text-white">actual creature crawling out of the meteor.</strong>
                </li>
                <li className="mb-[5px]">
                  🏆 <strong className="text-white">Guess right? You take the whole pot. Guess wrong? The aliens giggle quietly.</strong>
                </li>
                <li className="mb-[5px]">
                  💼 A <strong className="text-white">6.9% platform fee</strong> is taken from the winnings — because even space creatures pay taxes.
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
                  💸 All bets are <strong className="text-white">fully refunded — no fees, no drama.</strong>
                </li>
              </ul>
            </Accordion>
          </div>
          <div className="mt-[15px]  text-[#A6A6DB] font-[SpaceGrotesk] text-[16px] font-normal leading-[120%] px-[32px]">
            ✨ So… which cosmic gremlin is about to pop out this time? Place your bets and let the <strong className="text-white">space chaos</strong> begin! 🚀👾
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
