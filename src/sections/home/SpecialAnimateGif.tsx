import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animation states
const ANIMATION_STATE = {
  IDLE: "idle",              
  CAP_OPENING: "capOpening",  
  FLY_OUT: "flyOut",         
  FLY_BACK: "flyBack",       
  CAP_CLOSING: "capClosing"   
};

export const SpecialAnimateGif = () => {
    const [animationState, setAnimationState] = useState(ANIMATION_STATE.IDLE);
    const [isAnimating, setIsAnimating] = useState(false);

    const capOpeningDuration = 0.5; 
    const flyOutWaitTime = 0.2; 
    const flyOutDuration = 1.8; 
    const flyBackDuration = 1.8; 
    const capClosingDuration = 0.5; 

    const handleClick = useCallback(() => {
        if (!isAnimating) {
            setIsAnimating(true);
            setAnimationState(ANIMATION_STATE.CAP_OPENING);
            
            setTimeout(() => {
                setAnimationState(ANIMATION_STATE.FLY_OUT);
            }, (capOpeningDuration + flyOutWaitTime) * 1000);
            
            setTimeout(() => {
                setAnimationState(ANIMATION_STATE.FLY_BACK);
            }, (capOpeningDuration + flyOutWaitTime + flyOutDuration) * 1000);
            
            setTimeout(() => {
                setAnimationState(ANIMATION_STATE.CAP_CLOSING);
                
                setTimeout(() => {
                    setAnimationState(ANIMATION_STATE.IDLE);
                    setIsAnimating(false);
                }, capClosingDuration * 1000);
            }, (capOpeningDuration + flyOutWaitTime + flyOutDuration + flyBackDuration) * 1000);
        }
    }, [isAnimating]);

    const flyStyle = {
        width: "250px",
        height: "150px"
    };

 return (
        <div 
            className="absolute z-[100] right-0 top-[30%] cursor-pointer w-[250px] h-[144px] overflow-visible" 
            onClick={handleClick}
        >
            <div className="absolute top-0 right-0 w-full h-full overflow-visible scale-[0.8]">
                <AnimatePresence mode="wait">
                    {animationState === ANIMATION_STATE.FLY_OUT && (
                        <motion.img 
                            key="fly-left"
                            src="/images/monad/special-animate/mosquito-fly-left.gif"
                            alt="Fly going left"
                            initial={{ x: 50, y: 20, }}
                            animate={{ x: -200, y: 0 }}
                            transition={{ duration: flyOutDuration, ease: "easeOut" }}
                            className="absolute top-[-78px]"
                            style={flyStyle}
                        />
                    )}
                    
                    {animationState === ANIMATION_STATE.FLY_BACK && (
                        <motion.img 
                            key="fly-right"
                            src="/images/monad/special-animate/mosquito-fly-right.gif"
                            alt="Fly going right"
                            initial={{ x: -150, y: 0 }}
                            animate={{ x: 50, y: 20 }}
                            transition={{ duration: flyBackDuration, ease: "easeIn" }}
                            className="absolute top-[-78px]"
                            style={flyStyle}
                        />
                    )}
                </AnimatePresence>
            </div>

            <div className="absolute top-0 right-0 w-[100px] h-[120px] overflow-visible">
                <img 
                    src="/images/monad/special-animate/trash.svg" 
                    alt="Trash bin" 
                    className="absolute top-0 right-0 w-full h-full"
                />
                
                <AnimatePresence mode="wait">
                    {animationState === ANIMATION_STATE.IDLE && (
                        <motion.img 
                            key="cap-closed"
                            src="/images/monad/special-animate/trash-cap.svg"
                            alt="Trash cap"
                            className="absolute top-2 right-2 w-[85px]"
                            initial={{ rotate: 0, x: 0, y: 0 }}
                            exit={{ opacity: 1 }}
                        />
                    )}
                    
                    {animationState === ANIMATION_STATE.CAP_OPENING && (
                        <motion.img 
                            key="cap-opening"
                            src="/images/monad/special-animate/trash-cap.svg"
                            alt="Trash cap opening"
                            className="absolute top-2 right-2 w-[85px] origin-bottom-left"
                            initial={{ rotate: 0, x: 0, y: 0 }}
                            animate={{ rotate: 11.855, x: 20, y: -10 }}
                            transition={{ 
                                duration: capOpeningDuration,
                                ease: "easeOut"
                            }}
                        />
                    )}
                    
                    {animationState === ANIMATION_STATE.FLY_OUT && (
                        <motion.img 
                            key="cap-open"
                            src="/images/monad/special-animate/trash-cap.svg"
                            alt="Trash cap open"
                            className="absolute top-2 right-2 w-[85px] origin-bottom-left"
                            initial={{ rotate: 11.855, x: 20, y: -10 }}
                        />
                    )}
                    
                    {animationState === ANIMATION_STATE.FLY_BACK && (
                        <motion.img 
                            key="cap-open-back"
                            src="/images/monad/special-animate/trash-cap.svg"
                            alt="Trash cap open"
                            className="absolute top-2 right-2 w-[85px] origin-bottom-left"
                            initial={{ rotate: 11.855, x: 20, y: -10 }}
                        />
                    )}
                    
                    {animationState === ANIMATION_STATE.CAP_CLOSING && (
                        <motion.img 
                            key="cap-closing"
                            src="/images/monad/special-animate/trash-cap.svg"
                            alt="Trash cap closing"
                            className="absolute top-2 right-2 w-[85px] origin-bottom-left"
                            initial={{ rotate: 11.855, x: 20, y: -10 }}
                            animate={{ rotate: 0, x: 0, y: 0 }}
                            transition={{ 
                                duration: capClosingDuration,
                                ease: "easeIn"
                            }}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};