import { useNotification } from "@/hooks/use-notification";
import { IconUnreadNotification } from "../icons";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import Empty from "@/components/empty";

const NotitficationPanel = (props: any) => {
  const { } = props;

  const { getList, list, loading, accountWithAk, hasMore } = useNotification();

  useEffect(() => {
    getList();
  }, [accountWithAk]);

  return (
    <div
      className={`
        w-[400px]
        h-[495px]
        flex-shrink-0
        rounded-[4px]
        border border-[#34304B]
        bg-[linear-gradient(180deg,_#1D1A2E_0%,_#252532_67.99%)]
        shadow-[0_0_10px_0_rgba(0,0,0,0.25)]
        backdrop-blur-[15px]
        text-[#8E97AD]
        font-Oxanium
        text-[14px]
        font-[400]
        leading-[100%]
        not-italic
        py-[18px]
        flex flex-col items-stretch gap-[8px]
      `}
    >
      <div className="shrink-0 text-white text-[16px] font-[600] leading-[100%] px-[15px]">
        Notification Center
      </div>
      <div className="h-0 flex-1 overflow-y-auto flex flex-col gap-[5px]">
        {
          list?.length > 0 ? list.map((item, index) => (
            <NotificationItem
              key={index}
              data={item}
            />
          )) : (
            !loading && (
              <div className="mt-[50px]">
                <Empty desc="No notifications yet" />
              </div>
            )
          )
        }
        {
          loading && (
            <div className="w-full p-[15px_13px_10px_15px] flex justify-between gap-[10px]">
              <div className="w-0 flex-1">
                <Skeleton width="100%" height={18} borderRadius={4} />
                <Skeleton width="100%" height={14} borderRadius={4} className="mt-[8.5px]" />
                <div className="flex justify-between items-center gap-[10px] mt-[10px]">
                  <Skeleton width={85} height={14} borderRadius={4} />
                  <Skeleton width={85} height={14} borderRadius={4} />
                </div>
              </div>
              <div className="shrink-0">
                <div className="w-[11px]"></div>
              </div>
            </div>
          )
        }
        {
          hasMore && list?.length > 0 && (
            <button
              type="button"
              className="my-[15px] text-center font-[400] underline underline-offset-1"
              disabled={loading}
              onClick={() => {
                getList(list[list.length - 1].created_at);
              }}
            >
              View more
            </button>
          )
        }
      </div>
    </div >
  );
};

export default NotitficationPanel;

const NotificationItem = (props: any) => {
  const { data } = props;

  return (
    <div className="w-full p-[15px_13px_10px_15px] hover:bg-[#121219] duration-150 cursor-default flex justify-between gap-[10px]">
      <div className="w-0 flex-1">
        <div className="text-white text-[16px] leading-[120%] font-[500] whitespace-nowrap overflow-hidden text-ellipsis w-full">
          {data.title}
        </div>
        <div className="w-full mt-[8.5px]">
          {data.content}
        </div>
        <div className="w-full flex justify-between items-center gap-[10px] mt-[10px]">
          <div className="">
            1 min
          </div>
          {
            !!data.link && (
              <a
                href={data.link}
                target={/^https?:\/\//.test(data.link) ? "_blank" : "_self"}
                className="underline"
              >
                Check
              </a>
            )
          }
        </div>
      </div>
      {
        !!data.unread ? (
          <IconUnreadNotification />
        ) : <div className="w-[11px]"></div>
      }
    </div>
  );
};
