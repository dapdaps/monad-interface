import { useEffect, useRef, useState } from "react";

export function useJumpAnimation(options: any) {
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