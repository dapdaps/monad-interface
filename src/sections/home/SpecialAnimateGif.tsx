import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animation states
const ANIMATION_STATE = {
  IDLE: "idle",              
  TRASH_OPENING: "opening",  
  FLY_OUT: "flyOut",         
  FLY_BACK: "flyBack",       
  TRASH_CLOSING: "closing"   
};

export const SpecialAnimateGif = () => {
    const [animationState, setAnimationState] = useState(ANIMATION_STATE.IDLE);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = useCallback(() => {
        if (!isAnimating) {
            setIsAnimating(true);
            setAnimationState(ANIMATION_STATE.TRASH_OPENING);
            
            setTimeout(() => {
                setAnimationState(ANIMATION_STATE.FLY_OUT);
            }, 2000);
            
            setTimeout(() => {
                setAnimationState(ANIMATION_STATE.FLY_BACK);
            }, 3000);
            
            setTimeout(() => {
                setAnimationState(ANIMATION_STATE.TRASH_CLOSING);
                
                setTimeout(() => {
                    setAnimationState(ANIMATION_STATE.IDLE);
                    setIsAnimating(false);
                }, 2000);
            }, 5000);
        }
    }, [isAnimating]);

    const trashCanStyle = {
        width: "144px", 
        height: "185px"
    };

    const flyStyle = {
        width: "250px",
        height: "150px"
    };

    return (
        <div 
            className="absolute z-[100] right-0 top-[25%] cursor-pointer w-[244px] h-[144px]" 
            onClick={handleClick}
        >
            <AnimatePresence mode="wait">
                {animationState === ANIMATION_STATE.IDLE && (
                    <motion.img 
                        key="static-trash"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 1 }}
                        transition={{ duration: 0 }}
                        src="/images/monad/icon/trash.svg" 
                        alt="Static trash"
                        className="absolute top-0 right-0 w-[144px] h-[185px]"
                    />
                )}
                
                {animationState === ANIMATION_STATE.TRASH_OPENING && (
                    <motion.img 
                        key="trash-opening"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 1 }}
                        transition={{ duration: 0 }}
                        src="/images/monad/gif/trash-open.gif"
                        alt="Trash opening"
                        className="absolute top-0 right-0"
                        style={trashCanStyle}
                    />
                )}
                
                {animationState === ANIMATION_STATE.FLY_OUT && (
                    <motion.div 
                        key="fly-out" 
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 1 }}
                        transition={{ duration: 0 }}
                        className="absolute top-0 right-0 w-full h-full"
                    >
                        <motion.img 
                            src="/images/monad/gif/trash-open.gif"
                            alt="Trash open"
                            className="absolute top-0 right-0"
                            style={trashCanStyle}
                        />
                        <motion.div className="absolute w-full h-full overflow-visible">
                            <motion.img 
                                src="/images/monad/gif/mosquito-fly-left.gif"
                                alt="Fly going left"
                                initial={{ x: 50, y: 50, scale: 0.5 }}
                                animate={{ x: -200, y: 0, scale: 1 }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                className="absolute top-[-78px]"
                                style={flyStyle}
                            />
                        </motion.div>
                    </motion.div>
                )}
                
                {animationState === ANIMATION_STATE.FLY_BACK && (
                    <motion.div 
                        key="fly-back"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 1 }}
                        transition={{ duration: 0 }}
                        className="absolute top-0 right-0 w-full h-full"
                    >
                        <motion.img 
                            src="/images/monad/gif/trash-open.gif"
                            alt="Trash open"
                            className="absolute top-0 right-0"
                            style={trashCanStyle}
                        />
                        <motion.div className="absolute w-full h-full overflow-visible">
                            <motion.img 
                                src="/images/monad/gif/mosquito-fly-right.gif"
                                alt="Fly going right"
                                initial={{ x: -200, y: 0, scale: 1 }}
                                animate={{ x: 50, y: 50, scale: 0.5 }}
                                transition={{ duration: 2, ease: "easeIn" }}
                                className="absolute top-[-78px]"
                                style={flyStyle}
                            />
                        </motion.div>
                    </motion.div>
                )}
                
                {animationState === ANIMATION_STATE.TRASH_CLOSING && (
                    <motion.img 
                        key="trash-closing"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 1 }}
                        transition={{ duration: 0 }}
                        src="/images/monad/gif/trash-close.gif"
                        alt="Trash closing"
                        className="absolute top-0 right-0"
                        style={trashCanStyle}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};