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

    const handleClick = useCallback(() => {
        if (animationState === ANIMATION_STATE.IDLE) {
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
                }, 2000);
            }, 5000);
        }
    }, [animationState]);

    const trashCanStyle = {
        width: "144px", 
        height: "185px"
    };

    const flyStyle = {
        width: "248px",
        height: "148px"
    };

    return (
        <div 
            className="absolute z-[100] right-0 top-[25%] cursor-pointer w-[244px] h-[144px]" 
            onClick={handleClick}
        >
            {animationState === ANIMATION_STATE.IDLE && (
                <img 
                    src="/images/monad/icon/trash.svg" 
                    alt="Static trash"
                    className="absolute top-0 right-0 w-[144px] h-[185px]"
                />
            )}
            
            <AnimatePresence>
                {animationState === ANIMATION_STATE.TRASH_OPENING && (
                    <motion.img 
                        src="/images/monad/gif/trash-open.gif"
                        alt="Trash opening"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-0 right-0"
                        style={trashCanStyle}
                    />
                )}
                
                {animationState === ANIMATION_STATE.FLY_OUT && (
                    <>
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
                                initial={{ x: 50, y: 50, opacity: 0, scale: 0.5 }}
                                animate={{ x: -200, y: 0, opacity: 1, scale: 1 }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                className="absolute top-[-78px]"
                                style={flyStyle}
                            />
                        </motion.div>
                    </>
                )}
                
                {animationState === ANIMATION_STATE.FLY_BACK && (
                    <>
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
                                initial={{ x: -200, y: 0, opacity: 1, scale: 1 }}
                                animate={{ x: 50, y: 50, opacity: 0, scale: 0.5 }}
                                transition={{ duration: 2, ease: "easeIn" }}
                                className="absolute top-[-8px]"
                                style={flyStyle}
                            />
                        </motion.div>
                    </>
                )}
                
                {animationState === ANIMATION_STATE.TRASH_CLOSING && (
                    <motion.img 
                        src="/images/monad/gif/trash-close.gif"
                        alt="Trash closing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-0 right-0"
                        style={trashCanStyle}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
