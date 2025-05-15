import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

function useJumpAnimation(options: any) {
  const {
    jumpDuration = 400,
    maxJumpHeight = 30,
    elementId = "",
  } = options;
  
  const [isJumping, setIsJumping] = useState(false);
  const animationRef = useRef<number | null>(null);

  const handleJump = () => {
    if (isJumping) return;
    
    setIsJumping(true);
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    let startTime = Date.now();
    const jumpElement = document.getElementById(elementId);
    
    if (!jumpElement) {
      console.error(`Not found: ${elementId}!`);
      setIsJumping(false);
      return;
    }
    
    const originalTransform = window.getComputedStyle(jumpElement).transform;
    const baseTransform = originalTransform === 'none' ? '' : originalTransform;
    
    const animateJump = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / jumpDuration, 1);
      
      const jumpHeight = Math.sin(progress * Math.PI) * maxJumpHeight;
      
      jumpElement.style.transform = `${baseTransform} translateY(${-jumpHeight}px)`;
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateJump);
      } else {
        jumpElement.style.transform = baseTransform;
        setIsJumping(false);
      }
    };
    
    animationRef.current = requestAnimationFrame(animateJump);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return { isJumping, handleJump };
}

const MovingGif: {
  Moving1st: typeof Moving1st;
  Moving2sec: typeof Moving2sec;
  Moving3rd: typeof Moving3rd;
  MovingForMobile1st: typeof MovingForMobile1st;
} = {} as {
  Moving1st: typeof Moving1st;
  Moving2sec: typeof Moving2sec;
  Moving3rd: typeof Moving3rd;
  MovingForMobile1st: typeof MovingForMobile1st
}

function MovingForMobile1st() {
  const [gifSrc, setGifSrc] = useState("/images/monad/icon/role-3.gif");
  const directionRef = useRef<"left" | "right">("right");

  const { handleJump } = useJumpAnimation({
    elementId: "mobile-jumping-character",
    jumpDuration: 400,
    maxJumpHeight: 50
  });

  return (
    <motion.img
      id="mobile-jumping-character"
      src={gifSrc}
      className="w-[96px] h-[107px] cursor-pointer"
      initial={{ x: 0, y: 0, rotate: 1, scaleX: -1 }} 
      animate={{
        x: [0, 173],
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
      onClick={handleJump}
      onUpdate={(latest) => {
        if (Number(latest.x) <= 10 && directionRef.current !== "left") {
          setGifSrc("/images/monad/icon/role-3-back.gif"); 
          directionRef.current = "left";
        } 
        else if (Number(latest.x) >= 166 && directionRef.current !== "right") {
          setGifSrc("/images/monad/icon/role-3.gif"); 
          directionRef.current = "right";
        }
      }}
      style={{ 
        position: "absolute", 
        bottom: "22px", 
        right: "58px",
        zIndex: 1,
      }}
      alt=""
    />
  );
}

function Moving1st() {
  const [gifSrc, setGifSrc] = useState("/images/monad/icon/role-3.gif");
  const directionRef = useRef<"left" | "right">("right");

  const { handleJump } = useJumpAnimation({
    elementId: "first-jumping-character",
    jumpDuration: 400,
    maxJumpHeight: 60
  });

  return (
    <motion.img
      id="first-jumping-character"
      src={gifSrc}
      className="w-[94px] h-[134px] cursor-pointer"
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
      onClick={handleJump}
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

  const { handleJump } = useJumpAnimation({
    elementId: "second-jumping-character",
    jumpDuration: 400,
    maxJumpHeight: 70
  });

  return (
    <motion.img
      id="second-jumping-character"
      src={gifSrc}
      className="w-[90px] h-[107px] cursor-pointer"
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
      onClick={handleJump}
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
  // 使用封装好的hook替代原来的实现
  const { handleJump } = useJumpAnimation({
    elementId: "jumping-character",
    jumpDuration: 400,
    maxJumpHeight: 80
  });

  return (
    <motion.img
      id="jumping-character"
      src={gifSrc}
      className="w-[90px] h-[107px] cursor-pointer"
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
      onClick={handleJump}
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
MovingGif.MovingForMobile1st = MovingForMobile1st;

export default MovingGif;