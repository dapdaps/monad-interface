import { useState, useRef } from "react";
import { motion } from "framer-motion";

const MovingGif: {
  Moving1st: typeof Moving1st;
  Moving2sec: typeof Moving2sec;
  Moving3rd: typeof Moving3rd;
} = {} as {
  Moving1st: typeof Moving1st;
  Moving2sec: typeof Moving2sec;
  Moving3rd: typeof Moving3rd;
}

function Moving1st() {
  const [gifSrc, setGifSrc] = useState("/images/monad/icon/role-3.gif");
  const directionRef = useRef<"left" | "right">("right");

  return (
    <motion.img
      src={gifSrc}
      className="w-[96px] h-[107px]"
      initial={{ x: 0, y: 0, rotate: 1, }} 
      animate={{
        x: [0, -300],
        y: [0, -100],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 8,
            ease: "linear"
          },
          y: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 8,
            ease: "linear"
          }
        }
      }}
      onUpdate={(latest) => {
        if (Number(latest.x) >= -10 && directionRef.current !== "left") {
          setGifSrc("/images/monad/icon/role-3-back.gif"); 
          directionRef.current = "left";
        } else if (Number(latest.x) <= -290 && directionRef.current !== "right") {
          setGifSrc("/images/monad/icon/role-3.gif"); 
          directionRef.current = "right";
        }
      }}
      style={{ 
        position: "absolute", 
        bottom: "72px", 
        left: "270px",
        zIndex: 28,
      }}
      alt=""
    />
  );
}

function Moving2sec() {
  const [gifSrc, setGifSrc] = useState("/images/monad/icon/role-2-back.gif");
  const directionRef = useRef<"left" | "right">("right");

  return (
    <motion.img
      src={gifSrc}
      className="w-[90px] h-[107px]"
      initial={{ x: 0, y: 0, rotate: 1, scaleX: 1 }} 
      animate={{
        x: [0, -240],
        y: [0, 40],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 8,
            ease: "linear"
          },
          y: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 8,
            ease: "linear"
          }
        }
      }}
      onUpdate={(latest) => {
        if (Number(latest.x) >= -10 && directionRef.current !== "left") {
          setGifSrc("/images/monad/icon/role-2-back.gif"); 
          directionRef.current = "left";
        } else if (Number(latest.x) <= -235 && directionRef.current !== "right") {
          setGifSrc("/images/monad/icon/role-2.gif"); 
          directionRef.current = "right";
        }
      }}
      style={{ 
        position: "absolute", 
        top: 0, 
        left: '50%',
        zIndex: 1,
      }}
      alt=""
    />
  );
}

function Moving3rd() {
  const [gifSrc, setGifSrc] = useState("/images/monad/icon/role-1.gif");
  const directionRef = useRef<"left" | "right">("right");

  return (
    <motion.img
      src={gifSrc}
      className="w-[90px] h-[107px]"
      initial={{ x: 0, y: 0, rotate: 1, scaleX: 1 }} 
      animate={{
        x: [0, 400],
        y: [0, -80],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 8,
            ease: "linear"
          },
          y: {
            repeat: Infinity,
            repeatType: "reverse",
            duration: 8,
            ease: "linear"
          }
        }
      }}
      onUpdate={(latest) => {
        if (Number(latest.x) < 10 && directionRef.current !== "left") {
          setGifSrc("/images/monad/icon/role-2.gif"); 
          directionRef.current = "left";
        } else if (Number(latest.x) >= 380 && directionRef.current !== "right") {
          setGifSrc("/images/monad/icon/role-1.gif"); 
          directionRef.current = "right";
        }
      }}
      style={{ 
        position: "absolute", 
        bottom: '28%', 
        right: '45%',
        zIndex: 6,
      }}
      alt=""
    />
  );
}


MovingGif.Moving1st = Moving1st;
MovingGif.Moving2sec = Moving2sec;
MovingGif.Moving3rd = Moving3rd;


export default MovingGif;