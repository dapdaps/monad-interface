import clsx from "clsx";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/use-isMobile";

const ChatCard = (props: any) => {
  const { className, innerClassName, children } = props;

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <ChatCardMobile className={className} innerClassName={innerClassName}>
        {children}
      </ChatCardMobile>
    );
  }

  return (
    <>
      <motion.div
        className={clsx(
          "relative z-[1] bg-[url('/images/terminal/card.svg')] bg-no-repeat bg-center bg-contain w-[1085px] h-[801px] overflow-hidden",
          className
        )}
        {...JunmpIn}
      >
        <ScreenAnimate className={innerClassName} style={{ clipPath: "url(#bgblur_0_34846_555_clip_path)" }}>
          {children}
        </ScreenAnimate>
      </motion.div>
      <svg width={0} height={0}>
        <defs>
          <clipPath
            id="bgblur_0_34846_555_clip_path"
            transform="translate(-0.5 -0.5)"
          >
            <path d="M31 51C31 39.9543 39.9543 31 51 31H172.112C177.181 31 182.06 32.9246 185.764 36.3847L215.986 64.6153C219.69 68.0754 224.569 70 229.638 70H1034C1045.05 70 1054 78.9543 1054 90V750C1054 761.046 1045.05 770 1034 770H51C39.9543 770 31 761.046 31 750V51Z" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export default ChatCard;

export const ChatCardMobile = (props: any) => {
  const { className, innerClassName, children } = props;

  return (
    <motion.div
      className={clsx("w-full h-full relative z-[1] overflow-hidden flex flex-col items-stretch", className)}
      {...JunmpIn}
    >
      <div className="relative w-full h-[55px] shrink-0 bg-[url('/images/terminal/card-mobile-top.svg')] bg-no-repeat bg-bottom bg-contain">
      </div>
      <div className="relative w-full h-0 flex-1 bg-[url('/images/terminal/card-mobile-mid.svg')] bg-repeat-y bg-center bg-contain">
        <ScreenAnimate className={clsx("!rounded-[0]", innerClassName)} noiseClassName="!w-[calc(100%_+_40px)] !left-[-20px] !h-[calc(100%_+_40px)] !top-[-20px]">
          {children}
        </ScreenAnimate>
      </div>
      <div className="w-full h-[28px] shrink-0 bg-[url('/images/terminal/card-mobile-bot.svg')] bg-no-repeat bg-top bg-contain">

      </div>
    </motion.div>
  );
};

const JunmpIn = {
  initial: {
    scale: 0
  },
  animate: {
    scale: 1
  },
  transition: {
    delay: 0.3,
    times: [0, 0.5, 0.7, 1],
    type: "spring",
    stiffness: 300,
    damping: 20
  },
};

export const ScreenAnimate = (props: any) => {
  const { className, style, children, noiseClassName, isLine = true } = props;

  return (
    <div
      style={style}
      className={clsx(
        "w-full h-full backdrop-blur-[5px] rounded-[20px] rounded-tl-[0] bg-[repeating-linear-gradient(to_bottom,_transparent_0px,_rgba(255,255,255,0.05)_1px,_transparent_2px,_rgba(255,255,255,0.05)_3px)]",
        className
      )}
    >
      {
        isLine && (
          <div className="absolute pointer-events-none z-[0] w-full left-0 h-full top-0 overflow-hidden">
            <motion.div
              className="absolute z-[0] pointer-events-none w-full h-[5px] left-0 top-0 opacity-10 bg-[linear-gradient(to_bottom,_transparent,_rgba(255,255,255,0.3),_transparent)]"
              animate={{
                y: ["-100px", "1000px"]
              }}
              transition={{
                repeat: Infinity,
                duration: 10
              }}
            />
          </div>
        )
      }
      <div className="absolute pointer-events-none z-[0] w-full left-0 h-full top-0 overflow-hidden">
        <div className={clsx("noise pointer-events-none absolute z-[1] w-full left-0 h-full top-0 overflow-hidden", noiseClassName)}></div>
      </div>
      {children}
    </div>
  );
};
