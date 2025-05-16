import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useCharacterTooltip } from "./hooks/useCharacterTooltip";

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

function useCharacterMovement({
  initialGif,
  leftGif,
  rightGif,
  leftBoundary,
  rightBoundary,
  moveStepValue = 0.5,
  slopeRatio = 0.33,
  isMovingDown = true,
  jumpGifLeft,
  jumpGifRight,
  tooltipText
}: any) {
  const [gifSrc, setGifSrc] = useState(initialGif);
  const directionRef = useRef<"left" | "right">("right");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isReverseRef = useRef(false);
  const previousGifRef = useRef(gifSrc);
  
  const { 
    isPaused, 
    handleCharacterClick: originalHandleClick, 
    renderTooltip 
  } = useCharacterTooltip({
    pauseDuration: 2000,
    tooltipText: tooltipText
  });
  
  const handleCharacterClick = () => {
    if (isPaused) return;
    
    previousGifRef.current = gifSrc;
    
    const jumpGif = directionRef.current === "right" 
      ? jumpGifRight 
      : jumpGifLeft;
    
    setGifSrc(jumpGif);
    originalHandleClick();
    
    setTimeout(() => {
      if (isPaused) {
        setGifSrc(previousGifRef.current);
      }
    }, 2000);
  };

  const startMovement = useCallback(() => {
    
    if (animationTimerRef.current) {
      clearInterval(animationTimerRef.current);
      animationTimerRef.current = null;
    }
    
    const moveStep = moveStepValue;
    animationTimerRef.current = setInterval(() => {
      if (isPaused) return;
      
      let newX = position.x;
      let newY = position.y;
      
      if (!isReverseRef.current) {
        newX -= moveStep;
        newY += isMovingDown ? moveStep * slopeRatio : -moveStep * slopeRatio;
        
        if (newX <= leftBoundary) {
          isReverseRef.current = true;
          setGifSrc(rightGif);
          directionRef.current = "right";
        }
      } else {
        newX += moveStep;
        newY += isMovingDown ? -moveStep * slopeRatio : moveStep * slopeRatio;
        
        if (newX >= rightBoundary) {
          isReverseRef.current = false;
          setGifSrc(leftGif);
          directionRef.current = "left";
        }
      }
      
      setPosition({ x: newX, y: newY });
    }, 16);
  }, [isPaused, position, leftGif, rightGif, leftBoundary, rightBoundary, moveStepValue, slopeRatio, isMovingDown]);

  useEffect(() => {
    const timer = setTimeout(() => {
      startMovement();
    }, 10);
    
    return () => {
      clearTimeout(timer);
      if (animationTimerRef.current) {
        clearInterval(animationTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isPaused) {
      if (gifSrc.includes(jumpGifLeft.split('/').pop().split('.')[0]) || 
          gifSrc.includes(jumpGifRight.split('/').pop().split('.')[0])) {
        const normalGif = directionRef.current === "right" 
          ? rightGif 
          : leftGif;
        setGifSrc(normalGif);
      }
      startMovement();
    } else {
      if (animationTimerRef.current) {
        clearInterval(animationTimerRef.current);
        animationTimerRef.current = null;
      }
    }
  }, [isPaused, startMovement, leftGif, rightGif, jumpGifLeft, jumpGifRight]);

  return {
    gifSrc,
    position,
    isPaused,
    handleCharacterClick,
    renderTooltip
  };
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