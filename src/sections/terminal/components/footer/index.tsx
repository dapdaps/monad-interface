import Tooltip from "@/components/tooltip";
import LevelPanel from "./level-panel";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Footer({ onlineUsers }: any) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(dayjs(Date.now()).format("HH:mm:ss"));
    });
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="mx-[50px] pt-[6px] border-t border-[#7B23FF] h-[50px] flex justify-between text-[12px] text-[#7B23FF]">
      <div className="flex gap-[13px]">
        <span>{onlineUsers} Active</span>
        <Tooltip
          tooltip={<LevelPanel />}
          style={{
            background: "none",
            fontFamily: "SpaceMono"
          }}
        >
          <span
            className="underline"
            style={{
              cursor: 'url("/images/terminal/cursor-pointer.svg"), auto'
            }}
          >
            [Meaning of marks]
          </span>
        </Tooltip>
      </div>
      <div>MONADVERSE: {time}</div>
    </div>
  );
}
