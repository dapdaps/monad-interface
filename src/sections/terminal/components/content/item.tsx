import dayjs from "dayjs";
import Level from "./level";
import Typewriter from "@/sections/terminal/components/typewriter";
import clsx from "clsx";
import { useEffect, useMemo } from "react";
import useIsMobile from "@/hooks/use-isMobile";

export default function Item({
  message,
  user,
  onAnimationComplete,
  className,
  isTypewriter = true,
  roleColor = "#7B23FF"
}: any) {
  const isMobile = useIsMobile();

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

  const text = useMemo(() => {
    if (typeof message?.text === "string") {
      return message?.text;
    }
    if (typeof message?.content === "string") {
      return message?.content;
    }
    if (typeof message?._lctext === "string") {
      return message?._lctext;
    }
    return "";
  }, [message]);

  if (isMobile) {
    return (
      <div
        className={clsx("text-[16px] leading-[200%]", className)}
        style={{
          color: user?.role ? roleColor : "white"
        }}
      >
        <span>
          [{dayjs(message.timestamp).format("HH:mm:ss")}] [
          {user?.role ? user.role.toUpperCase() : user?.name}]
          {!!user?.level ? " " : ""}
          <Level level={user?.level} />:
        </span>
        <span className="ml-[8px]">
          {isTypewriter ? (
            <Typewriter
              text={text}
              onAnimationComplete={onAnimationComplete}
              style={{ display: "inline" }}
              contentClassName="inline"
            />
          ) : text.split("\n").map((item: string, index: number) => (
            <span key={index}>{item}</span>
          ))}
        </span>
      </div>
    );
  }

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
        <Typewriter text={text} onAnimationComplete={onAnimationComplete} />
      ) : (
        <div>
          {text.split("\n").map((item: string, index: number) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
}
