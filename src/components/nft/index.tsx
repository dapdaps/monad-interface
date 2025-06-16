import Modal from "@/components/modal";
import NadsaPassCard from "./NadsaPassCard";
import Link from "next/link";
import clsx from "clsx";

export default function NFT({
  isOpen,
  closeModal,
  className,
  cardClassName,
  innerClassName,
  contentClassName,
  isHomepageLink = true,
  isShowCloseIcon = false,
  style,
  onLoginOut
}: {
  isOpen: boolean;
  closeModal: () => void;
  className?: string;
  cardClassName?: string;
  innerClassName?: string;
  contentClassName?: string;
  isHomepageLink?: boolean;
  isShowCloseIcon?: boolean;
  style?: React.CSSProperties;
  onLoginOut?: () => void;
}) {
  return (
    <Modal
      style={{
        background: "transparent",
        left: "auto",
        right: "10px",
        ...style,
      }}
      open={isOpen}
      isShowCloseIcon={isShowCloseIcon}
      onClose={closeModal}
      className={className}
      innerClassName={clsx("flex flex-col items-center gap-[30px]", innerClassName)}
      contentClassName={clsx(contentClassName)}
    >
      <NadsaPassCard onLoginOut={onLoginOut} className={cardClassName} />
      {
        isHomepageLink && (
          <LandingNadsa className="" />
        )
      }
    </Modal>
  );
}

export const LandingNadsa = ({ className }: { className?: string }) => {
  return (
    <Link href="/" prefetch={true} className={clsx("flex justify-center items-end w-[290px] h-[132px] bg-[url('/images/terminal/bg-landing-homepage.png')] bg-no-repeat bg-center bg-contain text-white text-[16px] font-Pixelmix font-normal leading-[200%] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]", className)}>
      <div className="pb-[14px]">LANDING NADSA &gt;</div>
    </Link>
  );
};
