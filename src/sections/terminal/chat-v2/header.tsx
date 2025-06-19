import clsx from "clsx";
// import { useDisconnect } from "wagmi";
// import { formatLongText } from "@/utils/utils";
// import { useRequest } from "ahooks";
import { numberFormatter } from "@/utils/number-formatter";
import useIsMobile from "@/hooks/use-isMobile";
// import LevelPanel from "@/sections/terminal/components/footer/level-panel";
// import Popover, {
//   PopoverPlacement,
//   PopoverTrigger
// } from "@/components/popover";

const ChatHeader = (props: any) => {
  const { className, currentUser, onlineUsers, onLoginOut } = props;

  const isMobile = useIsMobile();

  return (
    <div
      className={clsx(
        "sticky md:relative md:shrink-0 md:bg-[url('/images/terminal/bg-mobile-header.svg')] md:bg-no-repeat md:bg-cover md:bg-[position:center_-15px] top-0 z-[120] w-full py-[20px] md:pt-[38px] md:pb-0 pl-[30px] md:pl-[8px] pr-[34px] md:pr-[3px] flex justify-between items-center font-Pixelmix text-xs text-[#8D7CFF] font-normal leading-[200%]",
        className
      )}
    >
      {
        isMobile && (
          <div className="absolute left-0 top-0 w-full h-[26px] bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.00)_100%)] pointer-events-none" />
        )
      }
      <div className="flex items-center gap-[15px]">
        <div className="text-[#0F1]">
          {numberFormatter(onlineUsers, 0, true)} Active
        </div>
        {/* <div className="">|</div> */}
        {/* <Popover
          content={
            <LevelPanel className="font-Pixelmix !w-[452px] !text-[#E7E2FF] !p-[9px_15px_11px_15px]" />
          }
          placement={PopoverPlacement.BottomLeft}
          trigger={PopoverTrigger.Hover}
        >
          <div className="">[Meaning of marks]</div>
        </Popover> */}
      </div>
      <div className="flex items-center justify-end gap-[8px]">
        <div className="">
          {!isMobile && "Account: "}<span className="text-[#0F1]">@{currentUser.name}</span>
        </div>
        <button
          data-bp="1006-002"
          type="button"
          className="w-[14px] h-[14px] shrink-0 bg-[url('/images/terminal/icon-logout.svg')] bg-no-repeat bg-contain bg-center disabled:opacity-30 disabled:!cursor-not-allowed"
          onClick={onLoginOut}
        />
      </div>
    </div>
  );
};

export default ChatHeader;
