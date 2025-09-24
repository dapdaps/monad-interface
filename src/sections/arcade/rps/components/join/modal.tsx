import Modal from "@/components/modal";
import JoinRoom from "./index";
import MonadBaseCard from "@/components/card/monad-base-card";

const JoinRoomModal = (props: any) => {
  const { open, onClose } = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <MonadBaseCard
        className="w-[800px]"
        contentClassName="p-2"
      >
        <JoinRoom {...props} />
      </MonadBaseCard>
    </Modal>
  );
};

export default JoinRoomModal;
