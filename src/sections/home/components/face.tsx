import { motion } from "framer-motion";

export default function Face() {
    return (
        <div className="absolute left-[18%] top-[10%] ">
            <motion.img
                src="/images/monad/background/face.png"
                className="w-[156px] absolute top-0 left-0 max-w-[156px]"
                alt="face"
                animate={{
                    y: [0, -10, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <motion.img
                src="/images/monad/background/star-1.png"
                className="w-[50px] absolute top-0 left-[136px] max-w-[50px]"
                alt="face"
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                }}
                transition={{
                    scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    },
                    rotate: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 0.5
                    }
                }}
            />

            <motion.img
                src="/images/monad/background/star-2.png"
                className="w-[50px] absolute top-[70px] left-[106px] max-w-[50px]"
                alt="face"
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                }}
                transition={{
                    scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    },
                    rotate: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1
                    }
                }}
            />

            <motion.img
                src="/images/monad/background/star-3.png"
                className="w-[50px] absolute top-[-70px] left-[30px] max-w-[50px]"
                alt="face"
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                }}
                transition={{
                    scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5
                    },
                    rotate: {
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1.5
                    }
                }}
            />
        </div>
    )
}