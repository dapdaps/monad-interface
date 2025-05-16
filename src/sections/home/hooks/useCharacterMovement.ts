import { useCallback, useEffect, useRef, useState } from "react";
import { useCharacterTooltip } from "./useCharacterTooltip";

export function useCharacterMovement({
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