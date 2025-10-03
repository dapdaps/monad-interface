import { Monster, MONSTERS } from "@/sections/arcade/guess-who/config";
import { numberFormatter } from "@/utils/number-formatter";
import { useDebounceFn } from "ahooks";
import Big from "big.js";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const GuessWhoNotification = (props: any) => {
  const { open, onClose, room } = props;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  useEffect(() => {
    setVisible(open);
  }, [open]);

  return (
    <AnimatePresence>
      {
        visible && (
          <Content
            onClose={handleClose}
            room={room}
            audioRef={audioRef}
          />
        )
      }
      <audio
        ref={audioRef}
        controls={false}
        autoPlay={false}
        loop={false}
        preload="auto"
        className="absolute w-0 h-0 black opacity-0 z-[-100] pointer-events-none"
      >
        <source
          src="/audios/mainnet/arcade/guess-who/win.mp3"
          type="audio/mp3"
        />
      </audio>
    </AnimatePresence>
  );
};

export default GuessWhoNotification;

const Content = (props: any) => {
  const { onClose, room, audioRef } = props;

  const pathname = usePathname();

  const [position, styles] = useMemo(() => {
    if (pathname === "/arcade") {
      return ["center", {
        bottom: 62,
        left: "50%",
        x: "-50%",
      }];
    }
    return ["right", {
      bottom: 62,
      right: 0,
    }];
  }, [pathname]);

  const { run: handleClose } = useDebounceFn(() => {
    onClose();
  }, { wait: 10000 });

  useEffect(() => {
    handleClose();

    if (!audioRef.current) {
      return;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    return () => {
      audioRef.current.pause();
    };
  }, []);

  return (
    <motion.div
      className="w-[273px] h-[68px] fixed text-white font-[600] flex flex-col justify-center gap-[0px] pl-[60px] bg-[url('/images/mainnet/arcade/guess-who/bg-guess-who-toast.png')] bg-no-repeat bg-center bg-contain"
      style={styles}
      initial={position === "right" ? {
        x: "150%",
      } : { y: 200 }}
      animate={position === "right" ? {
        x: 0,
      } : { y: 0 }}
      exit={position === "right" ? {
        x: "150%",
      } : { y: 200 }}
    >
      <div className="absolute left-[-42px] flex justify-center items-center">
        <img
          src="/images/mainnet/arcade/guess-who/ufo3.png"
          alt=""
          className="w-[119px] h-[107px] object-center object-contain shrink-0"
        />
        <img
          src={MONSTERS[room?.winner_moves as Monster]?.avatar}
          alt=""
          className="w-[48px] h-[36px] rotate-[-15deg] object-center object-contain shrink-0 absolute translate-y-[10px]"
        />
      </div>
      <div className="">
        Game No.{room?.room_id} is opening
      </div>
      <div className="text-[#BFFF60] text-[14px]">
        Congrats! You win {numberFormatter(Big(room?.bet_amount || 0).times(3), 3, true, { isShort: true })} mon!
      </div>

    </motion.div>
  );
};
