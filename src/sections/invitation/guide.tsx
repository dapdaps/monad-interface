import Aboarding from "@/components/nft/Aboarding";
import Popover, {
  PopoverPlacement,
  PopoverTrigger
} from "@/components/popover";
import { useGuideStore } from "@/stores/guide";
import clsx from "clsx";

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

export const GuideEntry = (props: any) => {
  const { className } = props;

  const { setVisible, setIsMint } = useGuideStore();

  return (
    <Popover
      trigger={PopoverTrigger.Hover}
      placement={PopoverPlacement.Top}
      content={
        <div className="w-[220px] h-[77px] flex justify-center pt-[15px] bg-[url('/images/invitation/bg-popup.png')] bg-no-repeat bg-center bg-contain text-white font-Unbounded text-xs font-normal leading-[150%]">
          Who dropped this? <br />
          It looks very rare
        </div>
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
};
