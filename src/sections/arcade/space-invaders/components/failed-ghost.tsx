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
          <motion.svg
            width="70"
            height="70"
            viewBox="0 0 70 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className="absolute w-[clamp(1px,_70px,_calc(var(--nadsa-laptop-width)*0.7))] h-[clamp(1px,_70px,_calc(var(--nadsa-laptop-width)*0.7))]"
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
          >
            <rect width="70" height="70" fill="url(#pattern0_37670_1236)" />
            <defs>
              <pattern id="pattern0_37670_1236" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image0_37670_1236" transform="scale(0.00892857)" />
              </pattern>
              <image id="image0_37670_1236" width="112" height="112" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAABwCAYAAADG4PRLAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARSSURBVHgB7dw9aBRBFAfwd0k0iTFRFAzGQkRRECSddiI2ioKFWtsK1iJYib2FrVhqJyJYCTZWIlqphSAWFn4k4FeEmM+78z1uDyXM7Jvbnd2bd/x/8Ahk9vZ25+3e7ruZWyIAAAAAAAAAAAAAAAAAAACwrxG43BClK6l9CN2YmA5xnOBYdLQNc3zheEppG4R9KOw6RzsnXlP6ktmHfnxU/Vbaf1D6ktmHlK81EAAJNA4JNA4JNK7XBDYiLDNc8vWiygMv5P3bSru2jyHbH1TijVBvZKUHOHZyNB3t4xzPOVpZuMxxvOdYIPf2SA11mGPC8/6rVP1t+l6OGY51R9sKdfbzLceyo32U4x3lkwPgGPn7SLyiirSVuJbzWu3IFEeV9ddxi/5Q2Ya7AesYU9qbynvspwBFPkKXlWUWc9qapNuitP+i6n1V2ldIp/XTH6U9pK9wE2MdEmgcEmgcEmgcEmhc3QkMKSO+K+2bqXo/S7aLUapBr4V8WXJrfIXjFvlvozdly/mSvYc6Sda+DSlK1rs1+9vwtF/luEzuE0D69AXHaapB3QkU0injWRS1g/pHtn+M8gv1Ws4+gWugcUigcUigcUigcUigcVUk8LPSnvdNf2hpoH3TX8ZqhOXWSBc02qDpdWKvLC/1m+8WWhIgCZI6zXVwyEbv4pgm/3u/5LjAsc3R1spe/4yqdZPjPrnLgSWOSxw3PK/t1o8y6Owr0yT5s5R/Au3j+EiK2HWgbPhMFnnyzjQZT/yUhUuVZ1/XPMeHnPa5nDbpA9m/WapBv66BjYJtddH6Jca8nihwE2McEmgcEmgcEmhckQRq0+VEmRpHm60VMhZX1nzJdk1IrRk07lmkDjxP/kJVJuvKvNAzVJzUkE84Jh1tcnsuB9ApqtYb6kw+dnWi7PtBjiNUzjny9/8UxyPKn6JZSMgZe5v0yb9lo0m9vyb2ulsl32eCIuj1I7QVsEwdg8RVXrtD11221otSK+Imxjgk0Dgk0Dgk0LgqErg9YJkoY2EJC7nZi9L3Vdwx3qPOUIzrJ1hSpJ+kTg00yGQ/Ze6ob/qj/H+JEhRyVMlgaHvA4zHF6at6VvKfkI+OSRp8IfsY0lcq3MQYhwQahwQahwQahwQa14+fl2lkvE0GbUN+DNoPUibIo1BkXLLvJ0CKCZQn3Z6ltF3keEAJSPEjVHvQTwqmKRG4BhqHBBqHBBqHBBqHBBoXu4yQ9UmdNJT93Wid/j1E1fUwVXmdhdGK7p2ybx+6k599/Ssz0mRQO8qIRGwyoCvJW3OEbPSdbLmRnKjjaUxFDWUhDyTybf9x8vfBWtY2RRFUUcgvKOvuzupeJ5taG/66dC9NIwHrKQXXQOOQQOOQQOOQQOOQQOOqSKD2Tf1uGnwhPx2L0vexH4chG9V9Fmjb835LWSRZxEYg+yiD0TJ51zcDXdq/0eD2AQAAAAAAAAAAAAAAAAAAAAAAAAAAAIAhfwGtYE4eKrtxJAAAAABJRU5ErkJggg==" />
            </defs>
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FailedGhost;
