import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useJumpAnimation } from "./hooks/useJumpAnimation";
import { useCharacterMovement } from "./hooks/useCharacterMovement";
import clsx from "clsx";

const tooltipMessages = [
  "Gmonad",
  "Captain told me the more I do, the more I'm rewarded",
  "It's a good day to do a Lucky 777 spin",
  "Wah, you're early!",
  "Shiny Badges you have there fren…",
  "Have anyone seen Keone around???",
  "Henlo, have you claimed MON from the faucet?",
  "It's a good day to try out a new app",
  "Stop touching me, I'm on an important mission!",
  "You should be here daily",
  "Touch grass",
  "Have anyone seen Abdul around?",
  "Badges are important, you should try to get them all",
  "I have everything I need here",
  "Do you know this station was built by a company call DapDap",
  "I heard somewhere there is a town with a bear",
  "It takes sacrifice to be an astronaut"
];

const useRandomTooltip = () => {
  const [currentMessage, setCurrentMessage] = useState(() => {
    const randomIndex = Math.floor(Math.random() * tooltipMessages.length);
    return tooltipMessages[randomIndex];
  });

  const getRandomMessage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * tooltipMessages.length);
    setCurrentMessage(tooltipMessages[randomIndex]);
  }, []);

  return { currentMessage, getRandomMessage };
};

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

function MovingForMobile1st(props: any) {
  const { className } = props;

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
      className={clsx("w-[96px] h-[107px] cursor-pointer", className)}
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
  const { currentMessage, getRandomMessage } = useRandomTooltip();
  
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
    tooltipText: <>{currentMessage}</>
  });

  const handleClick = () => {
    getRandomMessage();
    handleCharacterClick();
  };

  return (
    <div className="absolute left-[270px] bottom-[72px] z-[58]">
      <div className="relative">
        <div className="relative">
          <img
            id="first-jumping-character"
            src={gifSrc}
            className="w-[94px] h-[134px] cursor-pointer"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`
            }}
            onClick={handleClick}
            alt=""
          />
          {renderTooltip(position)}
        </div>
      </div>
    </div>
  );
}

function Moving2sec() {
  const { currentMessage, getRandomMessage } = useRandomTooltip();
  
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
    tooltipText: <>{currentMessage}</>
  });

  const handleClick = () => {
    getRandomMessage();
    handleCharacterClick();
  };

  return (
    <div className="absolute left-[50%] top-0 z-[25]">
      <div className="relative">
        <div className="relative">
          <img
            id="second-jumping-character"
            src={gifSrc}
            className="w-[90px] h-[107px] cursor-pointer"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`
            }}
            onClick={handleClick}
            alt=""
          />
          {renderTooltip(position)}
        </div>
      </div>
    </div>
  );
}

function Moving3rd() {
  const { currentMessage, getRandomMessage } = useRandomTooltip();
  
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
    tooltipText: <>{currentMessage}</>
  });

  const handleClick = () => {
    getRandomMessage();
    handleCharacterClick();
  };

  return (
    <div className="absolute bottom-[28%] right-[45%] z-[30]">
      <div className="relative">
        <div className="relative">
          <img
            id="jumping-character"
            src={gifSrc}
            className="w-[90px] h-[107px] cursor-pointer"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`
            }}
            onClick={handleClick}
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