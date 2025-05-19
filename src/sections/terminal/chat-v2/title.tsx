import clsx from 'clsx';
import { motion } from 'framer-motion';

const ChatTitle = (props: any) => {
  const { className, delay = 0, ...restProps } = props;

  return (
    <motion.div
      className={clsx("text-[#E7E2FF] text-center whitespace-nowrap text-[110px] font-HackerNoonV2 font-normal leading-[90%] [text-shadow:0px_0px_30px_#836EF9]", className)}
      animate={{
        // textShadow: [
        //   "0px 0px 30px #836EF9",
        //   "0px 0px 15px #836EF9",
        //   "0px 0px 30px #836EF9",
        //   "0px 0px 5px #836EF9",
        //   "0px 0px 30px #836EF9",
        // ],
        opacity: [1, 0.3, 1, 0.5, 1],
      }}
      transition={{
        repeat: Infinity,
        duration: 10,
        delay,
      }}
      {...restProps}
    >
      NADSA_TERMINAL
    </motion.div>
  );
};

export default ChatTitle;
