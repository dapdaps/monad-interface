import MonadBaseCard from "@/components/card/monad-base-card";
import Modal from "@/components/modal";
import Index from "./index";

const RewardModal = (props: any) => {
  const { rewardVisible, setRewardVisible, nft } = props;


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
        className="w-[506px] md:w-full"
        contentClassName=""
      >
        <Index {...props} />
      </MonadBaseCard>
    </Modal>
  );
};

export default RewardModal;
