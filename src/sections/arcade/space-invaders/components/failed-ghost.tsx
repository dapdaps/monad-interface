import { AnimatePresence, motion } from "framer-motion";
import { useSpaceInvadersContext } from "../context";
import { useEffect } from "react";

const FailedGhost = (props: any) => {
  const { className } = props;

  const {
    failedGhostVisible,
    failedGhostPosition,
    setFailedGhostVisible,
  } = useSpaceInvadersContext();

  // Hide component after animation ends
  useEffect(() => {
    if (failedGhostVisible) {
      const timer = setTimeout(() => {
        setFailedGhostVisible?.(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [failedGhostVisible, setFailedGhostVisible]);

  return (
    <AnimatePresence>
      {failedGhostVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <motion.img
            src="/images/arcade/space-invaders/ghost.svg"
            alt=""
            className="absolute w-[clamp(1px,_70px,_calc(var(--nadsa-laptop-width)*0.7))] h-[clamp(1px,_70px,_calc(var(--nadsa-laptop-width)*0.7))] object-center object-contain"
            style={{
              left: failedGhostPosition[0] - 35, // Center the ghost
              top: failedGhostPosition[1] - 35,
            }}
            initial={{
              scale: 1,
              opacity: 1,
              rotate: 0,
            }}
            animate={{
              scale: [1, 2, 4, 20], // From small to normal to full screen
              opacity: [0, 0.9, 1, 0], // Finally disappear
              // rotate: [0, 0, 360, 720], // Rotation effect
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              times: [0, 0.1, 0.4, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FailedGhost;
