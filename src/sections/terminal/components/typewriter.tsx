import { motion } from "framer-motion";
import { useMemo } from 'react';

export const letterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
};

const Typewriter = ({ text, ...rest }: any) => {

  const staggerChildren = useMemo(() => {
    const length = text.length;
    let number;

    if (length <= 10) {
      number = 0.2 - (length / 10) * 0.14;
    } else {
      number = 0.06 - ((length - 10) / 10) * 0.01;
    }

    return Math.max(0.005, Math.min(0.2, number));
  }, []);

  return (
    <motion.p
      key={text}
      className="text-white"
      variants={{
        hidden: {},
        visible: { opacity: 1, transition: { staggerChildren } },
      }}
      initial="hidden"
      animate="visible"
      {...rest}
    >
      {text.split("").map((char: any, i: number) => (
        <motion.span key={`${char}-${i}`} variants={letterVariants}>
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
};

export default Typewriter;
