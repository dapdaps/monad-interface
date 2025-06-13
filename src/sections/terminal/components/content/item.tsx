import dayjs from "dayjs";
import Level from "./level";
import Typewriter from "@/sections/terminal/components/typewriter";
import clsx from "clsx";
import { useEffect } from "react";

export default function Item({
  message,
  user,
  onAnimationComplete,
  className,
  isTypewriter = true,
  roleColor = "#7B23FF"
}: any) {
  useEffect(() => {
    let timer: any;
    if (!isTypewriter) {
      timer = setTimeout(() => {
        clearTimeout(timer);
        onAnimationComplete?.();
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isTypewriter]);

  return (
    <div
      className={clsx("flex gap-[8px] text-[16px] leading-[200%]", className)}
      style={{
        color: user?.role ? roleColor : "white"
      }}
    >
      <div className="shrink-0">
        [{dayjs(message.timestamp).format("HH:mm:ss")}] [
        {user?.role ? user.role.toUpperCase() : user?.name}]
        {!!user?.level ? " " : ""}
        <Level level={user?.level} />:
      </div>
      {isTypewriter ? (
        <Typewriter
          text={(message?.text || message?.content) ?? ""}
          onAnimationComplete={onAnimationComplete}
        />
      ) : (
        <div>{(message?.text || message?.content) ?? ""}</div>
      )}
    </div>
  );
}
