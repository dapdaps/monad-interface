import { useDebounceFn } from "ahooks";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const GuessWhoToast = (props: any) => {
  const { } = props;

  const [visible, setVisible] = useState(false);

  const { run: handleOpen, cancel: cancelOpen } = useDebounceFn(() => {
    setVisible(true);
  }, { wait: 5000 });

  useEffect(() => {
    handleOpen();

    return () => {
      cancelOpen();
    };
  }, []);

  return (
    <AnimatePresence>
      {
        visible && (
          <Content setVisible={setVisible} />
        )
      }
    </AnimatePresence>
  );
};

export default GuessWhoToast;

const Content = (props: any) => {
  const { setVisible } = props;

  const { run: handleClose } = useDebounceFn(() => {
    setVisible(false);
  }, { wait: 5000 });

  useEffect(() => {
    handleClose();
  }, []);

  return (
    <motion.div
      className="w-[273px] h-[68px] fixed right-0 bottom-[62px] text-white font-[600] flex flex-col justify-center gap-[0px] pl-[60px] bg-[url('/images/mainnet/arcade/guess-who/bg-guess-who-toast.png')] bg-no-repeat bg-center bg-contain"
      initial={{
        x: "150%",
      }}
      animate={{
        x: 0,
      }}
      exit={{
        x: "150%",
      }}
    >
      <img
        src="/images/mainnet/arcade/guess-who/ufo3.png"
        alt=""
        className="w-[119px] h-[107px] object-center object-contain shrink-0 absolute left-[-42px]"
      />
      <div className="">
        Game No.32624 is opening
      </div>
      <div className="text-[#BFFF60] text-[14px]">
        Congrats! You win 3 mon!
      </div>
    </motion.div>
  );
};
