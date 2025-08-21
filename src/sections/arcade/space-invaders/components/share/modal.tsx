import Modal from "@/components/modal";
import { useSpaceInvadersContext } from "../../context";
import MonadBaseCard from "@/components/card/monad-base-card";
import Index from "./index";

const ShareModal = (props: any) => {
  const { className } = props;

  const {
    shareVisible,
    setShareVisible,
  } = useSpaceInvadersContext();

  return (
    <Modal
      open={shareVisible}
      onClose={() => {
        setShareVisible?.(false);
      }}
      closeIconClassName="!right-[25px]"
    >
      <MonadBaseCard
        className="w-[595px] md:w-full"
        contentClassName=""
      >
        <Index {...props} />
      </MonadBaseCard>
    </Modal>
  );
};

export default ShareModal;
