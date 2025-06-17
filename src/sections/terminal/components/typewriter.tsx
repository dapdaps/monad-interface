import { motion } from "framer-motion";
import { useMemo } from "react";
import { useDebounceFn } from "ahooks";

export const letterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { opacity: { duration: 0 } } }
};

const WAIT = 150;

const Typewriter = ({ text, onAnimationComplete, contentClassName, ...rest }: any) => {
  const length = text?.length || 0;

  const staggerChildren = useMemo(() => {
    let number;

    if (length <= 10) {
      number = 0.1 - (length / 10) * 0.09;
    } else {
      number = 0.01 - ((length - 10) / 10) * 0.001;
    }

    return Math.max(0.001, Math.min(0.1, number));
  }, []);

  const { run: handleAnimationComplete, cancel } = useDebounceFn(
    onAnimationComplete,
    { wait: WAIT }
  );

  return (
    <motion.p
      key={text}
      className="break-all"
      variants={{
        hidden: {},
        visible: { opacity: 1, transition: { staggerChildren } }
      }}
      initial="hidden"
      animate="visible"
      onAnimationComplete={() => {
        cancel();
        handleAnimationComplete();
      }}
      {...rest}
    >
      {text.split("\n").map((item: string, index: number) => (
        <div key={index} className={contentClassName}>
          {item.split("").map((char: any, i: number) => (
            <motion.span key={`${char}-${i}`} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </div>
      ))}
    </motion.p>
  );
};

export default Typewriter;
