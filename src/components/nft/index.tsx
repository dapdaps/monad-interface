import Modal from "@/components/modal";
import NadsaPassCard from "./NadsaPassCard";

export default function NFT({ isOpen, closeModal }: { isOpen: boolean, closeModal: () => void }) {
  return (
    <Modal style={{ background: "transparent", left: 'auto', right: '10px' }} open={isOpen} isShowCloseIcon={false} onClose={closeModal} innerClassName="flex items-center justify-center" innerStyle={{ background: "transparent" }}>
      <NadsaPassCard />
    </Modal>
  );
}