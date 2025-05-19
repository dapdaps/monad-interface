import { useCallback, useEffect, useRef, useState } from "react";

export function useCharacterTooltip(options: {
  pauseDuration?: number;
  tooltipText?: React.ReactNode;
  onPause?: () => void;
  onResume?: () => void;
}) {
  const {
    pauseDuration = 2000,
    tooltipText = "GMonad!",
    onPause,
    onResume
  } = options;

  const [isPaused, setIsPaused] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTooltipTimer = useCallback(() => {
    if (tooltipTimerRef.current) {
      clearTimeout(tooltipTimerRef.current);
      tooltipTimerRef.current = null;
    }
  }, []);

  const handleCharacterClick = useCallback(() => {
    if (isPaused) return;
    
    setIsPaused(true);
    setShowTooltip(true);
    
    if (onPause) onPause();
    
    clearTooltipTimer();
    
    tooltipTimerRef.current = setTimeout(() => {
      setShowTooltip(false);
      setIsPaused(false);
      tooltipTimerRef.current = null;
      
      if (onResume) onResume();
    }, pauseDuration);
  }, [isPaused, pauseDuration, onPause, onResume, clearTooltipTimer]);

  useEffect(() => {
    return clearTooltipTimer;
  }, [clearTooltipTimer]);

  const renderTooltip = useCallback((position: { x: number, y: number }) => {
    if (!showTooltip) return null;
    
    return (
      <div 
        className="absolute z-[100]"
        style={{
          top: `${position.y - 70}px`, 
          left: `${position.x + 47}px`,
          transform: 'translateX(-50%)',
        }}
      >
        <div className="relative flex items-center justify-center min-w-[180px] min-h-[50px] bg-[#1A1843]/80 rounded-[6px] backdrop-blur-[10px]">
          <img src="/images/monad/icon/arrow-down.svg" className="absolute left-1/2 -translate-x-1/2 bottom-[-19px]" />
          <div className="font-Unbounded text-[12px] text-white leading-[18px] p-2">
            {tooltipText}
          </div>
        </div>
      </div>
    );
  }, [showTooltip, tooltipText]);

  return {
    isPaused,
    showTooltip,
    handleCharacterClick,
    renderTooltip,
    setIsPaused
  };
}