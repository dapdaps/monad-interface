import Modal from "@/components/modal";
import NadsaPassCard from "./NadsaPassCard";

export default function NFT({
  isOpen,
  closeModal,
  className,
  onLoginOut
}: {
  isOpen: boolean;
  closeModal: () => void;
  className?: string;
  onLoginOut?: () => void;
}) {
  return (
    <Modal
      style={{
        background: "transparent",
        left: "auto",
        right: "10px"
      }}
      open={isOpen}
      isShowCloseIcon={false}
      onClose={closeModal}
      className={className}
    >
      <NadsaPassCard onLoginOut={onLoginOut} />
    </Modal>
  );
}
