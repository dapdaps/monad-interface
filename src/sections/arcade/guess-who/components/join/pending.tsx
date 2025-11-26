import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Pending = (props: any) => {
  const { className, isShowUFO } = props;
  const [dots, setDots] = useState("");
  const [showFragments, setShowFragments] = useState(false);

  // Fragment configuration: size and explosion direction (angle and distance)
  const fragments = [
    { width: 78, height: 69, angle: 0, distance: 250 },      // Fragment 1 - Right
    { width: 78, height: 69, angle: 72, distance: 240 },    // Fragment 2 - Top right
    { width: 50, height: 52, angle: 144, distance: 230 },    // Fragment 3 - Top left
    { width: 63, height: 44, angle: 216, distance: 245 },   // Fragment 4 - Bottom left
    { width: 61, height: 66, angle: 288, distance: 235 },   // Fragment 5 - Bottom right
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") {
          return "";
        } else {
          return prev + ".";
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isShowUFO) {
      // Show fragments after 2 seconds of shaking
      const timer = setTimeout(() => {
        setShowFragments(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowFragments(false);
    }
  }, [isShowUFO]);

  // Calculate fragment position (from center outward)
  const getFragmentPosition = (angle: number, distance: number) => {
    const radians = (angle * Math.PI) / 180;
    const x = Math.cos(radians) * distance;
    const y = Math.sin(radians) * distance;
    return { x, y };
  };

  return (
    <div className={clsx("flex flex-col justify-start items-center mt-[70px]", className)}>
      <div className="relative w-[201px] h-[150px] flex items-center justify-center">
        {/* Original meteorite image - shake effect */}
        <AnimatePresence>
          {!showFragments && (
            <motion.img
              key="meteorite"
              src="/images/mainnet/arcade/guess-who/v2/meteorite.png"
              alt=""
              className="w-[201px] h-[150px] object-center object-contain shrink-0"
              animate={isShowUFO ? {
                x: [0, -2, 2, -1.5, 1.5, -2, 2, -1, 1, -1.5, 1.5, -1, 1, 0],
                y: [0, -1.5, 1.5, -2, 2, -1, 1, -1.5, 1.5, -1, 1, -1.5, 1.5, 0],
                rotate: [0, -1, 1, -0.5, 0.5, -1, 1, -0.5, 0.5, -1, 1, -0.5, 0.5, 0],
                scale: [1, 1.02, 0.98, 1.01, 0.99, 1.02, 0.98, 1.01, 0.99, 1.02, 0.98, 1.01, 0.99, 1],
              } : {}}
              transition={isShowUFO ? {
                duration: 0.2,
                times: [0, 0.07, 0.14, 0.21, 0.28, 0.35, 0.42, 0.49, 0.56, 0.63, 0.7, 0.77, 0.84, 1],
                ease: "linear",
                repeat: Infinity,
              } : {}}
              exit={{ 
                opacity: 0, 
                scale: 0,
                transition: { 
                  duration: 0.1,
                  ease: "easeIn"
                }
              }}
            />
          )}
        </AnimatePresence>

        {/* Explosion fragments */}
        <AnimatePresence>
          {showFragments && isShowUFO && (
            <>
              {fragments.map((fragment, index) => {
                const position = getFragmentPosition(fragment.angle, fragment.distance);
                return (
                  <motion.img
                    key={`fragment-${index + 1}`}
                    src={`/images/mainnet/arcade/guess-who/v2/meteorite-fragment-${index + 1}.png`}
                    alt=""
                    className="absolute object-center object-contain shrink-0"
                    style={{
                      width: `${fragment.width}px`,
                      height: `${fragment.height}px`,
                    }}
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }}
                    animate={{
                      x: [0, 0, position.x / 4, position.x / 2, position.x],
                      y: [0, 0, position.y / 4, position.y / 2, position.y],
                      opacity: [0, 1, 1, 0.8, 0],
                      scale: [0, 1, 1.2, 0.8, 0.5],
                      rotate: [0, 0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      delay: 0,
                      times: [0, 0.1, 0.3, 0.7, 1], // Stay at center for first 10% of time, then start scattering
                      ease: "easeOut",
                    }}
                  />
                );
              })}
            </>
          )}
        </AnimatePresence>
      </div>
      <div className="text-[#FFF] text-[32px] mt-[20px] text-center">
        Guess Who{dots}
      </div>
    </div>
  );
};

export default Pending;
