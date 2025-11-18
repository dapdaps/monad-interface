import Popover, { PopoverPlacement, PopoverTrigger } from "@/components/popover";
import { IconNotification, IconUnreadNotification } from "../icons";
import NotitficationPanel from "./panel";
import { useNotification } from "@/hooks/use-notification";
import { useEffect } from "react";

const Notification = () => {
  const { unread, getUnread } = useNotification();

  useEffect(() => {
    getUnread();
  }, []);

  return (
    <Popover
      trigger={PopoverTrigger.Click}
      placement={PopoverPlacement.BottomRight}
      content={<NotitficationPanel />}
    >
      <div className="relative">
        <IconNotification className="cursor-pointer mt-[10px] shrink-0 w-[30px] h-[30px]" />
        {
          unread > 0 && (
            <IconUnreadNotification className="absolute top-[4px] right-[4px]" />
          )
        }
      </div>
    </Popover>
  );
};

export default Notification;
