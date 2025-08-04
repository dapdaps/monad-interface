import MonadBaseCard from "@/components/card/monad-base-card";
import Modal from "@/components/modal";
import Index from "./index";
import { useSpaceInvadersContext } from "../../context";
import IconClose from "@public/images/arcade/space-invaders/icon-close.svg";

const VerifierModal = (props: any) => {
  const { } = props;

  const {
    verifierVisible,
    onVerifierClose,
  } = useSpaceInvadersContext();

  return (
    <Modal
      open={verifierVisible}
      onClose={onVerifierClose}
      closeIcon={<IconClose />}
      closeIconClassName="!right-[25px]"
    >
      <MonadBaseCard
        className="w-[506px]"
        contentClassName="max-h-[75dvh] overflow-y-auto"
      >
        <Index {...props} />
      </MonadBaseCard>
    </Modal>
  );
};

export default VerifierModal;
