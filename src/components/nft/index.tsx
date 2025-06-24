import Modal from "@/components/modal";
import NadsaPassCard from "./NadsaPassCard";
import Link from "next/link";
import clsx from "clsx";
import useClickTracking from "@/hooks/use-click-tracking";
import { useRouter } from "next/navigation";

export default function NFT({
  isOpen,
  closeModal,
  className,
  cardClassName,
  innerClassName,
  contentClassName,
  isHomepageLink = true,
  isShowCloseIcon = false,
  onLoginOut,
  style,
  isForceNormal
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
  isForceNormal?: boolean;
}) {
  return (
    <Modal
      style={{
        background: "transparent",
        left: "auto",
        right: "10px",
        ...style
      }}
      open={isOpen}
      isShowCloseIcon={isShowCloseIcon}
      onClose={closeModal}
      className={className}
      innerClassName={clsx(
        "flex flex-col items-center gap-[30px]",
        isForceNormal &&
          "top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 absolute",
        innerClassName
      )}
      contentClassName={clsx(contentClassName)}
      isForceNormal={isForceNormal}
    >
      <NadsaPassCard onLoginOut={onLoginOut} />
      {/* {
        isHomepageLink && (
          <LandingNadsa />
        )
      } */}
    </Modal>
  );
}

export const LandingNadsa = ({ className }: { className?: string }) => {
  const { handleReportWithoutDebounce } = useClickTracking()
  const { push } = useRouter()
  return (
    <div
      data-bp="1006-006"
      onClick={() => {
        handleReportWithoutDebounce("1006-006")
        setTimeout(() => {
          push('/')
        }, 100)
      }}
      className={clsx(
        "flex justify-center items-end w-[290px] h-[132px] bg-[url('/images/terminal/bg-landing-homepage.png')] bg-no-repeat bg-center bg-contain text-white text-[16px] font-Pixelmix font-normal leading-[200%] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]",
        className
      )}
    >
      <div className="pb-[14px]">LANDING NADSA &gt;</div>
    </div>
  );
};
