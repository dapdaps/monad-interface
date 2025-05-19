import clsx from 'clsx';
import { motion } from 'framer-motion';

const ChatCard = (props: any) => {
  const { className, innerClassName, children } = props;

  return (
    <>
      <motion.div
        className={clsx("relative z-[1] bg-[url('/images/terminal/card.svg')] bg-no-repeat bg-center bg-contain w-[1085px] h-[801px] ml-[50%] -translate-x-1/2", className)}
        style={{
          x: "-50%",
        }}
        initial={{
          x: "-50%",
          scale: 0,
        }}
        animate={{
          x: "-50%",
          scale: 1,
        }}
        transition={{
          delay: 0.3,
          times: [0, 0.5, 0.7, 1],
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <div
          style={{ clipPath: "url(#bgblur_0_34846_555_clip_path)" }}
          className={clsx("w-full h-full backdrop-blur-[5px] rounded-[20px] rounded-tl-[0]", innerClassName)}
        >
          {children}
        </div>
      </motion.div>
      <svg width={0} height={0}>
        <defs>
          <clipPath id="bgblur_0_34846_555_clip_path" transform="translate(-0.5 -0.5)">
            <path d="M31 51C31 39.9543 39.9543 31 51 31H172.112C177.181 31 182.06 32.9246 185.764 36.3847L215.986 64.6153C219.69 68.0754 224.569 70 229.638 70H1034C1045.05 70 1054 78.9543 1054 90V750C1054 761.046 1045.05 770 1034 770H51C39.9543 770 31 761.046 31 750V51Z"/>
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export default ChatCard;
