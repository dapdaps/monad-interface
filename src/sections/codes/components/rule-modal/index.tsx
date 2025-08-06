import Modal from "@/components/modal";
import useIsMobile from "@/hooks/use-isMobile";
import { useCodesContext } from "@/sections/codes/context";
import { memo } from "react";
export default memo(function RuleModal() {
  // const store = useFaucetStore()
  const { showRuleModal, setShowRuleModal } = useCodesContext();
  const isMobile = useIsMobile();
  return (
    <Modal
      open={showRuleModal}
      isForceNormal={true}
      closeIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="9"
          viewBox="0 0 10 9"
          fill="none"
        >
          <path
            d="M5 3.375L8 0H10L6 4.5L10 9H8L5 5.625L2 9H0L4 4.5L0 0H2L5 3.375Z"
            fill="#A6A6DB"
          />
        </svg>
      }
      className="flex items-center justify-center"
      closeIconClassName="absolute md:right-[17px] right-[25px] top-[12px] cursor-pointer md:translate-y-2"
      onClose={() => {
        setShowRuleModal(false);
      }}
    >
      <div className="relative flex flex-col items-stretch w-[832px] md:w-full h-[600px] md:h-[75dvh] font-Montserrat text-[16px] text-white leading-[200%] md:leading-[180%]">
        <div className="shrink-0 w-full h-[23px] bg-[url('/images/codes/rule-bg-bot.svg')] bg-no-repeat bg-top bg-[length:100%_23px] md:bg-contain rotate-180 translate-y-[1px]"></div>
        <div className="flex-1 h-0 w-full bg-[url('/images/codes/rule-bg-mid.svg')] bg-repeat-y bg-center bg-[length:100%_1px] md:bg-[length:auto]">
          <div className="absolute left-1/2 -top-[17px] -translate-x-1/2">
            <img src="/images/codes/rule_modal_title.svg" />
          </div>
          <div className="relative p-[52px_36px_21px] md:p-[20px_15px] flex flex-col z-10 h-full overflow-y-auto">
            <div className="flex items-center gap-[8px]">
              <img className="w-[20px]" src="/images/codes/icons/1.png" />
              <span className="font-bold">Invite Code Protocol</span>
            </div>
            <div>Welcome aboard, Commander.</div>
            <div>
              To access and distribute Invite Codes to the NADSA Space, you must
              first complete on-chain missions.
            </div>
            <div className="flex items-center gap-[8px]">
              <img className="w-[20px]" src="/images/codes/icons/2.png" />
              <span className="font-bold">How to Get Invite Codes</span>
            </div>
            <div>
              NADSA releases one mission every 24 hours. Complete the mission to
              unlock one invite code.
            </div>

            {/* <div className="flex items-center">
            <div className="m-[0_6px] w-[4px] h-[4px] rounded-full bg-white" />
            <div className="font-bold">3 transactions <span className="font-normal">→ Unlock</span> <span className="text-[#0F1]">+1</span> invite code</div>
          </div>

          <div className="flex items-center">
            <div className="m-[0_6px] w-[4px] h-[4px] rounded-full bg-white" />
            <div className="font-bold">10 transactions <span className="font-normal">→ Unlock</span> <span className="text-[#0F1]">+2</span> invite codes</div>
          </div>

          <div className="flex items-center">
            <div className="m-[0_6px] w-[4px] h-[4px] rounded-full bg-white" />
            <div className="font-bold">20 transactions <span className="font-normal">→ Unlock</span> <span className="text-[#0F1]">+3</span> invite codes</div>
          </div>

          <div className="flex items-center">
            <div className="m-[0_6px] w-[4px] h-[4px] rounded-full bg-white" />
            <div className="font-bold">50 transactions <span className="font-normal">→ Unlock</span> <span className="text-[#0F1]">+4</span> invite codes</div>
          </div>

          <div className="flex items-center">
            <div className="m-[0_6px] w-[4px] h-[4px] rounded-full bg-white" />
            <div className="font-bold">100 transactions <span className="font-normal">→ Unlock</span> <span className="text-[#0F1]">+5</span> invite codes</div>
          </div>

          <div className="flex items-center">
            <div className="m-[0_6px] w-[4px] h-[4px] rounded-full bg-white" />
            <div className="font-bold"><span className="font-normal">Beyond</span> 100: <span className="font-normal">Every additional</span> 20 transactions <span className="font-normal">→ Unlock</span> <span className="text-[#0F1]">+2</span> invite codes</div>
          </div>

          <div className="flex items-center gap-[8px]">
            <img className="w-[20px]" src="/images/codes/icons/3.png" />
            <span>Invite codes unlock cumulatively — reach higher milestones to receive more codes.</span>
          </div> */}

            <div className="flex items-center gap-[8px]">
              <img className="w-[20px]" src="/images/codes/icons/4.png" />
              <span className="font-bold">How Invite Codes Work</span>
            </div>

            <div className="flex items-center">
              <div className="m-[0_6px] w-[4px] h-[4px] rounded-full bg-white" />
              <div>
                Each invite code is 
                <span className="font-bold">single-use only</span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="m-[0_6px] w-[4px] h-[4px] rounded-full bg-white" />
              <div>
                When a new explorer joins NADSA Space using your code, their
                status is set to <span className="font-bold">Pending</span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="m-[0_6px] w-[4px] h-[4px] rounded-full bg-white" />
              <div>
                Once they complete 
                <span className="font-bold">1 transaction</span>, their status
                becomes <span className="font-bold">Active</span>
              </div>
            </div>

            <div className="flex items-center gap-[8px]">
              <img className="w-[20px]" src="/images/codes/icons/5.png" />
              <span className="font-bold">Rewards for Captains</span>
            </div>

            <div className="flex items-center">
              <div className="m-[0_6px] w-[4px] h-[4px] rounded-full bg-white" />
              <div>
                For every explorer you successfully activate, you'll receive 
                <span className="font-bold text-[#836EF9]">0.25 MON</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="m-[0_6px] w-[4px] h-[4px] rounded-full bg-white" />
              <div>Rewards must be manually claimed on this page</div>
            </div>

            <div className="flex items-center gap-[8px]">
              <img className="w-[20px]" src="/images/codes/icons/6.png" />
              <span>
                Claim your rewards and expand your influence across the stars.
              </span>
            </div>
          </div>
        </div>
        <div className="shrink-0 w-full h-[23px] bg-[url('/images/codes/rule-bg-bot.svg')] bg-no-repeat bg-top bg-[length:100%_23px] md:bg-contain -translate-y-[1px]"></div>
      </div>
    </Modal>
  );
});
