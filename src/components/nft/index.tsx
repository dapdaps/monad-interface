import Modal from "@/components/modal";
import NadsaPassCard from "./NadsaPassCard";
import Link from "next/link";

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
      innerClassName="flex flex-col items-center gap-[30px]"
    >
      <NadsaPassCard onLoginOut={onLoginOut} />
      <Link href="/" prefetch={true} className="flex justify-center items-end w-[290px] h-[132px] bg-[url('/images/terminal/bg-landing-homepage.png')] bg-no-repeat bg-center bg-contain text-white text-[16px] font-Pixelmix font-normal leading-[200%] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <div className="pb-[14px]">LANDING NADSA &gt;</div>
      </Link>
    </Modal>
  );
}
