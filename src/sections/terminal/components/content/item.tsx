import dayjs from "dayjs";
import Level from "./level";
import Typewriter from '@/sections/terminal/components/typewriter';

export default function Item({ message, user, onAnimationComplete }: any) {
  return (
    <div
      className="flex gap-[8px] text-[16px] leading-[200%]"
      style={{
        color: user?.role ? "#7B23FF" : "white"
      }}
    >
      <div className="shrink-0">
        [{dayjs(message.timestamp).format("HH:mm:ss")}] [{user?.name}]{" "}
        <Level level={user?.level} />:
      </div>
      <Typewriter
        text={message?.text ?? ""}
        onAnimationComplete={onAnimationComplete}
      />
    </div>
  );
}
