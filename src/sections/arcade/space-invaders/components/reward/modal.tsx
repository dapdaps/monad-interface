import MonadBaseCard from "@/components/card/monad-base-card";
import Modal from "@/components/modal";
import Index from "./index";
import { useSpaceInvadersContext } from "../../context";
// import IconClose from "@public/images/arcade/space-invaders/icon-close.svg";

const RewardModal = (props: any) => {
  const { } = props;

  const {
    rewardVisible,
    setRewardVisible,
  } = useSpaceInvadersContext();

  return (
    <Modal
      open={rewardVisible}
      onClose={() => {
        setRewardVisible?.(false);
      }}
      // closeIcon={<IconClose />}
      closeIconClassName="!right-[25px]"
    >
      <MonadBaseCard
        className="w-[506px]"
        contentClassName=""
      >
        <Index {...props} />
      </MonadBaseCard>
    </Modal>
  );
};

export default RewardModal;
