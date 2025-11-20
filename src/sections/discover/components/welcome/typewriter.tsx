import dayjs from "@/libs/day";
import Typewriter from "@/sections/terminal/components/typewriter";
import clsx from "clsx";

const WelcomeTypewriter = (props: any) => {
  const { message, className, onAnimationComplete } = props;

  if (!message) return null;

  return (
    <div className={clsx("w-full flex gap-[10px] text-[14px]", className)}>
      <div className="shrink-0 text-[#8D7CFF]">
        [{dayjs(message.timestamp).format("HH:mm:ss")}] [{message.role}]:
      </div>
      <Typewriter
        text={message.text}
        onAnimationComplete={onAnimationComplete}
        charStyle={message.charStyle}
      />
    </div>
  );
};

export default WelcomeTypewriter;
