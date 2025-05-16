import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useJumpAnimation } from "./hooks/useJumpAnimation";
import { useCharacterMovement } from "./hooks/useCharacterMovement";


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
  const {
    gifSrc,
    position,
    handleCharacterClick,
    renderTooltip
  } = useCharacterMovement({
    initialGif: "/images/monad/icon/role-3-back.gif",
    leftGif: "/images/monad/icon/role-3-back.gif",
    rightGif: "/images/monad/icon/role-3.gif",
    leftBoundary: -300,
    rightBoundary: 0,
    moveStepValue: 0.5,
    slopeRatio: 0.33,
    isMovingDown: false,
    jumpGifLeft: "/images/monad/icon/chog-jump-left.gif",
    jumpGifRight: "/images/monad/icon/chog-jump-right.gif",
    tooltipText: <>GMonad! <br />I'm Chog</>
  });

  return (
    <div className="absolute left-[270px] bottom-[72px] z-[28]">
      <div className="relative">
        <div className="relative">
          <img
            id="first-jumping-character"
            src={gifSrc}
            className="w-[94px] h-[134px] cursor-pointer"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`
            }}
            onClick={handleCharacterClick}
            alt=""
          />
          {renderTooltip(position)}
        </div>
      </div>
    </div>
  );
}

function Moving2sec() {
  const {
    gifSrc,
    position,
    handleCharacterClick,
    renderTooltip
  } = useCharacterMovement({
    initialGif: "/images/monad/icon/role-2-back.gif",
    leftGif: "/images/monad/icon/role-2-back.gif",
    rightGif: "/images/monad/icon/role-2.gif",
    leftBoundary: -240,
    rightBoundary: 0,
    moveStepValue: 0.5,
    slopeRatio: 0.17,
    isMovingDown: true,
    jumpGifLeft: "/images/monad/icon/molandak-twist-left.gif",
    jumpGifRight: "/images/monad/icon/molandak-twist-right.gif",
    tooltipText: <>GMonad! <br />I'm Molandak</>
  });

  return (
    <div className="absolute left-[50%] top-0 z-[28]">
      <div className="relative">
        <div className="relative">
          <img
            id="second-jumping-character"
            src={gifSrc}
            className="w-[90px] h-[107px] cursor-pointer"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`
            }}
            onClick={handleCharacterClick}
            alt=""
          />
          {renderTooltip(position)}
        </div>
      </div>
    </div>
  );
}

function Moving3rd() {
  const {
    gifSrc,
    position,
    handleCharacterClick,
    renderTooltip
  } = useCharacterMovement({
    initialGif: "/images/monad/icon/role-2.gif",
    leftGif: "/images/monad/icon/role-1.gif",
    rightGif: "/images/monad/icon/role-2.gif",
    leftBoundary: 0,
    rightBoundary: 400,
    moveStepValue: 0.7,
    slopeRatio: 0.2,
    isMovingDown: true,
    jumpGifLeft: "/images/monad/icon/molandak-twist-left.gif",
    jumpGifRight: "/images/monad/icon/molandak-twist-right.gif",
    tooltipText: <>GMonad! <br />I'm Molandak</>
  });

  return (
    <div className="absolute bottom-[28%] right-[45%] z-[6]">
      <div className="relative">
        <div className="relative">
          <img
            id="jumping-character"
            src={gifSrc}
            className="w-[90px] h-[107px] cursor-pointer"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`
            }}
            onClick={handleCharacterClick}
            alt=""
          />
          {renderTooltip(position)}
        </div>
      </div>
    </div>
  );
}

MovingGif.Moving1st = Moving1st;
MovingGif.Moving2sec = Moving2sec;
MovingGif.Moving3rd = Moving3rd;
MovingGif.MovingForMobile1st = MovingForMobile1st;

export default MovingGif;