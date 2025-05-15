import Tooltip from "@/components/tooltip";
import LevelPanel from "./level-panel";

export default function Footer() {
  return (
    <div className="mx-[50px] pt-[6px] border-t border-[#7B23FF] h-[50px] flex justify-between text-[12px] text-[#7B23FF]">
      <div className="flex gap-[13px]">
        <span>123 Active</span>
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
              cursor: 'url("/images/chat/cursor-pointer.svg"), auto'
            }}
          >
            [Meaning of marks]
          </span>
        </Tooltip>
      </div>
      <div>MONADVERSE: 12:16:20 | MISSION: 00:12:53 | SIGNAL DELAY: 60s</div>
    </div>
  );
}
