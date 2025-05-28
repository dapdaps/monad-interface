import clsx from "clsx";
// import { useDisconnect } from "wagmi";
// import { formatLongText } from "@/utils/utils";
// import { useRequest } from "ahooks";
import { numberFormatter } from "@/utils/number-formatter";
// import LevelPanel from "@/sections/terminal/components/footer/level-panel";
// import Popover, {
//   PopoverPlacement,
//   PopoverTrigger
// } from "@/components/popover";

const ChatHeader = (props: any) => {
  const { className, currentUser, onlineUsers, onLoginOut } = props;

  return (
    <div
      className={clsx(
        "sticky top-0 z-[120] w-full py-[20px] pl-[30px] pr-[34px] flex justify-between items-center font-Pixelmix text-xs text-[#8D7CFF] font-normal leading-[200%]",
        className
      )}
    >
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
          Account: <span className="text-[#0F1]">@{currentUser.name}</span>
        </div>
        <button
          type="button"
          className="w-[14px] h-[14px] shrink-0 bg-[url('/images/terminal/icon-logout.svg')] bg-no-repeat bg-contain bg-center disabled:opacity-30 disabled:!cursor-not-allowed"
          onClick={onLoginOut}
        />
      </div>
    </div>
  );
};

export default ChatHeader;
