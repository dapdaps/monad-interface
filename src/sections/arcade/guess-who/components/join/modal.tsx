import Modal from "@/components/modal";
import Index from "./index";

const JoinRoomModal = (props: any) => {
  const { open, onClose, joining } = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="backdrop-blur-[5px]"
      isMaskClose={false}
      closeIconClassName="translate-y-[10px]"
      isShowCloseIcon={joining ? false : true}
    >
      <div className="w-[700px] h-[656px] shrink-0 bg-[url('/images/mainnet/arcade/guess-who/bg-modal.png')] bg-no-repeat bg-center bg-contain">
        <Index {...props} />
      </div>
    </Modal>
  );
};

export default JoinRoomModal;
