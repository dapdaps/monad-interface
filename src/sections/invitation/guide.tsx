import Aboarding from "@/components/nft/Aboarding";
import Popover, {
  PopoverPlacement,
  PopoverTrigger
} from "@/components/popover";
import { useGuideStore } from "@/stores/guide";
import clsx from "clsx";
import useIsMobile from "@/hooks/use-isMobile";
import { forwardRef, useImperativeHandle, useRef } from "react";

const GuideView = () => {
  const {
    setVisitedIndex,
    getVisitedIndex,
    visible,
    setIsMint,
    setVisible,
    max,
    isMint
  } = useGuideStore();

  if (!visible) {
    return null
  }

  return (
    <Aboarding
      isOpen={visible}
      isMint={isMint}
      setVisitedIndex={setVisitedIndex}
      getVisitedIndex={getVisitedIndex}
      closeModal={() => {
        setVisible(false);
        setIsMint(false);
      }}
    />
  );
};

export default GuideView;

export const GuideEntry = forwardRef((props: any, ref: any) => {
  const { className } = props;

  const popoverRef = useRef<any>();

  const { setVisible, setIsMint } = useGuideStore();
  const isMobile = useIsMobile();

  const refs: any = {
    openPopover: () => {
      if (!popoverRef.current) return;
      popoverRef.current.onOpen();
    },
    closePopover: () => {
      if (!popoverRef.current) return;
      popoverRef.current.onClose();
    }
  };
  useImperativeHandle(ref, () => refs);

  return (
    <Popover
      ref={popoverRef}
      trigger={PopoverTrigger.Hover}
      placement={PopoverPlacement.Top}
      content={isMobile ? (
        <div className="w-[40px] h-[44px] pt-[12px] flex justify-center bg-[url('/images/invitation/bg-popup-mobile.png')] bg-no-repeat bg-center bg-contain text-[#FFF] font-Unbounded text-[12px] font-[400] leading-[150%]">
          <div className="rotate-[6.538deg]">?!</div>
        </div>
      ) : (
        <div className="w-[220px] h-[77px] flex justify-center pt-[15px] bg-[url('/images/invitation/bg-popup.png')] bg-no-repeat bg-center bg-contain text-white font-Unbounded text-xs font-normal leading-[150%]">
          Who dropped this? <br />
          It looks very rare
        </div>
      )
      }
      triggerContainerClassName={clsx(
        "w-[60px] h-[78px] shrink-0 rounded-[4px] border-2 border-[rgba(0,0,0,0)] hover:border-[#78FEFF] hover:shadow-[-10px_10px_0px_0px_rgba(0,_0,_0,_0.50)] hover:[transform:perspective(1000px)_rotateX(30deg)_rotateY(-30deg)_scale(1,_1.1)_skewX(40deg)_translateY(-4px)] transition-border duration-300 overflow-hidden shadow-[-6px_6px_0px_0px_rgba(0,_0,_0,_0.50)] [transform-style:preserve-3d] [transform:perspective(1000px)_rotateX(30deg)_rotateY(-30deg)_scale(1,_1.1)_skewX(40deg)] [transform-origin:bottom] [perspective-origin:60%_35%]",
        className
      )}
      closeDelayDuration={0}
    >
      <img
        src="/images/invitation/guide-entry.png"
        alt=""
        className="w-full h-full object-center object-contain cursor-pointer"
        onClick={() => {
          setIsMint(true);
          setVisible(true);
        }}
      />
    </Popover>
  );
});
